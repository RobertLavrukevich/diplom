import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import StatisticaCinema from '../OtherComponents/StatisticaCinema'
import CardWork from '../cards/CardWork'
import CommentCard from "../cards/CommentCard";
import MainSlider from '../OtherComponents/MainSlider';

export default function CinemaHomePage() {
    const category = "cinema"; 
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ users: 0, films: 0, series: 0, comments: 0 });
    const [activeWorks, setActiveWorks] = useState([]);
    const [latestReleases, setLatestReleases] = useState([]);
    const [latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const s = await fetch(`http://localhost:8000/public/user/get_stats.php?category=${category}`).then(res => res.json());
                setStats(s);

                const aw = await fetch(`http://localhost:8000/public/content/get_active_discussions.php?category=${category}`).then(res => res.json());
                setActiveWorks(Array.isArray(aw) ? aw : []);

                const lr = await fetch(`http://localhost:8000/public/content/get_latest_works.php?category=${category}`).then(res => res.json());
                setLatestReleases(Array.isArray(lr) ? lr : []);

                const rev = await fetch(`http://localhost:8000/public/content/get_latest_reviews.php?category=${category}`).then(res => res.json());
                setLatestReviews(Array.isArray(rev) ? rev : []);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
            }
        };
        fetchAll();
    }, []);

    return (
        <>
            <MainSlider />
        
            <StatisticaCinema 
                users={stats.users} 
                films={stats.films} 
                series={stats.series} 
                comments={stats.comments} 
            />

            <h2 className="firsth2">Активные обсуждения <img className="active-icon" src="https://www.svgrepo.com/show/506715/fire.svg" alt="fire" /></h2>
            <div className="actual-block">
                {activeWorks.map(work => (
                    <CardWork 
                        key={work.id}
                        slug={work.slug}
                        imageUrl={work.poster_url}
                        artistName={work.actors}
                        workName={work.title}
                        rating={Math.round(work.average_rating)}
                        category={category}
                        workTypeName={work.type_name}
                    />
                ))}
            </div>

            <h2 className="secondh2">Последние релизы</h2>
            <div className="latest-releases-block">
                {latestReleases.map(work => (
                    <CardWork 
                        key={work.id}
                        slug={work.slug}
                        imageUrl={work.poster_url}
                        artistName={work.actors}
                        workName={work.title}
                        rating={Math.round(work.average_rating)}
                        category={category}
                        workTypeName={work.type_name}
                    />
                ))}
            </div>

            <h2 className="thirdh2">Последние рецензии</h2>
            <div className="latest-comments-block">
                {latestReviews.map(review => (
                    <CommentCard 
                        key={review.id}
                        reviewId={review.id}
                        userId={review.user_id}  
                        currentUserId={user?.id}
                        imageUrl={review.avatar_url}
                        userName={review.username}
                        userRating={review.rating}
                        commentTitle={review.title}
                        commentContent={review.content}
                        nameWork={review.work_title}
                        nameArtist={review.actors}
                    />
                ))}
            </div>
        </>
    );
}