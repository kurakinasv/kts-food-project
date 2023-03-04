import styled from 'styled-components';

import MultiDropdown from '@components/MultiDropdown';

export const SearchBarWrapper = styled.div`
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
