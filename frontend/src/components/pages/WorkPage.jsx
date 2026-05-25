import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '/src/styles/WorkPage.css';
import CommentForm from '../forms/CommentForm';
import CommentCard from '../cards/CommentCard';
import { getRatingColor } from '../../assets/getRatingColor';

export default function WorkPage({ workType }) {
    const { workSlug } = useParams();
    const { user } = useContext(AuthContext);
    const [work, setWork] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(4);
    const [reviewFilter, setReviewFilter] = useState('actual');

    const showMoreReviews = () => {
        setVisibleReviewsCount(prevCount => prevCount + 4);
    };

    useEffect(() => {
        const fetchWorkData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/public/content/get_work.php?slug=${workSlug}`);
                const data = await response.json();
                if (!data.error) {
                    const fetchedWork = {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        artist: data.category === 'music' ? data.singers : data.actors,
                        imageUrl: data.imageUrl,
                        releaseDate: data.releaseDate,
                        genre: data.genre,
                        averageRating: data.averageRating,
                        totalReviews: data.totalReviews,
                        type: data.typeName,
                        slug: data.slug
                    };
                    setWork(fetchedWork);
                }
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkData();
    }, [workSlug]);

    useEffect(() => {
        if (work?.id) {
            fetchReviews(work.id);
        }
    }, [work?.id, user]);

    const fetchReviews = async (id) => {
        const targetId = id || work?.id;
        if (!targetId) return;
        try {
            const userIdParam = user ? `&user_id=${user.id}` : '';
            const response = await fetch(`http://localhost:8000/public/content/get_reviews.php?work_id=${targetId}${userIdParam}`);     
            const data = await response.json();
            setReviews(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (work?.id && user) {
            fetch(`http://localhost:8000/public/social/check_favorite.php?user_id=${user.id}&work_id=${work.id}`)
                .then(res => res.json())
                .then(data => setIsFavorite(data.isFavorite));
        }
    }, [work?.id, user]);

    const handleToggleFavorite = async () => {
        if (!user) return alert("Пожалуйста, войдите в аккаунт");
        try {
            const response = await fetch(`http://localhost:8000/public/social/toggle_favorite.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, work_id: work.id })
            });
            const data = await response.json();
            setIsFavorite(data.status === 'added');
        } catch (err) { console.error(err); }
    };

    const getProcessedReviews = () => {
        let result = [...reviews];
        
        if (reviewFilter === 'my') {
            result = result.filter(r => user && String(r.user_id) === String(user.id));
        } else if (reviewFilter === 'popular') {
            result.sort((a, b) => b.likes_count - a.likes_count);
        }        
        return result;
    };

    const processedReviews = getProcessedReviews();

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
                                <span className="rating-value" style={{ backgroundColor: getRatingColor(work.averageRating) }}>{work.averageRating}</span>
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
                    <div className="reviews-header">
                        <h2 className="reviews-title">Рецензии ({reviews.length})</h2>
                        <select 
                            value={reviewFilter} 
                            onChange={(e) => {
                                setReviewFilter(e.target.value);
                                setVisibleReviewsCount(4);
                            }} 
                            className="review-filter-select"
                        >
                            <option value="actual">Последние</option>
                            <option value="popular">Популярные</option>
                            {user && <option value="my">Мои</option>}
                        </select>
                    </div>

                    <div className="reviews-list">
                        {processedReviews.length > 0 ? (
                            <>
                                {processedReviews.slice(0, visibleReviewsCount).map(review => (
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
                                        reviewId={review.id}
                                        showLikeSection={true} 
                                        initialLikesCount={parseInt(review.likes_count) || 0}
                                        initialIsLiked={!!review.is_liked}
                                    />
                                ))}
                                {visibleReviewsCount < processedReviews.length && (
                                    <div className="show-more-container">
                                        <button className="show-more-btn" onClick={showMoreReviews}>
                                            Показать ещё
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            reviewFilter === 'my' ? (
                                <p className="no-reviews">Вы пока не писали рецензию на это произведение.</p>
                            ) : (
                                <p className="no-reviews">Будьте первым, кто оставит рецензию!</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}