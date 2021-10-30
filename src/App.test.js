import { render, screen } from '@testing-library/react';
import App from './App';

test('Checks Existence of Header 1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create a User Profile/i);
  expect(linkElement).toBeInTheDocument();
});

test('Checks Existence of Header 2', () => {
  render(<App />);
  const linkElement = screen.getByText(/Read and Print User Profiles/i);
  expect(linkElement).toBeInTheDocument();
});

test('Checks Existence of Header 3', () => {
  render(<App />);
  const linkElement = screen.getByText(/Update User Email Address/i);
  expect(linkElement).toBeInTheDocument();
});
test('Checks Existence of Header 4', () => {
  render(<App />);
  const linkElement = screen.getByText(/Delete User/i);
  expect(linkElement).toBeInTheDocument();
});
