import React, { useState } from 'react';
import RegisterTeam from './RegisterTeam';
import Login from './Login';
import CluePage from './CluePage';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  const [teamId, setTeamId] = useState(null);
  const [currentPage, setCurrentPage] = useState('register');

  return (
    <div className="App">
      <div className="container">
        {currentPage === 'welcome' && <Welcome setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterTeam setTeamId={setTeamId} setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <Login setTeamId={setTeamId} setCurrentPage={setCurrentPage} />}
        {currentPage === 'game' && <CluePage teamId={teamId} setCurrentPage={setCurrentPage} />}
        {currentPage === 'leaderboard' && <Leaderboard setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;
