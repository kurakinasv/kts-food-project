import { useCallback, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useQueryStore } from '@stores/RootStore';
import { SearchParamsNames } from '@typings/api';
import { getQueryString } from '@utils/getUrl';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { params } = useQueryStore();

  const getParam = useCallback(
    (paramName: SearchParamsNames) => searchParams.get(paramName) || '',
    [searchParams]
  );

  useEffect(() => {
    if (params) {
      setSearchParams(getQueryString(params));
    }
  }, [params]);

  return { getParam };
};

export default useQueryParams;
