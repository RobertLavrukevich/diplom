import { Outlet } from 'react-router-dom';

export default function MusicSection() {
  return (
    <div className="music-layout">
      <main className="content">
        <Outlet /> 
      </main>
    </div>
  );
};