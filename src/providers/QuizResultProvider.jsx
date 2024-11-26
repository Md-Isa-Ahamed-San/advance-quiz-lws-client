import { api } from "../api/api.js";
import { useQuery } from "@tanstack/react-query";
import { QuizResultContext } from "../contexts/index.js";

const QuizResultProvider = ({ children }) => {
    // Fetch quiz result data
    const fetchQuizResultData = async (quizSetId) => {
        const { data } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizSetId}/attempts`);
        return data;
    };

    // Calculate user's quiz statistics
    const calculateUserStats = (attempts, userId) => {
        const userQuizResult = attempts?.find(item => item?.user?.id === userId);

        if (!userQuizResult) return null;

        const totalQuestions = userQuizResult.correct_answers.length;
        const { correctCount, totalGotMark } = userQuizResult.submitted_answers.reduce(
            (acc, submittedAnswer, idx) => {
                const isCorrect = submittedAnswer.answer === userQuizResult.correct_answers[idx].answer;
                return {
                    correctCount: acc.correctCount + (isCorrect ? 1 : 0),
                    totalGotMark: acc.totalGotMark + (isCorrect ? userQuizResult.correct_answers[idx]?.marks : 0)
                };
            },
            { correctCount: 0, totalGotMark: 0 }
        );

        return {
            totalQuestions,
            correctCount,
            wrongAnswers: totalQuestions - correctCount,
            totalGotMark,
            userQuizResult
        };
    };

    // Generate leaderboard data
    const generateLeaderboard = (attempts) => {
        if (!attempts?.length) return [];

        return attempts
            .map((attempt) => {
                const totalMarks = attempt.correct_answers.reduce((totMarks, curr, idx) => {
                    if (curr?.answer === attempt.submitted_answers[idx]?.answer) {
                        totMarks += curr.marks;
                    }
                    return totMarks;
                }, 0);

                return {
                    id: attempt.user.id,
                    username: attempt.user.full_name,
                    marks: totalMarks,
                };
            })
            .sort((a, b) => b.marks - a.marks);
    };

    // Get user's position and details in leaderboard
    const getUserLeaderboardPosition = (leaderboard, userId) => {
        const userQuizDetails = leaderboard.find(item => item.id === userId);

        if (!userQuizDetails) return null;

        return {
            position: leaderboard.findIndex(item => item.id === userId) + 1,
            ...userQuizDetails
        };
    };

    // Process quiz answers for display
    const processQuizAnswers = (quizList, userQuizResult) => {
        if (!quizList?.length || !userQuizResult) return [];

        return quizList.map((quiz, index) => {
            const userAnswer = userQuizResult.submitted_answers[index]?.answer;
            const correctAnswer = quiz.correctAnswer;

            return {
                ...quiz,
                userAnswer,
                correctAnswer,
                isCorrect: userAnswer === correctAnswer
            };
        });
    };

    // Custom hook for fetching and processing quiz results
    const useFetchQuizResult = (quizSetId) => {
        const queryResult = useQuery({
            queryKey: ["quizResult", quizSetId],
            queryFn: () => fetchQuizResultData(quizSetId),
            enabled: !!quizSetId,
        });

        const processedData = queryResult.data ? {
            ...queryResult.data,
            quiz: {
                ...queryResult.data?.data?.quiz,
                attempts: queryResult.data?.data?.attempts
            }
        } : null;

        return {
            ...queryResult,
            data: processedData
        };
    };

    const contextValue = {
        useFetchQuizResult,
        calculateUserStats,
        generateLeaderboard,
        getUserLeaderboardPosition,
        processQuizAnswers
    };

    return (
        <QuizResultContext.Provider value={contextValue}>
            {children}
        </QuizResultContext.Provider>
    );
};

export default QuizResultProvider;