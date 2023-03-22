import styled from 'styled-components';

export const ButtonWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 10;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
