import React, { FC, ReactNode } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface IMediaQueryProps {
  orientation: string;
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: ReactNode | ((mathes: boolean) => ReactNode);
}

const MediaQuery: FC<IMediaQueryProps> = (props) => {
  const standartMedias = Object.entries(props);

  const medias = [];

  for (const [key, value] of standartMedias) {
    let sizing = '';
    let substrMedia = key.substring(0, 3) + '-' + key.substring(3, key.length).toLowerCase();
    if (key === 'orientation') {
      medias.push(`(${key}:${value})`);
    }
    if (key.includes('Resolution')) {
      if (typeof value === 'number') {
        sizing = 'dppx';
        medias.push(`(${substrMedia}:${value}${sizing} `);
      } else {
        medias.push(`(${substrMedia}:${value})`);
      }
    } else if (key.includes('Width') || key.includes('Height')) {
      if (typeof value === 'number') {
        sizing = 'px';
        medias.push(`(${substrMedia}:${value}${sizing})`);
      } else {
        medias.push(`(${substrMedia}:${value}${sizing})`);
      }
    }
  }

  const response = useMediaQuery({ query: medias.join(' and ') });
  return typeof props.children === 'function' ? (
    <React.Fragment>{props.children(response)}</React.Fragment>
  ) : response === true ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : null;
};

export default MediaQuery;
