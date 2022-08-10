import { useReactResponsive } from './useMediaQuery';

const MediaQuery = (props) => {
  const standartMedias = Object.entries(props);

  const medias = [];

  const isNumber = (number) => {
    return !isNaN(number) && isFinite(number);
  };

  for (const [key, value] of standartMedias) {
    let sizing = '';
    let substrMedia = key.substring(0, 3) + '-' + key.substring(3, key.length).toLowerCase();
    if (key === 'orientation') {
      medias.push(`(${key}:${value})`);
    }
    if (key.includes('Resolution')) {
      if (isNumber(value)) {
        sizing = 'dppx';
        medias.push(`(${substrMedia}:${value}${sizing} `);
      } else {
        medias.push(`(${substrMedia}:${value})`);
      }
    } else if (key.includes('Width') || key.includes('Height')) {
      if (isNumber(value)) {
        sizing = 'px';
        medias.push(`(${substrMedia}:${value}${sizing})`);
      } else {
        medias.push(`(${substrMedia}:${value}${sizing})`);
      }
    }
  }

  const response = useReactResponsive({ query: medias.join(' and ') });
  return typeof props.children === 'function' ? props.children(response) : response && props.children;
};

export default MediaQuery;
