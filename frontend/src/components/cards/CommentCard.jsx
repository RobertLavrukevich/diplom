import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/CommentCard.css';
import { getRatingColor } from '../../assets/getRatingColor';


export default function CommentCard({
    reviewId,
    userId,
    imageUrl,
    userName,
    userRating,
    commentTitle,
    commentContent,
    nameWork,
    nameArtist,
    currentUserId,
    isClickable = true,
    initialLikesCount = 0,
    initialIsLiked = false,
    showLikeSection = false,
    showDeleteButton = false,
    onDeleteClick
}) {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    useEffect(() => {
        setIsLiked(initialIsLiked);
        setLikesCount(initialLikesCount);
    }, [initialIsLiked, initialLikesCount]);

    const handleUserClick = () => {
        if (!isClickable) return;
        if (userId && currentUserId && String(userId) === String(currentUserId)) {
            navigate('/account');
        } else if (userId) {
            navigate(`/user/${userName}`);
        }
    };

    const handleToggleLike = async () => {
        if (!currentUserId) return alert("Пожалуйста, войдите, чтобы ставить лайки");

        try {
            const response = await fetch(`http://localhost:8000/public/social/toggle_review_like.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: currentUserId, review_id: reviewId })
            });
            const data = await response.json();

            if (data.status === 'added') {
                setIsLiked(true);
                setLikesCount(prev => prev + 1);
            } else if (data.status === 'removed') {
                setIsLiked(false);
                setLikesCount(prev => prev - 1);
            }
        } catch (err) {
            console.error("Ошибка при лайке рецензии:", err);
        }
    };

    return (
        <div className='comment-card-block'>
            <div className='blockup'>
                <div 
                    className='user-info' 
                    onClick={handleUserClick} 
                    style={{ cursor: isClickable ? 'pointer' : 'default' }}
                >
                    <img className='user-avatar' src={imageUrl || "/icons/avatar-svgrepo-com.svg"} alt="avatar"  onError={(e) => { e.target.src = "/icons/avatar-svgrepo-com.svg"; }}/>
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='user-rating' style={{ backgroundColor: getRatingColor(userRating) }}>{userRating}</div>
            </div>
            <div className='blockdown'>
                <div className='work-info'>{nameArtist + " — " + nameWork}</div>
                <div className='comment-block'>
                    <div className='comment-title'>{commentTitle}</div>
                    <div className='comment-content'>{commentContent}</div>
                </div>

                {showLikeSection && (
                    <div className="review-like-section">
                        <button 
                            className={`review-like-btn ${isLiked ? 'active' : ''}`}
                            onClick={handleToggleLike}
                        >
                            {isLiked ? '❤️' : '🤍'}
                        </button>
                        <span className="likes-counter">{likesCount}</span>
                    </div>
                )}
                {showDeleteButton && (
                        <button 
                            className="review-delete-btn" 
                            onClick={() => onDeleteClick(reviewId)}
                        >
                            Удалить
                        </button>
                    )}
            </div>
        </div>
    );
}