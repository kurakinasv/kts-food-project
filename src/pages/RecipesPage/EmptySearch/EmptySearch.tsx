import { FC, memo, useMemo } from 'react';

import Button from '@components/Button';
import { emotes } from '@config/ui';
import { getRandomInteger } from '@utils/getRandomInteger';

import { Emote, Text, Wrapper } from './EmptySearch.styles';

const EmptySearch: FC<{ resetButtonAction(): Promise<void> | void }> = ({ resetButtonAction }) => {
  const clickHandler = async () => {
    await resetButtonAction();
  };

  const pickEmote = useMemo(() => {
    const index = getRandomInteger(emotes.length);
    return emotes[index];
  }, []);

  return (
    <Wrapper>
      <Text>Nothing to choose from</Text>
      <Emote>{pickEmote}</Emote>
      <Button bgColor="transparent" padding="24px 18px" onClick={clickHandler}>
        Clear filters and try again
      </Button>
    </Wrapper>
  );
};

export default memo(EmptySearch);
