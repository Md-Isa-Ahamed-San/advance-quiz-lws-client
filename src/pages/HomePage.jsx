import { useContext} from "react";
import Header from "../components/Common/Header/Header.jsx";
import QuizCard from "../components/Common/quizCard/QuizCard.jsx";
import { AuthContext } from "../contexts/index.js";
import WelcomeMessage from "../components/Common/WelcomeMessage.jsx";
import useQuizData from "../hooks/useQuizData.js";

const HomePage = () => {
    const {auth} = useContext(AuthContext);
    const {useFetchQuizData} = useQuizData();
    const {data, isLoading, error, isError} = useFetchQuizData();

    // console.log(data)
    if (isLoading) return <p>Loading quizzes...</p>
    if (isError) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <div className="container mx-auto py-3">
            <Header/>
            {auth?.user?.full_name && <WelcomeMessage full_name={auth.user.full_name}/>}

            <main className="bg-white p-6 rounded-md h-full">
                <section>
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>


                    {data?.data && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.data.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quizId={quiz.id}
                                    link={quiz.is_attempted ? `/result/${quiz.id}` : `/quizPage/${quiz.id}`}
                                    thumbnail={quiz.thumbnail}
                                    title={quiz.title}
                                    description={quiz.description}
                                    isAttempted={quiz.is_attempted}
                                    totalQuestions={quiz.total_questions}
                                    totalAttempts={quiz.total_attempts}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default HomePage;