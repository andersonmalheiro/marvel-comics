import React from 'react';
import { Container } from './empty-indicator.styles';

export const EmptyIndicator = (props: { message?: string }) => {
  const { message } = props;
  return (
    <Container>
      <img src="assets/sad.png" alt="loading" />
      <p>{message ? message : 'No data...'}</p>
    </Container>
  );
};
