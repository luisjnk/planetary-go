import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from "@testing-library/jest-dom";
import PlanetListError from '.';


describe('PlanetListError Component', () => {
  const handleRetry = jest.fn();
  const message = 'An intergalactic traveling problem has occurred';

  beforeEach(() => {
    handleRetry.mockClear();
    cleanup();
  });

  test('renders error message', () => {
    render(<PlanetListError handleRetry={handleRetry} message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test('calls handleRetry on button click', () => {
    render(<PlanetListError handleRetry={handleRetry} message={message} />);
    const button = screen.getByText('Retry');
    fireEvent.click(button);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});