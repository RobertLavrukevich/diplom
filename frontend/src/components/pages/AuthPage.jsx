import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'authorisation.php' : 'registration.php';
        
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();

        if (result.status === 'success') {
            if (isLogin) {
                login(result.user);
                navigate('/account');
            } else {
                setIsLogin(true);
                alert('Регистрация успешна! Теперь войдите.');
            }
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Вход' : 'Регистрацияzzzz'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input type="text" placeholder="Имя пользователя" 
                        onChange={e => setFormData({...formData, username: e.target.value})} />
                )}
                <input type="email" placeholder="Email" 
                    onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Пароль" 
                    onChange={e => setFormData({...formData, password: e.target.value})} />
                <button type="submit">{isLogin ? 'Войти' : 'Создать аккаунт'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Вход'}
            </button>
        </div>
    );
}