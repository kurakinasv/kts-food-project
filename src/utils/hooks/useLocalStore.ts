import { useEffect, useRef } from 'react';

import { autorun } from 'mobx';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const storeContainer = useRef<T | null>(null);

  if (!storeContainer.current) {
    storeContainer.current = creator();
  }

  useEffect(() => {
    return () => {
      autorun(() => {
        storeContainer.current?.destroy();
      });
    };
  }, []);

  return storeContainer.current;
};
