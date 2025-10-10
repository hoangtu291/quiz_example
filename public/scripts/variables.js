let questions = [];
let filtered = [];
let perPage = 10;
let currentPage = 1;
let showAnswers = false;
let quizMode = false;
let flashCardsMode = localStorage.getItem('flashCardsMode') === 'true';

let submited = false;
let quizInfo = quizMode ? filtered.map(item => {
    return {
        id: item.id,
        userAnswer: null,
        answer: item.answer
    }
}) : []
const statusLine = document.getElementById('statusLine');