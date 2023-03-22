export const formPlural = (word: string, amount: number) => {
  const endings = ['s', 'ss', 'sh', 'ch', 'x', 'z'];

  if (amount === 1) {
    return word;
  }

  const ending = endings.findIndex((end) => word.endsWith(end)) === -1 ? 's' : 'es';
  return word + ending;
};
