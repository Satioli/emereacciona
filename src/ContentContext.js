import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

function getLocal(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export const ContentProvider = ({ children }) => {
  // Estado global para cada tipo, inicializado desde localStorage
  const [peliculas, setPeliculas] = useState(() => getLocal('peliculas', []));
  const [series, setSeries] = useState(() => getLocal('series', []));
  const [novelas, setNovelas] = useState(() => getLocal('novelas', []));
  const [anime, setAnime] = useState(() => getLocal('anime', []));

  // Guardar en localStorage cuando cambian
  useEffect(() => { localStorage.setItem('peliculas', JSON.stringify(peliculas)); }, [peliculas]);
  useEffect(() => { localStorage.setItem('series', JSON.stringify(series)); }, [series]);
  useEffect(() => { localStorage.setItem('novelas', JSON.stringify(novelas)); }, [novelas]);
  useEffect(() => { localStorage.setItem('anime', JSON.stringify(anime)); }, [anime]);

  // Funciones para agregar contenido principal
  const addPelicula = (pelicula) => setPeliculas(prev => [...prev, { ...pelicula, id: Date.now() }]);
  const addSerie = (serie) => setSeries(prev => [...prev, { ...serie, id: Date.now(), episodes: [] }]);
  const addNovela = (novela) => setNovelas(prev => [...prev, { ...novela, id: Date.now(), chapters: [] }]);
  const addAnime = (animeItem) => setAnime(prev => [...prev, { ...animeItem, id: Date.now(), episodes: [] }]);

  // Funciones para agregar episodios/capítulos
  const addSerieEpisode = (serieTitle, episode) => setSeries(prev => prev.map(s => s.title === serieTitle ? { ...s, episodes: [...(s.episodes || []), { ...episode, id: Date.now() }] } : s));
  const addNovelaChapter = (novelaTitle, chapter) => setNovelas(prev => prev.map(n => n.title === novelaTitle ? { ...n, chapters: [...(n.chapters || []), { ...chapter, id: Date.now() }] } : n));
  const addAnimeEpisode = (animeTitle, episode) => setAnime(prev => prev.map(a => a.title === animeTitle ? { ...a, episodes: [...(a.episodes || []), { ...episode, id: Date.now() }] } : a));

  return (
    <ContentContext.Provider value={{
      peliculas, setPeliculas,
      series, setSeries,
      novelas, setNovelas,
      anime, setAnime,
      addPelicula, addSerie, addNovela, addAnime,
      addSerieEpisode, addNovelaChapter, addAnimeEpisode
    }}>
      {children}
    </ContentContext.Provider>
  );
};