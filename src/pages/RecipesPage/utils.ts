import { Option } from '@components/MultiDropdown';
import { mealTypesOptions } from '@typings/api';

const hasCommonOptions = (strToSearch: string | null) => (opt: Option) =>
  strToSearch?.split(',').includes(opt.key);

export const getInitialSelectedOptions = (typeParam: string) =>
  mealTypesOptions.filter(hasCommonOptions(typeParam));
