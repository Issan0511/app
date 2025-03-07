import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // 簡易的なバリデーション
    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }
    
    // 実際のアプリでは、APIリクエストで認証を行います
    // ここでは例示のため簡略化しています
    if (username === 'demo' && password === 'password') {
      onLogin({ username });
      navigate('/home'); // SPAとしての遷移
    } else {
      setError('ユーザー名またはパスワードが正しくありません。');
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}



export default Login;