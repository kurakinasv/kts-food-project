import { FC } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { RouterPaths } from '@config/routes';
import CollectionPage from '@pages/CollectionPage';
import DishPage from '@pages/DishPage';
import RecipesPage from '@pages/RecipesPage';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterPaths.recipes} element={<RecipesPage />} />
        <Route path={RouterPaths.recipe} element={<DishPage />} />
        <Route path={RouterPaths.collection} element={<CollectionPage />} />
        <Route path="*" element={<Navigate to={RouterPaths.recipes} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
