import React from 'react';

import { InputWrapper } from './Input.styles';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  placeholder = '',
  className = '',
  ...attrs
}) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <InputWrapper
      type="text"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={handleInput}
      disabled={disabled}
      {...attrs}
    />
  );
};

export default Input;
