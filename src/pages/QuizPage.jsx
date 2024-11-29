import { useParams } from "react-router-dom";
import QuizInfo from "../components/Quiz/QuizInfo/QuizInfo";
import QuizQuestions from "../components/Common/quizQuestions/QuizQuestions.jsx";

const QuizPage = () => {

    const { quizSetId } = useParams();
    console.log("quizSetId inside quiz page: ", quizSetId);



    return (
                <main className=" mx-auto h-[calc(100vh-10rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                        <QuizInfo quizSetId={quizSetId} />
                        <QuizQuestions quizSetId={quizSetId} />
                    </div>
                </main>
                );
                };

                export default QuizPage;
