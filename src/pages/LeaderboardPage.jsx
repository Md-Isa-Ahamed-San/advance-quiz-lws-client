import Leaderboard from "../components/Quiz/Leaderboard/Leaderboard";
import QuizStats from "../components/Quiz/QuizStats/QuizStats";
import {useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import useQuizResult from "../hooks/useQuizResult.js";
import Header from "../components/Common/Header/Header";

const LeaderboardPage = () => {
    const { quizSetId } = useParams();
    const { auth } = useAuth();
    const { useFetchQuizResult, generateLeaderboard, getUserLeaderboardPosition } = useQuizResult();
    const { data: quizResultData, isLoading, isError, error } = useFetchQuizResult(quizSetId);

    if (isLoading) return <p>Loading leaderboard...</p>;
    if (isError) return <p className="text-red-500">Error fetching leaderboard: {error?.message || "Unknown error"}</p>;

    const title = quizResultData?.data?.quiz?.title;
    const leaderboard = generateLeaderboard(quizResultData?.data?.attempts);
    const userDetailsWithPosition = getUserLeaderboardPosition(leaderboard, auth?.user?.id);

    return (
        <>
        <Header />
        <div className="min-h-[calc(100vh-50px)] flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <QuizStats userDetailsWithPosition={userDetailsWithPosition}  quizSetId={quizSetId} />
                    <Leaderboard title={title} leaderboard={leaderboard}/>
                </div>
            </div>
        </div>
        </>
    );
};


export default LeaderboardPage;
