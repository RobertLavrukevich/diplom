import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '/src/styles/WorkPage.css';
import CommentForm from '../OtherComponents/CommentForm';
import CommentCard from '../OtherComponents/CommentCard';

export default function WorkPage({ category, workType }) {
    const { workId } = useParams();
    const { user } = useContext(AuthContext);
    const [work, setWork] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(1);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8000/get_reviews.php?work_id=${workId}`);
            const data = await response.json();
            setReviews(data);
        } catch (err) { console.error(err); }
    };

    const showMoreReviews = () => {
        setVisibleReviewsCount(prevCount => prevCount + 1);
    };

    const fetchWorkData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/get_work.php?id=${workId}`);
            const data = await response.json();
            if (!data.error) {
                setWork({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    artist: data.category === 'music' ? data.singers : data.actors,
                    imageUrl: data.imageUrl,
                    releaseDate: data.releaseDate,
                    genre: data.genre,
                    averageRating: data.averageRating,
                    totalReviews: data.totalReviews,
                    type: data.typeName
                });
            }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchWorkData();
        fetchReviews(); 
    }, [workId]);

    useEffect(() => {
        fetchWorkData();
        fetchReviews();
        if (user) {
            fetch(`http://localhost:8000/check_favorite.php?user_id=${user.id}&work_id=${workId}`)
                .then(res => res.json())
                .then(data => setIsFavorite(data.isFavorite));
        }
    }, [workId, user]);

    const handleToggleFavorite = async () => {
        if (!user) {
            alert("Пожалуйста, войдите в аккаунт");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/toggle_favorite.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, work_id: workId })
            });
            const data = await response.json();
            setIsFavorite(data.status === 'added');
        } catch (err) { console.error(err); }
    };



    if (loading) return <div className="loading">Загрузка...</div>;
    if (!work) return <div className="loading">Произведение не найдено</div>;

    return (
        <>
            <div className="work-page-container">
                <div className="work-header">
                    <img src={work.imageUrl} alt={work.title} className="work-main-image" />

                    <div className="work-main-info">
                        <h1 className="work-title">{work.title}</h1>

                        <div className="work-meta">
                            <p className="work-artist">
                                <strong>{workType === 'album' || workType === 'single' ? 'Исполнитель:' : 'Актёры:'}</strong> {work.artist}
                            </p>
                            <p className="work-date">
                                <strong>Дата выхода:</strong> {work.releaseDate ? new Date(work.releaseDate).toLocaleDateString() : 'Неизвестно'}
                            </p>
                            <p className="work-genre">
                                <strong>Жанр:</strong> {work.genre}
                            </p>
                            <p className="work-type">
                                <strong>Тип релиза:</strong> {work.type}
                            </p>
                        </div>

                        <div className="work-rating-block">
                            <div className="work-average-rating">
                                <span className="rating-label">Рейтинг:</span>
                                <span className="rating-value">{work.averageRating}</span>
                            </div>
                            <div className="work-reviews-count">
                                📝 {work.totalReviews} рецензий
                            </div>
                        </div>
                    
                        {user && ( <div className="favorite-action-container">
                            <p className="favorite-text">
                                {isFavorite ? 'Убрать из любимого' : 'Добавить в любимое'}
                            </p>
                            <button 
                                className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                                onClick={handleToggleFavorite}
                            >
                                {isFavorite ? '❤️' : '🤍'}
                            </button>
                        </div>
                        )}
                        <p className="work-description">{work.description}</p>
                    </div>
                </div>
                <div className="comment-section-wrapper">
                    {user ? (
                        <CommentForm workId={work.id} onReviewPosted={fetchReviews} />
                    ) : (
                        <div className="auth-reminder">
                            <p>Чтобы написать рецензию <Link to="/auth">войдите в аккаунт</Link></p>
                        </div>
                    )}
                </div>

                <div className="reviews-section">
                    <h2 className="reviews-title">Рецензии ({reviews.length})</h2>
                    <div className="reviews-list">
                        {reviews.length > 0 ? (
                            <>
                                {reviews.slice(0, visibleReviewsCount).map(review => (
                                    <CommentCard
                                        key={review.id}
                                        userId={review.user_id}
                                        currentUserId={user?.id}
                                        imageUrl={review.avatar_url || '/icons/default-avatar.svg'}
                                        userName={review.username}
                                        userRating={review.rating}
                                        commentTitle={review.title}
                                        commentContent={review.content}
                                        nameWork={work.title}
                                        nameArtist={work.artist}
                                    />
                                ))}
                                {visibleReviewsCount < reviews.length && (
                                    <div className="show-more-container">
                                        <button className="show-more-btn" onClick={showMoreReviews}>
                                            Показать ещё
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="no-reviews">Будьте первым, кто оставит рецензию!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}