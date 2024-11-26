import QuizResult from "../components/Quiz/QuizResult/QuizResult";
import QuizAnswers from "../components/Quiz/QuizAnswers/QuizAnswers.jsx";
import {useParams} from "react-router-dom";

const ResultPage = () => {
    const { quizSetId } = useParams();

    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                <QuizResult quizSetId={quizSetId} />
                <QuizAnswers quizSetId={quizSetId} />
            </div>
        </div>
    );
};


export default ResultPage;