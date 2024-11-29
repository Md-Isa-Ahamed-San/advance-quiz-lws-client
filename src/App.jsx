import "./App.css";

import RegistrationPage from "./pages/RegistrationPage.jsx";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import HomeRoutes from "./routes/HomeRoutes.jsx";
import QuizSetPage from "./pages/adminPages/QuizSetPage.jsx";
import QuizSetEntryPage from "./pages/adminPages/QuizSetEntryPage.jsx";
import AdminDashboard from "./pages/adminPages/AdminDashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<ResultPage />} path="/result/:quizSetId" />
          <Route element={<LeaderboardPage />} path="/leaderboard/:quizSetId" />
          <Route element={<QuizPage />} path="/quizPage/:quizSetId" />
        </Route>
        <Route element={<HomeRoutes />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route element={<AdminRoutes />}>
          <Route element={<QuizSetPage />} path="/quizSetPage" />
          <Route
            element={<QuizSetEntryPage />}
            path="/quizSetEntryPage/:quizSetId"
          />
          <Route element={<AdminDashboard />} path="/adminDashboard" />
        </Route>

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

export default App;
