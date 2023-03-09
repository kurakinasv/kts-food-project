import { useCallback, useEffect, useRef } from 'react';

type UseComponentVisisble = {
  visible: boolean;
  setNotVisible: VoidFunction;
};

const useComponentVisible = ({ visible, setNotVisible }: UseComponentVisisble) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNotVisible();
      }
    },
    [setNotVisible]
  );

  const handleMenu = useCallback(
    (e: Event) => {
      if (visible && ref.current && !ref.current.contains(e.target as Node)) {
        setNotVisible();
      }
    },
    [setNotVisible, visible, ref.current]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleMenu);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleMenu);
    };
  }, [handleEscape, handleMenu]);

  return { ref };
};

export default useComponentVisible;
