import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, Eye } from 'lucide-react';
import './ContentCard.css';

const ContentCard = ({ content, type }) => {
  const {
    id,
    title,
    description,
    rating,
    duration,
    views,
    thumbnail,
    year,
    genre,
    episode = content.episode || null,
    season = content.season || null
  } = content;

  const displayTitle = content.title || content.epTitle || content.chTitle || title;
  const displayDescription = content.description || content.epDescription || content.chDescription || description;
  const displayThumbnail = content.thumbnail || thumbnail;

  const getTypeLabel = () => {
    switch (type) {
      case 'peliculas': return 'Película';
      case 'series': return 'Serie';
      case 'novelas': return 'Novela';
      case 'anime': return 'Anime';
      default: return 'Contenido';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'peliculas': return '#ff6b6b';
      case 'series': return '#4834d4';
      case 'novelas': return '#00b894';
      case 'anime': return '#fdcb6e';
      default: return '#ff6b6b';
    }
  };

  const isPlayable = () => {
    if (episode && season) return true;
    if (content.chapter) return true;
    if (type === 'peliculas') return true;
    // Para episodios de anime, también son reproducibles directamente
    if (content.episode && content.season) return true;
    return false;
  };

  const getNavigationPath = () => {
    if (isPlayable()) {
      return content.videoUrl || '#';
    }
    switch (type) {
      case 'series':
        return `/series/${encodeURIComponent(title)}`;
      case 'novelas':
        return `/novelas/${encodeURIComponent(title)}`;
      case 'anime':
        return `/anime/${encodeURIComponent(title)}`;
      default:
        return '#';
    }
  };

  const playable = isPlayable() && content.videoUrl;

  return (
    playable ? (
      <a href={getNavigationPath()} target="_blank" rel="noopener noreferrer" className="content-card">
        <div className="card-image">
          {displayThumbnail ? (
            <img 
              src={displayThumbnail} 
              alt={displayTitle}
              className="card-thumbnail"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="image-placeholder"
            style={{ 
              background: displayThumbnail ? 'transparent' : `linear-gradient(135deg, ${getTypeColor()}20, ${getTypeColor()}40)`,
              display: displayThumbnail ? 'none' : 'flex'
            }}
          >
            <Play className="play-icon" />
          </div>
          <div className="card-overlay">
            <div className="overlay-content">
              <Play className="overlay-play-icon" />
              <span>Ver Ahora</span>
            </div>
          </div>
          <div className="card-badge" style={{ backgroundColor: getTypeColor() }}>
            {getTypeLabel()}
          </div>
        </div>
        
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{displayTitle}</h3>
            {episode && season && (
              <span className="episode-info">
                S{season} E{episode}
              </span>
            )}
          </div>
          
          <p className="card-description">{displayDescription}</p>
          
          <div className="card-meta">
            <div className="meta-item">
              <Star className="meta-icon" />
              <span>{rating || 'N/A'}/5</span>
            </div>
            <div className="meta-item">
              <Clock className="meta-icon" />
              <span>{duration || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <Eye className="meta-icon" />
              <span>{views || 'N/A'}</span>
            </div>
          </div>
          
          <div className="card-footer">
            <span className="card-year">{year}</span>
            <span className="card-genre">{genre}</span>
          </div>
        </div>
      </a>
    ) : (
    <Link to={getNavigationPath()} className="content-card">
      <div className="card-image">
        {displayThumbnail ? (
          <img 
            src={displayThumbnail} 
            alt={displayTitle}
            className="card-thumbnail"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="image-placeholder"
          style={{ 
            background: displayThumbnail ? 'transparent' : `linear-gradient(135deg, ${getTypeColor()}20, ${getTypeColor()}40)`,
            display: displayThumbnail ? 'none' : 'flex'
          }}
        >
          <Play className="play-icon" />
        </div>
        <div className="card-overlay">
          <div className="overlay-content">
            <Play className="overlay-play-icon" />
            <span>Ver Ahora</span>
          </div>
        </div>
        <div className="card-badge" style={{ backgroundColor: getTypeColor() }}>
          {getTypeLabel()}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{displayTitle}</h3>
          {episode && season && (
            <span className="episode-info">
              S{season} E{episode}
            </span>
          )}
        </div>
        
        <p className="card-description">{displayDescription}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <Star className="meta-icon" />
            <span>{rating || 'N/A'}/5</span>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{duration || 'N/A'}</span>
          </div>
          <div className="meta-item">
            <Eye className="meta-icon" />
            <span>{views || 'N/A'}</span>
          </div>
        </div>
        
        <div className="card-footer">
          <span className="card-year">{year}</span>
          <span className="card-genre">{genre}</span>
        </div>
      </div>
      </Link>
    )
  );
};

export default ContentCard; 