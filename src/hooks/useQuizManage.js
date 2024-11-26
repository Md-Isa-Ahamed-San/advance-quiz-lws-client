import { useContext } from 'react';
import { QuizManageContext } from '../contexts';

const useQuizManage = () => {
    return useContext(QuizManageContext)
};

export default useQuizManage;