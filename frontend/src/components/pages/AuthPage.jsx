import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '/src/styles/AuthPage.css'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin) {
            if (!formData.username.trim()) {
                newErrors.username = 'Имя пользователя обязательно';
            } else if (formData.username.length < 3) {
                newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
            } else if (formData.username.length > 50) {
                newErrors.username = 'Имя пользователя не должно превышать 50 символов';
            } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
                newErrors.username = 'Имя пользователя может содержать только буквы, цифры и _';
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен';
        } else if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email адрес';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } 
        // else if (formData.password.length < 6) {
        //     newErrors.password = 'Пароль должен содержать минимум 6 символов';
        // } else if (!isLogin && formData.password.length > 100) {
        //     newErrors.password = 'Пароль не должен превышать 100 символов';
        // } else if (!isLogin && !/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
        //     newErrors.password = 'Пароль должен содержать хотя бы одну заглавную и одну строчную букву';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        const endpoint = isLogin ? 'authorisation.php' : 'registration.php';
        
        try {
            const response = await fetch(`http://localhost:8000/public/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (result.status === 'success') {
                if (isLogin) {
                    login(result.user, result.token);
                    navigate('/account');
                } else {
                    setIsLogin(true);
                    setFormData({ username: '', email: '', password: '' });
                    setErrors({});
                    alert('Регистрация успешна! Теперь войдите.');
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Ошибка соединения с сервером');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}</h2>
                    <div className="auth-subtitle">
                        {isLogin ? 'Добро пожаловать обратно' : 'Создайте новый аккаунт'}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя</label>
                            <input 
                                type="text" 
                                id="username"
                                name="username"
                                placeholder="Введите имя пользователя" 
                                value={formData.username}
                                onChange={handleInputChange}
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Введите email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Введите пароль" 
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="auth-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'ПОДОЖДИТЕ...' : (isLogin ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ')}
                    </button>
                </form>

                <div className="auth-footer">
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrors({});
                            setFormData({ username: '', email: '', password: '' });
                        }} 
                        className="auth-switch-btn"
                    >
                        {isLogin ? 'Нет аккаунта? → Регистрация' : 'Уже есть аккаунт? → Вход'}
                    </button>
                </div>
            </div>
        </div>
    );
}