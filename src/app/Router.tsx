import { FC } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import DishPage from '@pages/DishPage';
import RecipesPage from '@pages/RecipesPage';
import { DishProvider } from '@stores/DishStore';
import { RecipesProvider } from '@stores/RecipesStore';

export enum RouterPaths {
  recipes = '/',
  dish = '/dish/:id',
}

const Recipes = () => (
  <RecipesProvider>
    <RecipesPage />
  </RecipesProvider>
);

const Dish = () => (
  <DishProvider>
    <DishPage />
  </DishProvider>
);

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterPaths.recipes} element={<Recipes />} />
        <Route path={RouterPaths.dish} element={<Dish />} />
        <Route path="*" element={<Navigate to={RouterPaths.recipes} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
