import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';
import './CluePage.css';

function CluePage({ teamId, setCurrentPage }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [fragments, setFragments] = useState([]);
  const [image, setImage] = useState('');
  const [story, setStory] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchClue() {
      const response = await fetch(`http://localhost:5000/api/game/progress/${teamId}`);
      const data = await response.json();
      setCurrentLevel(data.currentLevel);
      setFragments(data.fragments);
    }
    fetchClue();
  }, [teamId, currentLevel]);

  useEffect(() => {
    async function fetchClueDetails() {
      const response = await fetch(`http://localhost:5000/api/game/clue/${teamId}`);
      const data = await response.json();
      setImage(data.image);
      setStory(data.story);
    }
    fetchClueDetails();
  }, [currentLevel, teamId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/game/submit/${teamId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer })
    });
    const data = await response.json();
    if (data.correct) {
      setIsCorrect(true);
      setShowConfetti(true);
      setTimeout(() => {
        setIsCorrect(false);
        setAnswer('');
        setShowConfetti(false);
        setCurrentLevel(data.nextLevel);
      }, 3000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="clue-page">
      {showConfetti && <Confetti />}
      <animated.div className="clue" style={useSpring({ opacity: 1, transform: 'scale(1.05)' })}>
        <img src={image} alt="Clue" />
        <p>{story}</p>
      </animated.div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="neon-input"
          placeholder="Enter your answer"
        />
        <button type="submit" className="neon-button">Submit Answer</button>
      </form>
      <div className="fragments">
        <h3>Fragments Collected: {fragments.join(' ')}</h3>
      </div>
      {isCorrect && <div className="correct-answer">Correct!</div>}
    </div>
  );
}

export default CluePage;
