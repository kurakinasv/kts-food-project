import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';

import { RouterPaths } from '@app/Router';
import Button from '@components/Button';
import Input from '@components/Input';
import Loader from '@components/Loader';
import { Option } from '@components/MultiDropdown';
import OnTopButton from '@components/OnTopButton';
import { SearchIcon } from '@static/icons';
import { useRecipes } from '@stores/RecipesStore';

import { mockOptions } from './mock';
import RecipeCard from './RecipeCard';
import {
  BackgroundImage,
  CardsWrapper,
  LoaderWrapper,
  PageWrapper,
  SearchBar,
  SearchForm,
  StyledDropdown,
} from './RecipesPage.styles';

const RecipesPage: FC = () => {
  const navigate = useNavigate();

  const { getAllRecipes, recipes } = useRecipes();

  useEffect(() => {
    if (!recipes) {
      getAllRecipes();
    }
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleSelect = (newOptions: Option[]) => {
    setSelectedOptions(newOptions);
  };

  const redirect = useCallback(
    (id: number) => () => {
      const path = RouterPaths.dish.split(':')[0];
      navigate(`${path}${id}`);
    },
    []
  );

  const next = () => {
    getAllRecipes();
  };

  return (
    <>
      <BackgroundImage />

      <PageWrapper>
        <SearchBar>
          <StyledDropdown
            options={mockOptions}
            value={selectedOptions}
            placeholder="Pick categories"
            onChange={handleSelect}
            pluralizeOptions={(values: Option[]) => values.map(({ value }) => value).join(', ')}
          />

          <SearchForm>
            <Input placeholder="Search" value={searchValue} onChange={setSearchValue} />
            <Button icon={<SearchIcon />} loading={false} padding="0px" />
          </SearchForm>
        </SearchBar>

        {recipes && (
          <InfiniteScroll
            dataLength={recipes.length}
            next={next}
            hasMore={recipes.length < 100}
            loader={
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            }
            scrollThreshold={0.9}
          >
            <CardsWrapper>
              {recipes.map((dish, index) => (
                <RecipeCard
                  key={'' + dish.id + index}
                  image={dish.image}
                  title={dish.title}
                  ingredients={dish.ingredients.join(' + ')}
                  calories={Math.round(dish.calories)}
                  onClick={redirect(dish.id)}
                />
              ))}
            </CardsWrapper>
          </InfiniteScroll>
        )}

        <OnTopButton />
      </PageWrapper>
    </>
  );
};

export default observer(RecipesPage);
