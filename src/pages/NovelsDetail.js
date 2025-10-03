import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { useContent } from '../ContentContext';
import './ContentPage.css';

const NovelsDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { novelas } = useContent();
  const novela = novelas.find(n => n.title === title);
  const chapters = novela?.chapters || [];

  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
            <BookOpen className="page-icon" />
            <div>
              <h1 className="page-title">{title}</h1>
              <p className="page-subtitle">Capítulos disponibles</p>
            </div>
          </div>
        </div>
        <div className="content-grid">
          {chapters.length > 0 ? (
            chapters.map(chapter => (
              <ContentCard key={chapter.id} content={chapter} type="novelas" />
            ))
          ) : (
            <div className="no-results">
              <BookOpen className="no-results-icon" />
              <h3>No hay capítulos para esta novela</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovelsDetail;