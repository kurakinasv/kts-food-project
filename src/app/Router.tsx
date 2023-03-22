import { FC } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import ErrorBoundary from '@app/ErrorBoundary';
import { RouterPaths } from '@config/routes';
import CollectionPage from '@pages/CollectionPage';
import RecipePage from '@pages/RecipePage';
import RecipesPage from '@pages/RecipesPage';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path={RouterPaths.recipes} element={<RecipesPage />} />
          <Route path={RouterPaths.recipe} element={<RecipePage />} />
          <Route path={RouterPaths.collection} element={<CollectionPage />} />
          <Route path="*" element={<Navigate to={RouterPaths.recipes} replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Router;
