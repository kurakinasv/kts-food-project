import { useCallback, useEffect, useRef } from 'react';

type UseComponentVisisble = {
  visible: boolean;
  setNotVisible: VoidFunction;
  ignoredRef?: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>;
};

const useComponentVisible = ({ visible, setNotVisible, ignoredRef }: UseComponentVisisble) => {
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
      const clickedOutside = visible && ref.current && !ref.current.contains(e.target as Node);
      const clickedOnIgnoredElement =
        ignoredRef?.current && ignoredRef.current.contains(e.target as Node);

      if (clickedOnIgnoredElement) {
        return;
      }
      if (clickedOutside) {
        setNotVisible();
      }
    },
    [setNotVisible, visible, ref.current, ignoredRef?.current]
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
