
import {useContext} from 'react'
import { QuizManageContext } from '../../contexts';
import { useParams } from 'react-router-dom';
import QuestionsAnswersGrid from '../../components/Admin/QuestionsAnswersGrid';
import QuizBuilder from '../../components/Admin/QuizBuilder';
import Sidebar from '../../components/Admin/Sidebar';
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
        <Sidebar/>

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