import {createContext} from "react";

const AuthContext = createContext(null);
const QuizContext = createContext(null);
const FetchQuizDataContext = createContext(null);
const QuizResultContext = createContext(null);
const QuizManageContext = createContext(null)
export {AuthContext, QuizContext,FetchQuizDataContext,QuizResultContext,QuizManageContext};