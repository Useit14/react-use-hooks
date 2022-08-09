import { useEffect, useState } from 'react';

const useReactResponsive = (properties) => {
  const [match, setMatch] = useState(window.matchMedia(properties.query).matches);

  useEffect(() => {
    let medias = window.matchMedia(properties.query);

    const onChangeMedia = () => {
      setMatch(medias.matches);
    };

    medias.addEventListener('change', onChangeMedia);
    return () => {
      medias.removeEventListener('change', onChangeMedia);
    };
  }, [properties.query]);

  return match;
};

export default useReactResponsive;
