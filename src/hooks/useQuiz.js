import {useContext} from 'react';
import {QuizContext} from "../contexts/index.js";

const useQuiz = () => {
    return useContext(QuizContext)
};

export default useQuiz;