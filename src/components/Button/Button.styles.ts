import styled from 'styled-components';

import Loader from '@components/Loader';
import { colors } from '@styles/variables';

export const ButtonWrapper = styled.button`
  padding: 8px 14px;

  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: white;

  background-color: ${colors.red};
  border: none;
  border-radius: 7px;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${colors.grey};
    pointer-events: none;
    user-select: none;
    cursor: default;
  }
`;

export const StyledLoader = styled(Loader)`
  margin-right: 10px;
  vertical-align: sub;

  border: 3px solid white;
  border-right: 3px solid transparent;
`;
