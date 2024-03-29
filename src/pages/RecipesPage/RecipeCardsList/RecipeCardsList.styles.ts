import styled from 'styled-components';

export const CardsWrapper = styled.div`
  --columns-count: 5;

  // to not hide cards' side shadows in scroll container (including skeletons)
  margin: -10px -10px 0 -10px;
  padding: 10px 10px 24px 10px;

  display: grid;
  grid-template-columns: repeat(var(--columns-count), 1fr);
  justify-items: center;
  column-gap: 17px;
  row-gap: 24px;

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
