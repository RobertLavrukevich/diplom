import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '/src/styles/CommentForm.css';

export default function CommentForm({ workId, onReviewPosted }) {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(50);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!user) {
            alert("Войдите, чтобы оставить рецензию");
            return;
        }

        if (!title.trim() || !content.trim()) {
            setError("Пожалуйста, заполните заголовок и текст рецензии");
            return;
        }

        const reviewData = {
            user_id: user.id,
            work_id: workId,
            title: title,
            content: content,
            rating: rating
        };

        try {
            const response = await fetch('http://localhost:8000/public/social/post_review.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            const result = await response.json();
            
            if (result.success) {
                setTitle('');
                setContent('');
                setRating(50);
                
                setShowSuccessModal(true);
                
                onReviewPosted();
            }
        } catch (error) {
            console.error("Ошибка отправки:", error);
            setError("Произошла ошибка при отправке. Попробуйте позже.");
        }
    };

    return (
        <div className='reviewblock'>
            <div className="review-rules-container">
                <h3 className="rules-title">Правила написания рецензий</h3>
                <ul className="rules-list">
                    <li className="rule-item">
                        <span className="rule-bullet">•</span>
                        <span className="rule-text">без мата</span>
                    </li>
                    <li className="rule-item">
                        <span className="rule-bullet">•</span>
                        <span className="rule-text">без оскорблений</span>
                    </li>
                    <li className="rule-item">
                        <span className="rule-bullet">•</span>
                        <span className="rule-text">без рекламы и ссылок</span>
                    </li>
                    <li className="rule-item">
                        <span className="rule-bullet">•</span>
                        <span className="rule-text">содержательные</span>
                    </li>
                </ul>
            </div>            

            <div className='form-comment'>
                <form onSubmit={handleSubmit}>
                    <div className='rating-block'>
                        <label>Ваша оценка: {rating}</label>
                        <input type="range" min="1" max="100" value={rating} 
                               onChange={(e) => setRating(e.target.value)} className="rating-slider" />
                    </div>
                    
                    <div className='textblock'>
                        <div className='commenttitle'>
                            <label>Название рецензии</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className='commentcontent'>
                            <label>Содержание</label>
                            <textarea rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '16px', marginBottom: '15px' }}>{error}</p>}
                        <button type="submit" className='sendcomment'>Отправить рецензию</button>
                    </div>
                </form>
            </div>

            {showSuccessModal && (
                <div className="review-modal-overlay">
                    <div className="review-modal-content">
                        <div className="review-modal-icon">⏳</div>
                        <h4>Рецензия успешно создана!</h4>
                        <p>Она отправлена на модерацию и появится на странице произведения сразу после проверки администратором.</p>
                        <button 
                            className="review-modal-close-btn" 
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Хорошо
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}