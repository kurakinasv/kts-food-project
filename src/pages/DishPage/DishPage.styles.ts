import styled from 'styled-components';

import Button from '@components/Button';
import { colors, fonts, gradients, rgbColors, shadows } from '@styles/variables';

const mobileBreakpoint = '769px';
const desktopBreakpoint = '1021px';

const desctopPaddingTop = '80px';

export const PageWrapper = styled.div`
  height: 100vh;
  position: relative;

  @media (min-width: ${mobileBreakpoint}) {
    height: auto;

    display: flex;
    gap: 50px;
  }

  @media (min-width: ${desktopBreakpoint}) {
    gap: 100px;
  }
`;

export const FixedButton = styled(Button)`
  position: fixed;
  top: 38px;
  left: 19px;

  z-index: 3;

  @media (min-width: ${mobileBreakpoint}) {
    top: ${desctopPaddingTop};
    left: 2%;
  }
`;

export const PhotoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  @media (min-width: ${mobileBreakpoint}) {
    position: sticky;
    width: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 40%;

    background: ${gradients.lightRed};
  }
`;

export const DishPhoto = styled.img`
  width: 100%;

  @media (min-width: ${mobileBreakpoint}) {
    width: 90%;
    border-radius: 16px;
    margin-bottom: 40px;

    box-shadow: ${shadows.black};
  }

  @media (max-width: 550px) {
    width: auto;
    object-fit: contain;
  }
`;

export const Nutrition = styled.div`
  display: none;

  @media (min-width: ${mobileBreakpoint}) {
    width: 100%;
    padding: 0 20px;

    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const Nutrient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  font-family: ${fonts.secondary};
  color: ${colors.red};
  opacity: 0.3;

  user-select: none;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const NutrientPercent = styled.span`
  font-family: inherit;
  font-weight: 600;
  font-size: 66px;

  @media (max-width: ${desktopBreakpoint}) {
    font-size: 58px;
  }
`;

export const NutrientName = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

export const RecipeInfo = styled.div`
  position: relative;
  top: 40%;
  z-index: 2;

  min-height: 60vh;
  padding: 68px 16px 34px 33px;

  border-radius: 10px 10px 0 0;
  background-color: white;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);

    width: 58px;
    height: 5px;

    background-color: #ffcbcb;
    border-radius: 12px;
  }

  @media (min-width: ${mobileBreakpoint}) {
    min-height: auto;
    padding: ${desctopPaddingTop} 5% 60px 0;

    position: static;
    z-index: 1;

    flex-basis: 60%;
    border-radius: 0;

    &::after {
      display: none;
    }
  }
`;

export const RecipeName = styled.h2`
  max-width: 600px;
  margin-bottom: 16px;

  font-weight: 500;
  font-size: 27px;
  line-height: 35px;

  color: #09051c;

  @media (min-width: ${mobileBreakpoint}) {
    margin-bottom: 26px;

    font-size: 40px;
    line-height: 46px;
  }
`;

export const RecipeStats = styled.div`
  margin-bottom: 25px;
  display: flex;
  gap: 30px;

  @media (min-width: ${mobileBreakpoint}) {
    margin-bottom: 35px;
  }
`;

export const StatsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StatsName = styled.div`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;

  color: rgba(${rgbColors.textGrey}, 0.3);

  @media (min-width: ${mobileBreakpoint}) {
    font-size: 18px;
  }
`;

export const RecipeDescription = styled.div`
  max-width: 750px;

  font-weight: 500;
  font-size: 12px;
  line-height: 22px;

  color: ${colors.black};

  @media (min-width: ${mobileBreakpoint}) {
    font-size: 16px;
  }
`;
