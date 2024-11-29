import React from 'react';
import { useAuth } from "../../../hooks/useAuth.js";
import useQuizResult from "../../../hooks/useQuizResult.js";
import useQuiz from "../../../hooks/useQuiz.js";

const QuizAnswers = ({ quizSetId }) => {
    const { auth } = useAuth();
    const { useFetchQuizResult, processQuizAnswers } = useQuizResult();
    const { useFetchQuiz } = useQuiz();

    // Fetch data
    const { data: quizResultData, isLoading, isError, error } = useFetchQuizResult(quizSetId);
    const { data: quizData } = useFetchQuiz(quizSetId);

    if (isLoading) return <p>Loading quiz result...</p>;
    if (isError) return <p className="text-red-500">Error fetching quiz result: {error?.message || "Unknown error"}</p>;

    const quizList = quizData?.data?.questions || [];
    const userQuizResult = quizResultData?.data?.attempts?.find((item) => item?.user?.id === auth?.user?.id);

    if (!quizList.length || !userQuizResult) {
        return <p>No quiz data or results available.</p>;
    }

    // Process quiz answers using the provider's utility function
    const processedAnswers = processQuizAnswers(quizList, userQuizResult);

    return (
        <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
            <div className="h-[calc(100vh-50px)] overflow-y-scroll min-w-96 mx-auto">
                <div className="px-4">
                    {processedAnswers.map((quiz, index) => (
                        <div key={quiz.id} className="rounded-lg overflow-hidden shadow-sm mb-4">
                            <div className="bg-white p-6 !pb-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">
                                        {index + 1}. {quiz.question}
                                    </h3>
                                </div>
                                <div className="space-y-2 ">
                                    {quiz.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className={`flex items-center space-x-3 p-2 rounded-md ${
                                                option === quiz.userAnswer
                                                    ? quiz.isCorrect
                                                        ? "bg-green-100 border-green-500"
                                                        : "bg-red-500 border-red-500"
                                                    : option === quiz.correctAnswer
                                                        ? "bg-green-100 border-green-500"
                                                        : "bg-gray-100"
                                            } border`}
                                        >
                                            <input
                                                type="radio"
                                                name={`answer${index}`}
                                                className="form-radio text-buzzr-purple"
                                                checked={option === quiz.userAnswer}
                                                readOnly
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizAnswers;