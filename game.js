let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

function showMainMenu() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('top-scores').classList.add('hidden');
}


function showSettings() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('settings').classList.remove('hidden');
}

function saveSettings() {
    const timeLimit = parseInt(document.getElementById('time-limit').value, 10);
    const questionCount = parseInt(document.getElementById('question-count').value, 10);
    localStorage.setItem('settings', JSON.stringify({ timeLimit, questionCount }));
    alert('Settings Saved Successfully!');
}



//Excel File Settings

async function excelToJson(file) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

document.getElementById('file-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    questions = [];
    questions = await excelToJson(file);

    if (questions.length > 0) {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        const questionLimit = settings.questionCount || questions.length;
        questions = questions.slice(0, questionLimit);
        alert(`Questions Loaded and ${questions.length} Question Selected. You can start the game.`);
        currentQuestionIndex = 0;
    } else {
        alert("Questions in Excel file could not be read.");
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


//GAME SETTINGS
function startGame() {
    resetGameState();
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    startTimer();
    showQuestion(0);
}

function endGame() {
    clearInterval(timer);
    const playerName = prompt('Game Over! Enter your Name:');
    const scores = JSON.parse(localStorage.getItem('topScores') || '[]');
    scores.push({ name: playerName, score });
    localStorage.setItem('topScores', JSON.stringify(scores));
    alert(`
Your score has been saved: ${score}`);
    showMainMenu();
}

function resetGameState() {
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer);
    document.getElementById('score').textContent = `Puan: ${score}`;
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    const questionLimit = settings.questionCount || questions.length;
    shuffleArray(questions);
    questions = questions.slice(0, questionLimit);
}

function startTimer() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    let timeLeft = settings?.timeLimit || 60;

    document.getElementById('timer').textContent = `Süre: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Süre: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function showQuestion(index) {
    if (index < questions.length) {
        const question = questions[index];
        document.getElementById('question-text').textContent = question['Soru Metni'];
        document.getElementById('question-image').src = question['Görsel URL'];
    } else {
        endGame();
    }
}


async function checkAnswer(selectedCity) {
    const correctCity = questions[currentQuestionIndex]['Doğru Cevap'];
    const normalizedSelectedCity = normalizeText(selectedCity);
    const normalizedCorrectCity = normalizeText(correctCity);

    if (normalizedSelectedCity === normalizedCorrectCity) {
        alert("Correct! You earned points.");
        score += 10;
    } else {
        alert(`Wrong! Correct Answer: ${correctCity}`);
    }

    document.getElementById('score').textContent = `Point: ${score}`;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}


// MAP SETTINGS
const map = L.map('map').setView([39.92077, 32.85411], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


map.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    const selectedCity = data.address?.province?.toUpperCase();

    if (selectedCity) {
        const normalizedCity = normalizeText(selectedCity);
        const userConfirmed = confirm(`Selected city: ${selectedCity}. Are you sure?`);
        if (userConfirmed) {
            checkAnswer(normalizedCity);
        }
    } else {
        alert("City information could not be loaded. Please choose a different location.");
    }
});

function normalizeText(text) {
    const charMap = {
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    };

    return text
        .toUpperCase()
        .replace(/[ÇĞİÖŞÜçğıöşü]/g, char => charMap[char] || char);
}

function showTopScores() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('top-scores').classList.remove('hidden');

    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';

    const scores = JSON.parse(localStorage.getItem('topScores') || '[]');
    scores.sort((a, b) => b.score - a.score).slice(0, 10).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        scoreList.appendChild(li);
    });
}