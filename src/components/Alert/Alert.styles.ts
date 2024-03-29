import { animated } from '@react-spring/web';
import styled from 'styled-components';

import { mobileMedia } from '@styles/mixins';
import { fonts } from '@styles/variables';

import { AlertStatus } from './types';

export const AlertWrapper = styled(animated.div)<{ status: AlertStatus }>`
  width: clamp(400px, 100%, 30vw);
  min-height: 65px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  background-color: ${({ status, theme }) =>
    status === 'error'
      ? `rgba(${theme.rgbColors.red}, 0.1)`
      : `rgba(${theme.rgbColors.green}, 0.3)`};
  backdrop-filter: blur(4px);

  text-align: center;
  color: ${({ status, theme }) => (status === 'error' ? theme.colors.red : theme.colors.darkGreen)};

  position: fixed;
  top: 3%;
  left: 50%;
  z-index: 300;

  ${mobileMedia({
    width: 'clamp(230px, 100%, 80vw)',
  })}
`;

export const StatusCode = styled.div<{ status: AlertStatus }>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;

  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 64px;
  color: ${({ status, theme }) => (status === 'error' ? theme.colors.red : theme.colors.green)};

  transform: translate3d(-50%, -50%, 0);
  user-select: none;

  opacity: 0.1;
`;

export const Message = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
