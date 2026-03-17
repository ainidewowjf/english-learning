// ===============================
// 极简版英语学习网站 - V6.2 最终修复版
// ===============================

// 全局变量
let currentLevel = '';
let currentLesson = {};
let currentLessonIndex = 0;
let learnedWords = [];
let wordIndex = 0;
let correctCount = 0;
let totalAttempts = 0;
let currentPractice = {};
let practiceItemIndex = 0;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 App Started');
    initEvents();
});

// 初始化事件
function initEvents() {
    // 单词检查
    document.getElementById('checkWordBtn').onclick = checkWord;
    document.getElementById('skipBtn').onclick = skipWord;
    document.getElementById('nextWordBtn').onclick = nextWord;
    document.getElementById('playWordBtn').onclick = playCurrentWord;
    
    // 句子练习
    document.getElementById('checkSentenceBtn').onclick = checkSentence;
    document.getElementById('resetSentenceBtn').onclick = resetSentence;
    document.getElementById('finishLessonBtn').onclick = showCompletion;
    document.getElementById('nextLessonFromCompleteBtn').onclick = goToNextLesson;
    
    // 专项练习
    document.getElementById('checkPracticeBtn').onclick = checkPractice;
    document.getElementById('showAnswerBtn').onclick = showPracticeAnswer;
    document.getElementById('nextPracticeBtn').onclick = nextPracticeItem;
}

// ========== 页面切换 ==========

function hideAllPages() {
    document.querySelectorAll('.content-area, .home-page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
}

function showHomePage() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '首页';
}

function showLevelSelector() {
    console.log('➡️ showLevelSelector');
    hideAllPages();
    document.getElementById('levelSelectorPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '级别选择';
}

function showPracticeList() {
    console.log('➡️ showPracticeList');
    hideAllPages();
    document.getElementById('practiceListPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '专项练习';
    renderPracticeList();
}

function showGrammarGuide() {
    console.log('➡️ showGrammarGuide');
    hideAllPages();
    document.getElementById('grammarDetailPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '语法指南';
    renderGrammarList();
}

function selectLevel(level) {
    console.log('➡️ selectLevel:', level);
    currentLevel = level;
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });
    
    const lessons = getLessonsByLevel(level);
    console.log(`Level ${level}: ${lessons.length} lessons`);
    
    const container = document.getElementById('lessonListContainer');
    const listEl = document.getElementById('lessonList');
    const titleEl = document.getElementById('selectedLevelTitle');
    
    if (!container || !listEl || !titleEl) {
        console.error('Elements not found!');
        return;
    }
    
    container.style.display = 'block';
    titleEl.textContent = `${level} 级课程 - ${lessons.length} 课`;
    
    listEl.innerHTML = lessons.map((l, i) => `
        <div class="lesson-item" onclick="startLesson(${i}, true)">
            <div class="lesson-number">${l.lesson}</div>
            <div class="lesson-info">
                <div class="lesson-title">${l.title}</div>
                <div class="lesson-level">${l.words.length} 词 + 1 句</div>
            </div>
        </div>
    `).join('');
}

function startLesson(index, fromLevel) {
    console.log('➡️ startLesson:', index, fromLevel);
    
    let lessons = fromLevel ? getLessonsByLevel(currentLevel) : (window.COMPLETE_DB ? window.COMPLETE_DB.allLessons : []);
    currentLessonIndex = index;
    currentLesson = lessons[index];
    
    if (!currentLesson) {
        alert('课程加载失败！');
        console.error('No lesson at index:', index);
        return;
    }
    
    learnedWords = [];
    wordIndex = 0;
    correctCount = 0;
    totalAttempts = 0;
    
    hideAllPages();
    document.getElementById('lessonLearnPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = `第${currentLesson.lesson}课`;
    
    showPage('word');
    loadWord(0);
}

function getLessonsByLevel(level) {
    const map = {'A1':'level_a1','A2':'level_a2','B1':'level_b1','B2':'level_b2','C1':'level_c1','C2':'level_c2'};
    return window.ENGLISH_DB ? window.ENGLISH_DB[map[level]] : [];
}

// ========== 课程学习 ==========

function showPage(name) {
    ['word','sentence','complete'].forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.style.display = p === name ? 'block' : 'none';
    });
    
    ['step1','step2','step3'].forEach((sid, idx) => {
        const el = document.getElementById(sid);
        if (el) {
            el.className = 'step';
            if (idx + 1 === (name === 'word' ? 1 : name === 'sentence' ? 2 : 3)) el.classList.add('active');
            else if (idx + 1 < (name === 'word' ? 1 : name === 'sentence' ? 2 : 3)) el.classList.add('completed');
        }
    });
}

function loadWord(idx) {
    const words = currentLesson.words || [];
    
    if (idx >= words.length) {
        setTimeout(() => { showPage('sentence'); setupSentence(); }, 300);
        return;
    }
    
    wordIndex = idx;
    const w = words[idx];
    
    const input = document.getElementById('wordInput');
    input.value = '';
    input.className = 'input-large';
    input.focus();
    
    document.getElementById('chineseHint').textContent = '请输入：' + w.chinese;
    document.getElementById('phoneticDisplay').textContent = w.word + ' [' + w.phonetic + ']';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    document.getElementById('checkWordBtn').style.display = 'inline-block';
    document.getElementById('nextWordBtn').style.display = 'none';
    document.getElementById('skipBtn').style.display = 'inline-block';
    
    updateLearnedList();
}

function playCurrentWord() {
    const w = currentLesson.words[wordIndex];
    if (w) speak(w.word);
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        window.speechSynthesis.speak(u);
    }
}

window.playAnyWord = function(word) { speak(word); };

function checkWord() {
    const w = currentLesson.words[wordIndex];
    if (!w) return;
    
    const input = document.getElementById('wordInput');
    const user = input.value.trim().toLowerCase().replace(/[.,!?;:'"()-]/g, '');
    const target = w.word.toLowerCase();
    
    totalAttempts++;
    
    if (user === target) {
        input.className = 'input-large correct';
        document.getElementById('feedback').textContent = '✓ 正确！🎉';
        document.getElementById('feedback').className = 'feedback correct';
        
        if (!learnedWords.includes(w)) learnedWords.push(w);
        correctCount++;
        playSound('ok');
        speak(w.word);
        
        document.getElementById('checkWordBtn').style.display = 'none';
        document.getElementById('nextWordBtn').style.display = 'inline-block';
        document.getElementById('skipBtn').style.display = 'none';
        
        setTimeout(nextWord, 600);
    } else {
        input.className = 'input-large wrong';
        document.getElementById('feedback').textContent = '✗ 答案：' + w.word;
        document.getElementById('feedback').className = 'feedback wrong';
        playSound('err');
        setTimeout(() => input.className = 'input-large', 500);
    }
}

function skipWord() { nextWord(); }

function nextWord() { loadWord(wordIndex + 1); }

function updateLearnedList() {
    const list = document.getElementById('learnedList');
    const chips = document.getElementById('learnedChips');
    
    if (!learnedWords.length) {
        list.style.display = 'none';
        return;
    }
    
    list.style.display = 'block';
    chips.innerHTML = learnedWords.map(w => 
        '<div class="learned-chip">' + w.word + 
        '<button class="play-btn" onclick="playAnyWord(\'' + w.word + '\')"><i class="fas fa-volume-up"></i></button></div>'
    ).join('');
}

function setupSentence() {
    const s = currentLesson.sentence;
    if (!s) return;
    
    document.getElementById('sentenceChinese').textContent = s.chinese;
    const input = document.getElementById('sentenceInput');
    input.value = '';
    input.className = 'practice-input';
    input.focus();
    
    document.getElementById('sentenceFeedback').textContent = '';
    document.getElementById('checkSentenceBtn').style.display = 'inline-block';
    document.getElementById('finishLessonBtn').style.display = 'none';
    document.getElementById('resetSentenceBtn').style.display = 'inline-block';
}

function checkSentence() {
    const s = currentLesson.sentence;
    if (!s) return;
    
    const input = document.getElementById('sentenceInput');
    const user = input.value.trim().toLowerCase().replace(/[.,!?;:'"()-]/g, '').replace(/\s+/g, ' ');
    const target = s.english.toLowerCase().replace(/[.,!?;:'"()-]/g, '').replace(/\s+/g, ' ');
    
    totalAttempts++;
    
    if (user === target) {
        input.className = 'practice-input correct';
        document.getElementById('sentenceFeedback').textContent = '✓ 完美！🎊';
        document.getElementById('sentenceFeedback').className = 'feedback correct';
        playSound('ok');
        
        document.getElementById('checkSentenceBtn').style.display = 'none';
        document.getElementById('finishLessonBtn').style.display = 'inline-block';
        document.getElementById('resetSentenceBtn').style.display = 'none';
        
        setTimeout(showCompletion, 800);
    } else {
        input.className = 'practice-input wrong';
        document.getElementById('sentenceFeedback').textContent = '✗ 试试：' + s.english;
        document.getElementById('sentenceFeedback').className = 'feedback wrong';
        playSound('err');
        setTimeout(() => input.className = 'practice-input', 500);
    }
}

function resetSentence() { setupSentence(); }

function showCompletion() {
    showPage('complete');
    document.getElementById('step1').classList.add('completed');
    document.getElementById('step2').classList.add('completed');
    document.getElementById('step3').classList.add('active');
    
    const acc = totalAttempts > 0 ? Math.round(correctCount / totalAttempts * 100) : 100;
    document.getElementById('wordsLearnedCount').textContent = learnedWords.length;
    document.getElementById('correctCountVal').textContent = correctCount;
    document.getElementById('accuracyRateVal').textContent = acc + '%';
    
    playSound('success');
}

function goToNextLesson() {
    if (currentLevel) {
        const lessons = getLessonsByLevel(currentLevel);
        if (currentLessonIndex < lessons.length - 1) {
            startLesson(currentLessonIndex + 1, true);
        } else {
            alert('恭喜完成本级别！🎉');
            showLevelSelector();
        }
    } else {
        showLevelSelector();
    }
}

// ========== 专项练习 ==========

function renderPracticeList() {
    const practices = ENGLISH_DB.special_practices || [];
    const cats = {};
    
    practices.forEach(p => {
        if (!cats[p.category]) cats[p.category] = [];
        cats[p.category].push(p);
    });
    
    document.getElementById('practiceCategories').innerHTML = Object.entries(cats).map(([cat, items]) => `
        <div class="category-section">
            <div class="category-title"><i class="fas fa-tag" style="color:#6366f1;"></i> ${cat}</div>
            ${items.map(p => `<div class="practice-item" onclick="startPractice('${p.id}')">
                <div class="practice-title">${p.title}</div>
                <div class="practice-desc">${p.description}</div>
            </div>`).join('')}
        </div>
    `).join('');
}

function startPractice(id) {
    currentPractice = ENGLISH_DB.special_practices.find(p => p.id === id);
    if (!currentPractice) return;
    
    practiceItemIndex = 0;
    hideAllPages();
    document.getElementById('practiceRunPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = currentPractice.title;
    
    loadPracticeItem(0);
}

function loadPracticeItem(idx) {
    const items = currentPractice.items || [];
    if (idx >= items.length) {
        alert('完成！🎉');
        showPracticeList();
        return;
    }
    
    practiceItemIndex = idx;
    const item = items[idx];
    
    document.getElementById('practiceTitleDisplay').textContent = currentPractice.title;
    document.getElementById('practiceProgress').textContent = `第${idx+1}/${items.length}`;
    document.getElementById('practiceQuestion').textContent = item.question;
    
    const input = document.getElementById('practiceInput');
    input.value = '';
    input.className = 'practice-input';
    input.focus();
    
    document.getElementById('practiceExplanation').style.display = 'none';
    document.getElementById('practiceFeedback').textContent = '';
    document.getElementById('checkPracticeBtn').style.display = 'inline-block';
    document.getElementById('showAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextPracticeBtn').style.display = 'none';
    
    document.getElementById('practiceHelp').style.display = 'block';
    document.getElementById('helpContent').innerHTML = `<strong>提示：</strong>${item.explanation}`;
}

function checkPractice() {
    const item = currentPractice.items[practiceItemIndex];
    const input = document.getElementById('practiceInput');
    const user = input.value.trim().toLowerCase();
    
    if (user === item.answer.toLowerCase()) {
        input.className = 'practice-input correct';
        document.getElementById('practiceFeedback').textContent = '✓ 正确！🎉';
        document.getElementById('practiceFeedback').className = 'feedback correct';
        playSound('ok');
        
        document.getElementById('practiceExplanation').style.display = 'block';
        document.getElementById('practiceExplanation').innerHTML = 
            '<div class="explanation-title">✅ 解析</div><strong>答案：</strong>' + item.answer + '<br><strong>解释：</strong>' + item.explanation;
        
        document.getElementById('checkPracticeBtn').style.display = 'none';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('nextPracticeBtn').style.display = 'inline-block';
        
        setTimeout(nextPracticeItem, 800);
    } else {
        input.className = 'practice-input wrong';
        document.getElementById('practiceFeedback').textContent = '✗ 不对';
        document.getElementById('practiceFeedback').className = 'feedback wrong';
        playSound('err');
        setTimeout(() => input.className = 'practice-input', 500);
    }
}

function showPracticeAnswer() {
    const item = currentPractice.items[practiceItemIndex];
    document.getElementById('practiceExplanation').style.display = 'block';
    document.getElementById('practiceExplanation').innerHTML = 
        '<div class="explanation-title">💡 答案</div><strong>' + item.answer + '</strong><br>' + item.explanation;
}

function nextPracticeItem() { loadPracticeItem(practiceItemIndex + 1); }

// ========== 语法指南 ==========

function renderGrammarList() {
    const grammars = ENGLISH_DB.grammar_guide || [];
    document.getElementById('grammarListView').innerHTML = grammars.map(g => `
        <div class="grammar-item" onclick="viewGrammar('${g.id}')">
            <div class="grammar-title">${g.title}</div>
            <div class="grammar-summary">${g.summary}</div>
        </div>
    `).join('');
}

function viewGrammar(id) {
    const g = ENGLISH_DB.grammar_guide.find(x => x.id === id);
    if (!g) return;
    
    document.getElementById('grammarListView').style.display = 'none';
    document.getElementById('grammarDetailView').style.display = 'block';
    
    document.getElementById('detTitle').textContent = g.title;
    document.getElementById('detLevel').textContent = g.level;
    document.getElementById('detSummary').textContent = g.summary;
    
    if (g.rules) {
        document.getElementById('detRules').innerHTML = g.rules.map(r => `
            <div class="rule-card">
                <div class="rule-title">${r.rule}</div>
                <div class="rule-example">${r.example}</div>
            </div>
        `).join('');
    }
    
    if (g.common_mistakes) {
        document.getElementById('detMistakes').innerHTML = 
            '<div class="mistake-title">⚠️ 常见错误</div>' + 
            g.common_mistakes.map(m => '<div class="mistake-item">'+m+'</div>').join('');
    }
    
    if (g.exercises) {
        document.getElementById('detExercises').innerHTML = g.exercises.map(ex => `
            <div class="exercise-item">
                <div class="exercise-q">${ex.q}</div>
                <div class="exercise-answer"><strong>答案：</strong>${ex.a} — ${ex.exp}</div>
            </div>
        `).join('');
    }
}

// ========== 音效 ==========

function playSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === 'ok' || type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        }
    } catch(e) {}
}

// 回车键支持
document.addEventListener('keypress', function(e) {
    if (e.key !== 'Enter') return;
    
    const tag = e.target.tagName.toLowerCase();
    if (tag !== 'input') return;
    
    const id = e.target.id;
    if (id === 'wordInput') {
        const btn = document.getElementById('nextWordBtn').style.display !== 'none' 
            ? document.getElementById('nextWordBtn') : document.getElementById('checkWordBtn');
        btn.click();
    } else if (id === 'sentenceInput') {
        const btn = document.getElementById('finishLessonBtn').style.display !== 'none'
            ? document.getElementById('finishLessonBtn') : document.getElementById('checkSentenceBtn');
        btn.click();
    } else if (id === 'practiceInput') {
        const btn = document.getElementById('nextPracticeBtn').style.display !== 'none'
            ? document.getElementById('nextPracticeBtn') : document.getElementById('checkPracticeBtn');
        btn.click();
    }
});
