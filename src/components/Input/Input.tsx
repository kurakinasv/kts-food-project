import React from 'react';

import { InputWrapper } from './Input.styles';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  keyDownHandler: () => Promise<void>;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  keyDownHandler,
  disabled,
  placeholder = '',
  className = '',
  ...attrs
}) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await keyDownHandler();
    }
  };

  return (
    <InputWrapper
      type="text"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      {...attrs}
    />
  );
};

export default Input;
