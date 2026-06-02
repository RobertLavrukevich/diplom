import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '/src/styles/AuthPage.css';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
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
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
        } else if (!isLogin && formData.password.length > 100) {
            newErrors.password = 'Пароль не должен превышать 100 символов';
        }

        if (!isLogin) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Подтвердите пароль';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Пароли не совпадают';
            }
        }

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
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                    setErrors({});
                    alert('Регистрация успешна! Теперь войдите.');
                }
            } else {
                if (result.field) {
                    setErrors(prev => ({ ...prev, [result.field]: result.message }));
                } else {
                    setErrors(prev => ({ ...prev, common: result.message }));
                }
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, common: 'Ошибка соединения с сервером' }));
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
        if (errors.common) {
            setErrors({ ...errors, common: '' });
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

                {errors.common && <div className="error-message common-error">{errors.common}</div>}

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

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Подтверждение пароля</label>
                            <input 
                                type="password" 
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Повторите пароль" 
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>
                    )}

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
                            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
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