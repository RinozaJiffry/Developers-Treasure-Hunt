document.addEventListener('DOMContentLoaded', () => {
    // Treasure hunt clues and answers
    const treasureHunt = [
        {
            clue: "I'm tall when I'm young, and short when I'm old. What am I?",
            answer: "candle"
        },
        {
            clue: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
            answer: "map"
        },
        {
            clue: "What has keys but no locks, space but no room, and you can enter but not go in?",
            answer: "keyboard"
        },
        {
            clue: "The more you take, the more you leave behind. What am I?",
            answer: "footsteps"
        },
        {
            clue: "I'm found in the sea and on land but I don't walk or swim. I travel by foot but I have no toes. No matter where I go, I'm never far from home. What am I?",
            answer: "snail"
        },
        {
            clue: "I have branches, but no fruit, trunk or leaves. What am I?",
            answer: "bank"
        },
        {
            clue: "What building has the most stories?",
            answer: "library"
        },
        {
            clue: "What can travel around the world while staying in a corner?",
            answer: "stamp"
        },
        {
            clue: "I'm light as a feather, but the strongest person can't hold me for more than a few minutes. What am I?",
            answer: "breath"
        },
        {
            clue: "The person who makes it, sells it. The person who buys it, never uses it. The person who uses it, never sees it. What is it?",
            answer: "coffin"
        }
    ];

    // Game state
    let currentClueIndex = 0;
    let startTime = Date.now();

    // DOM elements
    const clueElement = document.getElementById('clue');
    const answerForm = document.getElementById('answer-form');
    const answerInput = document.getElementById('answer');
    const resultElement = document.getElementById('result');
    const progressElement = document.getElementById('progress');

    // Display the first clue
    displayClue();

    // Handle form submission
    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = treasureHunt[currentClueIndex].answer;
        
        if (userAnswer === correctAnswer) {
            // Correct answer
            resultElement.textContent = "Correct! Moving to the next clue...";
            resultElement.className = "correct";
            
            // Move to next clue
            currentClueIndex++;
            
            if (currentClueIndex < treasureHunt.length) {
                // Display next clue after a short delay
                setTimeout(() => {
                    displayClue();
                    answerInput.value = "";
                    resultElement.textContent = "";
                }, 1500);
            } else {
                // Game completed
                const totalTime = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(totalTime / 60);
                const seconds = totalTime % 60;
                
                clueElement.textContent = `Congratulations! You've found the treasure!`;
                answerForm.style.display = "none";
                resultElement.textContent = `You completed the hunt in ${minutes} minutes and ${seconds} seconds.`;
                progressElement.textContent = `Completed: 10/10`;
            }
        } else {
            // Incorrect answer
            resultElement.textContent = "Incorrect answer. Try again!";
            resultElement.className = "incorrect";
        }
    });

    // Function to display the current clue
    function displayClue() {
        clueElement.textContent = treasureHunt[currentClueIndex].clue;
        progressElement.textContent = `Clue: ${currentClueIndex + 1}/${treasureHunt.length}`;
    }
});
