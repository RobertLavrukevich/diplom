import '/src/styles/NewsCard.css'

export default function NewsCard({ title, date, imageUrl, content}){
    return (
        <div className="news-card">
        <img src={imageUrl} className="news-image" />
        <div className="news-content">
            <h3 className="news-title">{title}</h3>
            <p className="news-date">{date}</p>
            <p className="news-text">{content}</p>
        </div>
        </div>
    );
    };
   