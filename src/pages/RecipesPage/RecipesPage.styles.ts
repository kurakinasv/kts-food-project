import styled from 'styled-components';

import MultiDropdown from '@components/MultiDropdown';
import pattern from '@static/images/bg-pattern.png';

export const PageWrapper = styled.div`
  margin: 24px auto;
  width: 68vw;

  @media (max-width: 600px) {
    width: calc(100vw - 24px);
  }
`;

export const BackgroundImage = styled.div`
  width: 610px;
  min-height: 400px;

  position: fixed;
  top: 0;
  right: 0;

  background-image: url(${pattern});
  transform: translate3d(38%, -98%, 0) rotate(290deg);
  pointer-events: none;

  @media (max-width: 768px) {
    transform: translate3d(44%, -108%, 0) rotate(290deg);
  }
`;

export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 20px;
  padding: 0 8px;

  @media (max-width: 575px) {
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
  }
`;

export const SearchForm = styled.div`
  width: 100%;
  max-width: 340px;

  display: flex;
  flex-shrink: 1;
  gap: 8px;
`;

export const StyledDropdown = styled(MultiDropdown)`
  max-width: 250px;
  flex-shrink: 2;

  @media (max-width: 600px) {
    max-width: 176px;
  }
`;

export const CardsWrapper = styled.div`
  --columns-count: 5;

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
