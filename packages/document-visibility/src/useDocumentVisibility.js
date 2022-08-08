import { useEffect, useState } from 'react';

const useDocumentVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  const onVisibilityChange = () => {
    setVisible(document.hidden);
    setCount((currentCount) => currentCount + 1);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};

export default useDocumentVisibility;
