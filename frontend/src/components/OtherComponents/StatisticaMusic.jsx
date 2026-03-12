import '/src/styles/Statistica.css'
export default function StatisticaMusic({users, tracks, albums, comments}){
    return(
        <div className="statblock">
            <h2>Статистика</h2>
            <div className="statdata">
                <ul className='datatext'>
                    <li><img src="/icons/avatar-svgrepo-com.svg" className='icon' alt="news" /> Всего пользователей</li>
                    <li><img src="/icons/music-svgrepo-com.svg" className='icon' alt="news" /> Всего треков</li>
                    <li><img src="/icons/album-svgrepo-com.svg" className='icon' alt="news" /> Всего альбомов</li>
                    <li><img src="/icons/comment-svgrepo-com.svg" className='icon' alt="news" /> Рецензий</li>
                </ul>
                <ul className='datadigits'>
                    <li>{users}</li>
                    <li>{tracks}</li>
                    <li>{albums}</li>
                    <li>{comments}</li>
                </ul>  
            </div>
        </div>
    )
}