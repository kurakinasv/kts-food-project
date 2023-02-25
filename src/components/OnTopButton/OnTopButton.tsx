import { FC, memo, useEffect, useState } from 'react';

import Button from '@components/Button';
import { UpArrowIcon } from '@static/icons';

import { ButtonWrapper } from './OnTopButton.styles';

const OnTopButton: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleScrollPosition = () => {
    if (window.scrollY - window.innerHeight / 3 > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosition);
    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  const goOnTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <ButtonWrapper visible={visible}>
      <Button
        icon={<UpArrowIcon />}
        bgColor="transparent"
        shape="circle"
        width="45px"
        onClick={goOnTop}
      />
    </ButtonWrapper>
  );
};

export default memo(OnTopButton);
