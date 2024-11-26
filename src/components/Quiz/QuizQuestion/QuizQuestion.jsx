import QuizOptions from "../../Common/quizQuestions/QuizOptions.jsx";


const QuizQuestion = ({quizData}) => {
  const {options,question} = quizData;
    return (
        <div className="lg:col-span-2 bg-white">
          {
            // eslint-disable-next-line react/prop-types
            quizData.data.map((question) => (
                <div key={question.id} className="bg-white p-6 !pb-2 rounded-md">

                  <QuizOptions options={options}/>
                  <a
                      href="./result.html"
                      className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                  >
                    Next
                  </a>
                </div>
            ))
          }
        </div>
    );
};

export default QuizQuestion;