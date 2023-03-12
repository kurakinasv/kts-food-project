import styled from 'styled-components';

import cat from '@static/images/cat-sleep.png';
import { breakpoints } from '@styles/variables';

export const InputWrapper = styled.div`
  max-width: 500px;
  margin-bottom: 30px;
`;

export const ListWrapper = styled.div`
  margin: -10px;
`;

export const Placeholder = styled.div`
  margin: 0 auto;
  width: 50vw;
  height: 55vh;

  background: url(${cat}) no-repeat center/contain;
  opacity: 0.1;
  user-select: none;

  @media (max-width: ${breakpoints.mobile}) {
    width: 80vw;
    height: 45vh;
  }
`;
