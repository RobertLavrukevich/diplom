import '/src/styles/Statistica.css'
export default function StatisticaCinema({users, films, series, comments}){
    return(
        <div className="statblock">
            <h2>Статистика</h2>
            <div className="statdata">
                <ul className='datatext'>
                    <li><img src="/icons/avatar-svgrepo-com.svg" className='icon'/> Всего пользователей</li>
                    <li><img src="/icons/music-svgrepo-com.svg" className='icon'/> Всего фильмов</li>
                    <li><img src="/icons/album-svgrepo-com.svg" className='icon'/> Всего сериалов</li>
                    <li><img src="/icons/comment-svgrepo-com.svg" className='icon'/> Рецензий</li>
                </ul>
                <ul className='datadigits'>
                    <li>{users}</li>
                    <li>{films}</li>
                    <li>{series}</li>
                    <li>{comments}</li>
                </ul>  
            </div>
        </div>
    )
}