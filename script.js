// script.js
document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;
        parseCSV(contents);
    };

    reader.readAsText(file);
}

function parseCSV(data) {
    const lines = data.split('\n');
    const categories = lines[0].split(',');
    const questions = lines.slice(1).map(line => line.split(','));
    
    createGameBoard(categories, questions);
}

function createGameBoard(categories, questions) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.textContent = category;
        gameBoard.appendChild(categoryDiv);
    });

    questions.forEach((row, rowIndex) => {
        row.forEach((question, colIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.textContent = (rowIndex + 1) * 100;
            questionDiv.dataset.question = question;
            questionDiv.addEventListener('click', showQuestion);
            gameBoard.appendChild(questionDiv);
        });
    });
}

function showQuestion(event) {
    const questionText = event.target.dataset.question;
    const modal = document.getElementById('questionModal');
    const modalContent = document.getElementById('questionText');

    modalContent.textContent = questionText;
    modal.style.display = 'block';

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
