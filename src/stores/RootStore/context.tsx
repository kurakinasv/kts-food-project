import { createContext, FC, PropsWithChildren, useContext } from 'react';

import RootStore from './RootStore';

export const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore>(rootStore);

const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = useContext(RootStoreContext);

  if (!context) {
    throw new Error('Cannot use context beyond provider');
  }

  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => useContext(RootStoreContext);

export default RootStoreProvider;
