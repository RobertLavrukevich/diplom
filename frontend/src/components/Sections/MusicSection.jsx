import { Outlet } from 'react-router-dom';
import Header from '../OtherComponents/Header';
import Footer from '../OtherComponents/Footer';

export default function MusicSection() {
  return (
    <div className="music-layout">
      <Header category="music" /> {/* Передаём категорию в header */}
      <main className="content">
        <Outlet /> {/* Здесь будут отображаться дочерние страницы */}
      </main>
      <Footer />
    </div>
  );
};