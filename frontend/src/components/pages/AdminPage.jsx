import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '/src/styles/AccountPage.css'; 
import '/src/styles/AdminPage.css';
import AddWork from './AddWork';
import ModerateReviews from './ModerateReviews';
import AddGenre from './AddGenre';
import AddNews from './AddNews';


export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('work');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || Number(user.role_id) !== 2) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || Number(user.role_id) !== 2) return null;

    const renderTab = () => {
        switch(activeTab) {
            case 'work': return <AddWork />;
            case 'genre': return <AddGenre />;
            case 'news': return <AddNews />;
            case 'moderation': return <ModerateReviews />;
            default: return <AddWork />;
        }
    };

    return (
        <div className="account-page admin-panel">
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Панель администратора</h2>
            <div className='user-activity'>
                <div className='activity-buttons'>
                    <button className={`activity-btn ${activeTab === 'work' ? 'active' : ''}`} onClick={() => setActiveTab('work')}>Произведение</button>
                    <button className={`activity-btn ${activeTab === 'genre' ? 'active' : ''}`} onClick={() => setActiveTab('genre')}>Жанр</button>
                    <button className={`activity-btn ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}>Новость</button>
                    <button className={`activity-btn ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => setActiveTab('moderation')}>Модерация</button>
                </div>
                <div className='activity-result' style={{marginTop: '20px'}}>
                    {renderTab()}
                </div>
            </div>
        </div>
    );
}