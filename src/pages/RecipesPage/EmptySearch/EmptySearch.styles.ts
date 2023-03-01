import styled from 'styled-components';

import { colors, fonts, rgbColors } from '@styles/variables';

export const Wrapper = styled.div`
  height: 80vh;
  padding: 60px 30px 20px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 571px) {
    height: 64vh;
    height: 64dvh;
    padding: 30px 30px 20px 30px;
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
