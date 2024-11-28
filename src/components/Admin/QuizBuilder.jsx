import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { QuizManageContext } from "../../contexts/index.js";

const QuizBuilder = ({ quizData }) => {
  const { quizSetId } = useParams();
  const { updateQuestion, setUpdateQuestion } = useContext(QuizManageContext);
  const { useAddQuestion, usePatchUpdateQuestion,useTogglePublishQuizSet,quizPublished } = useContext(QuizManageContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  });

  useEffect(() => {
    if (updateQuestion) {
      reset({
        question: updateQuestion.question,
        options: updateQuestion.options,
        correctAnswer: updateQuestion.correctAnswer,
      });
    }
  }, [updateQuestion, reset]);

  const formData = watch();
  // Initialize empty options array instead of using numbers
  const options = formData.options || ["", "", "", ""];
  
  const addMutation = useAddQuestion();
  const patchMutation = usePatchUpdateQuestion();
  const togglePublishQuizMutation= useTogglePublishQuizSet()

  const onSubmit = async (data) => {
    try {
      if (updateQuestion) {
        const updatedData = {
          ...data,
          correctAnswer: data.correctAnswer,
        };
        await patchMutation.mutateAsync({
          questionId: updateQuestion.id,
          updatedData: updatedData,
          quizSetId: quizSetId,
        });
      } else {
        const questionData = {
          question: data.question,
          options: data.options,
          correctAnswer: data.correctAnswer,
        };
        await addMutation.mutateAsync({
          quizSetId: quizSetId,
          question: questionData,
        });
      }

      reset({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      setUpdateQuestion(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
const handleTogglePublishedQuiz = ()=>{
  const data = {
    status:quizPublished? "draft":"published",
    title:quizData.title,
    description:quizData.description
  }
  togglePublishQuizMutation.mutate({quizSetId,data})
}
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{quizData?.title} </h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions: {quizData?.Questions?.length || 0}
      </div>
      <div className={`bg-green-100 ${quizPublished? "text-green-800":"text-yellow-600"} text-sm font-medium  py-0.5 rounded-full inline-block mb-4`}>
      <span className="text-sm font-medium mr-2">
      {quizPublished? "(Quiz is Published)" : "(Quiz is Unpublished)"}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{quizData?.description}</p>
      <div className="flex items-center mb-4">
       
        <button
          onClick={handleTogglePublishedQuiz}
         
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            quizPublished
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          } transition-colors disabled:opacity-50`}
        >
          {quizPublished? "Click to Unpublish Quiz" : "Click to Publish Quiz"}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

        <div>
          <label
            htmlFor="quizTitle"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Question Title
          </label>
          <input
            type="text"
            id="quizTitle"
            className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
            placeholder="Enter quiz title"
            {...register("question", { required: "Question is required" })}
          />
          {errors.question && (
            <span className="text-red-500 text-sm">
              {errors.question.message}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>
        <div id="optionsContainer" className="space-y-2 mt-4">
          {options.map((value, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
            >
              <input
                type="radio"
                id={`correctAnswer${index}`}
                {...register("correctAnswer", {
                  required: "Please select a correct answer",
                })}
                // Only set value if the option has content
                value={formData.options[index]}
                disabled={!formData.options[index]} // Disable radio if no option text
                className="text-primary focus:ring-0 w-4 h-4"
              />
              <label htmlFor={`correctAnswer${index}`} className="sr-only">
                Correct Answer {index + 1}
              </label>

              <input
                type="text"
                id={`option${index}`}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder={`Option ${index + 1}`}
                {...register(`options.${index}`, {
                  required: "All options must be filled",
                })}
              />
              {errors.options?.[index] && (
                <span className="text-red-500 text-sm">
                  {errors.options[index].message}
                </span>
              )}
            </div>
          ))}
        </div>

        {errors.correctAnswer && (
          <div className="text-red-500 text-sm mt-2">
            {errors.correctAnswer.message}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isSubmitting || addMutation.isPending || patchMutation.isPending
          }
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addMutation.isPending || patchMutation.isPending
            ? "Saving..."
            : updateQuestion ? "Update Quiz" : "Save Quiz"}
        </button>

        {(addMutation.isError || patchMutation.isError) && (
          <div className="text-red-500 text-sm mt-2">
            Error: {addMutation.error?.message || patchMutation.error?.message}
          </div>
        )}
        {(addMutation.isSuccess) && (
          <div className="text-green-500 text-sm mt-2">
            Question {updateQuestion ? "updated" : "added"} successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizBuilder;