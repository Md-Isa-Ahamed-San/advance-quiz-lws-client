import React from "react";
import useQuizManage from "../../hooks/useQuizManage.js";
import QuizAdminCard from "../Common/quizCard/QuizAdminCard.jsx";

const QuizGrid = () => {
    const { useFetchQuizSets } = useQuizManage();
    const { data: quizData, isLoading, error } = useFetchQuizSets();
console.log(quizData)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching quizzes</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuizAdminCard
                quizSetId={null}
                title={"Create a new quiz"}
                description={"Build from the ground up"}
                variant="create-new"
            />

            {quizData?.map((quiz) => (
                <QuizAdminCard
                    key={quiz.id}
                    quizSetId={quiz.id}
                    status={quiz.status}
                    title={quiz.title}
                    description={quiz.description}
                    variant="existing-quiz"
                />
            ))}
        </div>
    );
};

export default QuizGrid;
