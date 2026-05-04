import '/src/styles/AccountPage.css'
import { useState, useEffect, } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import CommentCard from '../OtherComponents/CommentCard';

const ActivityButton = ({ active, onClick, children }) => {
  return (
    <button className={`activity-btn ${active ? 'active' : ''}`} onClick={onClick}>{children} </button>
  );
};


const MyReviews = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="no-data">Вы еще не написали ни одной рецензии.</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <CommentCard 
          key={review.id}
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
    const types = {
      'Альбом': 'album',
      'Сингл': 'single',
      'Фильм': 'film',
      'Сериал': 'series'
    };
    return types[typeName] || (typeName ? typeName.toLowerCase() : '');
  };

    const handleNavigate = (item) => {
    const typeSlug = getTypeSlug(item.typeName);
    const category = item.category; 
    
    if (category && typeSlug && item.slug) {
        navigate(`/${category}/${typeSlug}/${item.slug}`);
    } else {
        console.error("Недостаточно данных для навигации:", item);
    }
  };

  if (!favorites || favorites.length === 0) {
    return <p className="no-data">У вас пока нет любимых произведений.</p>;
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

const Subscriptions = ({ userId }) => {
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/get_subscriptions.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => !data.error && setSubs(data));
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

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const { user, logout } = useContext(AuthContext);
  const [userReviews, setUserReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8000/get_user_reviews.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => !data.error && setUserReviews(data));
      
      fetch(`http://localhost:8000/get_user_favorites.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => !data.error && setFavorites(data));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="account-page">
        <h2>Пожалуйста, авторизуйтесь</h2>
        <button onClick={() => navigate('/auth')}>Перейти ко входу</button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const registrationDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('ru-RU') 
    : 'Не указана';


 const renderActivity = () => {
    switch(activeTab) {
      case 'reviews':
        return <MyReviews reviews={userReviews} />;
      case 'liked':
        return <LikedItems favorites={favorites} />;
      case 'subscriptions':
        return <Subscriptions userId={user.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <div className='accountblock'>
        <div className='usercard'>
          <div className='user-avatar'>
            <img 
              className='avaimg' 
              src={user.avatar_url || "https://storage.yandexcloud.net/.../default.png"} 
              alt="userava" 
            />
          </div>
          <div className='userinfo'>
            <h3 className='username'>{user.username}</h3>
            <h4 className='usermail'>Почта: {user.email}</h4>
            <h4 className='userdate'>Дата регистрации: {registrationDate}</h4>
          </div>
          <button className='exit-btn' onClick={handleLogout}>Выйти</button>
        </div>
        
        <div className='user-activity'>
          <div className='activity-buttons'>
            <ActivityButton 
              active={activeTab === 'subscriptions'} 
              onClick={() => setActiveTab('subscriptions')}
            >Подписки</ActivityButton>
            <ActivityButton 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')}
            >Мои рецензии</ActivityButton>
            <ActivityButton 
              active={activeTab === 'liked'} 
              onClick={() => setActiveTab('liked')}
            >Понравилось</ActivityButton>
          </div>
          
          <div className='activity-result'>
            {renderActivity()}
          </div>
        </div>
      </div>
    </div>
  );
}