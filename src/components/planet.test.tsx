import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toBeInTheDocument } from "@testing-library/jest-dom";
import Planets from './planets';
import { getPlanetsBy } from '../queries/get-planet-by-id';

jest.mock('../queries/get-planet-by-id', () => ({
  getPlanetsBy: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('Planet Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
    cleanup();
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('renders loading component', () => {
    (getPlanetsBy as jest.Mock).mockResolvedValueOnce({ count: 0, results: [] });
    renderWithQueryClient(<Planets />);
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  test('render planets successfully', async () => {
    (getPlanetsBy as jest.Mock).mockResolvedValueOnce({
      count: 2,
      results: [
        { name: 'Earth', description: 'Earth planet description' },
        { name: 'Mars', description: 'Mars planet description' },
      ],
    });

    renderWithQueryClient(<Planets />);
    const planetItems = await screen.findAllByTestId('planet-item');
    expect(planetItems).toHaveLength(2);

  });

  test('check if pagination works', async () => {
    (getPlanetsBy as jest.Mock).mockResolvedValueOnce({
      count: 20,
      results: Array.from({ length: 10 }, (_, i) => ({ name: `Planet ${i + 1}`, description: `Description ${i + 1}` })),
    });

    renderWithQueryClient(<Planets />);
    const planetItems = await screen.findAllByTestId('planet-item');
    expect(planetItems).toHaveLength(10);

    (getPlanetsBy as jest.Mock).mockResolvedValueOnce({
      count: 20,
      results: Array.from({ length: 10 }, (_, i) => ({ name: `Planet ${i + 11}`, description: `Description ${i + 11}` })),
    });

    fireEvent.click(screen.getByText('»'));
    await waitFor(() => expect(screen.findAllByTestId('planet-item')).resolves.toHaveLength(10));
  });

});
