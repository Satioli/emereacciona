import React, { useState } from 'react';
import { useContent } from '../ContentContext';
import ContentCard from '../components/ContentCard';
import { Search, Filter, Tv } from 'lucide-react';
import './ContentPage.css';

const Series = () => {
  const { series } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredSeries = series.filter(serie => {
    const matchesSearch = serie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serie.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || selectedGenre === 'Todos' || serie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ['Todos', ...Array.from(new Set(series.map(s => s.genre)))];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <Tv className="page-icon" />
            <div>
              <h1 className="page-title">Series</h1>
              <p className="page-subtitle">Descubre series completas y episodios individuales</p>
            </div>
          </div>
        </div>

        <div className="search-filters">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar series..."
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
            <span className="stat-number">{filteredSeries.length}</span>
            <span className="stat-label">Series encontradas</span>
          </div>
        </div>

        <div className="content-grid">
          {filteredSeries.map(serie => (
            <ContentCard key={serie.id} content={serie} type="series" />
          ))}
        </div>

        {filteredSeries.length === 0 && (
          <div className="no-results">
            <Tv className="no-results-icon" />
            <h3>No se encontraron series</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Series; 