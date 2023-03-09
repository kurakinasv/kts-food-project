import { FC, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@components/Button';
import Input from '@components/Input';
import { SearchIcon } from '@static/icons';
import { mealTypesOptions } from '@stores/models/mealtypes';
import { useQueryStore, useRecipes } from '@stores/RootStore';
import { Option } from '@typings/common';

import { SearchBarWrapper, StyledDropdown, SearchForm } from './SearchBar.styles';
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

  const handleSelect = async (options: Option[]) => {
    setSelectedOptions(options);

    await getRecipes(undefined, options);
  };

  const searchRecipes = async () => {
    if (!value || query === value.toLocaleLowerCase()) {
      return;
    }

    await getRecipes(value);
  };

  return (
    <SearchBarWrapper>
      <StyledDropdown
        options={mealTypesOptions}
        value={options}
        placeholder="Pick categories"
        onChange={handleSelect}
        pluralizeOptions={(values: Option[]) => values.map(({ value }) => value).join(', ')}
      />

      <SearchForm>
        <Input
          placeholder="Search"
          value={value}
          disabled={meta.loading}
          onChange={setSearchValue}
          keyDownHandler={searchRecipes}
        />
        <Button
          icon={<SearchIcon />}
          loading={meta.loading}
          padding="0px"
          onClick={searchRecipes}
        />
      </SearchForm>
    </SearchBarWrapper>
  );
};

export default observer(SearchBar);
