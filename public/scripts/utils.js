function scrollToQuestion(qnum) {
    if (!qnum || qnum < 1) return;
    const idx = qnum - 1;
    const page = Math.floor(idx / perPage) + 1;
    currentPage = Math.min(Math.max(1, page), Math.ceil(filtered.length / perPage));
    renderPage();

    const questionElement = document.getElementById("qheader-" + qnum)
    if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        questionElement.classList.add('highlight');
        setTimeout(() => questionElement.classList.remove('highlight'), 2000);
    }
}

function toggleShowAnswers(value) {
    showAnswers = !!value;
    document.getElementById('showAnswersBtn').textContent = showAnswers ? 'Ẩn đáp án' : 'Hiện đáp án';
    renderPage();
}

function getQuizInfoById(id) {
    return quizInfo.find(item => item.id == id)
}