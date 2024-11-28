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
        currentQuestionIndex = 0; // 
    } else {
        alert("Questions in Excel file could not be read.");
    }
});


//GAME SETTINGS
function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    showQuestion(0);
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

