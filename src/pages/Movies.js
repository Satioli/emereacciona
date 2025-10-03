import React, { useState } from 'react';
import { useContent } from '../ContentContext';
import ContentCard from '../components/ContentCard';
import { Search, Filter, Film } from 'lucide-react';
import './ContentPage.css';

const Movies = () => {
  const { peliculas } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Todos', ...Array.from(new Set(peliculas.map(m => m.genre)))];

  const filteredMovies = peliculas.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || selectedGenre === 'Todos' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <Film className="page-icon" />
            <div>
              <h1 className="page-title">Películas</h1>
              <p className="page-subtitle">Explora películas agregadas por el administrador</p>
            </div>
          </div>
        </div>

        <div className="search-filters">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar películas..."
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
            <span className="stat-number">{filteredMovies.length}</span>
            <span className="stat-label">Películas encontradas</span>
          </div>
        </div>

        <div className="content-grid">
          {filteredMovies.map(movie => (
            <ContentCard key={movie.id} content={movie} type="peliculas" />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="no-results">
            <Film className="no-results-icon" />
            <h3>No se encontraron películas</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies; 