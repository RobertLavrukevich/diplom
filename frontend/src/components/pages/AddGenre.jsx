import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function AddGenre() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('music');
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/admin_add_genre.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ name, category })
        });
        if (res.ok) {
            alert("Жанр добавлен!");
            setName('');
        }
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h3>Добавить жанр</h3>
            <input type="text" placeholder="Название жанра" value={name} onChange={e => setName(e.target.value)} required />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="music">Музыка</option>
                <option value="cinema">Кино</option>
            </select>
            <button type="submit">Добавить</button>
        </form>
    );
}