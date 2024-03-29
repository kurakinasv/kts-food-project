import styled from 'styled-components';

import Button from '@components/Button';
import MultiDropdown from '@components/MultiDropdown';
import { mobileMedia } from '@styles/mixins';

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 30px;

  @media (max-width: 575px) {
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
  }
`;

export const SearchForm = styled.div`
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-shrink: 1;
  gap: 8px;
`;

export const StyledDropdown = styled(MultiDropdown)`
  max-width: 310px;
  height: fit-content;
  flex-shrink: 2;

  @media (max-width: 600px) {
    max-width: 176px;
  }
`;

export const StyledButton = styled(Button).attrs({
  padding: '0px',
  shape: 'square',
  minWidth: '46px',
  height: '46px',
})`
  ${mobileMedia({ ['min-width']: '36px' })};
`;
