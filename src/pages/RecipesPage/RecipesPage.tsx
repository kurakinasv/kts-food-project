import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import Alert, { useAlert } from '@components/Alert';
import Header from '@components/Header';
import Loader from '@components/Loader';
import OnTopButton from '@components/OnTopButton';
import { useRecipes } from '@stores/RootStore';
import { Option } from '@typings/common';

import EmptySearch from './EmptySearch';
import RecipeCardsList from './RecipeCardsList';
import { LoaderWrapper, PageWrapper } from './RecipesPage.styles';
import SearchBar from './SearchBar';
import useQueryParams from './useQueryParams';
import { getInitialSelectedOptions } from './utils';

const RecipesPage: FC = () => {
  const { getParam, decoratedRequest } = useQueryParams();
  const { isOpen, openAlert } = useAlert();

  const { getAllRecipes, recipes, totalResults, meta } = useRecipes();

  useEffect(() => {
    autorun(() => {
      if (!meta.loading && meta.isError) {
        openAlert();
      }
    });
  }, [meta.loading, meta.isError]);

  const [searchValue, setSearchValue] = useState(getParam('query'));
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    getInitialSelectedOptions(getParam('type'))
  );
  const [skeletonCardsAmount, setCardsAmount] = useState(5);

  const getRecipes = useMemo(() => decoratedRequest(getAllRecipes), []);

  useEffect(() => {
    if (!recipes.length) {
      getRecipes(searchValue, selectedOptions, getParam('results'));
    }
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      if (960 < window.innerWidth && window.innerWidth <= 1130) {
        setCardsAmount(4);
      } else if (500 < window.innerWidth && window.innerWidth <= 960) {
        setCardsAmount(3);
      } else if (window.innerWidth <= 500) {
        setCardsAmount(2);
      } else {
        setCardsAmount(5);
      }
    };

    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const clearFilters = useCallback(async () => {
    setSearchValue('');
    setSelectedOptions([]);

    await getRecipes('', [], '');
  }, []);

  const next = async () => {
    await getRecipes(undefined, undefined, getParam('results'));
  };

  const hasMore = useMemo(
    () => !!recipes && recipes.length < 100 && recipes.length !== totalResults,
    [recipes, totalResults]
  );

  return (
    <>
      <Header />

      <PageWrapper>
        <SearchBar
          value={searchValue}
          options={selectedOptions}
          setSearchValue={setSearchValue}
          setSelectedOptions={setSelectedOptions}
        />

        <Alert
          message={meta.error?.message || ''}
          status="error"
          open={isOpen}
          statusCode={meta.error?.code}
        />

        {!meta.loading && !totalResults && <EmptySearch resetButtonAction={clearFilters} />}
        {meta.loading && !recipes?.length && (
          <RecipeCardsList loading={true} loadItemsAmount={skeletonCardsAmount * 3} />
        )}

        {recipes && !!recipes.length && (
          <InfiniteScroll
            dataLength={recipes.length}
            next={next}
            hasMore={hasMore}
            loader={
              <>
                <RecipeCardsList loading={true} loadItemsAmount={skeletonCardsAmount} />
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              </>
            }
            scrollThreshold={0.9}
            style={{ margin: '-10px' }}
          >
            <RecipeCardsList loading={false} recipes={recipes} />
          </InfiniteScroll>
        )}

        <OnTopButton />
      </PageWrapper>
    </>
  );
};

export default observer(RecipesPage);
