let totalQuizTime = 0
let timePerQuestion = 60;
document.getElementById('quizModeBtn').addEventListener('click', () => {
    quizMode = !quizMode;
    totalQuizTime = quizMode ? perPage * timePerQuestion : 0;
    updateQuizInfo()
    updateViewerForQuizMode();
    document.getElementById('quizModeBtn').textContent = quizMode ? 'Thoát Quiz' : 'Bắt đầu Quiz';
    document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct'));
    showAnswers = false;
    setStatus(quizMode ? 'Chế độ Quiz: chọn đáp án để kiểm tra' : 'Thoát chế độ Quiz');
});


function updateViewerForQuizMode() {
    if (quizMode) {
        document.getElementById('header').style.position = 'sticky';
        document.getElementById('header').style.backdropFilter = 'blur(10px)';
        document.getElementById('header').style.backgroundColor = 'transparent';
        document.getElementById('header').style.top = '0';
        document.getElementById('header').style.left = '0';
        document.getElementById('header').style.right = '0';
        document.getElementById('logo-title').textContent = `Quiz mode - ${Math.ceil(totalQuizTime / 60)} phút`;
        document.getElementById('quiz-timer').style.display = 'block';
        document.getElementById('tools').style.display = 'none';
        document.getElementById('questionPanel').style.display = 'block';
        renderQuestionInGrid();
        startQuizTimer(totalQuizTime);
    } else {
        document.getElementById('header').style.position = 'relative';
        document.getElementById('quiz-timer').style.display = 'none';
        clearInterval(window.quizTimerInterval);
        document.getElementById('logo-title').textContent = 'Quiz Viewer';
        document.getElementById('header').style.backdropFilter = 'none';
        document.getElementById('header').style.backgroundColor = 'var(--header-bg)';
        document.getElementById('questionInGrids').style.display = 'none';
        document.getElementById('tools').style.display = 'flex';
    }
}
function startQuizTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerElement = document.getElementById('quiz-timer');
    clearInterval(window.quizTimerInterval);
    window.quizTimerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        timerElement.textContent = `Thời gian còn lại: ${minutes} phút ${seconds} giây`;
        if (--timer < 0) {
            clearInterval(window.quizTimerInterval);
            alert('Hết thời gian làm bài!');
            quizMode = false;
            document.getElementById('quizModeBtn').textContent = 'Bắt đầu Quiz';
            timerElement.style.display = 'none';
            document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct'));
            showAnswers = false;
            document.getElementById('showAnswersBtn').textContent = 'Hiện đáp án';
            setStatus('Thoát chế độ Quiz');
            renderQuestions();
        }
    }, 1000);
}

function renderQuestionInGrid() {
    const container = document.getElementById('questionInGrids');
    document.getElementById('questionInGrids').style.display = 'flex';
    document.getElementById('questionInGrids').style.flexWrap = 'wrap'
    container.innerHTML = '';
    for (let i = 0; i < quizInfo.length; i++) {
        const q = quizInfo[i];
        const btn = document.createElement('button');
        btn.textContent = q.id;
        btn.className = 'btn small ' + (q.userAnswer ? (q.userAnswer === q.answer ? 'correct' : 'wrong') : '' + (!!q.userAnswer ? '' : 'ques-btn'));
        btn.title = `Câu ${q.id}\n${q.userAnswer || 'Chưa trả lời'}`;
        btn.onclick = () => {
            scrollToQuestion(i+1)
        };
        container.appendChild(btn);
    }

}


function updateQuizInfo () {
    const start = (currentPage - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);
    quizInfo = quizMode ? pageItems.map(item => {
        return {
            id: item.id,
            userAnswer: null,
            answer: item.answer
        }
    }) : []
}

function setQuizUserAnswer(id, userAnswer) {
    const index = quizInfo.findIndex(item => item.id == id)
    if (index >= 0) {
        quizInfo[index].userAnswer = userAnswer
        opt = document.getElementById(`qopt-${id}_${userAnswer}`)
        opt.classList.add('selected')
        renderQuestionInGrid()
    }
}