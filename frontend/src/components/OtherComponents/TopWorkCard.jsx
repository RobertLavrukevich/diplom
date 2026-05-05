import '/src/styles/TopWorkCard.css'
import { useNavigate } from 'react-router-dom';
import { getRatingColor } from '../../assets/getRatingColor';


export default function TopWorkCard({ 
    rank, 
    imageUrl, 
    title, 
    artist, 
    rating, 
    reviewsCount , 
    workSlug,
    workType,
    category
}) {
    const navigate = useNavigate();

     const handleClick = () => {
        navigate(`/${category}/${workType}/${workSlug}`);
    };

    return (
        <div className="top-card" onClick={handleClick}>
            <div className="top-rank">{rank}</div>
            <img 
                src={imageUrl || "https://via.placeholder.com/50x50"} 
                alt={title} 
                className="top-image" 
            />            
            <div className="top-info">
                <h3 className="top-title">{title}</h3>
                <p className="top-artist">{artist}</p>
            </div>            
            <div className="top-stats">
                <div className="top-rating" style={{ backgroundColor: getRatingColor(rating) }}>{rating}</div>
                <div className="top-reviews">
                    <span className="reviews-icon">Кол-во рецензий: </span>
                    {reviewsCount}
                </div>
            </div>
        </div>
    );
}