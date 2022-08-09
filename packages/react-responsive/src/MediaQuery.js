import useReactResponsive from './useReactResponsive';

const MediaQuery = (props) => {
  const standartMedias = [
    'orientation',
    'minResolution',
    'maxResolution',
    'minWidth',
    'maxWidth',
    'minHeight',
    'maxHeight',
  ];
  let media;
  let baseMedia;
  let sizing = '';

  const isNumber = (number) => {
    return !isNaN(number) && isFinite(number);
  };

  standartMedias.forEach((el) => {
    if (typeof props[el] !== 'undefined') {
      baseMedia = el;
      if (el === 'orientation') {
        media = el;
      } else if (el === 'minResolution' || el === 'maxResolution') {
        media = el.substring(0, 3) + '-' + el.substring(3, el.length).toLowerCase();

        if (isNumber(props[el])) {
          sizing = 'dppx';
        }
      } else {
        media = el.substring(0, 3) + '-' + el.substring(3, el.length).toLowerCase();
        if (isNumber(props[el])) {
          sizing = 'px';
        }
      }
    }
  });

  const response = useReactResponsive({
    query: `(${media}:${props[baseMedia]}${sizing})`,
  });

  return typeof props.children === 'function' ? props.children(response) : response && props.children;
};
export default MediaQuery;
