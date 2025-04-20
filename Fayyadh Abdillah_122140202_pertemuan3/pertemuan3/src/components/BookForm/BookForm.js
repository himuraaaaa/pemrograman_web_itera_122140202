import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

const BookForm = ({ book, onClose }) => {
  const { addBook, editBook } = useBooks();
  const [errors, setErrors] = useState({});
  
  const isEditing = !!book;
  
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    status: book?.status || 'milik',
    description: book?.description || '',
  });
  
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku harus diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis harus diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    if (isEditing) {
      editBook(book.id, formData);
    } else {
      addBook(formData);
    }
    
    onClose();
  };
  
  return (
    <div className="book-form-container">
      <h2>{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Judul Buku:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Penulis:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="milik">Sudah Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Deskripsi:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-buttons">
          <button type="button" onClick={onClose} className="cancel-button">
            Batal
          </button>
          <button type="submit" className="submit-button">
            {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default BookForm;