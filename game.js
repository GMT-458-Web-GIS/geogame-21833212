// Oyunun değişkenleri
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Bölüm geçişleri
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

