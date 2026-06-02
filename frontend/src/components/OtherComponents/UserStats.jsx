import '/src/styles/UserStats.css'

export default function UserStats({ stats }){
  if (!stats) return null;
  return (
    <div className="user-stats-container">
      <div className="stat-item">
        <span className="stat-value">{stats.reviews}</span>
        <span className="stat-label">Рецензии</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.followers}</span>
        <span className="stat-label">Подписчики</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.following}</span>
        <span className="stat-label">Подписки</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.likes}</span>
        <span className="stat-label">Лайки</span>
      </div>
    </div>
  );
};