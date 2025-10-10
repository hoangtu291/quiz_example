// Flash cards mode
(function () {
    const flashCardBtn = document.getElementById('flashCardsBtn');
    if (!flashCardBtn) return;
    const container = document.getElementById('questionsContainer');
    let flashWrapper = null;
    let currentIndex = 0;
    let allItems = [];
    let flipped = false;

    function getAllItems() {
        // prefer filtered if user filtered the set; otherwise use full questions array
        if (Array.isArray(filtered) && filtered.length) return filtered;
        return (Array.isArray(questions) ? questions : []);
    }

    function createInline() {
        flashWrapper = document.createElement('div');
        flashWrapper.id = 'flashInline';
        flashWrapper.innerHTML = `
			<div class="flash-wrap-inline">
				<div class="flash-topbar" style="display:flex;gap:8px;align-items:center;margin-bottom:10px;">
					<label style="font-size:13px;color:var(--muted)">Bắt đầu từ câu:</label>
					<input id="flashStartInput" type="number" min="1" value="1" style="width:80px;padding:6px;border-radius:6px;border:1px solid #e5e7eb;background:transparent;color:var(--muted)" />
					<button class="btn" id="flashStartBtn">Bắt đầu</button>
					<div style="flex:1"></div>
					<button class="btn alt" id="flashCloseInline">Đóng</button>
				</div>
				<div class="flash-card" id="flashCardInline" tabindex="0" aria-live="polite" style="margin-bottom:10px;position:relative;">
					<div class="front" id="flashFrontInline"></div>
					<div class="back" id="flashBackInline"></div>
				</div>
				<div class="flash-controls" style="display:flex;gap:8px;align-items:center;">
					<button class="btn alt" id="flashPrevInline">←</button>
					<button class="btn" id="flashFlipInline">Hiện đáp án</button>
					<button class="btn alt" id="flashNextInline">→</button>
				</div>
			</div>
		`;
        container.innerHTML = '';
        container.appendChild(flashWrapper);

        document.getElementById('flashCloseInline').addEventListener('click', closeInline);
        document.getElementById('flashPrevInline').addEventListener('click', () => show(currentIndex - 1));
        document.getElementById('flashNextInline').addEventListener('click', () => show(currentIndex + 1));
        document.getElementById('flashFlipInline').addEventListener('click', toggleFlip);
        document.getElementById('flashStartBtn').addEventListener('click', () => {
            const v = Number(document.getElementById('flashStartInput').value) || 1;
            const idx = Math.max(0, Math.min(v - 1, (pageItems || []).length - 1));
            show(idx);
        });

        const card = document.getElementById('flashCardInline');
        card.addEventListener('click', toggleFlip);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') show(currentIndex + 1);
            if (e.key === 'ArrowLeft') show(currentIndex - 1);
            if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggleFlip(); }
            if (e.key === 'Escape') closeInline();
        });
    }

    function openInline() {
        allItems = getAllItems();
        if (!allItems || allItems.length === 0) {
            alert('Không có câu hỏi để tạo flash cards.');
            return;
        }
        if (!flashWrapper) createInline();
        loadState();
        if (typeof currentIndex !== 'number' || isNaN(currentIndex)) currentIndex = 0;
        render();
        const card = document.getElementById('flashCardInline'); if (card) card.focus();
        // mark app as flash-active to hide side panel and expand main
        document.querySelector('.app').classList.add('flash-active');
    }

    function closeInline() {
        if (!flashWrapper) return;
        flashWrapper.remove(); flashWrapper = null;
        if (typeof renderPage === 'function') renderPage();
        // remove flash-active class
        document.querySelector('.app').classList.remove('flash-active');
    }

    function render() {
        const item = allItems[currentIndex];
        const front = document.getElementById('flashFrontInline');
        const back = document.getElementById('flashBackInline');
        if (!item) return;
        const qNumber = item.id || ((currentPage - 1) * perPage + currentIndex + 1);
        front.innerHTML = `
				<div style="display:flex;gap:12px;align-items:center;">
					<div class="flash-qnum">${escapeHtml(String(qNumber))}</div>
					<div style="font-size:15px; color:#111827;">${escapeHtml(item.question || '')}</div>
				</div>
			`;
        let answerText = '';
        if (item.options && item.options.length) {
            answerText = item.options.filter(option => option.key === item.answer).map(o => `<div style="display:flex;gap:12px;align-items:center; width:100%; justify-content:center;">
					<div class="flash-qnum-correct">${escapeHtml(o.key || '')}</div>
					<strong style="font-size:15px; color:#111827;">${escapeHtml(o.text || '')}</strong>
				</div>`).join('');
        } else {
            answerText = `<div>${escapeHtml(item.answer || '')}</div>`;
        }
        let wrongAnswersText = '';
        if (item.options && item.options.length) {
            wrongAnswersText = item.options.filter(option => option.key !== item.answer).map(o => `<div style="margin-bottom:6px"><strong>${escapeHtml(o.key || '')}.</strong> ${escapeHtml(o.text || '')}</div>`).join('');
        }
        back.innerHTML = `<div style="font-size:14px; color:#111827; width:100%;">${answerText} <div style="display:flex; justify-content:space-around; opacity:0.6; margin-top:20px;gap:12px">${wrongAnswersText}</div></div>`;
        document.getElementById('flashPrevInline').disabled = (currentIndex <= 0);
        document.getElementById('flashNextInline').disabled = (currentIndex >= allItems.length - 1);
        const card = document.getElementById('flashCardInline');
        if (flipped) card.classList.add('flip'); else card.classList.remove('flip');
        saveState();
    }

    function show(idx) {
        if (!allItems || allItems.length === 0) return;
        if (idx < 0) idx = 0;
        if (idx >= allItems.length) idx = allItems.length - 1;
        currentIndex = idx; flipped = false; render();
        const card = document.getElementById('flashCardInline'); if (card) card.focus();
    }

    function toggleFlip() { flipped = !flipped; const card = document.getElementById('flashCardInline'); if (card) card.classList.toggle('flip'); }

    function shuffle() {
        allItems = (allItems || []).slice();
        for (let i = allItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
        }
        currentIndex = 0;
        saveState();
    }

    // --- persistence helpers ---
    function storageKey() {
        // persist per path (whole set) since flashcards now go from start to end
        return `flashcards:${location.pathname}`;
    }

    function saveState() {
        try {
            const data = {
                ids: (allItems || []).map(i => i.id),
                currentIndex,
                flipped
            };
            localStorage.setItem(storageKey(), JSON.stringify(data));
        } catch (err) {
            console.warn('flashcards: could not save state', err);
        }
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(storageKey());
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && data.ids && data.ids.length) {
                const map = (getAllItems() || []).reduce((m, it) => { m[it.id] = it; return m; }, {});
                const restored = data.ids.map(id => map[id]).filter(Boolean);
                if (restored.length) allItems = restored.concat((getAllItems() || []).filter(it => !data.ids.includes(it.id)));
            }
            if (typeof data.currentIndex === 'number') currentIndex = Math.min(Math.max(0, data.currentIndex), (allItems || []).length - 1);
            flipped = !!data.flipped;
        } catch (err) {
            console.warn('flashcards: could not load state', err);
        }
    }

    flashCardBtn.addEventListener('click', () => {
        if (flashWrapper) closeInline(); else openInline();
        if (flashWrapper) {
            flashCardsMode = true;
            localStorage.setItem('flashCardsMode', true);
            document.getElementById('pagerArea').style.display = 'none';
            document.getElementById('sidePanel').style.display = 'none';
        } else {
            flashCardsMode = false;
            localStorage.setItem('flashCardsMode', false);
            document.getElementById('pagerArea').style.display = 'flex';
            document.getElementById('sidePanel').style.display = 'block';
        }
    });
})();
