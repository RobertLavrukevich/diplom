import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './components/pages/StartPage';
import MusicHomePage from './components/pages/MusicHomePage';
import CinemaHomePage from './components/pages/CinemaHomePage';
import NewsPage from './components/pages/NewsPage';
import TopPage from './components/pages/TopPage';
import ReviewsPage from './components/pages/ReviewsPage';
import FAQPage from './components/pages/FAQPage';
import AboutPage from './components/pages/AboutPage';
import SearchPage from './components/pages/SearchPage';
import AccountPage from './components/pages/AccountPage';
import MusicSection from './components/Sections/MusicSection';
import CinemaSection from './components/Sections/CinemaSection';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<StartPage />} />
        
        {/* Раздел Музыки */}
        <Route path="/music" element={<MusicSection />}>
          <Route index element={<MusicHomePage />} />
          <Route path="reviews" element={<ReviewsPage category="music" />} />
          <Route path="top100" element={<TopPage category="music" />} />
          <Route path="news" element={<NewsPage category="music" />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        
        {/* Раздел Кино */}
        <Route path="/cinema" element={<CinemaSection />}>
          <Route index element={<CinemaHomePage />} />
          <Route path="reviews" element={<ReviewsPage category="cinema" />} />
          <Route path="top100" element={<TopPage category="cinema" />} />
          <Route path="news" element={<NewsPage category="cinema" />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        
        {/* Аккаунт пользователя (общий) */}
        <Route path="/account" element={<AccountPage />} />
        
        {/* Редirect для старых путей */}
        <Route path="/useraccount" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  )
}