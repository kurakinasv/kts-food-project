import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@components/Button';
import useComponentVisible from '@hooks/useComponentVisible';
import { XMarkIcon } from '@static/icons';
import { rgbColors } from '@styles/variables';
import { Option } from '@typings/common';

import {
  ButtonWrapper,
  DropdownButton,
  DropdownMenu,
  DropdownOption,
  DropdownWrapper,
} from './MultiDropdown.styles';

export type MultiDropdownProps = {
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  loading?: boolean;
  /** Преобразовывает выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  className?: string;
  placeholder?: string;
  clearOptions: VoidFunction;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  loading = false,
  pluralizeOptions,
  clearOptions,
  className = '',
  placeholder = '',
}) => {
  const [open, setOpen] = useState(false);

  const { ref } = useComponentVisible({
    visible: open,
    setNotVisible: () => setOpen(false),
  });

  const handleMenu = () => {
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (loading || disabled) {
      setOpen(false);
    }
  }, [loading, disabled]);

  const isOptionSelected = useCallback(
    (option: Option) => {
      const foundOption = value.findIndex((outerValue) => outerValue.key === option.key);
      return foundOption !== -1;
    },
    [value]
  );

  const toggleOptions = useCallback(
    (optionToCheck: Option) => {
      if (!isOptionSelected(optionToCheck)) {
        return [...value, optionToCheck];
      }

      const filtered = value.filter(
        (option) => option.key !== optionToCheck.key && option.value !== optionToCheck.value
      );

      return filtered;
    },
    [value, isOptionSelected]
  );

  const chooseOption = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const currentKey = e.currentTarget.dataset.key;
      const currentValue = e.currentTarget.textContent;

      if (!currentKey || !currentValue) {
        return;
      }

      const currentSelected: Option = { key: currentKey, value: currentValue };

      onChange(toggleOptions(currentSelected));
    },
    [onChange, toggleOptions]
  );

  const optionNodes = useMemo(
    () =>
      options.map(({ key, value }) => (
        <DropdownOption
          selected={isOptionSelected({ key, value })}
          key={key}
          data-key={key}
          onClick={chooseOption}
        >
          {value}
        </DropdownOption>
      )),
    [options, isOptionSelected, chooseOption]
  );

  const clearIcon = useMemo(
    () => (
      <XMarkIcon
        fillColor={
          loading || disabled ? `rgba(${rgbColors.textGrey}, 0.7)` : `rgba(${rgbColors.red}, 0.7)`
        }
      />
    ),
    [loading, disabled]
  );

  return (
    <DropdownWrapper className={className} ref={ref}>
      <DropdownButton
        type="button"
        disabled={disabled}
        value={pluralizeOptions(value) || placeholder}
        onClick={handleMenu}
        isEmpty={!pluralizeOptions(value)}
      />
      {(!!value.length || disabled || loading) && (
        <ButtonWrapper>
          <Button
            icon={clearIcon}
            shape="circle"
            bgColor="none"
            minWidth={loading ? '36px' : '22px'}
            width={loading ? '36px' : '22px'}
            padding="6px"
            onClick={clearOptions}
            loading={loading}
            disabled={disabled}
          />
        </ButtonWrapper>
      )}
      {open && !disabled && <DropdownMenu visible={open && !disabled}>{optionNodes}</DropdownMenu>}
    </DropdownWrapper>
  );
};

export default memo(MultiDropdown);
