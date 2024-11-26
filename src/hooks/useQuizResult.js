import React, {useContext} from 'react';
import {QuizResultContext} from "../contexts/index.js";

const useQuizResult = () => {
    return useContext(QuizResultContext);
};

export default useQuizResult;