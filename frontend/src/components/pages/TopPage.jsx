import { useState, useEffect } from 'react';
import '/src/styles/TopPage.css';
import TopWorkCard from '../OtherComponents/TopWorkCard';

export default function TopPage({ category }) {
    const [selectedType, setSelectedType] = useState(
        category === 'music' ? 'single' : 'film'
    );
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSelectedType(category === 'music' ? 'single' : 'film');
    }, [category]);

    useEffect(() => {
        const fetchTopWorks = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8000/get_top_works.php?category=${category}&type=${selectedType}`
                );
                const data = await response.json();
                if (!data.error) {
                    setWorks(data);
                }
            } catch (error) {
                console.error("Ошибка загрузки чарта:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopWorks();
    }, [category, selectedType]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const firstColumn = works.slice(0, 15);
    const secondColumn = works.slice(15, 30);

    if (loading) return <div className="loading">Загрузка чарта...</div>;

    return (
        <div className="top-page-container">
            <div className="topworksblock">
                <div className="top-header">
                    <h1 className="toph2">ТОП-30: {category === 'music' ? 'МУЗЫКА' : 'КИНО'}</h1>
                    
                    <select 
                        value={selectedType}
                        onChange={handleTypeChange}
                        className="top-select"
                    >
                        {category === 'music' ? (
                            <>
                                <option value="single">Синглы</option>
                                <option value="album">Альбомы</option>
                            </>
                        ) : (
                            <>
                                <option value="film">Фильмы</option>
                                <option value="series">Сериалы</option>
                            </>
                        )}
                    </select>
                </div>

                <div className="top-columns">
                    {works.length > 0 ? (
                        <>
                            <div className="top-column">
                                {firstColumn.map((item, index) => (
                                    <TopWorkCard
                                        key={item.id}
                                        rank={index + 1}
                                        imageUrl={item.imageUrl}
                                        title={item.title}
                                        artist={category === 'music' ? item.singers : item.actors}
                                        rating={item.rating}
                                        reviewsCount={item.totalReviews}
                                        workSlug={item.slug} 
                                        workType={selectedType}
                                        category={category}
                                    />
                                ))}
                            </div>

                            <div className="top-column">
                                {secondColumn.map((item, index) => (
                                    <TopWorkCard
                                        key={item.id}
                                        rank={index + 16}
                                        imageUrl={item.imageUrl}
                                        title={item.title}
                                        artist={category === 'music' ? item.singers : item.actors}
                                        rating={item.rating}
                                        reviewsCount={item.totalReviews}
                                        workSlug={item.slug}
                                        workType={selectedType}
                                        category={category}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="no-data">В этой категории пока нет произведений.</p>
                    )}
                </div>
            </div>
        </div>
    );
}