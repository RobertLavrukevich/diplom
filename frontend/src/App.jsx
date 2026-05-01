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
import WorkPage from './components/pages/WorkPage';
import MainSection from './components/Sections/MainSection';
import AuthPage from './components/pages/AuthPage';
import UserPage from './components/pages/UserPage';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        
        <Route element={<MainSection />}>
          <Route path="/music" element={<MusicSection />}>
            <Route index element={<MusicHomePage />} />
            <Route path="reviews" element={<ReviewsPage category="music" />} />
            <Route path="top30" element={<TopPage category="music" />} />
            <Route path="news" element={<NewsPage category="music" />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="album/:workId" element={<WorkPage category="music" workType="album" />} />
            <Route path="single/:workId" element={<WorkPage category="music" workType="single" />} />
            <Route path="search" element={<SearchPage category="music" />} />
          </Route>
          
          <Route path="/cinema" element={<CinemaSection />}>
            <Route index element={<CinemaHomePage />} />
            <Route path="reviews" element={<ReviewsPage category="cinema" />} />
            <Route path="top30" element={<TopPage category="cinema" />} />
            <Route path="news" element={<NewsPage category="cinema" />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="film/:workId" element={<WorkPage category="cinema" workType="film" />} />
            <Route path="series/:workId" element={<WorkPage category="cinema" workType="series" />} /> 
            <Route path="search" element={<SearchPage category="cinema" />} />
          </Route>
          
          <Route path="/account" element={<AccountPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}