import React, { useState, useEffect } from 'react';

function CluePage({ teamId, setCurrentPage }) {
  // Story introduction and context
  const storyIntro = `
    <h3>THE CASE OF THE MISSING DEPLOYMENT</h3>
    <p>The year is 2077. You are part of an elite team of tech detectives at CyberSolve Inc.</p>
    <p>A critical situation has emerged: Verdentra Corp's revolutionary quantum AI system has been sabotaged just hours before its global launch. The deployment package is missing, and the company's entire future hangs in the balance.</p>
    <p>Your team has been called in to track down the missing deployment by following a trail of technical clues left behind by either the perpetrator or someone inside trying to help.</p>
    <p>Each clue will test your technical knowledge and problem-solving skills. Time is running out - the market opens in 60 minutes!</p>
  `;

  // Treasure hunt clues and answers - developer and QA focused mystery
  const treasureHunt = [
    {
      clue: `<div class="story-segment">
        <p>You arrive at Verdentra Corp's headquarters. Security logs show the last person to access the deployment server was a developer with username 'phantom_dev'. Looking at the terminal history, you find this command was run:</p>
        <pre>git commit -m "Final fix before deploy. Check /var/log/nginx/access.log for details"</pre>
        <p>You check the log file and find repeated requests to an endpoint with a suspicious pattern. What HTTP status code would indicate this endpoint doesn't exist?</p>
      </div>`,
      answer: "404"
    },
    {
      clue: `<div class="story-segment">
        <p>The log reveals an IP address: 192.168.1.42. You trace it to a developer workstation and find a sticky note with this SQL query:</p>
        <pre>SELECT * FROM users WHERE username = '$input' AND password = '$pass'</pre>
        <p>What type of security vulnerability is this code susceptible to?</p>
      </div>`,
      answer: "sql injection"
    },
    {
      clue: `<div class="story-segment">
        <p>You find an encrypted message in the developer's trash bin. The note mentions it was encrypted using a Caesar cipher with a shift of 3. The message reads:</p>
        <pre>ghsor|phqw lv klgghq lq whvw hqylurqphqw</pre>
        <p>Decrypt the message to find your next clue.</p>
      </div>`,
      answer: "deployment is hidden in test environment"
    },
    {
      clue: `<div class="story-segment">
        <p>You access the test environment and find a Docker container running with this command:</p>
        <pre>docker run -d --name phantom_container -p 8080:80 verdentra/secret-service:latest</pre>
        <p>Inside the container logs, you find a base64 encoded string:</p>
        <pre>Y2hlY2sgdGhlIGNvbnRpbnVvdXMgaW50ZWdyYXRpb24gcGlwZWxpbmU=</pre>
        <p>What does this string decode to?</p>
      </div>`,
      answer: "check the continuous integration pipeline"
    },
    {
      clue: `<div class="story-segment">
        <p>The CI pipeline has a failing test with this error:</p>
        <pre>AssertionError: expected 'undefined' to be 'string'</pre>
        <p>Looking at the test file, you see this code:</p>
        <pre>test('should validate user input', () => {
  const result = validateInput(null);
  expect(typeof result).to.equal('string');
});</pre>
        <p>What JavaScript testing framework is being used here? (Hint: Look at the assertion syntax)</p>
      </div>`,
      answer: "mocha"
    },
    {
      clue: `<div class="story-segment">
        <p>The pipeline's configuration file contains a webhook to a mysterious endpoint. You analyze the network traffic and capture this JSON response:</p>
        <pre>{
  "status": "success",
  "data": {
    "next_clue": "Check the package.json for dependencies with known vulnerabilities"
  }
}</pre>
        <p>What npm command would you run to check for vulnerable dependencies?</p>
      </div>`,
      answer: "npm audit"
    },
    {
      clue: `<div class="story-segment">
        <p>The audit reveals a dependency using an outdated encryption algorithm. In the application logs, you find this suspicious pattern:</p>
        <pre>DEBUG: Memory usage: 1024MB
DEBUG: Cache hit ratio: 0.75
ERROR: Uncaught exception in /controllers/auth.js:42
DEBUG: API request count: 1337</pre>
        <p>Which line number in the auth.js file contains the error?</p>
      </div>`,
      answer: "42"
    },
    {
      clue: `<div class="story-segment">
        <p>You examine line 42 of auth.js and find a comment with this regex pattern:</p>
        <pre>/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/</pre>
        <p>What is this regex pattern validating?</p>
      </div>`,
      answer: "url"
    },
    {
      clue: `<div class="story-segment">
        <p>The URL validation leads you to an internal wiki page with deployment instructions. At the bottom, there's a cryptic note:</p>
        <pre>The deployment package is hidden where bugs go to be verified. Look for build #1337.</pre>
        <p>In software development, where do bugs go to be verified after they're fixed?</p>
      </div>`,
      answer: "qa environment"
    },
    {
      clue: `<div class="story-segment">
        <p>You access the QA environment and find build #1337. The deployment package is there, but it's protected by a final challenge:</p>
        <pre>To prove you're authorized, answer this:
What does the acronym SOLID stand for in object-oriented design?</pre>
        <p>Provide the first principle of SOLID to unlock the deployment package.</p>
      </div>`,
      answer: "single responsibility principle"
    }
  ];

  // Game state
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState({ message: '', isCorrect: null });
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = treasureHunt[currentClueIndex].answer;
    
    if (userAnswer === correctAnswer) {
      // Correct answer
      setResult({ message: "Correct! Moving to the next clue...", isCorrect: true });
      
      // Move to next clue
      if (currentClueIndex < treasureHunt.length - 1) {
        setTimeout(() => {
          setCurrentClueIndex(prevIndex => prevIndex + 1);
          setAnswer('');
          setResult({ message: '', isCorrect: null });
        }, 1500);
      } else {
        // Game completed
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        setCompletionTime(totalTime);
        
        // Save completion data to localStorage
        const teamName = localStorage.getItem('treasureHunt_teamName');
        const members = localStorage.getItem('treasureHunt_members') || '';
        
        // Get existing leaderboard data or initialize empty array
        const existingLeaderboard = JSON.parse(localStorage.getItem('treasureHunt_leaderboard') || '[]');
        
        // Add current team's data
        const teamData = {
          teamId,
          teamName,
          completionTime: totalTime,
          members,
          completedAt: new Date().toISOString()
        };
        
        // Check if team already exists in leaderboard
        const existingTeamIndex = existingLeaderboard.findIndex(entry => entry.teamId === teamId);
        
        if (existingTeamIndex >= 0) {
          // Update existing entry if this time is better
          if (totalTime < existingLeaderboard[existingTeamIndex].completionTime) {
            existingLeaderboard[existingTeamIndex] = teamData;
          }
        } else {
          // Add new entry
          existingLeaderboard.push(teamData);
        }
        
        // Sort by completion time (fastest first)
        existingLeaderboard.sort((a, b) => a.completionTime - b.completionTime);
        
        // Save updated leaderboard
        localStorage.setItem('treasureHunt_leaderboard', JSON.stringify(existingLeaderboard));
      }
    } else {
      // Incorrect answer
      setResult({ message: "Incorrect answer. Try again!", isCorrect: false });
    }
  };

  // Function to view leaderboard
  const viewLeaderboard = () => {
    setCurrentPage('leaderboard');
  };

  // State for showing/hiding the story intro
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="clue-container">
      <h1>The Case of the Missing Deployment</h1>
      
      {completionTime ? (
        <div className="completion-container">
          <h2>Mission Accomplished!</h2>
          <p className="completion-message">
            You've successfully recovered the missing deployment package! Verdentra Corp's quantum AI system has been saved, and the company's future is secure.
          </p>
          <p className="completion-time">
            Your team solved the case in {Math.floor(completionTime / 60)} minutes and {completionTime % 60} seconds.
          </p>
          <button onClick={viewLeaderboard} className="leaderboard-button">
            View Detective Leaderboard
          </button>
        </div>
      ) : showIntro ? (
        <div className="story-intro">
          <div dangerouslySetInnerHTML={{ __html: storyIntro }} />
          <button onClick={() => setShowIntro(false)} className="start-mission-button">
            Begin Investigation
          </button>
        </div>
      ) : (
        <>
          <div className="clue-box">
            <div dangerouslySetInnerHTML={{ __html: treasureHunt[currentClueIndex].clue }} />
          </div>
          
          <form onSubmit={handleSubmit} className="answer-form">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
              className="answer-input"
            />
            <button type="submit" className="submit-button">
              Submit Answer
            </button>
          </form>
          
          {result.message && (
            <div className={`result ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              {result.message}
            </div>
          )}
          
          <div className="progress">
            Investigation Progress: {currentClueIndex + 1}/{treasureHunt.length}
          </div>
        </>
      )}
    </div>
  );
}

export default CluePage;
