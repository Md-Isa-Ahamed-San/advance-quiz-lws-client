import {NavLink, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import avater from "../../assets/avater.webp"
import {useContext} from "react";
import {QuizManageContext} from "../../contexts/index.js";
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
            <aside className="hidden md:w-64 bg-primary p-6 md:flex flex-col">
                <div className="mb-10">
                    <img src="../assets/logo-white.svg" className="h-7" alt="Logo" />
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                               className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold">Quizzes</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Settings</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage Users</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage Roles</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Logout</a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto flex items-center">
                    <img src={avater} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <span className="text-white font-semibold">Saad Hasan</span>
                </div>
            </aside>

            <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
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
            </main>
        </div>
    );
};

export default QuizSetPage;
