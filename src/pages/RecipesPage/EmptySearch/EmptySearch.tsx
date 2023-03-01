import { FC, memo, useMemo } from 'react';

import Button from '@components/Button';

import { Emote, Text, Wrapper } from './EmptySearch.styles';

const EmptySearch: FC<{ func: () => Promise<void> }> = ({ func }) => {
  const clickHandler = async () => {
    await func();
  };

  const pickEmote = useMemo(() => {
    const emotes = ['(≥o≤)', '(^-^*)', '=(', '＞︿＜', 'T-T', 'ಥ_ಥ'];
    const index = Math.floor(Math.random() * emotes.length);
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
