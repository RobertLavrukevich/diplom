import { useNavigate } from 'react-router-dom';
import '/src/styles/CommentCard.css'

export default function CommentCard({userId, imageUrl, userName, userRating, commentTitle, commentContent, nameWork, nameArtist, currentUserId, isClickable = true,}){
    const navigate = useNavigate();

    const handleUserClick = () => {
            if (!isClickable) return;

            if (userId && currentUserId && String(userId) === String(currentUserId)) {
                navigate('/account');
            } 
            else if (userId) {
                navigate(`/user/${userId}`);
            }
        };

    return(
        <>
        <div className='comment-card-block'>
            <div className='blockup'>
                <div 
                    className='user-info' 
                    onClick={handleUserClick} 
                    style={{ cursor: isClickable ? 'pointer' : 'default' }}
                >
                    <img className='user-avatar' src={imageUrl} alt="user-avatar" />
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='user-rating'>{userRating}</div>
            </div>
            <div className='blockdown'>
                <div className='work-info'>{nameArtist + " — " + nameWork}</div>
                <div className='comment-block'>
                    <div className='comment-title'>{commentTitle}</div>
                    <div className='comment-content'>{commentContent}</div>
                </div>
            </div>
        </div>  
        </>
    )
}