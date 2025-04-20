import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from '../components/BookItem/BookItem';
import { BookProvider } from '../context/BookContext';

const mockOnEdit = jest.fn();
const bookData = {
  id: '123',
  title: 'Test Book',
  author: 'Test Author',
  status: 'milik',
  description: 'Test Description'
};

const renderWithContext = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  );
};

describe('BookItem Component', () => {
  test('renders book details correctly', () => {
    renderWithContext(<BookItem book={bookData} onEdit={mockOnEdit} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Oleh: Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });
  
  test('calls onEdit when edit button is clicked', () => {
    renderWithContext(<BookItem book={bookData} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
  
  test('shows delete confirmation when delete button is clicked', () => {
    renderWithContext(<BookItem book={bookData} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Hapus'));
    expect(screen.getByText(/Konfirmasi Penghapusan/i)).toBeInTheDocument();
    expect(screen.getByText(/Apakah Anda yakin ingin menghapus buku "Test Book"/i)).toBeInTheDocument();
  });
});
