import React, { useState } from 'react';

function RegisterTeam({ setTeamId, setCurrentPage }) {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }
    
    if (!password) {
      setError('Please enter a password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    // Check if team name already exists in the teams list
    const existingTeams = JSON.parse(localStorage.getItem('treasureHunt_teams') || '[]');
    const teamExists = existingTeams.some(team => team.teamName.toLowerCase() === teamName.toLowerCase());
    
    if (teamExists) {
      setError('Team name already exists. Please choose a different name or login.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real application, you would send this data to your server
      // For now, we'll just simulate a server response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock team ID (in a real app, this would come from your server)
      const mockTeamId = `team_${Date.now()}`;
      
      // Store team credentials in localStorage (in a real app, this would be handled securely on the server)
      localStorage.setItem('treasureHunt_teamName', teamName);
      localStorage.setItem('treasureHunt_teamId', mockTeamId);
      localStorage.setItem('treasureHunt_members', members);
      // Note: In a real application, you would NEVER store passwords in localStorage
      // This is just for demonstration purposes
      localStorage.setItem('treasureHunt_password', password);
      
      // Add team to the teams list for future validation
      const existingTeams = JSON.parse(localStorage.getItem('treasureHunt_teams') || '[]');
      existingTeams.push({
        teamId: mockTeamId,
        teamName: teamName,
        members: members,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('treasureHunt_teams', JSON.stringify(existingTeams));
      
      // Set the team ID in the parent component
      setTeamId(mockTeamId);
      
      // Move to the login page instead of directly to the game
      setCurrentPage('login');
    } catch (err) {
      setError('Failed to register team. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Verdentra Mystery Hunt</h1>
      <h2>Team Registration</h2>
      
      <form onSubmit={handleSubmit} className="register-form">
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
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="members">Team Members (optional):</label>
          <textarea
            id="members"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="Enter team member names (one per line)"
            rows="4"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading} className="register-button">
          {isLoading ? 'Registering...' : 'Start Hunt'}
        </button>
      </form>
      
      <div className="login-link">
        <p>Already have a team?</p>
        <button onClick={() => setCurrentPage('login')} className="login-link-button">
          Login to Existing Team
        </button>
      </div>
    </div>
  );
}

export default RegisterTeam;
