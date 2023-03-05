import styled from 'styled-components';

import { breakpoints, colors, fonts, rgbColors } from '@styles/variables';

import { AlertStatus } from './Alert';

export const AlertWrapper = styled.div<{ status: AlertStatus; active: boolean }>`
  width: clamp(400px, 100%, 30vw);
  min-height: 65px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  background-color: ${({ status }) =>
    status === 'error' ? `rgba(${rgbColors.red}, 0.1)` : `rgba(${rgbColors.green}, 0.3)`};
  backdrop-filter: blur(4px);

  text-align: center;
  color: ${({ status }) => (status === 'error' ? colors.red : colors.darkGreen)};

  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100;

  transform: ${({ active }) => (active ? 'translate3d(-50%, 50%, 0)' : 'translate3d(-50%, 0, 0)')};
  opacity: ${({ active }) => (active ? '1' : '0')};

  transition-property: transform opacity;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;

  @media (max-width: ${breakpoints.mobile}) {
    width: clamp(230px, 100%, 80vw);
  }
`;

export const StatusCode = styled.div<{ status: AlertStatus }>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;

  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 64px;
  color: ${({ status }) => (status === 'error' ? colors.red : colors.green)};

  transform: translate3d(-50%, -50%, 0);
  user-select: none;

  opacity: 0.1;
`;

export const Message = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
