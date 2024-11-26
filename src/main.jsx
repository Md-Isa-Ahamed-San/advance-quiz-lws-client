import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuizProvider from "./providers/QuizProvider.jsx";
import FetchQuizDataProvider from "./providers/FetchQuizDataProvider.jsx";
import QuizResultProvider from "./providers/QuizResultProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <Router>

              <QueryClientProvider client={queryClient}>
                      <FetchQuizDataProvider>
                  <QuizProvider>
                      <QuizResultProvider>
                    <App />
                      </QuizResultProvider>
                  </QuizProvider>
                      </FetchQuizDataProvider>
              </QueryClientProvider>
          </Router>
      </AuthProvider>
  </StrictMode>,
)