import { useCallback, useEffect, useRef, useState } from 'react';

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, []);

  const openAlert = useCallback(() => {
    setIsOpen(true);
    timeout.current = setTimeout(() => setIsOpen(false), 2500);
  }, []);

  return { openAlert, isOpen };
};
