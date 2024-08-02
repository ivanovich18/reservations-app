import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../components/app_logo.png';
import googleLogo from '../components/google_logo.png';
import './Login.css';

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithGoogle();
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='main-container'>
        <div className="login-container">
            <img src={logo} alt="App Logo" className="login-logo" />
            <h1>Admin Dashboard</h1>
            <div className="logo-container" onClick={handleLogin} disabled={loading}>
                <img src={googleLogo} alt="Google logo" className="google-logo" />
                <p>Sign in with Google</p>
            </div>
            {error && <p>{error.message}</p>}
        </div>
    </div>
  );
};

export default Login;
