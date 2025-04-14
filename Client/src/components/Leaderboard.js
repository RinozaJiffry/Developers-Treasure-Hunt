import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard({ setCurrentPage }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await fetch('http://localhost:5000/api/teams/leaderboard');
      const data = await response.json();
      setTeams(data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {teams.map((team, index) => (
          <li key={team._id}>
            <span>{index + 1}. {team.name}</span>
            <span> - Time: {new Date(team.endTime).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage('game')} className="neon-button">Back to Game</button>
    </div>
  );
}

export default Leaderboard;
