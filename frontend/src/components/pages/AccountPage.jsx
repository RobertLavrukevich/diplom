import '/src/styles/AccountPage.css'
import { useState, useEffect, } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import UserStats from '../OtherComponents/UserStats';
import CommentCard from '../cards/CommentCard';

const ActivityButton = ({ active, onClick, children }) => {
  return (
    <button className={`activity-btn ${active ? 'active' : ''}`} onClick={onClick}>{children} </button>
  );
};

const MyReviews = ({ reviews, onDeleteClick }) => {
  if (reviews.length === 0) {
    return <p className="no-data">Вы еще не написали ни одной рецензии.</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <CommentCard 
          key={review.id}
          reviewId={review.id}
          imageUrl={review.avatar_url} 
          userName={review.username} 
          userRating={review.rating} 
          isClickable={false}
          commentTitle={review.review_title} 
          commentContent={review.content} 
          nameWork={review.work_title} 
          nameArtist={review.singers || review.actors}
          showDeleteButton={true}
          onDeleteClick={onDeleteClick}
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
      fetch(`http://localhost:8000/public/user/get_subscriptions.php?user_id=${userId}`)
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


const ReviewStatuses = ({ statuses }) => {
  if (!statuses || statuses.length === 0) {
    return <p className="no-data">Вы еще не отправляли рецензий.</p>;
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'published': return { color: '#28a745', label: 'Опубликовано' };
      case 'pending': return { color: '#ffc107', label: 'На модерации' };
      case 'rejected': return { color: '#dc3545', label: 'Отклонено' };
      default: return { color: '#6c757d', label: 'Неизвестно' };
    }
  };

  return (
    <div className="status-grid">
      {statuses.map((item) => {
        const { color, label } = getStatusConfig(item.status);
        const date = new Date(item.created_at).toLocaleDateString('ru-RU');
        const authorOrActor = item.singers || item.actors;

        return (
          <div key={item.id} className="status-card">
            <div className="status-info">
              <span className="status-type">{item.work_type_name}</span>
              <h4 className="status-title">{item.work_title} <span className="status-author">— {authorOrActor}</span></h4>
              <span className="status-date">{date}</span>
            </div>
            <div className="status-indicator-block" title={label}>
              <div className="status-circle" style={{ backgroundColor: color }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};



export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const { user, logout } = useContext(AuthContext);
  const [userReviews, setUserReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviewStatuses, setReviewStatuses] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [accountStats, setAccountStats] = useState(null);

useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8000/public/user/get_user_info.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => !data.error && setAccountStats(data.stats));

      fetch(`http://localhost:8000/public/user/get_user_reviews.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => !data.error && setUserReviews(data));
      
      fetch(`http://localhost:8000/public/user/get_user_review_statuses.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => !data.error && setReviewStatuses(data));

      fetch(`http://localhost:8000/public/user/get_user_favorites.php?user_id=${user.id}`)
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

  const handleOpenModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReviewId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
        const response = await fetch(`http://localhost:8000/public/social/delete_review.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ user_id: user.id, review_id: selectedReviewId })
        });
        const data = await response.json();

        if (data.success) {
            setUserReviews(prev => prev.filter(review => review.id !== selectedReviewId));
            setReviewStatuses(prev => prev.filter(review => review.id !== selectedReviewId));
            setAccountStats(prev => prev ? { ...prev, reviews: prev.reviews - 1 } : null);
            handleCloseModal();
        } else {
            alert(data.error || "Не удалось удалить рецензию");
        }
    } catch (err) {
        console.error("Ошибка при удалении рецензии:", err);
    }
  };

  const registrationDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('ru-RU') 
    : 'Не указана';


 const renderActivity = () => {
    switch(activeTab) {
      case 'reviews':
        return <MyReviews reviews={userReviews} onDeleteClick={handleOpenModal}/>;
      case 'liked':
        return <LikedItems favorites={favorites} />;
      case 'subscriptions':
        return <Subscriptions userId={user.id} />;
      case 'status':
        return <ReviewStatuses statuses={reviewStatuses} />;
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
              src={user.avatar_url || "/icons/avatar-svgrepo-com.svg"}
              alt="userava" 
            />
          </div>
          <div className='userinfo'>
            <h3 className='username'>{user.username}</h3>
            <h4 className='usermail'>Почта: {user.email}</h4>
            <h4 className='userdate'>Дата регистрации: {registrationDate}</h4>
            <UserStats stats={accountStats} />
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
            <ActivityButton 
              active={activeTab === 'status'} 
              onClick={() => setActiveTab('status')}
            >Статус</ActivityButton>
          </div>
          
          <div className='activity-result'>
            {renderActivity()}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Удалить рецензию?</h4>
            <p>После удаления рецензию нельзя будет восстановить.</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDeleteConfirm}>Удалить</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}