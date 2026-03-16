import { useState } from 'react';
import '/src/styles/CommentForm.css';

export default function CommentForm() {
    const [rating, setRating] = useState(50);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
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
                <form action="">
                    <div className='rating-block'>
                        <label>Ваша оценка</label>
                        <div className="rating-slider-container">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={rating}
                                onChange={handleRatingChange}
                                className="rating-slider"
                            />
                            <div className="rating-value-display">{rating}</div>
                        </div>
                    </div>
                    
                    <div className='textblock'>
                        <div className='commenttitle'>
                            <label htmlFor="review-title">Название рецензии</label>
                            <input 
                                type="text" 
                                id="review-title"
                            />
                        </div>
                        
                        <div className='commentcontent'>
                            <label htmlFor="review-content">Содержание</label>
                            <textarea 
                                id="review-content"
                                rows="6"
                            />
                        </div>
                        
                        <button type="submit" className='sendcomment'>
                            Отправить рецензию
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}