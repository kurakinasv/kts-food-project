import { useTheme } from 'styled-components';

const ArrowIcon = () => {
  const { colors } = useTheme();

  return (
    <svg width="10" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.81794 5.00001C5.06055 6.7574 5.06054 9.6067 6.81793 11.3641L9.09103 13.6372C9.59304 14.1392 9.59303 14.9532 9.09101 15.4552C8.58901 15.9572 7.7751 15.9572 7.2731 15.4551L4.09102 12.2731C1.83161 10.0137 1.83161 6.35044 4.09102 4.09102L7.27308 0.908975C7.77509 0.406962 8.58901 0.406962 9.09102 0.908975C9.59304 1.41099 9.59304 2.22491 9.09103 2.72692L6.81794 5.00001Z"
        fill={colors.red}
      />
    </svg>
  );
};

export default ArrowIcon;
