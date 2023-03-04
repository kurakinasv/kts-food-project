import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '@components/Loader';
import { Option } from '@components/MultiDropdown';
import OnTopButton from '@components/OnTopButton';
import { useRecipes } from '@stores/RootStore';

import EmptySearch from './EmptySearch';
import RecipeCardsList from './RecipeCardsList';
import { LoaderWrapper, PageWrapper } from './RecipesPage.styles';
import SearchBar from './SearchBar';
import useQueryParams from './useQueryParams';
import { getInitialSelectedOptions } from './utils';

const RecipesPage: FC = () => {
  const { getParam, decoratedRequest } = useQueryParams();

  const { getAllRecipes, recipes, totalResults, meta } = useRecipes();

  const [searchValue, setSearchValue] = useState(getParam('query'));
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    getInitialSelectedOptions(getParam('type'))
  );
  const [skeletonCardsAmount, setCardsAmount] = useState(5);

  const getRecipes = useMemo(() => decoratedRequest(getAllRecipes), []);

  useEffect(() => {
    if (!recipes) {
      getRecipes(searchValue, selectedOptions);
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

    await getRecipes('', []);
  }, []);

  const next = async () => {
    await getRecipes();
  };

  const hasMore = useMemo(
    () => !!recipes && recipes.length < 100 && recipes.length !== totalResults,
    [recipes, totalResults]
  );

  return (
    <PageWrapper>
      <SearchBar
        value={searchValue}
        options={selectedOptions}
        setSearchValue={setSearchValue}
        setSelectedOptions={setSelectedOptions}
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
  );
};

export default observer(RecipesPage);
