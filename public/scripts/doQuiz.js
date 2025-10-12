let totalQuizTime = 0
let timePerQuestion = 60;
let remaningTime = 0;
let quizSelection = null; // { startIndex: 1-based, count }
document.getElementById('quizModeBtn').addEventListener('click', () => {
    // If not currently in quizMode, show modal to pick number of questions and starting index
    if (!quizMode) {
        const source = (Array.isArray(filtered) && filtered.length) ? filtered : (Array.isArray(questions) ? questions : []);
        const totalAvailable = source.length;
        if (totalAvailable === 0) {
            alert('Không có câu hỏi để bắt đầu Quiz.');
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'quizSelectModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.background = 'rgba(0,0,0,0.4)';
        modal.style.zIndex = '200';

        const box = document.createElement('div');
        box.style.background = '#fff';
        box.style.padding = '18px';
        box.style.borderRadius = '10px';
        box.style.width = '320px';
        box.style.boxShadow = '0 12px 40px rgba(2,6,23,0.4)';

        const title = document.createElement('h3');
        title.textContent = 'Cấu hình Quiz';
        title.style.marginTop = '0';
        title.style.marginBottom = '8px';

        const info = document.createElement('div');
        info.style.marginBottom = '10px';
        info.style.color = 'var(--muted)';
        info.textContent = `Tổng câu khả dụng: ${totalAvailable}`;

        const form = document.createElement('div');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.gap = '8px';

        const countLabel = document.createElement('label');
        countLabel.textContent = 'Số câu hỏi';
        const countInput = document.createElement('input');
        countInput.type = 'number';
        countInput.min = '1';
        countInput.max = String(totalAvailable);
        countInput.value = String(Math.min(perPage, totalAvailable));
        countInput.style.padding = '8px';
        countInput.style.borderRadius = '6px';
        countInput.style.border = '1px solid #e5e7eb';

        const startLabel = document.createElement('label');
        startLabel.textContent = 'Bắt đầu từ câu';
        const startInput = document.createElement('input');
        startInput.type = 'number';
        startInput.min = '1';
        startInput.max = String(totalAvailable);
        startInput.value = '1';
        startInput.style.padding = '8px';
        startInput.style.borderRadius = '6px';
        startInput.style.border = '1px solid #e5e7eb';

        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.justifyContent = 'flex-end';
        actions.style.gap = '8px';
        actions.style.marginTop = '8px';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn alt';
        cancelBtn.textContent = 'Hủy';
        const startBtn = document.createElement('button');
        startBtn.className = 'btn';
        startBtn.textContent = 'Bắt đầu';

        actions.appendChild(cancelBtn);
        actions.appendChild(startBtn);

        form.appendChild(countLabel);
        form.appendChild(countInput);
        form.appendChild(startLabel);
        form.appendChild(startInput);

        box.appendChild(title);
        box.appendChild(info);
        box.appendChild(form);
        box.appendChild(actions);
        modal.appendChild(box);
        document.body.appendChild(modal);

        countInput.focus();

        function closeModal() {
            modal.remove();
        }

        cancelBtn.addEventListener('click', () => { closeModal(); });
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        startBtn.addEventListener('click', () => {
            const count = Math.min(totalAvailable, Math.max(1, parseInt(countInput.value, 10) || 1));
            const start = Math.min(totalAvailable, Math.max(1, parseInt(startInput.value, 10) || 1));
            if (isNaN(count) || count < 1) { alert('Số câu không hợp lệ'); return; }
            if (isNaN(start) || start < 1) { alert('Số bắt đầu không hợp lệ'); return; }
            const maxStart = Math.max(1, totalAvailable - count + 1);
            const finalStart = Math.min(start, maxStart);

            quizSelection = { startIndex: finalStart, count };
            quizMode = true;
            totalQuizTime = count * timePerQuestion;
            submited = false;
            document.getElementById('quizModeBtn').classList.remove('btn-primary');
            document.getElementById('quizModeBtn').textContent = 'Thoát Quiz';
            document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct', 'disabled'));
            setStatus('Chế độ Quiz: chọn đáp án để kiểm tra');
            closeModal();
            showAnswers = false;
            perPage = count;
            currentPage = 1;
            updateQuizInfo();
            updateViewerForQuizMode();
            document.getElementById('pagerArea').style.display = 'none';
            renderPage(questions.slice(finalStart - 1, finalStart - 1 + count));
        });
        
    } else {
        // exiting quiz
        quizMode = false;
        clearInterval(window.quizTimerInterval);
        document.getElementById('quizModeBtn').classList.add('btn-primary');
        document.getElementById('quizModeBtn').textContent = 'Bắt đầu Quiz';
        document.querySelectorAll('.opt').forEach(o => o.classList.remove('selected', 'wrong', 'correct', 'disabled'));
        document.getElementById('pagerArea').style.display = 'flex';
        setStatus('Thoát chế độ Quiz');
        updateViewerForQuizMode();
        renderPage()
        // keep quizSelection if you want to resume later
    }
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
        document.getElementById('flashCardsBtn').style.display = 'none';
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
        document.getElementById('flashCardsBtn').style.display = 'block';
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
        remaningTime = timer;
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
    const source = (Array.isArray(filtered) && filtered.length) ? filtered : (Array.isArray(questions) ? questions : []);
    if (!quizMode) {
        quizInfo = [];
        return;
    }
    // if quizSelection provided, slice from that range (1-based startIndex)
    let items = [];
    if (quizSelection && typeof quizSelection.startIndex === 'number' && typeof quizSelection.count === 'number') {
        const s = Math.max(1, quizSelection.startIndex) - 1;
        items = source.slice(s, s + quizSelection.count);
    } else {
        const start = (currentPage - 1) * perPage;
        items = source.slice(start, start + perPage);
    }
    quizInfo = items.map(item => ({ id: item.id, userAnswer: null, answer: item.answer }));
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
        const totalTime = totalQuizTime - remaningTime;
        window.handleStoreExam(quizInfo, totalTime)
    }
}