import { useNavigate } from 'react-router-dom';
import '/src/styles/CardWork.css';
import { getRatingColor } from '../../assets/getRatingColor';

export default function CardWork({slug, imageUrl, artistName, workName, rating, category, workTypeName }) {
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
                <div className="rating" style={{ backgroundColor: getRatingColor(rating) }}>{rating}</div>
                <button className="workcardbtn" onClick={handleNavigate}>Перейти</button>
            </div>
        </div>
    );
}