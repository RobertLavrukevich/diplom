import '/src/styles/CardWork.css'

export default function CardWork({imageUrl, artistName, workName, rating}){
    return(
        <>
            <div className="card-block">
                <div className="card-content">
                    <img className="workimg" src={imageUrl} alt="releaseimg" />
                    <div className="work-name">{workName}</div>
                    <div className="name-artist">{artistName}</div>
                    <div className="rating">{rating}</div>
                    <button className="workcardbtn" onClick={() => navigate('/music/news')}>Перейти</button>
                </div>
            </div>
        </>
    )
}