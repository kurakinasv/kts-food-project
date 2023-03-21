import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import Input from '@components/Input';
import Layout from '@components/Layout';
import useQueryParams from '@hooks/useQueryParams';
import EmptySearch from '@pages/RecipesPage/EmptySearch';
import RecipeCardsList from '@pages/RecipesPage/RecipeCardsList';
import { useCollectionStore, useQueryStore } from '@stores/RootStore';
import { debounce } from '@utils/debounce';

import { InputWrapper, ListWrapper, Placeholder } from './CollectionPage.styles';

const CollectionPage: FC = () => {
  const { collectionRecipes, initCollection, searchRecipes, filteredRecipes } =
    useCollectionStore();

  const { getParam } = useQueryParams();
  const { setParams } = useQueryStore();

  const { state } = useLocation();
  const [value, setValue] = useState(getParam('query'));

  useEffect(() => {
    initCollection();

    if (state?.prevPath) {
      setParams({ query: '', page: '', type: '' });
    }
  }, []);

  const search = useCallback((val: string) => {
    setValue(val);
    setParams({ query: val });
    debouncedSearch(val);
  }, []);

  const clearSearch = useCallback(() => {
    setValue('');
    setParams({ query: '' });
  }, []);

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      searchRecipes(val);
    }, 500),
    []
  );

  return (
    <Layout>
      <InputWrapper>
        <Input
          value={value}
          onChange={search}
          clearValue={clearSearch}
          placeholder="Search by name or ingredient"
        />
      </InputWrapper>

      {!collectionRecipes.length && <Placeholder />}

      {value && !filteredRecipes.length && !!collectionRecipes.length && (
        <EmptySearch resetButtonAction={clearSearch} />
      )}

      {!!collectionRecipes.length && (
        <ListWrapper>
          <RecipeCardsList loading={false} recipes={value ? filteredRecipes : collectionRecipes} />
        </ListWrapper>
      )}
    </Layout>
  );
};

export default observer(CollectionPage);
