import '/src/styles/AccountPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CommentCard from '../OtherComponents/CommentCard';

const ActivityButton = ({ active, onClick, children }) => {
  return (
    <button className={`activity-btn ${active ? 'active' : ''}`} onClick={onClick}>
        {children}
    </button>
  );
};



const Subscriptions = () => {
  const subscriptions = [
    { id: 1, name: 'SimonVB', avatar: 'https://storage.yandexcloud.net/static-production/rztbackend/users/56959/36c7618a-e276-4068-9a53-faf4aab3009e.jpg' },
    { id: 2, name: 'ИронияKID', avatar: 'https://storage.yandexcloud.net/static-production/rztbackend/users/107454/6e9e49ca-1bf9-49bd-a33e-f1d85c0463ce.jpg'},
    { id: 3, name: 'modifiedaa', avatar: 'https://storage.yandexcloud.net/static-production/rztbackend/users/91847/afae5321-d9bf-437f-866f-7d56c3a39b3d.jpeg'},
  ];

  return (
    <div className="subscriptions-grid">
      {subscriptions.map(sub => (
        <div key={sub.id} className="subscription-card">
          <div className="sub-avatar">
            {sub.avatar ? (
              <img src={sub.avatar} alt={sub.name} />
            ) : (
              <div className="avatar-placeholder">{sub.name[0]}</div>
            )}
          </div>
          <span className="sub-name">{sub.name}</span>
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
          imageUrl={review.avatar_url || 'https://zefirka.club/wallpapers/uploads/posts/2023-03/1678141011_zefirka-club-p-krutie-avatarki-na-stendoff-29.jpg'} 
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
    const types = { 'Альбом': 'album', 'Сингл': 'single', 'Фильм': 'film', 'Сериал': 'series' };
    return types[typeName] || (typeName ? typeName.toLowerCase() : '');
  };

  const handleNavigate = (item) => {
    const typeSlug = getTypeSlug(item.typeName);
    const category = item.category; 
    
    if (category && typeSlug && item.id) {
        navigate(`/${category}/${typeSlug}/${item.id}`);
    }
  };

  if (!favorites || favorites.length === 0) {
    return <p className="no-data">У пользователя пока нет любимых произведений.</p>;
  }

  return (
    <div className="activity-grid">
      {favorites.map(item => (
        <div 
            key={item.id} 
            className="activity-card" 
            onClick={() => handleNavigate(item)}
            style={{ cursor: 'pointer' }}
        >
          <div className="card-type">{item.typeName}</div>
          <div className='card-info'>
            <div className='img-block'>
                <img className='card-img' src={item.poster_url} alt={item.title}/>
            </div>
            <div className='card-text'>
                <h4 className="card-title">{item.title}</h4>
                <div className="card-details">
                    <p>{item.singers || item.actors}</p>
                </div>
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
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('reviews');
  const [targetUser, setTargetUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userId) {
      setLoading(true);
      fetch(`http://localhost:8000/get_user_info.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data.error) setTargetUser(data);
        });

      fetch(`http://localhost:8000/get_user_reviews.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => !data.error && setUserReviews(data));
      
      fetch(`http://localhost:8000/get_user_favorites.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => !data.error && setFavorites(data));
        
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div className="account-page"><h2>Загрузка...</h2></div>;
  if (!targetUser) return <div className="account-page"><h2>Пользователь не найден</h2></div>;

  const registrationDate = targetUser.created_at 
    ? new Date(targetUser.created_at).toLocaleDateString('ru-RU') 
    : 'Не указана';

  const renderActivity = () => {
    switch(activeTab) {
      case 'reviews': return <UserReviews reviews={userReviews} />;
      case 'liked': return <LikedItems favorites={favorites} />;
      case 'subscriptions': return <Subscriptions />;
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
              src={targetUser.avatar_url || "https://storage.yandexcloud.net/static-production/rztbackend/users/default.png"} 
              alt="userava" 
            />
          </div>
          <div className='userinfo'>
            <h3 className='username'>{targetUser.username}</h3>
            <h4 className='usermail'>Почта: {targetUser.email}</h4>
            <h4 className='userdate'>Дата регистрации: {registrationDate}</h4>
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