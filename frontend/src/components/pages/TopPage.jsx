export default function TopPage({category}){
    return(
        <div>TOP-100{category === 'music' ? 'Музыка' : 'Кино'}</div>
    )
}