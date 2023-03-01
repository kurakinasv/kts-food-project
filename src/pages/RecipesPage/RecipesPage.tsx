import { FC, useCallback, useEffect, useMemo, useState } from 'react';

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
import { useQueryStore, useRecipes } from '@stores/RootStore';
import { mealTypesOptions } from '@typings/api';

import EmptySearch from './EmptySearch';
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
import useQueryParams from './useQueryParams';
import { hasCommonOptions } from './utils';

const RecipesPage: FC = () => {
  const navigate = useNavigate();

  const { getParam, decoratedRequest } = useQueryParams();

  const { getAllRecipes, recipes, totalResults } = useRecipes();
  const { type, query } = useQueryStore();

  const initialSelectedOptions = useMemo(
    () => mealTypesOptions.filter(hasCommonOptions(getParam('type'))),
    [type]
  );

  const [searchValue, setSearchValue] = useState(getParam('query'));
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(initialSelectedOptions);

  const getRecipes = useMemo(() => decoratedRequest(getAllRecipes), []);

  useEffect(() => {
    if (!recipes) {
      getRecipes(searchValue, selectedOptions);
    }
  }, []);

  const clearFilters = useCallback(async () => {
    setSearchValue('');
    setSelectedOptions([]);

    await getRecipes('', []);
  }, []);

  const handleSelect = async (options: Option[]) => {
    setSelectedOptions(options);

    await getRecipes(undefined, options);
  };

  const redirect = useCallback(
    (id: number) => () => {
      const path = RouterPaths.dish.split(':')[0];
      navigate(`${path}${id}`);
    },
    []
  );

  const next = async () => {
    await getRecipes();
  };

  const searchRecipes = async () => {
    if (!searchValue || query === searchValue.toLocaleLowerCase()) {
      return;
    }

    await getRecipes(searchValue);
  };

  const hasMore = useMemo(
    () => !!recipes && recipes.length < 100 && recipes.length !== totalResults,
    [recipes, totalResults]
  );

  return (
    <>
      <BackgroundImage />

      <PageWrapper>
        <SearchBar>
          <StyledDropdown
            options={mealTypesOptions}
            value={selectedOptions}
            placeholder="Pick categories"
            onChange={handleSelect}
            pluralizeOptions={(values: Option[]) => values.map(({ value }) => value).join(', ')}
          />

          <SearchForm>
            <Input
              placeholder="Search"
              value={searchValue}
              onChange={setSearchValue}
              keyDownHandler={searchRecipes}
            />
            <Button icon={<SearchIcon />} loading={false} padding="0px" onClick={searchRecipes} />
          </SearchForm>
        </SearchBar>

        {recipes && !!recipes.length && (
          <InfiniteScroll
            dataLength={recipes.length}
            next={next}
            hasMore={hasMore}
            loader={
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            }
            scrollThreshold={0.9}
            style={{ margin: '-10px' }}
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

        {!totalResults && <EmptySearch func={clearFilters} />}

        <OnTopButton />
      </PageWrapper>
    </>
  );
};

export default observer(RecipesPage);
