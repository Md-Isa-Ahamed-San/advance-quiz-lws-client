import React from "react";
import { useNavigate } from "react-router-dom";

const QuizAdminCard = ({ quizSetId,status, title, description, link, variant }) => {
    const navigate = useNavigate();
    const isCreateNew = variant === "create-new";

    const handleClick = () => {
        if (isCreateNew) {

            navigate("/quizSetPage");
        } else {

            navigate(`/quizSetEntryPage/${quizSetId}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${
                isCreateNew ? "cursor-pointer" : ""
            } group hover:shadow-md transition-all`}
        >
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                {isCreateNew ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                        <path d="M12 12l4 -2.25l4 -2.25" />
                        <path d="M12 12l0 9" />
                        <path d="M12 12l-4 -2.25l-4 -2.25" />
                        <path d="M20 12l-4 2v4.75" />
                        <path d="M4 12l4 2l0 4.75" />
                        <path d="M8 5.25l4 2.25l4 -2.25" />
                    </svg>
                )}
            </div>
            <h3 className="font-semibold text-yellow-600 text-lg mb-2 group-hover:scale-105 transition-all">{status}</h3>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">{title}</h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">{description}</p>
        </div>
    );
};

export default QuizAdminCard;
