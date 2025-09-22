import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import BooksPage from '../pages/BooksPage';
import NotesPage from '../pages/NotesPage';
import AnalysisPage from '../pages/AnalysisPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<BooksPage />} />
      <Route path={ROUTES.BOOKS} element={<BooksPage />} />
      <Route path={ROUTES.NOTES} element={<NotesPage />} />
      <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
    </Routes>
  );
};