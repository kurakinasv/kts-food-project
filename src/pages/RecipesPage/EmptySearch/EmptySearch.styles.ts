import styled from 'styled-components';

import { colors, fonts, rgbColors } from '@styles/variables';

export const Wrapper = styled.div`
  height: 64vh;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 571px) {
    height: 60vh;
    height: 60dvh;
    padding: 20px;
  }
`;

export const Emote = styled.div`
  font-family: ${fonts.secondary};
  font-size: 30vmin;
  font-weight: 700;
  white-space: nowrap;
  color: rgba(${rgbColors.red}, 0.05);

  user-select: none;
  pointer-events: none;
`;

export const Text = styled.div`
  font-weight: 400;
  font-size: 40px;
  text-align: center;

  color: ${colors.textBlack};

  @media (max-width: 571px) {
    font-size: 28px;
  }
`;
