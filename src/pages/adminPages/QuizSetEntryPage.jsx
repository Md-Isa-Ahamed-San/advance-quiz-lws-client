
import {useContext} from 'react'
import { QuizManageContext } from '../../contexts';
import { useParams } from 'react-router-dom';
import QuestionsAnswersGrid from '../../components/Admin/QuestionsAnswersGrid';
import QuizBuilder from '../../components/Admin/QuizBuilder';
const QuizSetEntryPage = () => {
    const {quizSetId} = useParams()
    // console.log("quiz set id: ",quizSetId)

    const {useFetchQuiz} = useContext(QuizManageContext)
    const {data:quizData,isLoading,error} = useFetchQuiz(quizSetId)

    // const {questions,title,description,status,stats} = quizData?.data;
    if(isLoading) return <h1>loading...</h1>
    if(error) return <h1>error...</h1>
    // console.log("each quiz data inside quiz set entry page: ",quizData)
    // console.log("quiz set entry page data:",quizData[0])
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
                    <QuizBuilder quizData={quizData[0]} />

                    {/*// <!-- Right Column -->*/}
                    <QuestionsAnswersGrid questions={quizData[0]?.Questions}/>
                </div>
            </div>
        </div>


        </div>
    );
};

export default QuizSetEntryPage;