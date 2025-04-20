import React from 'react';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <BookFilter />
      <BookList />
    </div>
  );
};

export default Home;