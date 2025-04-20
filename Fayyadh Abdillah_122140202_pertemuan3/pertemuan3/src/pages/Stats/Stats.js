import React from 'react';
import useBookStats from '../../hooks/useBookStats';
import StatsCard from '../../components/StatsCard/StatsCard';
import './Stats.css';

const Stats = () => {
  const { totalBooks, owned, reading, toBuy, topAuthors } = useBookStats();
  
  return (
    <div className="stats-page">
      <h2>Statistik Buku</h2>
      <div className="stats-grid">
        <StatsCard 
          title="Total Buku" 
          value={totalBooks} 
          icon="📚" 
        />
        <StatsCard 
          title="Buku Dimiliki" 
          value={owned} 
          icon="📖" 
        />
        <StatsCard 
          title="Sedang Dibaca" 
          value={reading} 
          icon="👓" 
        />
        <StatsCard 
          title="Ingin Dibeli" 
          value={toBuy} 
          icon="🛒" 
        />
      </div>
      
      <div className="authors-section">
        <h3>Penulis Terbanyak</h3>
        {topAuthors.length > 0 ? (
          <ul className="author-list">
            {topAuthors.map(([author, count], index) => (
              <li key={author} className="author-item">
                <span className="author-rank">{index + 1}</span>
                <span className="author-name">{author}</span>
                <span className="author-count">{count} buku</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Belum ada data penulis.</p>
        )}
      </div>
    </div>
  );
};

export default Stats;
