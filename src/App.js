import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import RewardsPage from "./pages/RewardsPage";
import ProfilePage from "./pages/ProfilePage";
import AIAssistantPage from "./pages/AIAssistantPage";
import MyLearningPage from "./pages/MyLearningPage";
import LessonPage from "./pages/LessonPage";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TaskPage from "./pages/TaskPage"; // Добавлено для TaskPage
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/my-learning" element={<MyLearningPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />

            {/* Маршруты для уроков и тестов */}
            <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/course/:courseId/lesson/:lessonId/test" element={<TestPage />} />
            <Route path="/course/:courseId/lesson/:lessonId/test/result" element={<TestResultPage />} />

            {/* Маршрут для задания */}
            <Route path="/task/:taskId" element={<TaskPage />} /> {/* Это будет новая страница для заданий */}
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
