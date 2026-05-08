import '/src/styles/AccountPage.css';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import CommentCard from '../OtherComponents/CommentCard';

const ActivityButton = ({ active, onClick, children }) => {
    return (
        <button className={`activity-btn ${active ? 'active' : ''}`} onClick={onClick}>
            {children}
        </button>
    );
};

const Subscriptions = ({ userId }) => {
    const [subs, setSubs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8000/get_subscriptions.php?user_id=${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) setSubs(data);
                });
        }
    }, [userId]);

    if (subs.length === 0) return <p className="no-data">Подписок пока нет.</p>;

    return (
        <div className="subscriptions-grid">
            {subs.map(sub => (
                <div 
                    key={sub.id} 
                    className="subscription-card" 
                    onClick={() => navigate(`/user/${sub.username}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="sub-avatar">
                        {sub.avatar_url ? (
                            <img src={sub.avatar_url} alt={sub.username} />
                        ) : (
                            <div className="avatar-placeholder">{sub.username[0]}</div>
                        )}
                    </div>
                    <span className="sub-name">{sub.username}</span>
                </div>
            ))}
        </div>
    );
};

const UserReviews = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <p className="no-data">Пользователь еще не написал ни одной рецензии.</p>;
    }
    return (
        <>
            {reviews.map((review) => (
                <CommentCard 
                    key={review.id}
                    userId={review.user_id}
                    isClickable={false}
                    imageUrl={review.avatar_url} 
                    userName={review.username} 
                    userRating={review.rating} 
                    commentTitle={review.review_title} 
                    commentContent={review.content} 
                    nameWork={review.work_title} 
                    nameArtist={review.singers || review.actors}
                />
            ))}
        </>
    );
};

const LikedItems = ({ favorites }) => {
    const navigate = useNavigate();

    const getTypeSlug = (typeName) => {
        const types = { 
          'Альбом': 'album', 
          'Сингл': 'single', 
          'Фильм': 'film', 
          'Сериал': 'series' };
        return types[typeName] || (typeName ? typeName.toLowerCase() : '');
    };

    const handleNavigate = (item) => {
        const typeSlug = getTypeSlug(item.typeName);
        const category = item.category; 
        if (category && typeSlug && item.id) {
            navigate(`/${category}/${typeSlug}/${item.slug}`);
        }
    };

    if (!favorites || favorites.length === 0) {
        return <p className="no-data">У пользователя пока нет любимых произведений.</p>;
    }

    return (
        <div className="activity-grid">
            {favorites.map(item => (
                <div key={item.id} className="activity-card" onClick={() => handleNavigate(item)} style={{ cursor: 'pointer' }}>
                    <div className="card-type">{item.typeName}</div>
                    <div className='card-info'>
                        <div className='img-block'>
                            <img className='card-img' src={item.poster_url} alt={item.title}/>
                        </div>
                        <div className='card-text'>
                            <h4 className="card-title">{item.title}</h4>
                            <div className="card-details"><p>{item.singers || item.actors}</p></div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span className="card-date">{new Date(item.release_date).getFullYear()}</span>
                        <span className="card-rating">❤️</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function UserPage() {
    const { username } = useParams();
    const { user: currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [targetUser, setTargetUser] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [activeTab, setActiveTab] = useState('reviews');
    const [userReviews, setUserReviews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (username) {
            setLoading(true);
            fetch(`http://localhost:8000/get_user_info.php?username=${username}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setTargetUser(data);
                        fetch(`http://localhost:8000/get_user_reviews.php?user_id=${data.id}`)
                            .then(res => res.json())
                            .then(reviewsData => !reviewsData.error && setUserReviews(reviewsData));
                        
                        fetch(`http://localhost:8000/get_user_favorites.php?user_id=${data.id}`)
                            .then(res => res.json())
                            .then(favData => !favData.error && setFavorites(favData));
                    }
                    setLoading(false);
                });
        }
    }, [username]);

    useEffect(() => {
        if (currentUser && targetUser && currentUser.id !== targetUser.id) {
            fetch(`http://localhost:8000/check_subscription.php?follower_id=${currentUser.id}&following_id=${targetUser.id}`)
                .then(res => res.json())
                .then(data => setIsSubscribed(data.isSubscribed));
        }
    }, [currentUser, targetUser]);

    const handleSubscribe = () => {
        if (!currentUser) {
            navigate('/auth');
            return;
        }

        fetch('http://localhost:8000/toggle_subscription.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                follower_id: currentUser.id,
                following_id: targetUser.id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'subscribed') setIsSubscribed(true);
            if (data.status === 'unsubscribed') setIsSubscribed(false);
        })
        .catch(err => console.error("Ошибка подписки:", err));
    };

    if (loading) return <div className="account-page"><h2>Загрузка...</h2></div>;
    if (!targetUser) return <div className="account-page"><h2>Пользователь не найден</h2></div>;

    const registrationDate = targetUser.created_at 
        ? new Date(targetUser.created_at).toLocaleDateString('ru-RU') 
        : 'Не указана';

    const renderActivity = () => {
        switch(activeTab) {
            case 'reviews': return <UserReviews reviews={userReviews} />;
            case 'liked': return <LikedItems favorites={favorites} />;
            case 'subscriptions': return <Subscriptions userId={targetUser.id} />;
            default: return null;
        }
    };

    return (
        <div className="account-page">
            <div className='accountblock'>
                <div className='usercard'>
                    <div className='user-avatar'>
                        <img 
                            className='avaimg' 
                            src={targetUser.avatar_url || "/icons/avatar-svgrepo-com.svg"} 
                            alt="userava" 
                        />
                    </div>
                    <div className='userinfo'>
                        <h3 className='username'>{targetUser.username}</h3>
                        <h4 className='userdate'>Дата регистрации: {registrationDate}</h4>
                        
                        {currentUser && currentUser.id !== targetUser.id && (
                            <button 
                                className={`subscribe-btn ${isSubscribed ? 'active' : ''}`} 
                                onClick={handleSubscribe}
                                style={{backgroundColor: isSubscribed ? '#444' : '#e50914',}}
                            >
                                {isSubscribed ? 'Отписаться' : 'Подписаться'}
                            </button>
                        )}
                    </div>
                </div>
                
                <div className='user-activity'>
                    <div className='activity-buttons'>
                        <ActivityButton active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')}>
                            Подписки
                        </ActivityButton>
                        <ActivityButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
                            Рецензии
                        </ActivityButton>
                        <ActivityButton active={activeTab === 'liked'} onClick={() => setActiveTab('liked')}>
                            Понравилось
                        </ActivityButton>
                    </div>
                    
                    <div className='activity-result'>
                        {renderActivity()}
                    </div>
                </div>
            </div>
        </div>
    );
}