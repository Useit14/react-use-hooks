import { useEffect, useState } from "react";

export const useMediaQuery = (properties: { query: string }) => {
  const [match, setMatch] = useState<boolean>(() => {
    return window.matchMedia(properties.query).matches;
  });
  useEffect(() => {
    let medias = window.matchMedia(properties.query);

    const onChangeMedia = () => {
      setMatch(medias.matches);
    };

    medias.addEventListener("change", onChangeMedia);
    return () => {
      medias.removeEventListener("change", onChangeMedia);
    };
  }, [properties.query]);

  return match;
};
