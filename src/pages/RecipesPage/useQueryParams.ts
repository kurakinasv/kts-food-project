import { useSearchParams } from 'react-router-dom';

import { useQueryStore } from '@stores/RootStore';
import { SearchParamsNames } from '@typings/api';
import { getQueryString } from '@utils/getUrl';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getParams } = useQueryStore();

  const getParam = (paramName: SearchParamsNames) => searchParams.get(paramName) || '';

  const updateParams = () => {
    const params = getParams();

    if (params) {
      setSearchParams(getQueryString(params));
    }
  };

  const decoratedRequest =
    <T extends Array<unknown>>(func: (...args: T) => Promise<void>) =>
    async (...args: T) => {
      await func(...args);
      updateParams();
    };

  return { getParam, updateParams, decoratedRequest };
};

export default useQueryParams;
