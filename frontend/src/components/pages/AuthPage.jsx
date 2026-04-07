import { useState } from 'react';
// import '/src/styles/AuthPage.css';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'authorisation.php' : 'registration.php';
        
        const response = await fetch(`http://localhost/api/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (response.ok) {
            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/account'; // Редирект в профиль
            } else {
                alert("Регистрация успешна! Теперь войдите.");
                setIsLogin(true);
            }
        } else {
            alert(data.error || data.message);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                {!isLogin && (
                    <input 
                        type="text" 
                        placeholder="Имя пользователя" 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    />
                )}
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button type="submit">{isLogin ? 'Войти' : 'Создать аккаунт'}</button>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </p>
            </form>
        </div>
    );
}