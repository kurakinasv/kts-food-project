import React from 'react';

import { LoaderWrapper } from './Loader.styles';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading = true, size = LoaderSize.m, className = '' }) => {
  if (loading === false) {
    return null;
  }

  return <LoaderWrapper size={size} className={className} />;
};

export default Loader;
