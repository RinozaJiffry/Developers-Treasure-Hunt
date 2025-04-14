import React, { useState } from 'react';
import './RegisterTeam.css';

function RegisterTeam({ setTeamId, setCurrentPage }) {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/teams/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: teamName, members: members.split(',') })
    });
    const data = await response.json();
    setTeamId(data._id);
    setCurrentPage('game');
  };

  return (
    <div className="register">
      <h1>Register Your Team</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="neon-input"
        />
        <input
          type="text"
          placeholder="Team Members (comma separated)"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          className="neon-input"
        />
        <button type="submit" className="neon-button">Start Game</button>
      </form>
    </div>
  );
}

export default RegisterTeam;
