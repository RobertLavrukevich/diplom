import { useState, useEffect } from "react";
import NewsCard from "../OtherComponents/NewsCard";
import '/src/styles/NewsPage.css';

export default function NewsPage({ category }) {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleNewsCount, setVisibleNewsCount] = useState(1);

    useEffect(() => {
        setLoading(true);
        setVisibleNewsCount(1);
        fetch(`http://localhost:8000/get_news.php?category=${category}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setNewsList(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки новостей:", err);
                setLoading(false);
            });
    }, [category]);

    const showMoreNews = () => {
        setVisibleNewsCount(prev => prev + 1);
    };

    if (loading) return <div className="loading">Загрузка новостей...</div>;

    return (
        <div className="news-page-container">
            <h1>Новости - {category === 'music' ? 'Музыка' : 'Кино'}</h1>
            <div className="mainblock">
                {newsList.length > 0 ? (
                    <>
                        {newsList.slice(0, visibleNewsCount).map((news) => (
                            <NewsCard 
                                key={news.id}
                                title={news.title}
                                date={new Date(news.created_at).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                                imageUrl={news.image_url || "/icons/news-placeholder.svg"} 
                                content={news.content}
                            />
                        ))}
                        {visibleNewsCount < newsList.length && (
                            <div className="show-more-container">
                                <button className="show-more-btn" onClick={showMoreNews}>
                                    Показать ещё новости
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Новостей в этой категории пока нет.</p>
                )}
            </div>
        </div>
    );
}