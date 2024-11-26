import React, {useContext} from 'react';
import {FetchQuizDataContext} from "../contexts/index.js";

const useQuizData = () => {
    return useContext(FetchQuizDataContext)
};

export default useQuizData;