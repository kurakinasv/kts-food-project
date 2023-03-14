import React, { memo, useCallback, useMemo } from 'react';

import { useTheme } from 'styled-components';

import Button from '@components/Button';
import { XMarkIcon } from '@static/icons';

import { ClearButtonWrapper, InputWrapper, StyledInput } from './Input.styles';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  keyDownHandler?(): Promise<void> | void;
  clearValue: VoidFunction;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  keyDownHandler,
  clearValue,
  disabled,
  placeholder = '',
  className = '',
  ...attrs
}) => {
  const { rgbColors } = useTheme();

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && keyDownHandler) {
        await keyDownHandler();
      }
    },
    [keyDownHandler]
  );

  const clearIcon = useMemo(
    () => (
      <XMarkIcon
        fillColor={disabled ? `rgba(${rgbColors.textGrey}, 0.7)` : `rgba(${rgbColors.red}, 0.7)`}
      />
    ),
    [disabled]
  );

  return (
    <InputWrapper>
      <StyledInput
        type="text"
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...attrs}
      />
      {!!value && (
        <ClearButtonWrapper>
          <Button
            icon={clearIcon}
            onClick={clearValue}
            disabled={disabled}
            shape="circle"
            bgColor="none"
            minWidth="22px"
            width="22px"
            padding="6px"
          />
        </ClearButtonWrapper>
      )}
    </InputWrapper>
  );
};

export default memo(Input);
