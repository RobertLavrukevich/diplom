import '/src/styles/Header.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header({ category = 'music' }) { // category по умолчанию music
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = `/${category}`;

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        if (searchQuery.trim()) {
            navigate(`/${category}/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Определяем активную ссылку
    // const isActive = (path) => {
    //     return location.pathname === `${basePath}${path}` ? 'active' : '';
    // };

    return (
        <header>
            <div className='header-up'>
                <div className='Logo'>
                    <Link to="/">MY REVIEW</Link>
                </div>
                <div className='searchBlock'>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            name="search"
                            placeholder={`Поиск по ${category === 'music' ? 'музыке' : 'кино'}...`}
                        />
                        <button type="submit" style={{width:"30px", height:"30px"}}>
                            <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeLinejoin="round" />
                                <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="currentColor" />
                            </svg>
                        </button>
                    </form>
                </div>     
                <Link to="/account"><div className='user'></div></Link>
            </div>

            <div className='header-down'>
                <div className='navigation-bar'>
                    <Link to={basePath} className={location.pathname === basePath ? 'active' : ''}>
                        <img src="/icons/home-svgrepo-com.svg" className='icon' alt="home" />
                        Главная
                    </Link>
                    <Link to={`${basePath}/news`} className={location.pathname.includes('/news') ? 'active' : ''}>
                        <img src="/icons/news-svgrepo-com.svg" className='icon' alt="news" />
                        Новости
                    </Link>
                    <Link to={`${basePath}/top100`} className={location.pathname.includes('/top100') ? 'active' : ''}>
                        <img src="/icons/rating-svgrepo-com.svg" className='icon' alt="top" />
                        ТОП-100
                    </Link>
                    <Link to={`${basePath}/reviews`} className={location.pathname.includes('/reviews') ? 'active' : ''}>
                        <img src="/icons/comment-svgrepo-com.svg" className='icon' alt="reviews" />
                        Рецензии
                    </Link>
                    <Link to={`${basePath}/faq`} className={location.pathname.includes('/faq') ? 'active' : ''}>
                        <img src="/icons/question-circle-svgrepo-com.svg" className='icon' alt="faq" />
                        FAQ
                    </Link>
                </div>
            </div>
        </header>
    )
}