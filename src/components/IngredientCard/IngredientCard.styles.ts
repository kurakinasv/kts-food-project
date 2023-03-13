import styled from 'styled-components';

import { textOverflow } from '@styles/mixins';
import { colors, shadows } from '@styles/variables';

export const CardWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 7px 25px 7px 15px;

  display: flex;
  align-items: center;

  background-color: white;
  border-radius: 7px;
  box-shadow: ${shadows.black};
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 60px;
  margin-right: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  user-select: none;
`;

export const CardInfo = styled.div`
  flex-grow: 1;
`;

export const Name = styled.div`
  margin-bottom: 4px;

  font-weight: 500;
  font-size: 18px;
  color: ${colors.textBlack};

  ${textOverflow()};
`;

export const Measures = styled.div`
  font-weight: 400;
  font-size: 12px;

  color: ${colors.textGrey};
  opacity: 0.5;

  ${textOverflow()};
`;
