import React, { useState } from 'react';
import { useContent } from '../ContentContext';
import ContentCard from '../components/ContentCard';
import { Search, Filter, Zap } from 'lucide-react';
import './ContentPage.css';

const Anime = () => {
  const { anime } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredAnime = anime.filter(animeItem => {
    const matchesSearch = animeItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animeItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || selectedGenre === 'Todos' || animeItem.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ['Todos', ...Array.from(new Set(anime.map(a => a.genre)))];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <Zap className="page-icon" />
            <div>
              <h1 className="page-title">Anime</h1>
              <p className="page-subtitle">Explora anime, manga y contenido japonés</p>
            </div>
          </div>
        </div>

        <div className="search-filters">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar anime..."
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
            <span className="stat-number">{filteredAnime.length}</span>
            <span className="stat-label">Anime encontrados</span>
          </div>
        </div>

        <div className="content-grid">
          {filteredAnime.map(animeItem => (
            <ContentCard key={animeItem.id} content={animeItem} type="anime" />
          ))}
        </div>

        {filteredAnime.length === 0 && (
          <div className="no-results">
            <Zap className="no-results-icon" />
            <h3>No se encontró anime</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anime; 