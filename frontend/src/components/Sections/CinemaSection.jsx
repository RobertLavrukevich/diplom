import { Outlet } from 'react-router-dom';
import Header from '../OtherComponents/Header';
import Footer from '../OtherComponents/Footer';

export default function CinemaSection() {
  return (
    <div className="cinema-layout">
      <Header category="cinema" /> {/* Передаём категорию в header */}
      <main className="content">
        <Outlet /> {/* Здесь будут отображаться дочерние страницы */}
      </main>
      <Footer />
    </div>
  );
};