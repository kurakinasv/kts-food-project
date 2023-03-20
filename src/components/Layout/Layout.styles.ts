import styled from 'styled-components';

import { headerHeight } from '@config/ui';

export const PageWrapper = styled.main`
  margin: calc(40px + ${headerHeight}) auto;
  width: 75vw;
  max-width: 1280px;

  @media (max-width: 600px) {
    width: calc(100vw - 24px);
  }
`;
