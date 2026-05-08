import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function AddNews() {
    const [news, setNews] = useState({ title: '', content: '', category: 'music', image_url: '' });
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/admin_add_news.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(news)
        });
        if (res.ok) {
            alert("Новость опубликована!");
            setNews({ title: '', content: '', category: 'music', image_url: '' });
        }
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h3>Опубликовать новость</h3>
            <input 
                type="text" 
                placeholder="Заголовок новости" 
                value={news.title}
                onChange={e => setNews({...news, title: e.target.value})} 
                required 
            />
            <input 
                type="text" 
                placeholder="URL обложки новости (image_url)" 
                value={news.image_url}
                onChange={e => setNews({...news, image_url: e.target.value})} 
            />
            <select value={news.category} onChange={e => setNews({...news, category: e.target.value})}>
                <option value="music">Музыка</option>
                <option value="cinema">Кино</option>
            </select>
            <textarea 
                placeholder="Текст новости..." 
                value={news.content}
                onChange={e => setNews({...news, content: e.target.value})} 
                required 
            />
            <button type="submit">Опубликовать</button>
        </form>
    );
}