import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import RevisionFlashcards from './pages/revision-flashcards';
import AdminContentManagement from './pages/admin-content-management';
import DailyEcoChallenges from './pages/daily-eco-challenges';
import StudentDashboard from './pages/student-dashboard';
import QuizSystem from './pages/quiz-system';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminContentManagement />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/revision-flashcards" element={<RevisionFlashcards />} />
        <Route path="/admin-content-management" element={<AdminContentManagement />} />
        <Route path="/daily-eco-challenges" element={<DailyEcoChallenges />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/quiz-system" element={<QuizSystem />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
