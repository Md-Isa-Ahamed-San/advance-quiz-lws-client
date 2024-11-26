
import useQuizManage from "../../hooks/useQuizManage.js";
import QuizAdminCard from "../Common/quizCard/QuizAdminCard.jsx";


const QuizGrid = () => {
    const quizzes = [
        { id: 1, title: "Create a new quiz", description: "Build from the ground up", link: "./quiz_set_page.html", variant: "create-new" },
        { id: 2, title: "JavaScript Basics Quiz", description: "Test knowledge of core JavaScript", link: "#", variant: "existing-quiz" },
        { id: 3, title: "React Hooks Quiz", description: "Test knowledge of core JavaScript", link: "#", variant: "existing-quiz" },
        { id: 4, title: "Backend vs. Frontend Quiz", description: "Test knowledge of core JavaScript", link: "#", variant: "existing-quiz" },
    ];
    const {useFetchQuizSets}=useQuizManage()
    const {data:quizData,isLoading,error} = useFetchQuizSets();
    console.log("quiz data inside quizgrid :",quizData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching quizzes</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizData?.data?.map(quiz => (
                <QuizAdminCard
                    key={quiz.id}
                    quizSetId={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                    link={quiz.link}
                    variant="existing-quiz"
                />
            ))}
        </div>
    );
};

export default QuizGrid;
