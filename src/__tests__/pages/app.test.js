import { render, screen } from '@testing-library/react';
import App from 'src/router';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/AntV大作业/i);
  expect(linkElement).toBeInTheDocument();
});
