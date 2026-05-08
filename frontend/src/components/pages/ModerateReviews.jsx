import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function ModerateReviews() {
    const [reviews, setReviews] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8000/get_pending_reviews.php', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(setReviews);
    }, [token]);

    const handleAction = async (id, action) => {
        await fetch('http://localhost:8000/moderate_review.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ id, action })
        });
        setReviews(reviews.filter(r => r.id !== id));
    };

    return (
        <div className="moderation-list">
            {reviews.map(r => (
                <div key={r.id} className="mod-card">
                    <h4>{r.title} (К работе: {r.work_title})</h4>
                    <p>{r.content}</p>
                    <button className="btn-approve" onClick={() => handleAction(r.id, 'approve')}>Опубликовать</button>
                    <button className="btn-reject" onClick={() => handleAction(r.id, 'reject')} style={{backgroundColor: 'red'}}>Удалить</button>
                </div>
            ))}
        </div>
    );
}