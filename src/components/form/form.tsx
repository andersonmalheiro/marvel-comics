import React from 'react';
import { StyledForm } from './form.styles';

interface FormProps {
  onSubmit: (...args: any[]) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, children } = props;
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};
