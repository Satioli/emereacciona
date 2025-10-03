import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loadPeliculas, loadSeries, loadNovelas, loadAnime,
  savePeliculas, saveSeries, saveNovelas, saveAnime
} from './services/githubService';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  // Estado global para cada tipo
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [novelas, setNovelas] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos al inicializar (desde archivos estáticos + localStorage)
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Intentar cargar desde archivos estáticos primero
        const [peliculasData, seriesData, novelasData, animeData] = await Promise.all([
          loadPeliculas(),
          loadSeries(),
          loadNovelas(),
          loadAnime()
        ]);

        // Combinar con datos de localStorage si existen
        setPeliculas([...peliculasData, ...getLocalData('peliculas')]);
        setSeries([...seriesData, ...getLocalData('series')]);
        setNovelas([...novelasData, ...getLocalData('novelas')]);
        setAnime([...animeData, ...getLocalData('anime')]);
        
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error cargando datos');
        // Fallback a localStorage
        setPeliculas(getLocalData('peliculas'));
        setSeries(getLocalData('series'));
        setNovelas(getLocalData('novelas'));
        setAnime(getLocalData('anime'));
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Función helper para obtener datos de localStorage
  const getLocalData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  // Funciones para agregar contenido principal (con guardado en GitHub)
  const addPelicula = async (pelicula) => {
    const newPelicula = { ...pelicula, id: Date.now() };
    const newPeliculas = [...peliculas, newPelicula];
    setPeliculas(newPeliculas);
    try {
      await savePeliculas(newPeliculas);
    } catch (err) {
      console.error('Error guardando película:', err);
      setError('Error guardando en GitHub');
    }
  };

  const addSerie = async (serie) => {
    const newSerie = { ...serie, id: Date.now(), episodes: [] };
    const newSeries = [...series, newSerie];
    setSeries(newSeries);
    try {
      await saveSeries(newSeries);
    } catch (err) {
      console.error('Error guardando serie:', err);
      setError('Error guardando en GitHub');
    }
  };

  const addNovela = async (novela) => {
    const newNovela = { ...novela, id: Date.now(), chapters: [] };
    const newNovelas = [...novelas, newNovela];
    setNovelas(newNovelas);
    try {
      await saveNovelas(newNovelas);
    } catch (err) {
      console.error('Error guardando novela:', err);
      setError('Error guardando en GitHub');
    }
  };

  const addAnime = async (animeItem) => {
    const newAnime = { ...animeItem, id: Date.now(), episodes: [] };
    const newAnimeList = [...anime, newAnime];
    setAnime(newAnimeList);
    try {
      await saveAnime(newAnimeList);
    } catch (err) {
      console.error('Error guardando anime:', err);
      setError('Error guardando en GitHub');
    }
  };

  // Funciones para agregar episodios/capítulos (con guardado en GitHub)
  const addSerieEpisode = async (serieTitle, episode) => {
    const newEpisode = { ...episode, id: Date.now() };
    const newSeries = series.map(s => 
      s.title === serieTitle 
        ? { ...s, episodes: [...(s.episodes || []), newEpisode] } 
        : s
    );
    setSeries(newSeries);
    try {
      await saveSeries(newSeries);
    } catch (err) {
      console.error('Error guardando episodio:', err);
      setError('Error guardando en GitHub');
    }
  };

  const addNovelaChapter = async (novelaTitle, chapter) => {
    const newChapter = { ...chapter, id: Date.now() };
    const newNovelas = novelas.map(n => 
      n.title === novelaTitle 
        ? { ...n, chapters: [...(n.chapters || []), newChapter] } 
        : n
    );
    setNovelas(newNovelas);
    try {
      await saveNovelas(newNovelas);
    } catch (err) {
      console.error('Error guardando capítulo:', err);
      setError('Error guardando en GitHub');
    }
  };

  const addAnimeEpisode = async (animeTitle, episode) => {
    const newEpisode = { ...episode, id: Date.now() };
    const newAnimeList = anime.map(a => 
      a.title === animeTitle 
        ? { ...a, episodes: [...(a.episodes || []), newEpisode] } 
        : a
    );
    setAnime(newAnimeList);
    try {
      await saveAnime(newAnimeList);
    } catch (err) {
      console.error('Error guardando episodio de anime:', err);
      setError('Error guardando en GitHub');
    }
  };

  // Funciones para actualizar arrays completos (para editar/eliminar)
  const updatePeliculas = async (newPeliculas) => {
    setPeliculas(newPeliculas);
    try {
      await savePeliculas(newPeliculas);
    } catch (err) {
      console.error('Error actualizando películas:', err);
      setError('Error guardando en GitHub');
    }
  };

  const updateSeries = async (newSeries) => {
    setSeries(newSeries);
    try {
      await saveSeries(newSeries);
    } catch (err) {
      console.error('Error actualizando series:', err);
      setError('Error guardando en GitHub');
    }
  };

  const updateNovelas = async (newNovelas) => {
    setNovelas(newNovelas);
    try {
      await saveNovelas(newNovelas);
    } catch (err) {
      console.error('Error actualizando novelas:', err);
      setError('Error guardando en GitHub');
    }
  };

  const updateAnime = async (newAnime) => {
    setAnime(newAnime);
    try {
      await saveAnime(newAnime);
    } catch (err) {
      console.error('Error actualizando anime:', err);
      setError('Error guardando en GitHub');
    }
  };

  return (
    <ContentContext.Provider value={{
      peliculas, setPeliculas: updatePeliculas,
      series, setSeries: updateSeries,
      novelas, setNovelas: updateNovelas,
      anime, setAnime: updateAnime,
      addPelicula, addSerie, addNovela, addAnime,
      addSerieEpisode, addNovelaChapter, addAnimeEpisode,
      loading, error
    }}>
      {children}
    </ContentContext.Provider>
  );
};