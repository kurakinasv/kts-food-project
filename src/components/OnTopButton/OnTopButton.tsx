import { FC, memo, useCallback, useEffect, useState } from 'react';

import Button from '@components/Button';
import { UpArrowIcon } from '@static/icons';
import { debounce } from '@utils/debounce';

import { ButtonWrapper } from './OnTopButton.styles';

const OnTopButton: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleScrollPosition = useCallback(
    debounce(() => {
      if (window.scrollY - window.innerHeight / 3 > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, 250),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosition);
    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  const goOnTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

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
