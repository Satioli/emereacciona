import React, { useState } from 'react';
import { useContent } from '../ContentContext';
import ContentCard from '../components/ContentCard';
import { Search, Filter, BookOpen } from 'lucide-react';
import './ContentPage.css';

const Novels = () => {
  const { novelas } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredNovels = novelas.filter(novela => {
    const matchesSearch = novela.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         novela.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || selectedGenre === 'Todos' || novela.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ['Todos', ...Array.from(new Set(novelas.map(n => n.genre)))];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <BookOpen className="page-icon" />
            <div>
              <h1 className="page-title">Novelas</h1>
              <p className="page-subtitle">Sumérgete en el mundo de las novelas y literatura</p>
            </div>
          </div>
        </div>

        <div className="search-filters">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar novelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="content-stats">
          <div className="stat-item">
            <span className="stat-number">{filteredNovels.length}</span>
            <span className="stat-label">Novelas encontradas</span>
          </div>
        </div>

        <div className="content-grid">
          {filteredNovels.map(novela => (
            <ContentCard key={novela.id} content={novela} type="novelas" />
          ))}
        </div>

        {filteredNovels.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>No se encontraron novelas</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Novels; 