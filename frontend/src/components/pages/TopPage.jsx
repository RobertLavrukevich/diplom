import '/src/styles/TopPage.css'
import TopWorkCard from '../OtherComponents/TopWorkCard'
import { useState } from 'react';

export default function TopPage({ category }) {
    const [selectedType, setSelectedType] = useState(
        category === 'music' ? 'single' : 'film'
    );

    const generateData = (type) => {
        const data = [];
        const prefix = category === 'music' 
            ? (type === 'single' ? 'Сингл' : 'Альбом')
            : (type === 'film' ? 'Фильм' : 'Сериал');
        
        for (let i = 1; i <= 30; i++) {
            data.push({
                id: i,
                rank: i,
                imageUrl: `https://i.scdn.co/image/ab67616d00001e021a8731c6268bebfd34facda7`,
                title: `${prefix} ${i}`,
                artist: category === 'music' 
                    ? `Исполнитель ${i}` 
                    : `Актёры ${i}`,
                rating: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
                reviewsCount: Math.floor(Math.random() * 300) + 50
            });
        }
        return data;
    };

    const musicData = {
        single: generateData('single'),
        album: generateData('album')
    };

    const cinemaData = {
        film: generateData('film'),
        series: generateData('series')
    };

    const currentData = category === 'music' 
        ? musicData[selectedType] 
        : cinemaData[selectedType];

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const firstColumn = currentData.slice(0, 15);
    const secondColumn = currentData.slice(15, 30);

    return (
        <div className="top-page-container">
            <div className="topworksblock">
                <div className="top-header">
                    <h1 className="toph2">ТОП-30</h1>
                    
                    {category === 'music' ? (
                        <select 
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="top-select"
                        >
                            <option value="single">Синглы</option>
                            <option value="album">Альбомы</option>
                        </select>
                    ) : (
                        <select 
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="top-select"
                        >
                            <option value="film">Фильмы</option>
                            <option value="series">Сериалы</option>
                        </select>
                    )}
                </div>

                <div className="top-columns">
                    <div className="top-column">
                        {firstColumn.map((item) => (
                            <TopWorkCard
                                key={`first-${item.id}`}
                                rank={item.rank}
                                imageUrl={item.imageUrl}
                                title={item.title}
                                artist={item.artist}
                                rating={item.rating}
                                reviewsCount={item.reviewsCount}
                                workId={item.id}       
                                workType={selectedType}     
                                category={category}
                            />
                        ))}
                    </div>

                    <div className="top-column">
                        {secondColumn.map((item) => (
                            <TopWorkCard
                                key={`second-${item.id}`}
                                rank={item.rank}
                                imageUrl={item.imageUrl}
                                title={item.title}
                                artist={item.artist}
                                rating={item.rating}
                                reviewsCount={item.reviewsCount}
                                workId={item.id}         
                                workType={selectedType} 
                                category={category}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}