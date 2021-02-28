import { render } from '@testing-library/react';
import { AppNavbar } from '../components/navbar';
import '@testing-library/jest-dom/extend-expect';

describe('Navbar', () => {
  test('renders navbar correctly', () => {
    const { getByText } = render(<AppNavbar />);
    expect(getByText('Home')).toBeInTheDocument();
  });
});
