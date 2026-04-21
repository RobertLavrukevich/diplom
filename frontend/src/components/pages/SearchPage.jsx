import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardWork from '../OtherComponents/CardWork';

export default function SearchPage({ category }) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query.trim()) return;

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/search.php?category=${category}&q=${encodeURIComponent(query)}`);
                const data = await response.json();
                
                if (data.error) {
                    console.error("Ошибка бэкенда:", data.error);
                    setResults([]);
                } else {
                    setResults(data);
                }
            } catch (error) {
                console.error("Ошибка при поиске:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearch();
    }, [query, category]);

    return (
        <div className="search-results-container" style={{ padding: '20px' }}>
            <h2 style={{color: "white"}}>Поиск: {category === 'music' ? 'Музыка' : 'Кино'}</h2>
            <p style={{color: "gray"}}>Результаты по запросу: "{query}"</p>

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : (
                <div className="results-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                    {results.length > 0 ? (
                        results.map((work) => (
                            <CardWork 
                                key={work.id}
                                id={work.id}
                                imageUrl={work.poster_url}
                                workName={work.title}
                                artistName={category === 'music' ? work.singers : work.actors}
                                rating={work.average_rating}
                                category={category}
                                workTypeName={work.work_type_name}
                            />
                        ))
                    ) : (
                        <p style={{color: "white"}}>Ничего не найдено</p>
                    )}
                </div>
            )}
        </div>
    );
}