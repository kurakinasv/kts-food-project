import replacer from '@static/icons/empty-dish.svg';

export const replaceImage = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
  error.currentTarget.src = replacer;
};
