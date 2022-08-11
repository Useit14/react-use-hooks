import { useEffect, useState, useRef, useCallback } from "react";
import {createInterface} from "readline";

export const useDocumentVisibility = () => {
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const callbacks = useRef<any[]>([]);

  const handler = () => {
    setVisible(!document.hidden);
    if (!document.hidden) {
      setCount((currentCount) => currentCount + 1);
    }

    callbacks.current.forEach((callback:any) => {
      callback(!document.hidden);
    });
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handler);
    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, []);

  const onVisibilityChange = useCallback((callback:any) => {
    callbacks.current.push(callback);
  }, []);

  return {
    count,
    visible,
    onVisibilityChange
  };
};
