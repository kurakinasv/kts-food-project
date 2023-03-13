import { useCallback, useState } from 'react';

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openAlert = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 2500);
  }, []);

  return { openAlert, isOpen };
};
