import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { smallHeaderHeight } from '@config/ui';
import { fonts } from '@styles/variables';

const smallHeaderStyles = css`
  height: ${smallHeaderHeight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);

  // workaround to use backdrop-filter on header ancestors
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(${({ theme }) => theme.rgbColors.pink}, 0.8);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }
`;

export const HeaderWrapper = styled.header<{ small: boolean }>`
  width: 100%;
  height: 90px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;

  display: flex;
  align-items: center;

  background-color: rgba(${({ theme }) => theme.rgbColors.pink}, 0.4);

  transition: height 0.5s ease-in-out;

  ${({ small }) => small && smallHeaderStyles};

  @media (max-width: 600px) {
    ${smallHeaderStyles};
  }
`;

export const HeaderContent = styled.div`
  width: 90vw;
  margin: 0 auto;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img<{ small: boolean }>`
  display: inline-block;
  max-width: 78px;
  height: 44px;

  user-select: none;
  cursor: pointer;
  transition: height 0.5s ease-in-out;

  ${({ small }) =>
    small &&
    css`
      height: 34px;
    `}

  @media (max-width: 600px) {
    height: 34px;
  }
`;

export const Burger = styled.button`
  display: none;
  height: 30px;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const BurgerContent = styled.div<{ active: boolean }>`
  position: relative;
  transition: height 0.3s ease-in-out;

  &,
  &::before,
  &::after {
    width: 40px;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.red};
    border-radius: 50px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
  }

  &::before {
    bottom: 12px;
  }

  &::after {
    top: 12px;
  }

  &::before,
  &::after {
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 600px) {
    ${({ active }) =>
      active &&
      css`
        height: 0px;

        &::before {
          left: 15px;
          transform: rotate(45deg) translate3d(1px, 20px, 0);
        }
        &::after {
          left: 15px;
          transform: rotate(-45deg) translate3d(1px, -20px, 0);
        }
      `}
  }
`;

export const Navbar = styled.nav<{ open: boolean }>`
  height: 0px;

  display: flex;
  align-items: center;
  gap: 50px;

  transition: height 0.3s ease-in-out;

  @media (max-width: 600px) {
    position: fixed;
    top: ${smallHeaderHeight};
    left: 0;
    width: 100%;

    flex-direction: column;
    justify-content: flex-start;
    gap: 0;

    background-color: rgba(${({ theme }) => theme.rgbColors.lightPink}, 0.9);
    box-shadow: 0px 12px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);

    & * {
      opacity: 0;
      user-select: none;
      pointer-events: none;
      z-index: -1;
    }

    ${({ open }) =>
      open &&
      css`
        height: 300px;

        & * {
          opacity: 1;
          user-select: auto;
          pointer-events: all;
          z-index: 100;
        }
      `}
  }
`;

const navItemText = css`
  font-family: ${fonts.secondary};
  font-weight: 500;
  font-size: 17px;

  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondaryRed};
  transition: opacity 0.3s ease-in-out;
`;

const navItem = css`
  position: relative;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px;
    text-align: center;

    // line under link name
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      width: 80%;
      height: 1px;

      background-color: rgba(${({ theme }) => theme.rgbColors.red}, 0.1);
    }
  }
`;

export const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})<{ active: boolean }>`
  ${navItem};
  ${navItemText};

  &:hover {
    opacity: 0.5;
  }

  ${({ active }) =>
    active &&
    css`
      cursor: default;
      pointer-events: none;

      &:hover {
        opacity: 1;
      }

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;

        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);

        background-color: ${({ theme }) => theme.colors.red};
      }
    `}
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
  ${navItem};

  &,
  & > span {
    ${navItemText};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  // dice navlink
  & > span:last-of-type {
    display: none;
  }
  // dice icon
  & > span:first-of-type {
    display: block;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      user-select: none;
      pointer-events: none;
    `}

  @media (max-width: 600px) {
    & > span:last-of-type {
      display: inline-block;
    }
    & > span:first-of-type {
      display: none;
    }
  }
`;
