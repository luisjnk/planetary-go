import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Pagination from '.';


describe('Pagination Component', () => {
  const listCount = 50;
  const currentPage = 1;
  const nextPage = jest.fn();

  beforeEach(() => {
    nextPage.mockClear();
    cleanup();
  });

  const renderPagination = (currentPage: number) => {
    render(<Pagination listCount={listCount} currentPage={currentPage} nextPage={nextPage} />);
  };

  test('should render pagination component correctly', () => {
    renderPagination(currentPage);
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('4')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('»')).toBeTruthy();
    expect(screen.getByText('«')).toBeTruthy();
  });

  test('should handles next page click correctly', () => {
    renderPagination(currentPage);
    fireEvent.click(screen.getByText('»'));
    expect(nextPage).toHaveBeenCalledWith({ nextPage: currentPage + 1 });
  });

  test('should handle previous page click correctly', () => {
    renderPagination(2);
    fireEvent.click(screen.getByText('«'));
    expect(nextPage).toHaveBeenCalledWith({ nextPage: 1 });
  });

  test('should handles specific page number click correctly', () => {
    renderPagination(currentPage);
    fireEvent.click(screen.getByText('3'));
    expect(nextPage).toHaveBeenCalledWith({ nextPage: 3 });
  });

  test('dont go to previous page if first page', () => {
    renderPagination(1);
    fireEvent.click(screen.getByText('«'));
    expect(nextPage).not.toHaveBeenCalled();
  });

  test('dont go to next page if last page', () => {
    renderPagination(5);
    fireEvent.click(screen.getByText('»'));
    expect(nextPage).not.toHaveBeenCalled();
  });

});