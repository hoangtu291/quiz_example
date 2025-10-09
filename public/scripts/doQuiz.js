let totalQuizTime = 0
let timePerQuestion = 60;
document.getElementById('quizModeBtn').addEventListener('click', () => {
    quizMode = !quizMode;
    if (quizMode) {
        totalQuizTime = perPage * timePerQuestion
        submited = false
        document.getElementById('quizModeBtn').textContent = 'Thoát Quiz';
        document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct', 'disabled'));
        setStatus('Chế độ Quiz: chọn đáp án để kiểm tra');
    } else {
        clearInterval(window.quizTimerInterval);
        document.getElementById('quizModeBtn').textContent = 'Bắt đầu Quiz';
        document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct', 'disabled'));
        setStatus('Thoát chế độ Quiz');
    }
    showAnswers = false;
    updateQuizInfo()
    updateViewerForQuizMode();
});

document.getElementById('submitQuizBtn').addEventListener('click', () => {
    handleSubmitQuiz()
});


function updateViewerForQuizMode() {
    if (quizMode) {
        document.getElementById('header').style.position = 'sticky';
        document.getElementById('header').style.backdropFilter = 'blur(10px)';
        document.getElementById('header').style.backgroundColor = 'transparent';
        document.getElementById('header').style.top = '0';
        document.getElementById('header').style.left = '0';
        document.getElementById('header').style.right = '0';
        document.getElementById('quiz-timer').style.display = 'block';
        document.getElementById('tools').style.display = 'none';
        document.getElementById('questionPanel').style.display = 'block';
        document.getElementById('submitQuizBtn').style.display = 'block';
        document.getElementById('loadJsonBtn').style.display = 'none';
        document.getElementById('header-searchbar').style.display = 'none';
        renderQuestionInGrid();
        startQuizTimer(totalQuizTime);
    } else {
        document.getElementById('header').style.position = 'relative';
        document.getElementById('quiz-timer').style.display = 'none';
        clearInterval(window.quizTimerInterval);
        document.getElementById('header').style.backdropFilter = 'none';
        document.getElementById('header').style.backgroundColor = 'var(--header-bg)';
        document.getElementById('questionInGrids').style.display = 'none';
        document.getElementById('tools').style.display = 'flex';
        document.getElementById('submitQuizBtn').style.display = 'none';
        document.getElementById('loadJsonBtn').style.display = 'block';
        document.getElementById('header-searchbar').style.display = 'block';
    }
}
function startQuizTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerElement = document.getElementById('quiz-timer');
    clearInterval(window.quizTimerInterval);
    window.quizTimerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        timerElement.textContent = `${minutes} phút ${seconds} giây`;
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
        btn.className = 'btn small ' + ((quizMode && !!submited) ? (q.userAnswer === q.answer ? 'success' : 'error') : '') + (!!q.userAnswer ? '' : 'ques-btn');
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
        let opts = document.getElementById(`qopts-${id}`)
        if (opts) {
            opts.querySelectorAll('.opt').forEach(el => el.classList.remove('selected'));
            let opt = document.getElementById(`qopt-${id}_${userAnswer}`)
            opt.classList.add('selected')
        }
    }
    renderQuestionInGrid()
}


function handleSubmitQuiz() {
    const result = confirm("Bạn có chắc chắn muốn nộp bài?")
    if (result) {
        submited = true
        document.getElementById('submitQuizBtn').style.display = 'none';
        clearInterval(window.quizTimerInterval);
        toggleShowAnswers()
        renderQuestionInGrid()
    }
}