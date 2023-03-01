import { Option } from '@components/MultiDropdown';

export const hasCommonOptions = (strToSearch: string | null) => (opt: Option) =>
  strToSearch?.split(',').includes(opt.key);
