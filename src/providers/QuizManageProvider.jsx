/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QuizManageContext } from '../contexts';
import useAxios from '../hooks/useAxios';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const QuizManageProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { api } = useAxios();
  const navigate = useNavigate();
  const [updateQuestion,setUpdateQuestion] = useState(null);
  const [quizPublished,setQuizPublished] = useState(false)
  // Fetch all quiz sets

const fetchQuizSets = async () => {
  const { data } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`);

  return data;
};

const useFetchQuizSets = () =>
  useQuery({
    queryKey: ['quizSets'], 
    queryFn: fetchQuizSets, 
    keepPreviousData: true, 
  });

  // Fetch a single quiz
  const fetchQuiz = async (quizSetId) => {
    const { data } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`);
    console.log("quiz set id in useFetchQuiz", quizSetId);
    const filteredData = data.filter(item=>item.id===quizSetId)
    console.log("response data inside useFetchQuiz",filteredData);
    return filteredData;
  };

  const useFetchQuiz = (quizSetId) =>
    useQuery({
      queryKey: ['quizSets', quizSetId],
      queryFn: () => fetchQuiz(quizSetId),
    });

  // Add a question to a quiz set
  const addQuestion = async ({ quizSetId, question }) => {
    console.log(quizSetId,question)
    const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}/questions`, question);
    console.log('res.data : ',response.data)
    return response.data;
  };

  const useAddQuestion = () =>
      useMutation({
        mutationFn: ({ quizSetId, question }) => addQuestion({ quizSetId, question }),
        onSuccess: (_, { quizSetId }) => {
          queryClient.invalidateQueries({ queryKey: ["quizSets", quizSetId] });
         
        },
        onError: (error) => {
          console.error("Error adding question:", error);
        },
      });

  //handling question update
  // Update a question
  const patchUpdateQuestion = async ({ questionId, updatedData }) => {
    const { data } = await api.patch(`/admin/questions/${questionId}`, updatedData);
    return data;
  };

  const usePatchUpdateQuestion = () => useMutation({
    mutationFn:({questionId,updatedData,quizSetId})=>patchUpdateQuestion({questionId,updatedData,quizSetId}),
    onSuccess: (_, { quizSetId }) => {
      queryClient.invalidateQueries({ queryKey: ["quizSets", quizSetId] });
     
    },
    onError: (error) => {
      console.error("Error updating question:", error);
    },
  });

  // Delete a question
    const deleteQuestion = async ({ questionId }) => {
        const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`);
        console.log("question deleted: ", response);
        return response.data;
    };


    const useDeleteQuestion = () => useMutation({
      mutationFn:({quizId,questionId})=>deleteQuestion({questionId}),
      onSuccess: (_, { quizId }) => {
          queryClient.invalidateQueries({ queryKey: ["quizSets", quizId] });
          // console.log('question deleted')

      },
      onError: (error) => {
          console.error("Error adding question:", error);
      }
  });

  // Create a new quiz set
  const createQuizSet = async (data) => {

    const { data: responseData } = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`, data.data);

    return responseData;
  };

  const useCreateQuizSet = () =>
      useMutation({
        mutationFn: (data) => createQuizSet(data),
        onSuccess: (response) => {
          console.log("Quiz set created successfully:", response);
          navigate(`/quizSetEntryPage/${response?.data?.id}`)
          queryClient.invalidateQueries({ queryKey: ["quizSets"] });
        },
        onError: (error) => {
          console.error("Error creating quiz set:", error);
        },
      });


  // Publish a quiz set
  const togglePublishQuizSet = async ({quizSetId,data}) => {
    const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}`,data);
    console.log("toggle publish quiz set res: ",response)
    if(response.status===200){
      setQuizPublished(!quizPublished)
    }
    return data;
  };

  const useTogglePublishQuizSet = () => useMutation({
    mutationFn:({quizSetId,data})=>togglePublishQuizSet({quizSetId,data})
  });



  // Context value
  const value = {
    useFetchQuiz,
    useFetchQuizSets,
    useCreateQuizSet,
    useAddQuestion,
    usePatchUpdateQuestion,
    useDeleteQuestion,
    useTogglePublishQuizSet,
    updateQuestion,setUpdateQuestion,quizPublished,setQuizPublished
  };

  return (
    <QuizManageContext.Provider value={value}>
      {children}
    </QuizManageContext.Provider>
  );
};

export default QuizManageProvider;
