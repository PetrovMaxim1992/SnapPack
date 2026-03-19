import { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
    onLogin: (token: string, user: { id: string; name: string; email: string }) => void;
}

const AuthForm = ({ onLogin }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/login' : '/api/register';

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();

            if (response.ok) {
                if (!isLogin) {
                    setIsLogin(true);
                    setEmail('');
                    setPassword('');
                    alert('Регистрация успешна! Теперь войдите.');
                } else {
                    onLogin(data.token, data.user);
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    return (
        <div className="auth-form">
            <h1>{isLogin ? 'Enter' : 'Registration'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    {isLogin ? 'Log in' : 'Registration'}
                </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Log in'}
            </button>
        </div>
    );
};

export default AuthForm;