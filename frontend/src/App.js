import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Load user token on refresh (optional: decode it later)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you might decode token or fetch user info here
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  // Save user info to localStorage when logged in
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Clear token and logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Welcome to NewStateHela</h1>

      {user ? (
        <>
          <Dashboard user={user} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : showLogin ? (
        <>
          <Login onLogin={handleLogin} />
          <p>Don't have an account?{' '}
            <button onClick={() => setShowLogin(false)}>Register</button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p>Already have an account?{' '}
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
