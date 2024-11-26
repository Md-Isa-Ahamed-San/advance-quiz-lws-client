import QuizOptions from "./QuizOptions.jsx";
import useQuiz from "../../../hooks/useQuiz.js";
import { useNavigate } from 'react-router-dom';

const QuizQuestions = ({ quizSetId }) => {
    const navigate = useNavigate();
    const {
        useFetchQuiz,
        currentQuestionNo,
        setCurrentQuestionNo,
        question,
        chooseOption,
        setChooseOptions,
        handleQuizAnswer,
        useSubmitQuiz,
    } = useQuiz();

    const { data: quizData, isLoading, error } = useFetchQuiz(quizSetId);
    const { mutate: submitQuiz, isLoading: isSubmitting } = useSubmitQuiz(quizSetId);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;

    const handleNext = () => {
        handleQuizAnswer(); // Save current answer
        setCurrentQuestionNo(currentQuestionNo + 1); // Move to next question
        setChooseOptions(null); // Reset chosen option
    };

    const handleSubmit = () => {
        handleQuizAnswer(); // Save the last answer
        submitQuiz(null, {
            onSuccess: (data) => {
                console.log('Quiz submitted successfully:', data);
                navigate(`/result/${quizSetId}`); // Redirect to results page
            },
            onError: (error) => {
                console.error('Error submitting quiz:', error);
                alert('Failed to submit quiz. Please try again.');
            },
        });
    };

    return (
        <div className="lg:col-span-2 bg-white">
            <div className="bg-white p-6 !pb-2 rounded-md">
                <div>
                    <div className="flex flex-col justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold">{question?.question}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <QuizOptions options={question?.options} />
                    </div>
                    <div className="flex justify-end mt-4">
                        {currentQuestionNo === quizData?.data?.questions?.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !chooseOption}
                                className="w-full text-center ml-auto block bg-primary text-white py-2 px-8 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!chooseOption}
                                className="w-full text-center ml-auto block bg-primary text-white py-2 px-8 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizQuestions;
