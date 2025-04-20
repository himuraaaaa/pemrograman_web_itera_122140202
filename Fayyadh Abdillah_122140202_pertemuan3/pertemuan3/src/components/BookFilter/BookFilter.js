import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

const BookFilter = () => {
  const { filter, setFilter, searchTerm, setSearchTerm } = useBooks();
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="book-filter">
      <div className="filter-group">
        <label htmlFor="status-filter">Filter berdasarkan status:</label>
        <select
          id="status-filter"
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">Semua Buku</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
      
      <div className="search-group">
        <label htmlFor="search">Cari buku:</label>
        <div className="search-input-container">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari judul atau penulis..."
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search">
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookFilter;