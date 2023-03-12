import { FC, memo } from 'react';

import { RouterPaths } from '@config/routes';
import { emotes } from '@config/ui';
import { getRandomInteger } from '@utils/getRandomInteger';

import {
  Emote,
  ErrorMessage,
  Decription,
  ErrorWrapper,
  ErrorText,
  StyledLink,
} from './ErrorPage.styles';

type ErrorPageProps = {
  message: string;
};

const ErrorPage: FC<ErrorPageProps> = ({ message }) => {
  return (
    <ErrorWrapper>
      <Emote>{emotes[getRandomInteger(emotes.length)]}</Emote>
      <ErrorText>
        <Decription>Unfortunately, we couldn’t find what you were looking for</Decription>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorText>
      <StyledLink to={RouterPaths.recipes}>Go to main page</StyledLink>
    </ErrorWrapper>
  );
};

export default memo(ErrorPage);
