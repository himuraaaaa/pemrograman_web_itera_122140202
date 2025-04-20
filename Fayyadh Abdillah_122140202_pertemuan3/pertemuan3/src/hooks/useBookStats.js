import { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

const useBookStats = () => {
  const { books } = useBooks();
  
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const owned = books.filter(book => book.status === 'milik').length;
    const reading = books.filter(book => book.status === 'baca').length;
    const toBuy = books.filter(book => book.status === 'beli').length;
    
    const topAuthors = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});
    
    const sortedAuthors = Object.entries(topAuthors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    return {
      totalBooks,
      owned,
      reading,
      toBuy,
      topAuthors: sortedAuthors
    };
  }, [books]);
  
  return stats;
};

export default useBookStats;