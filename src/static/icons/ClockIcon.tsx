import { useTheme } from 'styled-components';

const ClockIcon = () => {
  const { colors } = useTheme();

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4722 0.583374L13.4167 2.52782M11.0833 11.0834L12.6389 13.4167M2.52779 0.583374L0.583344 2.52782M2.91668 11.0834L1.36112 13.4167M6.80557 3.69449V7.19449H8.75001M12.6389 7.00004C12.6389 10.1143 10.1143 12.6389 7.00001 12.6389C3.88573 12.6389 1.36112 10.1143 1.36112 7.00004C1.36112 3.88577 3.88573 1.36115 7.00001 1.36115C10.1143 1.36115 12.6389 3.88577 12.6389 7.00004Z"
        stroke={colors.purple}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
