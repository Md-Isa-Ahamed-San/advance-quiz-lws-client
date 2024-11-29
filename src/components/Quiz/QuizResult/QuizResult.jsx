import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import useQuizResult from "../../../hooks/useQuizResult.js";

const QuizResult = ({ quizSetId }) => {
  const { auth } = useAuth();
  const { useFetchQuizResult, calculateUserStats } = useQuizResult();
  const {
    data: quizResultData,
    isLoading,
    isError,
    error,
  } = useFetchQuizResult(quizSetId);

  if (isLoading) return <p>Loading quiz result...</p>;
  if (isError)
    return (
      <p className="text-red-500">
        Error fetching quiz result: {error?.message || "Unknown error"}
      </p>
    );

  const stats = calculateUserStats(
    quizResultData?.data?.attempts,
    auth?.user?.id
  );
  if (!stats) return <p>No quiz results found for the current user.</p>;

  const { totalQuestions, correctCount, wrongAnswers,totalMark, totalGotMark } = stats;
  const title = quizResultData?.data?.quiz?.title || "Unknown Title";
  const description =
    quizResultData?.data?.quiz?.description || "No Description";
    console.log(totalGotMark,totalMark)
  const percentage = Math.floor((parseInt(totalGotMark)/parseInt(totalMark)) * 100)
  return (
    <div className="max-h-screen overflow-hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
          </div>

          <div className="my-6 flex items-center">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">
                    {totalQuestions}
                  </p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{correctCount}</p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{wrongAnswers}</p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <NavLink
                to={`/leaderboard/${quizSetId}`}
                className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </NavLink>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">{totalGotMark}</p>
                <p>Your Mark</p>
              </div>
              <div>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar value={percentage} text={`${percentage}%`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
