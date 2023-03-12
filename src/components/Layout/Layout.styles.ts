import styled from 'styled-components';

export const PageWrapper = styled.main`
  margin: 40px auto;
  width: 76vw;

  @media (max-width: 600px) {
    width: calc(100vw - 24px);
  }
`;
