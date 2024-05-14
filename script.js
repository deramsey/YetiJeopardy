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
    const lines = data.trim().split('\n');
    const categories = lines[0].split(',').slice(0, 6); // Ensure only 6 categories are taken
    const questions = lines.slice(1, 6).map(line => line.split(',').slice(0, 6)); // Ensure only 5 questions per category

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

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        for (let colIndex = 0; colIndex < 6; colIndex++) {
            const question = questions[rowIndex][colIndex];
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.textContent = (rowIndex + 1) * 100;
            questionDiv.dataset.question = question || 'No question';
            questionDiv.addEventListener('click', showQuestion);
            gameBoard.appendChild(questionDiv);
        }
    }
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
