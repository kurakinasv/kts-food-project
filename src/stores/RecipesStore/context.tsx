import { createContext, FC, PropsWithChildren, useContext } from 'react';

import RecipesStore from './RecipesStore';

const recipesStore = new RecipesStore();

const RecipesContext = createContext<RecipesStore | null>(null);

export const RecipesProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RecipesContext.Provider value={recipesStore}>{children}</RecipesContext.Provider>;
};

const useRecipes = () => {
  const state = useContext(RecipesContext);

  if (!state) {
    throw new Error('Cannot use context beyond provider');
  }

  return state;
};

export default useRecipes;
