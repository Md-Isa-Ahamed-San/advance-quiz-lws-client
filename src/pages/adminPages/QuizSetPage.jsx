import {NavLink, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

import {useContext} from "react";
import {QuizManageContext} from "../../contexts/index.js";
import Sidebar from "../../components/Admin/Sidebar";
const QuizSetPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {useCreateQuizSet} = useContext(QuizManageContext)

    const mutation = useCreateQuizSet();
    const onSubmit = (data) => {
        // console.log(data);
        mutation.mutate({data})
    };

    return (
        <div className="bg-[#F5F3FF] min-h-screen flex">
            <Sidebar/>

            <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <NavLink to="/" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 19l-7-7m0 0l7-7m-7 7h18">
                                </path>
                            </svg>
                            Back to home
                        </NavLink>

                        <h2 className="text-3xl font-bold mb-6">Give your quiz title and description</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700 mb-1">Quiz
                                    title</label>
                                <input
                                    type="text"
                                    id="quiz-title"
                                    {...register("title", { required: "Quiz title is required" })}
                                    className={`w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple`}
                                    placeholder="Quiz"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700 mb-1">Description
                                    (Optional)</label>
                                <textarea
                                    id="quiz-description"
                                    {...register("description")}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                                    placeholder="Description"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Next
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizSetPage;
