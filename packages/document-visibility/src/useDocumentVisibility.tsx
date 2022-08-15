import { useEffect, useState, useRef, useCallback } from 'react';

export const useDocumentVisibility = () => {
  interface ICallback {
    (arg0: boolean): void;
  }

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const callbacks = useRef<ICallback[]>([]);

  const handler = () => {
    setVisible(!document.hidden);
    if (!document.hidden) {
      setCount((currentCount) => currentCount + 1);
    }

    callbacks.current.forEach((callback) => {
      callback(!document.hidden);
    });
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handler);
    return () => {
      document.removeEventListener('visibilitychange', handler);
    };
  }, []);

  const onVisibilityChange = useCallback((callback: ICallback) => {
    callbacks.current.push(callback);
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};
