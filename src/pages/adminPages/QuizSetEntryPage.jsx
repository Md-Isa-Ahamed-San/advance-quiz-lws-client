
import {useContext} from 'react'
import { QuizManageContext } from '../../contexts';
import { useParams } from 'react-router-dom';
import QuestionsAnswersGrid from '../../components/Admin/QuestionsAnswersGrid';
const QuizSetEntryPage = () => {
    const {quizSetId} = useParams()
    const {useFetchQuiz} = useContext(QuizManageContext)
    const {data:quizData,isLoading,error} = useFetchQuiz(quizSetId)
    console.log("each quiz data inside quiz set entry page: ",quizData)
    if(isLoading) return <h1>loading...</h1>
    if(error) return <h1>error...</h1>
    const {questions,title,description,status,stats} = quizData.data;
    
    return (
        <div className="bg-[#F5F3FF] min-h-screen flex">
        <aside className="hidden md:w-64 bg-primary p-6 md:flex flex-col">
            <div className="mb-10">
                <img src="../assets/logo-white.svg" className="h-7"/>
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
                           className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage
                            Users</a>
                    </li>

                    <li>
                        <a href="#"
                           className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage
                            Roles</a>
                    </li>

                    <li>
                        <a href="#"
                           className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Logout</a>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto flex items-center">
                <img src="./assets/avater.webp" alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover"/>
                <span className="text-white font-semibold">Saad Hasan</span>
            </div>
        </aside>

        <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
            <div>
                <nav className="text-sm mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="#" className="text-gray-600 hover:text-buzzr-purple">Home</a>
                            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 320 512">
                                <path
                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                            </svg>
                        </li>
                        <li>
                            <a href="#" className="text-gray-600 hover:text-buzzr-purple"
                               aria-current="page">Quizzes</a>
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                    {/*// <!-- Left Column -->*/}
                    <div className="">
                        <h2 className="text-3xl font-bold mb-4">{title}</h2>
                        <div
                            className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                            Total number of questions : {questions.length}
                        </div>
                        <p className="text-gray-600 mb-4">
                            {/* {description} */}
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

                            <div>
                                <label htmlFor="quizTitle" className="block text-sm font-medium text-foreground mb-1">Question
                                    Title</label>
                                <input type="text" id="quizTitle" name="quizTitle"
                                       className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                                       placeholder="Enter quiz title"/>
                            </div>

                            <p className="text-sm text-gray-600 mt-4">Add Options</p>

                            <div id="optionsContainer" className="space-y-2 mt-4">
                                <div
                                    className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                                    <input type="checkbox" id="option0" name="correctAnswer" value="0"
                                           className="text-primary focus:ring-0 w-4 h-4"/>
                                    <label htmlFor="option0" className="sr-only">Option 1</label>
                                    <input type="text" id="optionText0" name="optionText0"
                                           className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                           placeholder="Option 1"/>
                                </div>

                                {/*// <!-- Option 2 -->*/}
                                <div
                                    className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                                    <input type="checkbox" id="option2" name="correctAnswer" value="0"
                                           className="text-primary focus:ring-0 w-4 h-4"/>
                                    <label htmlFor="option0" className="sr-only">Option 2</label>
                                    <input type="text" id="optionText2" name="optionText2"
                                           className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                           placeholder="Option 2"/>
                                </div>

                                {/*// <!-- Option 2 -->*/}
                                <div
                                    className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                                    <input type="checkbox" id="option3" name="correctAnswer" value="0"
                                           className="text-primary focus:ring-0 w-4 h-4"/>
                                    <label htmlFor="option3" className="sr-only">Option 3</label>
                                    <input type="text" id="optionText3" name="optionText3"
                                           className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                           placeholder="Option 3"/>
                                </div>

                                {/*// <!-- Option 4 -->*/}
                                <div
                                    className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                                    <input type="checkbox" id="option4" name="correctAnswer" value="0"
                                           className="text-primary focus:ring-0 w-4 h-4"/>
                                    <label htmlFor="option4" className="sr-only">Option 4</label>
                                    <input type="text" id="optionText4" name="optionText4"
                                           className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                           placeholder="Option 4"/>
                                </div>
                            </div>
                            <button
                                className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
                                Save Quiz
                            </button>
                        </div>


                    </div>

                    {/*// <!-- Right Column -->*/}
                    <QuestionsAnswersGrid questions={questions}/>
                </div>
            </div>
        </div>


        </div>
    );
};

export default QuizSetEntryPage;