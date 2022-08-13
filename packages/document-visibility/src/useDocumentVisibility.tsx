import { useEffect, useState, useRef, useCallback } from 'react';

export const useDocumentVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const callbacks = useRef<object[]>([]);

  const handler = () => {
    setVisible(!document.hidden);
    if (!document.hidden) {
      setCount((currentCount) => currentCount + 1);
    }

    callbacks.current.forEach((callback: any) => {
      callback(!document.hidden);
    });
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handler);
    return () => {
      document.removeEventListener('visibilitychange', handler);
    };
  }, []);

  const onVisibilityChange = useCallback((callback: () => void) => {
    callbacks.current.push(callback);
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};
