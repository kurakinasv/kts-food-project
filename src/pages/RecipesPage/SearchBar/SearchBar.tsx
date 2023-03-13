import { FC, useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import Input from '@components/Input';
import { SearchIcon } from '@static/icons';
import { mealTypesOptions } from '@stores/models/mealtypes';
import { useMetaStore, useQueryStore, useRecipes } from '@stores/RootStore';
import { Option } from '@typings/common';
import { debounce } from '@utils/debounce';

import { SearchBarWrapper, StyledDropdown, SearchForm, StyledButton } from './SearchBar.styles';

type SearchBarProps = {
  value: string;
  options: Option[];
  setSearchValue: (value: string) => void;
  setSelectedOptions: (options: Option[]) => void;
};

const SearchBar: FC<SearchBarProps> = ({ value, options, setSearchValue, setSelectedOptions }) => {
  const { getAllRecipes } = useRecipes();
  const { loading } = useMetaStore();
  const { query } = useQueryStore();

  const handleSelect = useCallback(
    async (options: Option[]) => {
      setSelectedOptions(options);
      debouncedSelect(options);
    },
    [setSelectedOptions, getAllRecipes]
  );

  const searchRecipes = useCallback(async () => {
    if (!value || query === value.toLocaleLowerCase()) {
      return;
    }
    await getAllRecipes(value, undefined, '');
  }, [value, query, getAllRecipes]);

  const clearSearch = useCallback(async () => {
    setSearchValue('');

    if (query) {
      await getAllRecipes('', undefined, '');
    }
  }, [query, setSearchValue, getAllRecipes]);

  const clearFiltration = useCallback(async () => {
    setSelectedOptions([]);
    await getAllRecipes(undefined, [], '');
  }, [setSelectedOptions, getAllRecipes]);

  const debouncedSelect = useCallback(
    debounce(async (options: Option[]) => await getAllRecipes(undefined, options, '')),
    []
  );

  return (
    <SearchBarWrapper>
      <StyledDropdown
        options={mealTypesOptions}
        value={options}
        placeholder="Pick categories"
        onChange={handleSelect}
        pluralizeOptions={(values: Option[]) => values.map(({ value }) => value).join(', ')}
        clearOptions={clearFiltration}
        disabled={loading}
        loading={loading}
      />

      <SearchForm>
        <Input
          placeholder="Search"
          value={value}
          disabled={loading}
          onChange={setSearchValue}
          keyDownHandler={searchRecipes}
          clearValue={clearSearch}
        />
        <StyledButton
          icon={<SearchIcon />}
          loading={loading}
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
