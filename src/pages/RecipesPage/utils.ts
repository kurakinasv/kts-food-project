import { mealTypesOptions } from '@stores/models/mealtypes';
import { Option } from '@typings/common';

const hasCommonOptions = (strToSearch: string | null) => (opt: Option) =>
  strToSearch?.split(',').includes(opt.key);

export const getInitialSelectedOptions = (typeParam: string) =>
  mealTypesOptions.filter(hasCommonOptions(typeParam));
