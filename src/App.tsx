import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Login from './components/Login';
import Editor from './components/Editor';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    const isOnboardingNotCompleted = !localStorage.getItem('college_essay_architect_onboarding_completed_v2');
    return <div className={`min-h-screen ${isOnboardingNotCompleted ? 'bg-white' : 'bg-[#070a13]'}`} />;
  }

  return user ? <>{children}</> : null;
}

export default function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    const isOnboardingNotCompleted = !localStorage.getItem('college_essay_architect_onboarding_completed_v2');
    return <div className={`min-h-screen ${isOnboardingNotCompleted ? 'bg-white' : 'bg-[#070a13]'}`} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Editor />} />
      <Route path="/dashboard" element={<Editor />} />
      <Route path="/essay/:id/:tab" element={<Editor />} />
    </Routes>
  );
}
