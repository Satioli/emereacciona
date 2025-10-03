import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Film, Tv, BookOpen, Zap, Info } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { useContent } from '../ContentContext';
import './Home.css';

const Home = () => {
  const { peliculas, series, novelas, anime } = useContent();

  const sections = useMemo(() => ([
    {
      title: 'Películas',
      description: 'Explora nuestra colección de películas',
      icon: Film,
      path: '/peliculas',
      count: peliculas.length,
      color: '#ff6b6b'
    },
    {
      title: 'Series',
      description: 'Descubre series y episodios',
      icon: Tv,
      path: '/series',
      count: series.length,
      color: '#4834d4'
    },
    {
      title: 'Novelas',
      description: 'Sumérgete en novelas y capítulos',
      icon: BookOpen,
      path: '/novelas',
      count: novelas.length,
      color: '#00b894'
    },
    {
      title: 'Anime',
      description: 'Explora anime y episodios',
      icon: Zap,
      path: '/anime',
      count: anime.length,
      color: '#fdcb6e'
    }
  ]), [peliculas.length, series.length, novelas.length, anime.length]);

  const featuredItems = useMemo(() => {
    const recentPeliculas = peliculas.map(p => ({ type: 'peliculas', data: p, id: p.id }));
    const recentSeriesEpisodes = series.flatMap(s => (s.episodes || []).map(e => ({ type: 'series', data: e, id: e.id })));
    const recentNovelaChapters = novelas.flatMap(n => (n.chapters || []).map(c => ({ type: 'novelas', data: c, id: c.id })));
    const recentAnimeEpisodes = anime.flatMap(a => (a.episodes || []).map(e => ({ type: 'anime', data: e, id: e.id })));
    return [...recentPeliculas, ...recentSeriesEpisodes, ...recentNovelaChapters, ...recentAnimeEpisodes]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 6);
  }, [peliculas, series, novelas, anime]);

  return (
    <div className="home">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Emereacciones</h1>
          <p className="page-subtitle">
            Tu biblioteca de películas, series, novelas y anime
          </p>
        </div>

        <div className="login-reminder">
          <Info className="reminder-icon" />
          <div className="reminder-content">
            <p className="reminder-text">
              Recuerda tener sesión iniciada en{' '}
              <a 
                href="https://app.emereacciones.com/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="reminder-link"
              >
                app.emereacciones.com/login
              </a>
            </p>
          </div>
        </div>

        <div className="section-grid">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link key={index} to={section.path} className="section-card">
                <Icon className="section-icon" style={{ color: section.color }} />
                <h3 className="section-title">{section.title}</h3>
                <p className="section-description">{section.description}</p>
                <div className="section-count">{section.count} elementos</div>
              </Link>
            );
          })}
        </div>

        <div className="featured-section">
          <h2 className="featured-title">Destacados Recientes</h2>
          <div className="featured-grid">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <ContentCard key={`${item.type}-${item.id}`} content={item.data} type={item.type} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No hay elementos recientes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 