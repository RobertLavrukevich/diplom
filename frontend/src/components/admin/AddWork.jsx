import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function AddWork() {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '', work_type_id: '', category: 'music', 
        genres: [], singers: '', actors: '', poster_url: '', 
        description: '', release_date: ''
    });
    const [meta, setMeta] = useState({ types: [], genres: [] });

    useEffect(() => {
        fetch('http://localhost:8000/public/admin/get_admin_meta.php')
            .then(res => res.json())
            .then(setMeta);
    }, []);

    const handleGenreChange = (genreId) => {
        const updated = formData.genres.includes(genreId)
            ? formData.genres.filter(id => id !== genreId)
            : [...formData.genres, genreId];
        setFormData({ ...formData, genres: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/public/admin/admin_add_work.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) alert("Произведение добавлено!");
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h3>Добавить произведение</h3>
            <input type="text" placeholder="Название" onChange={e => setFormData({...formData, title: e.target.value})} required />
            
            <div className="form-row">
                <select onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="music">Музыка</option>
                    <option value="cinema">Кино</option>
                </select>

                <select onChange={e => setFormData({...formData, work_type_id: e.target.value})} required>
                    <option value="">Тип работы</option>
                    {meta.types.filter(t => t.category === formData.category).map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            <input type="date" onChange={e => setFormData({...formData, release_date: e.target.value})} />
            <input type="text" placeholder="URL постера" onChange={e => setFormData({...formData, poster_url: e.target.value})} />
            
            <textarea placeholder="Описание" onChange={e => setFormData({...formData, description: e.target.value})} />
            
            {formData.category === 'music' ? 
                <input type="text" placeholder="Исполнители (текстом)" onChange={e => setFormData({...formData, singers: e.target.value})} /> :
                <input type="text" placeholder="Актеры (текстом)" onChange={e => setFormData({...formData, actors: e.target.value})} />
            }

            <div className="genre-selector">
                <p>Выберите жанры:</p>
                {meta.genres.filter(g => g.category === formData.category).map(g => (
                    <label key={g.id}>
                        <input type="checkbox" onChange={() => handleGenreChange(g.id)} /> {g.name}
                    </label>
                ))}
            </div>

            <button type="submit">Добавить</button>
        </form>
    );
}