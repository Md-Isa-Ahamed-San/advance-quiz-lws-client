import QuizResult from "../components/Quiz/QuizResult/QuizResult";
import QuizAnswers from "../components/Quiz/QuizAnswers/QuizAnswers.jsx";
import {useParams} from "react-router-dom";
import LogoWhite from "../assets/logo-white.svg"
const ResultPage = () => {
    const { quizSetId } = useParams();

    return (
        <div className="bg-background text-foreground min-h-screen w-full">
            <div className="flex min-h-screen overflow-hidden flex-col md:flex-row">
                <img src={LogoWhite} className="max-h-11 fixed left-6 top-6 z-50 hidden md:block" />
                <QuizResult quizSetId={quizSetId} />
                <QuizAnswers quizSetId={quizSetId} />
            </div>
        </div>
    );
};


export default ResultPage;