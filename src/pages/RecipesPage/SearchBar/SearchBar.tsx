import { FC, useCallback, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import Input from '@components/Input';
import { SearchIcon } from '@static/icons';
import { mealTypesOptions } from '@stores/models/mealtypes';
import { useQueryStore, useRecipes } from '@stores/RootStore';
import { Option } from '@typings/common';

import { SearchBarWrapper, StyledDropdown, SearchForm, StyledButton } from './SearchBar.styles';
import useQueryParams from '../useQueryParams';

type SearchBarProps = {
  value: string;
  options: Option[];
  setSearchValue: (value: string) => void;
  setSelectedOptions: (options: Option[]) => void;
};

const SearchBar: FC<SearchBarProps> = ({ value, options, setSearchValue, setSelectedOptions }) => {
  const { getAllRecipes, meta } = useRecipes();
  const { query } = useQueryStore();

  const { decoratedRequest } = useQueryParams();

  const getRecipes = useMemo(() => decoratedRequest(getAllRecipes), []);

  const handleSelect = useCallback(
    async (options: Option[]) => {
      setSelectedOptions(options);
      await getRecipes(undefined, options, '');
    },
    [setSelectedOptions, getRecipes]
  );

  const searchRecipes = useCallback(async () => {
    if (!value || query === value.toLocaleLowerCase()) {
      return;
    }
    await getRecipes(value, undefined, '');
  }, [value, query, getRecipes]);

  const clearSearch = useCallback(async () => {
    setSearchValue('');

    if (query) {
      await getRecipes('', undefined, '');
    }
  }, [query, setSearchValue, getRecipes]);

  const clearFiltration = useCallback(async () => {
    setSelectedOptions([]);
    await getRecipes(undefined, [], '');
  }, [setSelectedOptions, getRecipes]);

  return (
    <SearchBarWrapper>
      <StyledDropdown
        options={mealTypesOptions}
        value={options}
        placeholder="Pick categories"
        onChange={handleSelect}
        pluralizeOptions={(values: Option[]) => values.map(({ value }) => value).join(', ')}
        clearOptions={clearFiltration}
        disabled={meta.loading}
        loading={meta.loading}
      />

      <SearchForm>
        <Input
          placeholder="Search"
          value={value}
          disabled={meta.loading}
          onChange={setSearchValue}
          keyDownHandler={searchRecipes}
          clearValue={clearSearch}
        />
        <StyledButton
          icon={<SearchIcon />}
          loading={meta.loading}
          onClick={searchRecipes}
          padding="0px"
          shape="square"
          minWidth="46px"
          height="46px"
        />
      </SearchForm>
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
