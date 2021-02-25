import React from 'react';
import { Container } from './loading-indicator.styles';

export const LoadingIndicator = () => {
  return (
    <Container>
      <img src="assets/logo.svg" alt="loading" />
      <p>Loading data...</p>
    </Container>
  );
};
