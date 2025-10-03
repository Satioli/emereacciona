import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../ContentContext';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { type, id } = useParams();
  const { peliculas, series, novelas, anime } = useContent();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos reales del contenido
  useEffect(() => {
    let foundContent = null;
    
    switch (type) {
      case 'peliculas':
        foundContent = peliculas.find(p => p.id === parseInt(id));
        break;
      case 'series':
        // Buscar episodio en todas las series
        for (const serie of series) {
          if (serie.episodes) {
            const episode = serie.episodes.find(ep => ep.id === parseInt(id));
            if (episode) {
              foundContent = episode;
              break;
            }
          }
        }
        break;
      case 'novelas':
        // Buscar capítulo en todas las novelas
        for (const novela of novelas) {
          if (novela.chapters) {
            const chapter = novela.chapters.find(ch => ch.id === parseInt(id));
            if (chapter) {
              foundContent = chapter;
              break;
            }
          }
        }
        break;
      case 'anime':
        // Buscar episodio en todos los anime
        for (const animeItem of anime) {
          if (animeItem.episodes) {
            const episode = animeItem.episodes.find(ep => ep.id === parseInt(id));
            if (episode) {
              foundContent = episode;
              break;
            }
          }
        }
        break;
      default:
        break;
    }
    
    let targetContent;
    if (foundContent) {
      const enhancedContent = {
        ...foundContent,
        rating: foundContent.rating || 4.5,
        views: foundContent.views || '15.2K',
        videoUrl: foundContent.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      };
      targetContent = enhancedContent;
      setContent(enhancedContent);
    } else {
      targetContent = {
        id: id,
        title: 'Contenido no encontrado',
        description: 'El contenido solicitado no está disponible.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        rating: 0,
        duration: '0m',
        views: '0',
        year: new Date().getFullYear(),
        genre: 'Desconocido',
        type: type
      };
      setContent(targetContent);
    }

    setLoading(false);

    if (targetContent && targetContent.videoUrl) {
      // Abrir el enlace del video en una nueva pestaña/ventana
      window.open(targetContent.videoUrl, '_blank', 'noopener,noreferrer');
    }
  }, [type, id, peliculas, series, novelas, anime]);

  if (loading) {
    return (
      <div className="video-player-container">
        <div className="loading">Cargando contenido...</div>
      </div>
    );
  }

  return null;
};

export default VideoPlayer; 