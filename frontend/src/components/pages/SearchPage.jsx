export default function SearchPage({category}){
    return(
        <div>SERACHING {category === 'music' ? 'Музыка' : 'Кино'}</div>
    )
}