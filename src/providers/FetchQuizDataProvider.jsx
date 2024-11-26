import React from "react";
import { FetchQuizDataContext } from "../contexts/index.js";
import { api } from "../api/api.js";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth.js";

const FetchQuizDataProvider = ({ children }) => {
    const { auth } = useAuth();

    // Function to fetch quizzes
    const fetchQuizzes = async () => {
        // console.count("fetching all quiz data... ");
        const { data } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`);
        // console.log("Fetched quizzes:", data);
        return data;
    };

    // Function to provide query logic
    const useFetchQuizData = () => {
        return useQuery({
            queryKey: ["quizzes", auth?.user?.id],
            queryFn: fetchQuizzes,
            staleTime: 0,
        });
    };

    return (
        <FetchQuizDataContext.Provider value={{ useFetchQuizData }}>
            {children}
        </FetchQuizDataContext.Provider>
    );
};

export default FetchQuizDataProvider;