import { animated } from '@react-spring/web';
import styled from 'styled-components';

import Button from '@components/Button';
import { scrollbar } from '@styles/mixins';
import { breakpoints, fonts } from '@styles/variables';

export const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

export const DrawerOverlay = styled(animated.div)`
  width: 100%;
  height: 100%;

  position: fixed;
  z-index: 499;

  background-color: ${({ theme }) => theme.colors.textGrey};
`;

export const DrawerBody = styled(animated.div)`
  width: 510px;
  height: 100%;

  position: fixed;
  z-index: 500;

  padding: 30px 48px 40px 48px;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.gradients.secondaryLightRed};

  @media (max-width: 510px) {
    width: 100%;
    padding: 25px 28px 60px 28px;
  }
`;

export const Header = styled.div`
  position: relative;
  margin-bottom: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: -2px;
  left: 0;

  & svg {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    & svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export const Title = styled.h4`
  width: 100%;

  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 24px;

  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryRed};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-grow: 1;

  margin: -5px -10px;
  padding: 5px 10px;

  overflow-x: hidden;
  overflow-y: auto;
  ${scrollbar('0.5em')};
`;

export const StyledButton = styled(Button).attrs({
  shape: 'circle',
  padding: '0',
  minWidth: '0',
  width: '30px',
  bgColor: 'none',
})``;

export const Empty = styled.div`
  height: 100%;
  opacity: 0.1;

  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    max-width: 350px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    & > * {
      max-width: 250px;
    }
  }
`;

export const Footer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;
