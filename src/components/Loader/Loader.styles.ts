import styled, { keyframes } from 'styled-components';

import { square } from '@styles/mixins';

import { LoaderSize } from './Loader';

const spinning = keyframes`
    from {
      transform: rotate(35deg);
    }
  
    to {
      transform: rotate(395deg);
    }
`;

const getLoaderSize = (size: LoaderSize) => {
  switch (size) {
    case LoaderSize.s:
      return '20px';
    case LoaderSize.m:
      return '40px';
    case LoaderSize.l:
      return '60px';
  }
};

export const LoaderWrapper = styled.div<{ size: LoaderSize }>`
  display: inline-block;

  border: 3px solid ${({ theme }) => theme.colors.red};
  border-right: 3px solid transparent;
  border-radius: 50%;

  transform: rotate(35deg);

  animation: 1.5s linear infinite ${spinning};

  ${({ size }) => square(getLoaderSize(size))}
`;
