import React, { useState } from 'react';
import { useContent } from '../ContentContext';
import './Admin.css';

const TABS = [
  { key: 'peliculas', label: 'Películas' },
  { key: 'series', label: 'Series' },
  { key: 'novelas', label: 'Novelas' },
  { key: 'anime', label: 'Anime' },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('peliculas');

  return (
    <div className="admin-panel-container">
      <h1>Panel de Administración</h1>
      <div className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`admin-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="admin-tab-content">
        {activeTab === 'peliculas' && <PeliculasAdmin />}
        {activeTab === 'series' && <SeriesAdmin />}
        {activeTab === 'novelas' && <NovelasAdmin />}
        {activeTab === 'anime' && <AnimeAdmin />}
      </div>
    </div>
  );
};

// --- Películas ---
const PeliculasAdmin = () => {
  const { peliculas, addPelicula } = useContent();
  const [form, setForm] = useState({
    title: '', description: '', year: '', genre: '', duration: '', thumbnail: '', videoUrl: ''
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addPelicula(form);
    setForm({ title: '', description: '', year: '', genre: '', duration: '', thumbnail: '', videoUrl: '' });
  };
  // Eliminar
  const { setPeliculas } = useContent();
  const handleDelete = id => setPeliculas(peliculas.filter(p => p.id !== id));
  // Editar
  const handleEdit = pelicula => {
    setEditId(pelicula.id);
    setEditForm(pelicula);
  };
  const handleEditSave = () => {
    setPeliculas(peliculas.map(p => p.id === editId ? { ...editForm, id: editId } : p));
    setEditId(null);
    setEditForm({});
  };
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({});
  };
  return (
    <div>
      <h2>Gestión de Películas</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" required />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duración" required />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL de Imagen/Thumbnail" required />
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="URL de Video" required />
        <button type="submit">Agregar Película</button>
      </form>
      <h3>Películas agregadas</h3>
      <ul>
        {peliculas.map(p => (
          <li key={p.id}>
            {editId === p.id ? (
              <>
                <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Título" />
                <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Descripción" />
                <input name="year" value={editForm.year} onChange={handleEditChange} placeholder="Año" />
                <input name="genre" value={editForm.genre} onChange={handleEditChange} placeholder="Género" />
                <input name="duration" value={editForm.duration} onChange={handleEditChange} placeholder="Duración" />
                <input name="thumbnail" value={editForm.thumbnail} onChange={handleEditChange} placeholder="URL de Imagen/Thumbnail" />
                <input name="videoUrl" value={editForm.videoUrl} onChange={handleEditChange} placeholder="URL de Video" />
                <button onClick={handleEditSave}>Guardar</button>
                <button onClick={handleEditCancel}>Cancelar</button>
              </>
            ) : (
              <>
                <b>{p.title}</b> ({p.year}) - {p.genre}
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Series ---
const SeriesAdmin = () => {
  const { series, addSerie, addSerieEpisode, setSeries } = useContent();
  const [form, setForm] = useState({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  const [episodeForm, setEpisodeForm] = useState({ serieTitle: '', episode: '', season: '', epTitle: '', epDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editEpisodeId, setEditEpisodeId] = useState(null);
  const [editEpisodeForm, setEditEpisodeForm] = useState({});
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addSerie(form);
    setForm({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  };
  // Eliminar serie
  const handleDelete = id => setSeries(series.filter(s => s.id !== id));
  // Editar serie
  const handleEdit = serie => {
    setEditId(serie.id);
    setEditForm(serie);
  };
  const handleEditSave = () => {
    setSeries(series.map(s => s.id === editId ? { ...editForm, id: editId, episodes: serieEpisodes(editId) } : s));
    setEditId(null);
    setEditForm({});
  };
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({});
  };
  // Episodios
  const serieEpisodes = id => (series.find(s => s.id === id)?.episodes || []);
  // Eliminar episodio
  const handleDeleteEpisode = (serieId, epId) => {
    setSeries(series.map(s => s.id === serieId ? { ...s, episodes: s.episodes.filter(e => e.id !== epId) } : s));
  };
  const handleEpChange = e => setEpisodeForm({ ...episodeForm, [e.target.name]: e.target.value });
  const handleEpSubmit = e => {
    e.preventDefault();
    addSerieEpisode(episodeForm.serieTitle, episodeForm);
    setEpisodeForm({ serieTitle: '', episode: '', season: '', epTitle: '', epDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  };
  
  // Editar episodio
  const handleEditEpisode = (serieId, episode) => {
    setEditEpisodeId(episode.id);
    setEditEpisodeForm(episode);
  };
  const handleEditEpisodeChange = e => setEditEpisodeForm({ ...editEpisodeForm, [e.target.name]: e.target.value });
  const handleEditEpisodeSave = (serieId) => {
    setSeries(series.map(s => 
      s.id === serieId ? 
        { ...s, episodes: s.episodes.map(e => e.id === editEpisodeId ? { ...editEpisodeForm, id: editEpisodeId } : e) } : 
        s
    ));
    setEditEpisodeId(null);
    setEditEpisodeForm({});
  };
  const handleEditEpisodeCancel = () => {
    setEditEpisodeId(null);
    setEditEpisodeForm({});
  };
  return (
    <div>
      <h2>Gestión de Series</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título de la Serie" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" required />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL de Imagen/Thumbnail" required />
        <button type="submit">Agregar Serie</button>
      </form>
      <h3>Series agregadas</h3>
      <ul>
        {series.map(s => (
          <li key={s.id}>
            {editId === s.id ? (
              <>
                <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Título" />
                <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Descripción" />
                <input name="year" value={editForm.year} onChange={handleEditChange} placeholder="Año" />
                <input name="genre" value={editForm.genre} onChange={handleEditChange} placeholder="Género" />
                <input name="thumbnail" value={editForm.thumbnail} onChange={handleEditChange} placeholder="URL de Imagen/Thumbnail" />
                <button onClick={handleEditSave}>Guardar</button>
                <button onClick={handleEditCancel}>Cancelar</button>
              </>
            ) : (
              <>
                <b>{s.title}</b> ({s.year}) - {s.genre}
                <button onClick={() => handleEdit(s)}>Editar</button>
                <button onClick={() => handleDelete(s.id)}>Eliminar</button>
              </>
            )}
            {/* Episodios */}
            {s.episodes && s.episodes.length > 0 && (
              <ul style={{marginTop: '0.5rem'}}>
                {s.episodes.map(e => (
                  <li key={e.id} style={{fontSize: '0.95em'}}>
                    {editEpisodeId === e.id ? (
                      <>
                        <input name="season" value={editEpisodeForm.season} onChange={handleEditEpisodeChange} placeholder="Temporada" style={{width: '60px', marginRight: '5px'}} />
                        <input name="episode" value={editEpisodeForm.episode} onChange={handleEditEpisodeChange} placeholder="Episodio" style={{width: '60px', marginRight: '5px'}} />
                        <input name="epTitle" value={editEpisodeForm.epTitle} onChange={handleEditEpisodeChange} placeholder="Título" style={{width: '150px', marginRight: '5px'}} />
                        <input name="epDescription" value={editEpisodeForm.epDescription} onChange={handleEditEpisodeChange} placeholder="Descripción" style={{width: '200px', marginRight: '5px'}} />
                        <input name="duration" value={editEpisodeForm.duration} onChange={handleEditEpisodeChange} placeholder="Duración" style={{width: '80px', marginRight: '5px'}} />
                        <input name="thumbnail" value={editEpisodeForm.thumbnail || ''} onChange={handleEditEpisodeChange} placeholder="URL Imagen/Thumbnail" style={{width: '200px', marginRight: '5px'}} />
                        <input name="videoUrl" value={editEpisodeForm.videoUrl} onChange={handleEditEpisodeChange} placeholder="URL Video" style={{width: '200px', marginRight: '5px'}} />
                        <button onClick={() => handleEditEpisodeSave(s.id)} style={{marginRight: '5px'}}>Guardar</button>
                        <button onClick={handleEditEpisodeCancel}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        T{e.season}E{e.episode}: {e.epTitle}
                        <button onClick={() => handleEditEpisode(s.id, e)} style={{marginLeft: 8, marginRight: 5}}>Editar</button>
                        <button onClick={() => handleDeleteEpisode(s.id, e.id)}>Eliminar</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <h3>Agregar Episodio</h3>
      <form className="admin-form" onSubmit={handleEpSubmit}>
        <select name="serieTitle" value={episodeForm.serieTitle} onChange={handleEpChange} required>
          <option value="">Selecciona una serie</option>
          {series.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
        </select>
        <input name="season" value={episodeForm.season} onChange={handleEpChange} placeholder="Temporada" required />
        <input name="episode" value={episodeForm.episode} onChange={handleEpChange} placeholder="Episodio" required />
        <input name="epTitle" value={episodeForm.epTitle} onChange={handleEpChange} placeholder="Título del Episodio" required />
        <input name="epDescription" value={episodeForm.epDescription} onChange={handleEpChange} placeholder="Descripción" required />
        <input name="duration" value={episodeForm.duration} onChange={handleEpChange} placeholder="Duración" required />
        <input name="thumbnail" value={episodeForm.thumbnail} onChange={handleEpChange} placeholder="URL de Imagen/Thumbnail" />
        <input name="videoUrl" value={episodeForm.videoUrl} onChange={handleEpChange} placeholder="URL de Video" required />
        <button type="submit">Agregar Episodio</button>
      </form>
    </div>
  );
};

// --- Novelas ---
const NovelasAdmin = () => {
  const { novelas, addNovela, addNovelaChapter, setNovelas } = useContent();
  const [form, setForm] = useState({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  const [chapterForm, setChapterForm] = useState({ novelaTitle: '', chapter: '', chTitle: '', chDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editChapterId, setEditChapterId] = useState(null);
  const [editChapterForm, setEditChapterForm] = useState({});
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addNovela(form);
    setForm({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  };
  // Eliminar novela
  const handleDelete = id => setNovelas(novelas.filter(n => n.id !== id));
  // Editar novela
  const handleEdit = novela => {
    setEditId(novela.id);
    setEditForm(novela);
  };
  const handleEditSave = () => {
    setNovelas(novelas.map(n => n.id === editId ? { ...editForm, id: editId, chapters: novelaChapters(editId) } : n));
    setEditId(null);
    setEditForm({});
  };
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({});
  };
  // Capítulos
  const novelaChapters = id => (novelas.find(n => n.id === id)?.chapters || []);
  // Eliminar capítulo
  const handleDeleteChapter = (novelaId, chId) => {
    setNovelas(novelas.map(n => n.id === novelaId ? { ...n, chapters: n.chapters.filter(c => c.id !== chId) } : n));
  };
  const handleChChange = e => setChapterForm({ ...chapterForm, [e.target.name]: e.target.value });
  const handleChSubmit = e => {
    e.preventDefault();
    addNovelaChapter(chapterForm.novelaTitle, chapterForm);
    setChapterForm({ novelaTitle: '', chapter: '', chTitle: '', chDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  };
  
  // Editar capítulo
  const handleEditChapter = (novelaId, chapter) => {
    setEditChapterId(chapter.id);
    setEditChapterForm(chapter);
  };
  const handleEditChapterChange = e => setEditChapterForm({ ...editChapterForm, [e.target.name]: e.target.value });
  const handleEditChapterSave = (novelaId) => {
    setNovelas(novelas.map(n => 
      n.id === novelaId ? 
        { ...n, chapters: n.chapters.map(c => c.id === editChapterId ? { ...editChapterForm, id: editChapterId } : c) } : 
        n
    ));
    setEditChapterId(null);
    setEditChapterForm({});
  };
  const handleEditChapterCancel = () => {
    setEditChapterId(null);
    setEditChapterForm({});
  };
  return (
    <div>
      <h2>Gestión de Novelas</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título de la Novela" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" required />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL de Imagen/Thumbnail" required />
        <button type="submit">Agregar Novela</button>
      </form>
      <h3>Novelas agregadas</h3>
      <ul>
        {novelas.map(n => (
          <li key={n.id}>
            {editId === n.id ? (
              <>
                <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Título" />
                <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Descripción" />
                <input name="year" value={editForm.year} onChange={handleEditChange} placeholder="Año" />
                <input name="genre" value={editForm.genre} onChange={handleEditChange} placeholder="Género" />
                <input name="thumbnail" value={editForm.thumbnail} onChange={handleEditChange} placeholder="URL de Imagen/Thumbnail" />
                <button onClick={handleEditSave}>Guardar</button>
                <button onClick={handleEditCancel}>Cancelar</button>
              </>
            ) : (
              <>
                <b>{n.title}</b> ({n.year}) - {n.genre}
                <button onClick={() => handleEdit(n)}>Editar</button>
                <button onClick={() => handleDelete(n.id)}>Eliminar</button>
              </>
            )}
            {/* Capítulos */}
            {n.chapters && n.chapters.length > 0 && (
              <ul style={{marginTop: '0.5rem'}}>
                {n.chapters.map(c => (
                  <li key={c.id} style={{fontSize: '0.95em'}}>
                    {editChapterId === c.id ? (
                      <>
                        <input name="chapter" value={editChapterForm.chapter} onChange={handleEditChapterChange} placeholder="Capítulo" style={{width: '60px', marginRight: '5px'}} />
                        <input name="chTitle" value={editChapterForm.chTitle} onChange={handleEditChapterChange} placeholder="Título" style={{width: '150px', marginRight: '5px'}} />
                        <input name="chDescription" value={editChapterForm.chDescription} onChange={handleEditChapterChange} placeholder="Descripción" style={{width: '200px', marginRight: '5px'}} />
                        <input name="duration" value={editChapterForm.duration} onChange={handleEditChapterChange} placeholder="Duración" style={{width: '80px', marginRight: '5px'}} />
                        <input name="thumbnail" value={editChapterForm.thumbnail || ''} onChange={handleEditChapterChange} placeholder="URL Imagen/Thumbnail" style={{width: '200px', marginRight: '5px'}} />
                        <input name="videoUrl" value={editChapterForm.videoUrl} onChange={handleEditChapterChange} placeholder="URL Video" style={{width: '200px', marginRight: '5px'}} />
                        <button onClick={() => handleEditChapterSave(n.id)} style={{marginRight: '5px'}}>Guardar</button>
                        <button onClick={handleEditChapterCancel}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        Capítulo {c.chapter}: {c.chTitle}
                        <button onClick={() => handleEditChapter(n.id, c)} style={{marginLeft: 8, marginRight: 5}}>Editar</button>
                        <button onClick={() => handleDeleteChapter(n.id, c.id)}>Eliminar</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <h3>Agregar Capítulo</h3>
      <form className="admin-form" onSubmit={handleChSubmit}>
        <select name="novelaTitle" value={chapterForm.novelaTitle} onChange={handleChChange} required>
          <option value="">Selecciona una novela</option>
          {novelas.map(n => <option key={n.id} value={n.title}>{n.title}</option>)}
        </select>
        <input name="chapter" value={chapterForm.chapter} onChange={handleChChange} placeholder="Capítulo" required />
        <input name="chTitle" value={chapterForm.chTitle} onChange={handleChChange} placeholder="Título del Capítulo" required />
        <input name="chDescription" value={chapterForm.chDescription} onChange={handleChChange} placeholder="Descripción" required />
        <input name="duration" value={chapterForm.duration} onChange={handleChChange} placeholder="Duración" required />
        <input name="thumbnail" value={chapterForm.thumbnail} onChange={handleChChange} placeholder="URL de Imagen/Thumbnail" />
        <input name="videoUrl" value={chapterForm.videoUrl} onChange={handleChChange} placeholder="URL de Video" required />
        <button type="submit">Agregar Capítulo</button>
      </form>
    </div>
  );
};

// --- Anime ---
const AnimeAdmin = () => {
  const { anime, addAnime, addAnimeEpisode, setAnime } = useContent();
  const [form, setForm] = useState({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  const [episodeForm, setEpisodeForm] = useState({ animeTitle: '', episode: '', season: '', epTitle: '', epDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editAnimeEpisodeId, setEditAnimeEpisodeId] = useState(null);
  const [editAnimeEpisodeForm, setEditAnimeEpisodeForm] = useState({});
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    addAnime(form);
    setForm({ title: '', description: '', year: '', genre: '', thumbnail: '' });
  };
  // Eliminar anime
  const handleDelete = id => setAnime(anime.filter(a => a.id !== id));
  // Editar anime
  const handleEdit = animeItem => {
    setEditId(animeItem.id);
    setEditForm(animeItem);
  };
  const handleEditSave = () => {
    setAnime(anime.map(a => a.id === editId ? { ...editForm, id: editId, episodes: animeEpisodes(editId) } : a));
    setEditId(null);
    setEditForm({});
  };
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({});
  };
  // Episodios
  const animeEpisodes = id => (anime.find(a => a.id === id)?.episodes || []);
  // Eliminar episodio
  const handleDeleteEpisode = (animeId, epId) => {
    setAnime(anime.map(a => a.id === animeId ? { ...a, episodes: a.episodes.filter(e => e.id !== epId) } : a));
  };
  const handleEpChange = e => setEpisodeForm({ ...episodeForm, [e.target.name]: e.target.value });
  const handleEpSubmit = e => {
    e.preventDefault();
    addAnimeEpisode(episodeForm.animeTitle, episodeForm);
    setEpisodeForm({ animeTitle: '', episode: '', season: '', epTitle: '', epDescription: '', duration: '', videoUrl: '', thumbnail: '' });
  };
  
  // Editar episodio de anime
  const handleEditAnimeEpisode = (animeId, episode) => {
    setEditAnimeEpisodeId(episode.id);
    setEditAnimeEpisodeForm(episode);
  };
  const handleEditAnimeEpisodeChange = e => setEditAnimeEpisodeForm({ ...editAnimeEpisodeForm, [e.target.name]: e.target.value });
  const handleEditAnimeEpisodeSave = (animeId) => {
    setAnime(anime.map(a => 
      a.id === animeId ? 
        { ...a, episodes: a.episodes.map(e => e.id === editAnimeEpisodeId ? { ...editAnimeEpisodeForm, id: editAnimeEpisodeId } : e) } : 
        a
    ));
    setEditAnimeEpisodeId(null);
    setEditAnimeEpisodeForm({});
  };
  const handleEditAnimeEpisodeCancel = () => {
    setEditAnimeEpisodeId(null);
    setEditAnimeEpisodeForm({});
  };
  return (
    <div>
      <h2>Gestión de Anime</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título del Anime" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" required />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL de Imagen/Thumbnail" required />
        <button type="submit">Agregar Anime</button>
      </form>
      <h3>Animes agregados</h3>
      <ul>
        {anime.map(a => (
          <li key={a.id}>
            {editId === a.id ? (
              <>
                <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Título" />
                <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Descripción" />
                <input name="year" value={editForm.year} onChange={handleEditChange} placeholder="Año" />
                <input name="genre" value={editForm.genre} onChange={handleEditChange} placeholder="Género" />
                <input name="thumbnail" value={editForm.thumbnail} onChange={handleEditChange} placeholder="URL de Imagen/Thumbnail" />
                <button onClick={handleEditSave}>Guardar</button>
                <button onClick={handleEditCancel}>Cancelar</button>
              </>
            ) : (
              <>
                <b>{a.title}</b> ({a.year}) - {a.genre}
                <button onClick={() => handleEdit(a)}>Editar</button>
                <button onClick={() => handleDelete(a.id)}>Eliminar</button>
              </>
            )}
            {/* Episodios */}
            {a.episodes && a.episodes.length > 0 && (
              <ul style={{marginTop: '0.5rem'}}>
                {a.episodes.map(e => (
                  <li key={e.id} style={{fontSize: '0.95em'}}>
                    {editAnimeEpisodeId === e.id ? (
                      <>
                        <input name="season" value={editAnimeEpisodeForm.season} onChange={handleEditAnimeEpisodeChange} placeholder="Temporada" style={{width: '60px', marginRight: '5px'}} />
                        <input name="episode" value={editAnimeEpisodeForm.episode} onChange={handleEditAnimeEpisodeChange} placeholder="Episodio" style={{width: '60px', marginRight: '5px'}} />
                        <input name="epTitle" value={editAnimeEpisodeForm.epTitle} onChange={handleEditAnimeEpisodeChange} placeholder="Título" style={{width: '150px', marginRight: '5px'}} />
                        <input name="epDescription" value={editAnimeEpisodeForm.epDescription} onChange={handleEditAnimeEpisodeChange} placeholder="Descripción" style={{width: '200px', marginRight: '5px'}} />
                        <input name="duration" value={editAnimeEpisodeForm.duration} onChange={handleEditAnimeEpisodeChange} placeholder="Duración" style={{width: '80px', marginRight: '5px'}} />
                        <input name="thumbnail" value={editAnimeEpisodeForm.thumbnail || ''} onChange={handleEditAnimeEpisodeChange} placeholder="URL Imagen/Thumbnail" style={{width: '200px', marginRight: '5px'}} />
                        <input name="videoUrl" value={editAnimeEpisodeForm.videoUrl} onChange={handleEditAnimeEpisodeChange} placeholder="URL Video" style={{width: '200px', marginRight: '5px'}} />
                        <button onClick={() => handleEditAnimeEpisodeSave(a.id)} style={{marginRight: '5px'}}>Guardar</button>
                        <button onClick={handleEditAnimeEpisodeCancel}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        T{e.season}E{e.episode}: {e.epTitle}
                        <button onClick={() => handleEditAnimeEpisode(a.id, e)} style={{marginLeft: 8, marginRight: 5}}>Editar</button>
                        <button onClick={() => handleDeleteEpisode(a.id, e.id)}>Eliminar</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <h3>Agregar Episodio</h3>
      <form className="admin-form" onSubmit={handleEpSubmit}>
        <select name="animeTitle" value={episodeForm.animeTitle} onChange={handleEpChange} required>
          <option value="">Selecciona un anime</option>
          {anime.map(a => <option key={a.id} value={a.title}>{a.title}</option>)}
        </select>
        <input name="season" value={episodeForm.season} onChange={handleEpChange} placeholder="Temporada" required />
        <input name="episode" value={episodeForm.episode} onChange={handleEpChange} placeholder="Episodio" required />
        <input name="epTitle" value={episodeForm.epTitle} onChange={handleEpChange} placeholder="Título del Episodio" required />
        <input name="epDescription" value={episodeForm.epDescription} onChange={handleEpChange} placeholder="Descripción" required />
        <input name="duration" value={episodeForm.duration} onChange={handleEpChange} placeholder="Duración" required />
        <input name="thumbnail" value={episodeForm.thumbnail} onChange={handleEpChange} placeholder="URL de Imagen/Thumbnail" />
        <input name="videoUrl" value={episodeForm.videoUrl} onChange={handleEpChange} placeholder="URL de Video" required />
        <button type="submit">Agregar Episodio</button>
      </form>
    </div>
  );
};

export default Admin;