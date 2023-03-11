import styled from 'styled-components';

export const PageWrapper = styled.main`
  margin: 40px auto;
  width: 76vw;

  @media (max-width: 600px) {
    width: calc(100vw - 24px);
  }
`;

export const CardsWrapper = styled.div`
  --columns-count: 5;

  padding: 10px;

  display: grid;
  grid-template-columns: repeat(var(--columns-count), 1fr);
  justify-items: center;
  column-gap: 17px;
  row-gap: 35px;

  @media (max-width: 1130px) {
    --columns-count: 4;
  }

  @media (max-width: 960px) {
    --columns-count: 3;
  }

  @media (max-width: 500px) {
    --columns-count: 2;
  }
`;

export const LoaderWrapper = styled.div`
  padding: 20px 0 10px 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
