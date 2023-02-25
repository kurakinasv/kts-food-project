import { createContext, FC, PropsWithChildren, useContext } from 'react';

import DishStore from './DishStore';

const dishStore = new DishStore();

const DishContext = createContext<DishStore | null>(null);

export const DishProvider: FC<PropsWithChildren> = ({ children }) => {
  return <DishContext.Provider value={dishStore}>{children}</DishContext.Provider>;
};

const useDishStore = () => {
  const state = useContext(DishContext);

  if (!state) {
    throw new Error('Cannot use context beyond provider');
  }

  return state;
};

export default useDishStore;
