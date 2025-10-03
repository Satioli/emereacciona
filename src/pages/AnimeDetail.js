import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { useContent } from '../ContentContext';
import './ContentPage.css';

const AnimeDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { anime } = useContent();
  const animeItem = anime.find(a => a.title === title);
  const episodes = animeItem?.episodes || [];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
            <Zap className="page-icon" />
            <div>
              <h1 className="page-title">{title}</h1>
              <p className="page-subtitle">Episodios disponibles</p>
            </div>
          </div>
        </div>
        <div className="content-grid">
          {episodes.length > 0 ? (
            episodes.map(episode => (
              <ContentCard key={episode.id} content={episode} type="anime" />
            ))
          ) : (
            <div className="no-results">
              <Zap className="no-results-icon" />
              <h3>No hay episodios para este anime</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;