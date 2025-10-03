import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Novels from './pages/Novels';
import Anime from './pages/Anime';
import VideoPlayer from './components/VideoPlayer';
import SeriesDetail from './pages/SeriesDetail';
import NovelsDetail from './pages/NovelsDetail';
import AnimeDetail from './pages/AnimeDetail';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { useState } from 'react';
import './App.css';
import { ContentProvider } from './ContentContext';

function App() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  return (
    <ContentProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/peliculas" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/series/:title" element={<SeriesDetail />} />
              <Route path="/novelas" element={<Novels />} />
              <Route path="/novelas/:title" element={<NovelsDetail />} />
              <Route path="/anime" element={<Anime />} />
              <Route path="/anime/:title" element={<AnimeDetail />} />
              <Route path="/ver/:type/:id" element={<VideoPlayer />} />
              <Route path="/admin" element={adminAuthenticated ? <Admin /> : <AdminLogin onLogin={() => setAdminAuthenticated(true)} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App; 