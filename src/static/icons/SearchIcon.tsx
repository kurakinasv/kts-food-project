import { useTheme } from 'styled-components';

const SearchIcon = () => {
  const { colors } = useTheme();

  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7009_710)">
        <path
          d="M8.05269 12.5C11.2732 12.5 13.8839 10.1495 13.8839 7.25C13.8839 4.35051 11.2732 2 8.05269 2C4.83218 2 2.22144 4.35051 2.22144 7.25C2.22144 10.1495 4.83218 12.5 8.05269 12.5Z"
          stroke={colors.white}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1758 10.9625L15.5496 14"
          stroke={colors.white}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7009_710">
          <rect width="17.7714" height="16" rx="7" fill={colors.white} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
