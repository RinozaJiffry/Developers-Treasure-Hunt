import React, { useState } from 'react';

function Login({ setTeamId, setCurrentPage }) {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!teamName.trim() || !password) {
      setError('Please enter both team name and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real application, you would validate credentials against your server
      // For now, we'll check against localStorage
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedTeamName = localStorage.getItem('treasureHunt_teamName');
      const storedPassword = localStorage.getItem('treasureHunt_password');
      const storedTeamId = localStorage.getItem('treasureHunt_teamId');
      
      if (teamName === storedTeamName && password === storedPassword) {
        // Set the team ID in the parent component
        setTeamId(storedTeamId);
        
        // Move to the game page
        setCurrentPage('game');
      } else {
        setError('Invalid team name or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    setCurrentPage('register');
  };

  return (
    <div className="login-container">
      <h1>Verdentra Mystery Hunt</h1>
      <h2>Team Login</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="register-link">
        <p>Don't have a team yet?</p>
        <button onClick={goToRegister} className="register-link-button">
          Register New Team
        </button>
      </div>
    </div>
  );
}

export default Login;
