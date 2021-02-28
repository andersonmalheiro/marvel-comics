import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {
  test('renders Home screen without crashing', async () => {
    render(<Home />);
    expect(screen.getByRole('heading')).toHaveTextContent('Comics');
  });
});
