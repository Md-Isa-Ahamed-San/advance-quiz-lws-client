// src="./assets/icons/circular-progressbar.svg"
import avater from "../../../assets/avater.webp"
import useQuizResult from "../../../hooks/useQuizResult.js";
import {useAuth} from "../../../hooks/useAuth.js";
const QuizStats = ({userDetailsWithPosition,quizSetId}) => {

    const { useFetchQuizResult, calculateUserStats } = useQuizResult();
    const { data: quizResultData, isLoading, isError, error } = useFetchQuizResult(quizSetId);
const{auth} =useAuth()

    const stats = calculateUserStats(quizResultData?.data?.attempts, auth?.user?.id);
    if (!stats) return <p>No quiz results found for the current user.</p>;

    const {correctCount, wrongAnswers, } = stats;
    // eslint-disable-next-line react/prop-types
    const{username,position,marks} = userDetailsWithPosition
    if (isLoading) return <p>Loading quiz result...</p>;
    if (isError) return <p className="text-red-500">Error fetching quiz result: {error?.message || "Unknown error"}</p>;

    return (
        <div className="bg-primary rounded-lg p-6 text-white">
          <div className="flex flex-col items-center mb-6">
            <img src={avater} alt="Profile Pic"
                 className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"/>
            <h2 className="text-2xl font-bold">{username}</h2>
            <p className="text-xl">{position} Position</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm opacity-75">Mark</p>
              <p className="text-2xl font-bold">{marks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-75">Correct</p>
              <p className="text-2xl font-bold">{correctCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-75">Wrong</p>
              <p className="text-2xl font-bold">{wrongAnswers}</p>
            </div>
          </div>
        </div>

    );
};

export default QuizStats;