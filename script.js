const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty from local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Select difficulty value
difficultySelect.value = difficulty;

// Focus on input field on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get random word from array
function getRandomWord() {
	
	fetch('https://random-word-api.herokuapp.com/word')
		.then(res => res.json())
		.then(data => {
			addWordToDOM(data);
		})
}

// Add word to DOM
function addWordToDOM(fetchedWord) {
	word.innerText = fetchedWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';
	
	if(time === 0) {
		clearInterval(timeInterval);
		// End game
		gameOver();
	}
}

// Game over, show end screen
function gameOver() {
	endgameEl.innerHTML = `
	<h1>Time ran out</h1>
	<p>Your final score is: ${score}</p>
	<button onclick="location.reload()">Restart</button>
	`;
	
	endgameEl.style.display = 'flex';
}

// Event listener

// Typing
text.addEventListener('input', e => {
	const insertedText = e.target.value;
	timeInterval;
	
	if(insertedText === word.innerText) {
		getRandomWord();
		updateScore();
		e.target.value = '';
		
		if(difficulty === 'hard') {
			time += 2;
		} else if(difficulty === 'medium') {
			time += 3;
		} else {
			time += 5;
		}
	}
});

// Settings btn click
settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('hide');
})

// Settings select
settingsForm.addEventListener('change', (e) => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty);
});

getRandomWord();
