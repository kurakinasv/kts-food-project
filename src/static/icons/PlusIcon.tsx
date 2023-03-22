import { FC } from 'react';

import { useTheme } from 'styled-components';

const PlusIcon: FC = () => {
  const { colors } = useTheme();

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="5.89282"
        y1="0.75"
        x2="5.89282"
        y2="11.25"
        stroke={colors.white}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="6.10718"
        x2="11.25"
        y2="6.10718"
        stroke={colors.white}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
