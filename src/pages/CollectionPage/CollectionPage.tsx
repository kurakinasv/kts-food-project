import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import Input from '@components/Input';
import Layout from '@components/Layout';
import EmptySearch from '@pages/RecipesPage/EmptySearch';
import RecipeCardsList from '@pages/RecipesPage/RecipeCardsList';
import { useCollectionStore } from '@stores/RootStore';

import { InputWrapper, ListWrapper, Placeholder } from './CollectionPage.styles';

const CollectionPage: FC = () => {
  const { collectionRecipes, initCollection, searchRecipes, filteredRecipes } =
    useCollectionStore();

  const [value, setValue] = useState('');

  useEffect(() => {
    initCollection();
  }, []);

  const search = (val: string) => {
    setValue(val);
    searchRecipes(val);
  };

  return (
    <Layout>
      <InputWrapper>
        <Input
          value={value}
          onChange={search}
          clearValue={() => setValue('')}
          placeholder="Search by name or ingredient"
        />
      </InputWrapper>

      {!collectionRecipes.length && <Placeholder />}

      {value && !filteredRecipes.length && !!collectionRecipes.length && (
        <EmptySearch resetButtonAction={() => setValue('')} />
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
