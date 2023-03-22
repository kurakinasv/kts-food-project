import { useState } from 'react';

import { useUIStore } from '@stores/RootStore';

export const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const { setScrollDisabled } = useUIStore();

  const openDrawer = () => {
    setOpen(true);
    setScrollDisabled(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setScrollDisabled(false);
  };

  return { open, openDrawer, closeDrawer };
};
