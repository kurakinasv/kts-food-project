import styled from 'styled-components';

import { breakpoints } from '@styles/variables';

export const Wrapper = styled.div`
  font-size: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const SimilarList = styled.div`
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 1270px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 545px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
