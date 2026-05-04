import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/src/styles/SearchPage.css'
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
        <div className="search-results-container">
            <p className='result-text'>Результаты по поиску: "{query}"</p>

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : (
                <div className="results-grid">
                    {results.length > 0 ? (
                        results.map((work) => (
                            <CardWork 
                                key={work.id}
                                id={work.id}
                                slug={work.slug}
                                imageUrl={work.poster_url}
                                workName={work.title}
                                artistName={category === 'music' ? work.singers : work.actors}
                                rating={work.average_rating}
                                category={category}
                                workTypeName={work.work_type_name}
                            />
                        ))
                    ) : (
                        <p className='no-search'>Ничего не найдено</p>
                    )}
                </div>
            )}
        </div>
    );
}