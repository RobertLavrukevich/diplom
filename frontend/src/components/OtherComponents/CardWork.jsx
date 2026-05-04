import { useNavigate } from 'react-router-dom';
import '/src/styles/CardWork.css';

export default function CardWork({ id, slug, imageUrl, artistName, workName, rating, category, workTypeName }) {
    const navigate = useNavigate();

    const getTypeSlug = (typeName) => {
        const types = {
            'Альбом': 'album',
            'Сингл': 'single',
            'Фильм': 'film',
            'Сериал': 'series'
        };
        return types[typeName] || typeName.toLowerCase();
    };

    const handleNavigate = () => {
        const typeSlug = getTypeSlug(workTypeName);
        navigate(`/${category}/${typeSlug}/${slug}`);
    };

    return (
        <div className="card-block">
            <div className="card-content">
                <img className="workimg" src={imageUrl} alt={workName} />
                <div className="work-name">{workName}</div>
                <div className="name-artist">{artistName}</div>
                <div className="rating">{rating}</div>
                <button className="workcardbtn" onClick={handleNavigate}>Перейти</button>
            </div>
        </div>
    );
}