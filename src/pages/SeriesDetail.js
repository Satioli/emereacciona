import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tv, ArrowLeft } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { useContent } from '../ContentContext';
import './ContentPage.css';

const SeriesDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { series } = useContent();
  const serie = series.find(s => s.title === title);
  const episodes = serie?.episodes || [];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
            <Tv className="page-icon" />
            <div>
              <h1 className="page-title">{title}</h1>
              <p className="page-subtitle">Episodios disponibles</p>
            </div>
          </div>
        </div>
        <div className="content-grid">
          {episodes.length > 0 ? (
            episodes.map(episode => (
              <ContentCard key={episode.id} content={episode} type="series" />
            ))
          ) : (
            <div className="no-results">
              <Tv className="no-results-icon" />
              <h3>No hay episodios para esta serie</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;