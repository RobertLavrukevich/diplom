export default function ReviewsPage({category}){
    return(
        <div className="reviews-page">
            <h1>Рецензии - {category === 'music' ? 'Музыка' : 'Кино'}</h1>
      {/* Список рецензий */}
        </div>

    )
}