import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';

// Layouts
import { MainLayout } from './components/layout/MainLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { CareerAdvisorPage } from './pages/CareerAdvisorPage';
import { ResumeImproverPage } from './pages/ResumeImproverPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Marketing View */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* SaaS Dashboard & Feature Views */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
            <Route path="/advisor" element={<CareerAdvisorPage />} />
            <Route path="/improver" element={<ResumeImproverPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}
