import { Outlet } from 'react-router-dom';

export default function CinemaSection() {
  return (
    <div className="cinema-layout">
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};