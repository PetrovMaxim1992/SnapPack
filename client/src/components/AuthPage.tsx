import AuthForm from './AuthForm';

interface AuthPageProps {
    onLogin: (token: string, user: { id: string; name: string; email: string }) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
    return (
        <div className="auth-page">
            <div className='header_container'>
                <span>Snap </span>
                <span>Pack</span>
            </div>
            <AuthForm onLogin={onLogin} />
        </div>
    );
};

export default AuthPage;