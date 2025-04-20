import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';
import { BookProvider } from '../context/BookContext';

const mockOnClose = jest.fn();

const renderWithContext = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  );
};

describe('BookForm Component', () => {
  test('renders form elements correctly', () => {
    renderWithContext(<BookForm onClose={mockOnClose} />);
    
    expect(screen.getByText(/Tambah Buku Baru/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul Buku:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deskripsi:/i)).toBeInTheDocument();
  });
  
  test('shows validation errors for empty fields', () => {
    renderWithContext(<BookForm onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText(/Tambah Buku/i));
    
    expect(screen.getByText(/Judul buku harus diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Nama penulis harus diisi/i)).toBeInTheDocument();
  });
  
  test('renders edit form with pre-filled data', () => {
    const bookData = {
      id: '123',
      title: 'Test Book',
      author: 'Test Author',
      status: 'baca',
      description: 'Test Description'
    };
    
    renderWithContext(<BookForm book={bookData} onClose={mockOnClose} />);
    
    expect(screen.getByText(/Edit Buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul Buku:/i).value).toBe('Test Book');
    expect(screen.getByLabelText(/Penulis:/i).value).toBe('Test Author');
    expect(screen.getByLabelText(/Status:/i).value).toBe('baca');
    expect(screen.getByLabelText(/Deskripsi:/i).value).toBe('Test Description');
  });
});