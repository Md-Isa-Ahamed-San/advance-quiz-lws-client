import {useState} from 'react';
import {QuizContext} from "../contexts/index.js";
import useAxios from "../hooks/useAxios.js";
import {useMutation, useQuery} from "@tanstack/react-query";

const QuizProvider = ({children}) => {
    const {api} = useAxios();
    const [quizData,setQuizData] = useState([])
    const [currentQuestionNo,setCurrentQuestionNo] = useState(0);
    const question = quizData?.data?.questions[currentQuestionNo];
    const [quizAnswers,setQuizAnswers] = useState({answers:{}});
    const [chooseOption,setChooseOptions] = useState(null);
// console.log(question?.id,chooseOption)
    const handleQuizAnswer = ()=>{
        if(question && quizAnswers){
        setQuizAnswers((prevAns)=>({
    answers:{
        ...prevAns.answers,
        [question.id] : chooseOption
    }
        }))
    }
        }
// console.log("quiz answers object: ",quizAnswers)
    const fetchQuizData = async (quizSetId) => {
        const { data } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizSetId}`);
        setQuizData(data)
        return data;
    };
    const useFetchQuiz = (quizSetId)=>{
        return useQuery({
            queryKey:["quizData", quizSetId],
            queryFn:()=>fetchQuizData(quizSetId),
            enabled: !!quizSetId
        })
    }

    const submitQuiz = async (quizSetId) => {
        console.log("inside submitQuiz: ",quizAnswers)
        const res = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizSetId}/attempt`,quizAnswers);
        console.log("res from submit quiz: ",res)
    };

    const useSubmitQuiz = (quizSetId) => {
        return useMutation({
            mutationFn: () => {
                if (!quizSetId) {
                    throw new Error("QuizSetId is required to submit the quiz.");
                }
                return submitQuiz(quizSetId);
            },
        });
    };


    return (
       <QuizContext.Provider value={{useFetchQuiz,quizData,currentQuestionNo,setCurrentQuestionNo,chooseOption,setChooseOptions,question,handleQuizAnswer,useSubmitQuiz}}>
           {children}
       </QuizContext.Provider>
    );
};

export default QuizProvider;