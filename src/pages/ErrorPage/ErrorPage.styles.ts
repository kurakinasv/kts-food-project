import styled from 'styled-components';

import { fonts } from '@styles/variables';

export const ErrorWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 100px 0;
`;

export const Emote = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 35vmin;
  white-space: nowrap;
  color: rgba(${({ theme }) => theme.rgbColors.red}, 0.05);

  user-select: none;
  pointer-events: none;
`;

export const ErrorText = styled.div`
  max-width: 600px;
  padding: 0 20px;
`;

export const Decription = styled.div`
  margin-bottom: 40px;

  font-weight: 400;
  font-size: 40px;
  text-align: center;

  color: ${({ theme }) => theme.colors.textBlack};
`;

export const ErrorMessage = styled.div`
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textBlack};
  opacity: 0.4;
`;
