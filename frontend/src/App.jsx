import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './components/pages/StartPage';
import MusicHomePage from './components/pages/MusicHomePage';
import CinemaHomePage from './components/pages/CinemaHomePage';
import NewsPage from './components/pages/NewsPage';
import TopPage from './components/pages/TopPage';
import FAQPage from './components/pages/FAQPage';
import SearchPage from './components/pages/SearchPage';
import AccountPage from './components/pages/AccountPage';
import MusicSection from './components/Sections/MusicSection';
import CinemaSection from './components/Sections/CinemaSection';
import WorkPage from './components/pages/WorkPage';
import MainSection from './components/Sections/MainSection';
import AuthPage from './components/pages/AuthPage';
import UserPage from './components/pages/UserPage';
import AdminPage from './components/pages/AdminPage';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        
        <Route element={<MainSection />}>
          <Route path="/music" element={<MusicSection />}>
            <Route index element={<MusicHomePage />} />
            <Route path="top30" element={<TopPage category="music" />} />
            <Route path="news" element={<NewsPage category="music" />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="album/:workSlug" element={<WorkPage category="music" workType="album" />} />
            <Route path="single/:workSlug" element={<WorkPage category="music" workType="single" />} />
            <Route path="search" element={<SearchPage category="music" />} />
          </Route>
          
          <Route path="/cinema" element={<CinemaSection />}>
            <Route index element={<CinemaHomePage />} />
            <Route path="top30" element={<TopPage category="cinema" />} />
            <Route path="news" element={<NewsPage category="cinema" />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="film/:workSlug" element={<WorkPage category="cinema" workType="film" />} />
            <Route path="series/:workSlug" element={<WorkPage category="cinema" workType="series" />} /> 
            <Route path="search" element={<SearchPage category="cinema" />} />
          </Route>
          
          <Route path="/account" element={<AccountPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}