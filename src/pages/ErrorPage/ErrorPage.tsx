import { FC, memo } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import { RouterPaths } from '@config/routes';
import { emotes } from '@config/ui';
import { getRandomInteger } from '@utils/getRandomInteger';

import { Emote, ErrorMessage, Decription, ErrorWrapper, ErrorText } from './ErrorPage.styles';

type ErrorPageProps = {
  message: string;
  clearErrorAction: VoidFunction;
};

const ErrorPage: FC<ErrorPageProps> = ({ message, clearErrorAction }) => {
  const navigate = useNavigate();

  const onClearError = () => {
    clearErrorAction();
    navigate(RouterPaths.recipes);
  };

  return (
    <ErrorWrapper>
      <Emote>{emotes[getRandomInteger(emotes.length)]}</Emote>
      <ErrorText>
        <Decription>Unfortunately, we couldn’t find what you were looking for</Decription>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorText>
      <Button onClick={onClearError} bgColor="transparent" padding="24px 18px">
        Go to main page
      </Button>
    </ErrorWrapper>
  );
};

export default memo(ErrorPage);
