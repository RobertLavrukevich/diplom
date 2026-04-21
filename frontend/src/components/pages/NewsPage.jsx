import { useState, useEffect } from "react";
import NewsCard from "../OtherComponents/NewsCard";
import '/src/styles/NewsPage.css';

export default function NewsPage({ category }) {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
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

    if (loading) return <div className="loading">Загрузка новостей...</div>;

    return (
        <div className="news-page-container">
            <h1>Новости - {category === 'music' ? 'Музыка' : 'Кино'}</h1>
            <div className="mainblock">
                {newsList.length > 0 ? (
                    newsList.map((news) => (
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
                    ))
                ) : (
                    <p>Новостей в этой категории пока нет.</p>
                )}
            </div>
        </div>
    );
}