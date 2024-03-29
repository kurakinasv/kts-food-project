import { FC, memo } from 'react';

import { useTheme } from 'styled-components';

import Loader, { LoaderSize } from '@components/Loader';
import { IconProps } from '@typings/common';

import { BackDice, LoaderWrapper, Wrapper } from './DiceIcon.styles';

const DiceIcon: FC<{ loading: boolean } & IconProps> = ({ loading, fillColor }) => {
  const { colors } = useTheme();

  if (loading) {
    return (
      <LoaderWrapper style={{ display: 'flex' }}>
        <Loader size={LoaderSize.s} />
        <span />
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_8479_957)">
          <path
            d="M0 5.71429C0 2.5625 2.5625 0 5.71429 0L34.2857 0C37.4375 0 40 2.5625 40 5.71429L40 34.2857C40 37.4375 37.4375 40 34.2857 40L5.71429 40C2.5625 40 0 37.4375 0 34.2857L0 5.71429ZM14.2857 11.4286C14.2857 9.84821 13.0089 8.57143 11.4286 8.57143C9.84821 8.57143 8.57143 9.84821 8.57143 11.4286C8.57143 13.0089 9.84821 14.2857 11.4286 14.2857C13.0089 14.2857 14.2857 13.0089 14.2857 11.4286ZM11.4286 31.4286C13.0089 31.4286 14.2857 30.1518 14.2857 28.5714C14.2857 26.9911 13.0089 25.7143 11.4286 25.7143C9.84821 25.7143 8.57143 26.9911 8.57143 28.5714C8.57143 30.1518 9.84821 31.4286 11.4286 31.4286ZM31.4286 11.4286C31.4286 9.84821 30.1518 8.57143 28.5714 8.57143C26.9911 8.57143 25.7143 9.84821 25.7143 11.4286C25.7143 13.0089 26.9911 14.2857 28.5714 14.2857C30.1518 14.2857 31.4286 13.0089 31.4286 11.4286ZM28.5714 31.4286C30.1518 31.4286 31.4286 30.1518 31.4286 28.5714C31.4286 26.9911 30.1518 25.7143 28.5714 25.7143C26.9911 25.7143 25.7143 26.9911 25.7143 28.5714C25.7143 30.1518 26.9911 31.4286 28.5714 31.4286Z"
            fill={fillColor || colors.secondaryRed}
          />
        </g>
        <defs>
          <clipPath id="clip0_8479_957">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <BackDice
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_8447_1052)">
          <path
            d="M0 5.71429C0 2.5625 2.5625 0 5.71429 0H34.2857C37.4375 0 40 2.5625 40 5.71429V34.2857C40 37.4375 37.4375 40 34.2857 40H5.71429C2.5625 40 0 37.4375 0 34.2857V5.71429ZM31.4286 28.5714C31.4286 26.9911 30.1518 25.7143 28.5714 25.7143C26.9911 25.7143 25.7143 26.9911 25.7143 28.5714C25.7143 30.1518 26.9911 31.4286 28.5714 31.4286C30.1518 31.4286 31.4286 30.1518 31.4286 28.5714ZM11.4286 14.2857C13.0089 14.2857 14.2857 13.0089 14.2857 11.4286C14.2857 9.84821 13.0089 8.57143 11.4286 8.57143C9.84821 8.57143 8.57143 9.84821 8.57143 11.4286C8.57143 13.0089 9.84821 14.2857 11.4286 14.2857Z"
            fill={fillColor || colors.secondaryRed}
          />
        </g>
        <defs>
          <clipPath id="clip0_8447_1052">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </BackDice>
    </Wrapper>
  );
};

export default memo(DiceIcon);
