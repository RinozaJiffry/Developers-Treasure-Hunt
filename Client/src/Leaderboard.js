import React, { useState, useEffect } from 'react';

function Leaderboard({ setCurrentPage }) {
  // Get leaderboard data from localStorage
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    // Load leaderboard data from localStorage
    const storedLeaderboard = localStorage.getItem('treasureHunt_leaderboard');
    
    if (storedLeaderboard) {
      // Parse and set the leaderboard data
      const parsedData = JSON.parse(storedLeaderboard);
      setLeaderboardData(parsedData);
    } else {
      // If no data exists, use some sample data
      const sampleData = [
        { teamName: "Code Crackers", completionTime: 482, members: "Alex, Jamie, Taylor" },
        { teamName: "Puzzle Masters", completionTime: 527, members: "Jordan, Casey, Riley" },
        { teamName: "Riddle Solvers", completionTime: 595, members: "Morgan, Quinn, Sam" }
      ];
      setLeaderboardData(sampleData);
    }
  }, []);

  // Function to format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Function to go back to registration page
  const startNewGame = () => {
    setCurrentPage('register');
  };

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Time</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{formatTime(team.completionTime)}</td>
              <td>{team.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={startNewGame} className="new-game-button">
        Start New Game
      </button>
    </div>
  );
}

export default Leaderboard;
