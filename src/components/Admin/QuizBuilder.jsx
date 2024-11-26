import React, { useState } from "react";

const QuizBuilder = ({ quizData }) => {
  const { title, description, questions } = quizData;

  // Single state object for the form
  const [formState, setFormState] = useState({
    question: "",
    options: ["", "", "", ""], // Default empty options
    correctAnswer: "", // No answer selected by default
  });

  // Handle input change for question
  const handleQuestionChange = (e) => {
    setFormState({
      ...formState,
      question: e.target.value,
    });
  };

  // Handle option change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formState.options];
    updatedOptions[index] = value;
    setFormState({
      ...formState,
      options: updatedOptions,
    });
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (value) => {
    setFormState({
      ...formState,
      correctAnswer: value,
    });
  };

  // Submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Data Submitted:", formState);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions: {questions.length}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

        {/* Question Title */}
        <div>
          <label htmlFor="quizTitle" className="block text-sm font-medium text-foreground mb-1">
            Question Title
          </label>
          <input
            type="text"
            id="quizTitle"
            className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
            placeholder="Enter quiz title"
            value={formState.question}
            onChange={handleQuestionChange}
          />
        </div>

        {/* Options */}
        <p className="text-sm text-gray-600 mt-4">Add Options</p>
        <div id="optionsContainer" className="space-y-2 mt-4">
          {formState.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
            >
              {/* Correct Answer Radio */}
              <input
                type="radio"
                id={`correctAnswer${index}`}
                value={option}
                checked={formState.correctAnswer.length>0 && formState.correctAnswer === option}
                onChange={() => handleCorrectAnswerChange(option)}
                className="text-primary focus:ring-0 w-4 h-4"
              />
              <label htmlFor={`correctAnswer${index}`} className="sr-only">
                Correct Answer {index + 1}
              </label>

              {/* Option Input */}
              <input
                type="text"
                id={`option${index}`}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder={`Option ${index + 1}`}
                value={formState.options[index]}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizBuilder;
