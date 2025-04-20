import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookItem from '../BookItem/BookItem';
import Modal from '../Modal/Modal';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

const BookList = () => {
  const { filteredBooks } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };
  
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="book-list-container">
      <div className="list-header">
        <h2>Daftar Buku ({filteredBooks.length})</h2>
        <button onClick={handleAddBook} className="add-button">Tambah Buku</button>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <p>Tidak ada buku yang ditemukan.</p>
        </div>
      ) : (
        <div className="book-list">
          {filteredBooks.map(book => (
            <BookItem 
              key={book.id} 
              book={book} 
              onEdit={() => handleEditBook(book)} 
            />
          ))}
        </div>
      )}
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BookForm book={selectedBook} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default BookList;