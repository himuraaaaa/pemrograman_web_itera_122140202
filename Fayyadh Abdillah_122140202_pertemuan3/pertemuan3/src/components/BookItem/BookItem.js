import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import Modal from '../Modal/Modal';
import './BookItem.css';

const BookItem = ({ book, onEdit }) => {
  const { deleteBook } = useBooks();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'milik': return 'Dimiliki';
      case 'baca': return 'Sedang Dibaca';
      case 'beli': return 'Ingin Dibeli';
      default: return status;
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'milik': return 'status-owned';
      case 'baca': return 'status-reading';
      case 'beli': return 'status-to-buy';
      default: return '';
    }
  };
  
  const handleDelete = () => {
    deleteBook(book.id);
    setShowConfirmDelete(false);
  };
  
  return (
    <div className="book-item">
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <span className={`status-badge ${getStatusClass(book.status)}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <p className="book-author">Oleh: {book.author}</p>
      {book.description && (
        <p className="book-description">{book.description}</p>
      )}
      <div className="book-actions">
        <button onClick={onEdit} className="edit-button">Edit</button>
        <button onClick={() => setShowConfirmDelete(true)} className="delete-button">
          Hapus
        </button>
      </div>
      
      <Modal isOpen={showConfirmDelete} onClose={() => setShowConfirmDelete(false)}>
        <div className="confirm-delete">
          <h3>Konfirmasi Penghapusan</h3>
          <p>Apakah Anda yakin ingin menghapus buku "{book.title}"?</p>
          <div className="confirm-buttons">
            <button onClick={() => setShowConfirmDelete(false)} className="cancel-button">
              Batal
            </button>
            <button onClick={handleDelete} className="confirm-button">
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookItem;