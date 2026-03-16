import '/src/styles/CommentCard.css'

export default function CommentCard({imageUrl, userName, userRating, commentTitle, commentContent, nameWork, nameArtist}){
    return(
        <>
        <div className='comment-card-block'>
            <div className='blockup'>
                <div className='user-info'>
                    <img className='user-avatar' src={imageUrl} alt="user-avatar" />
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='user-rating'>{userRating}</div>
            </div>
            <div className='blockdown'>
                <div className='work-info'>{nameArtist + " — " + nameWork}</div>
                <div className='comment-block'>
                    <div className='comment-title'>{commentTitle}</div>
                    <div className='comment-content'>{commentContent}</div>
                </div>
            </div>
        </div>  
        </>
    )
}