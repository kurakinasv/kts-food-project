import { FC } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import CollectionPage from '@pages/CollectionPage';
import DishPage from '@pages/DishPage';
import RecipesPage from '@pages/RecipesPage';
import { RootStoreProvider } from '@stores/RootStore';

export enum RouterPaths {
  recipes = '/',
  recipe = '/recipe/:id',
  collection = '/collection',
}

const Router: FC = () => {
  return (
    <RootStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path={RouterPaths.recipes} element={<RecipesPage />} />
          <Route path={RouterPaths.recipe} element={<DishPage />} />
          <Route path={RouterPaths.collection} element={<CollectionPage />} />
          <Route path="*" element={<Navigate to={RouterPaths.recipes} replace />} />
        </Routes>
      </BrowserRouter>
    </RootStoreProvider>
  );
};

export default Router;
