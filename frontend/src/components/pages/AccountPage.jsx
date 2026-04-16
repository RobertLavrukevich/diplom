import '/src/styles/AccountPage.css'
import { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import CommentCard from '../OtherComponents/CommentCard';

const ActivityButton = ({ active, onClick, children }) => {
  return (
    <button className={`activity-btn ${active ? 'active' : ''}`} onClick={onClick}>{children} </button>
  );
};

const MyReviews = () => {
  const reviews = [
    { id: 1, title: 'Название рецензии 1', type: 'music', date: '15.03.2026', rating: 8 },
    { id: 2, title: 'Название рецензии 2', type: 'cinema', date: '10.03.2026', rating: 9 },
    { id: 3, title: 'Название рецензии 3', type: 'music', date: '05.03.2026', rating: 7 },
  ];

  return (
    <>
        <CommentCard imageUrl={"https://storage.yandexcloud.net/static-production/rztbackend/users/94321/8f98fc79-c04a-4541-b754-01c0f8f12502.png"} userName={"Vlad"} userRating={"45"} commentTitle={"Оол выащыа ыал ылвдпжщзц плдчв ывщшзп"} commentContent={"H ksf sklsdkvk svklskl vjskdjv ksldjvklsd jvklsjd ivjsidovj isod fjvv gfgf  gdfgdfgd fdgfdg fdgdsg dfdsf gdsdsfdgd "} nameWork={"Леса и тучи"} nameArtist={"carti"}></CommentCard>
        <CommentCard imageUrl={"https://storage.yandexcloud.net/static-production/rztbackend/users/94321/8f98fc79-c04a-4541-b754-01c0f8f12502.png"} userName={"EgoPWS"} userRating={"67"} commentTitle={"Рлыа ща лщыащлц ощаыаф пфпк"} commentContent={"Ikos ksjgklsj lsdj kl;gsdl sl;dkgopdfjiogsf dkgdfjgjkjkdfh jfkgdfjkgjdlkfh gjkdfghjkds hgd"} nameWork={"Que que"} nameArtist={"Travis Scott"}></CommentCard>
    </>
  );
};

const LikedItems = () => {
  const liked = [
    { id: 1, imgUrl:'https://img.apmcdn.org/2db46667ee27633851e4247767963641bb8e84fd/portrait/1551a6-20160823-frank-ocean-blond.jpg', title: 'Blonde', type: 'Альбом', artist: 'Franc Ocean', year: "12.03.2026" },
    { id: 2, imgUrl:'https://avatars.mds.yandex.net/get-ott/236744/2a00000198530fb3e592ad08b06f9b81d22b/600x900', title: '1 + 1', type: 'Фильм', actors: 'Франсуа Клюзе, Омар Си, Анн Ле Ни, Одри Флёро, Жозефин де Мо', year: "14.03.2026" },
    { id: 3, imgUrl:'https://upload.wikimedia.org/wikipedia/en/b/b4/Travis_Scott_-_Highest_in_the_Room.png', title: 'Highest in the room', type: 'Сингл', artist: 'Travis Scott', year: "14.03.2026" },
    { id: 4, imgUrl:'https://i.scdn.co/image/ab67616d0000b273ebc8cfac8b586bc475b04918', title: 'Summertime sadness', type: 'Сингл', artist: 'Lana Del Ray', year: "16.03.2026" },
  ];

  return (
    <div className="activity-grid">
      {liked.map(item => (
        <div key={item.id} className="activity-card">
          <div className="card-type">{item.type}</div>
          <div className='card-info'>
            <div className='img-block'><img className='card-img' src={item.imgUrl}/></div>
            <div className='card-text'>
                <h4 className="card-title">{item.title}</h4>
                <div className="card-details">
                    {item.artist && <p>{item.artist}</p>}
                    {item.actors && <p>{item.actors}</p>}
                </div>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-date">{item.year}</span>
            <span className="card-rating">❤️</span>
          </div>
        </div>
      ))}
    </div>
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

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        return <MyReviews />;
      case 'liked':
        return <LikedItems />;
      case 'subscriptions':
        return <Subscriptions />;
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
              src="https://storage.yandexcloud.net/static-production/rztbackend/users/94321/8f98fc79-c04a-4541-b754-01c0f8f12502.png" 
              alt="userava" 
            />
          </div>
          <div className='userinfo'>
            <h3 className='username'>{user.username}</h3>
            <h4 className='usermail'>{user.email}</h4>
            <h4 className='userdate'>Дата регистрации:{registrationDate}</h4>
          </div>
          <button className='exit-btn' onClick={handleLogout}>Выйти</button>
        </div>
        
        <div className='user-activity'>
          <div className='activity-buttons'>
            <ActivityButton 
              active={activeTab === 'subscriptions'} 
              onClick={() => setActiveTab('subscriptions')}
            >
              Подписки
            </ActivityButton>
            <ActivityButton 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')}
            >
              Мои рецензии
            </ActivityButton>
            <ActivityButton 
              active={activeTab === 'liked'} 
              onClick={() => setActiveTab('liked')}
            >
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