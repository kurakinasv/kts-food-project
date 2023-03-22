import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import Layout from '@components/Layout';
import Loader from '@components/Loader';
import useQueryParams from '@hooks/useQueryParams';
import { useCollectionStore, useMetaStore, useRecipes } from '@stores/RootStore';
import { Option } from '@typings/common';
import { debounce } from '@utils/debounce';

import EmptySearch from './EmptySearch';
import RecipeCardsList from './RecipeCardsList';
import { LoaderWrapper } from './RecipesPage.styles';
import SearchBar from './SearchBar';
import { getInitialSelectedOptions } from './utils';

const RecipesPage: FC = () => {
  const { getParam } = useQueryParams();
  const { initCollection } = useCollectionStore();

  const { getAllRecipes, recipes, totalResults } = useRecipes();
  const { loading } = useMetaStore();

  const [searchValue, setSearchValue] = useState(getParam('query'));
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    getInitialSelectedOptions(getParam('type'))
  );
  const [skeletonCardsAmount, setCardsAmount] = useState(5);

  useEffect(() => {
    initCollection();

    if (!recipes.length) {
      getAllRecipes(searchValue, selectedOptions, getParam('page'));
    }
  }, []);

  useEffect(() => {
    const resizeHandler = debounce(() => {
      if (960 < window.innerWidth && window.innerWidth <= 1130) {
        setCardsAmount(4);
      } else if (500 < window.innerWidth && window.innerWidth <= 960) {
        setCardsAmount(3);
      } else if (window.innerWidth <= 500) {
        setCardsAmount(2);
      } else {
        setCardsAmount(5);
      }
    }, 250);

    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const clearFilters = useCallback(async () => {
    setSearchValue('');
    setSelectedOptions([]);

    await getAllRecipes('', [], '');
  }, []);

  const next = async () => {
    await getAllRecipes(undefined, undefined, getParam('page'));
  };

  const hasMore = useMemo(
    () => !!recipes && recipes.length < 100 && recipes.length !== totalResults,
    [recipes, totalResults]
  );

  return (
    <Layout>
      <SearchBar
        value={searchValue}
        options={selectedOptions}
        setSearchValue={setSearchValue}
        setSelectedOptions={setSelectedOptions}
      />

      {!loading && !totalResults && <EmptySearch resetButtonAction={clearFilters} />}
      {loading && !recipes?.length && (
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
          style={{ margin: '-10px', padding: '10px' }}
        >
          <RecipeCardsList loading={false} recipes={recipes} />
        </InfiniteScroll>
      )}
    </Layout>
  );
};

export default observer(RecipesPage);
