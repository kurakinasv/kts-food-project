import React, { memo, useState } from 'react';

import {
  DropdownButton,
  DropdownMenu,
  DropdownOption,
  DropdownWrapper,
} from './MultiDropdown.styles';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  /** Преобразовывает выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  className?: string;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  className = '',
  placeholder = '',
}) => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen((v) => !v);
  };

  const isOptionSelected = (option: Option) => {
    const foundOption = value.findIndex((outerValue) => outerValue.key === option.key);
    return foundOption !== -1;
  };

  const toggleOptions = (optionToCheck: Option) => {
    if (!isOptionSelected(optionToCheck)) {
      return [...value, optionToCheck];
    }

    const filtered = value.filter(
      (option) => option.key !== optionToCheck.key && option.value !== optionToCheck.value
    );

    return filtered;
  };

  const chooseOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentKey = e.currentTarget.dataset.key;
    const currentValue = e.currentTarget.textContent;

    if (!currentKey || !currentValue) {
      return;
    }

    const currentSelected: Option = { key: currentKey, value: currentValue };

    onChange(toggleOptions(currentSelected));
  };

  const optionNodes = options.map(({ key, value }) => (
    <DropdownOption
      selected={isOptionSelected({ key, value })}
      key={key}
      data-key={key}
      onClick={chooseOption}
    >
      {value}
    </DropdownOption>
  ));

  return (
    <DropdownWrapper className={className}>
      <DropdownButton
        type="button"
        disabled={disabled}
        value={pluralizeOptions(value) || placeholder}
        onClick={openMenu}
        isEmpty={!pluralizeOptions(value)}
      />
      {open && !disabled && <DropdownMenu visible={open && !disabled}>{optionNodes}</DropdownMenu>}
    </DropdownWrapper>
  );
};

export default memo(MultiDropdown);
