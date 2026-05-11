import '/src/styles/Statistica.css'

export default function StatisticaMusic({users, tracks, albums, comments}){
    return(
        <div className="statblock">
            <div className="stat-container">
                <h2 className='stath2'>Статистика</h2>
                <ul className="stat-list">
                    <li>
                        <div className="stat-label">
                            <img src="/icons/avatar-svgrepo-com.svg" className='icon' alt="users" /> 
                            <span>Всего пользователей</span>
                        </div>
                        <span className='stat-value'>{users}</span>
                    </li>
                    <li>
                        <div className="stat-label">
                            <img src="/icons/music-svgrepo-com.svg" className='icon' alt="tracks" /> 
                            <span>Всего треков</span>
                        </div>
                        <span className='stat-value'>{tracks}</span>
                    </li>
                    <li>
                        <div className="stat-label">
                            <img src="/icons/album-svgrepo-com.svg" className='icon' alt="albums" /> 
                            <span>Всего альбомов</span>
                        </div>
                        <span className='stat-value'>{albums}</span>
                    </li>
                    <li>
                        <div className="stat-label">
                            <img src="/icons/comment-svgrepo-com.svg" className='icon' alt="reviews" /> 
                            <span>Рецензий</span>
                        </div>
                        <span className='stat-value'>{comments}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}