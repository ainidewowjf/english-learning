// ============================================
// 英语大师 Pro - 完整学习系统 v6.0
// 新增：级别选择、专项练习、语法讲解
// ============================================

let currentPage = 'home';
let currentLevel = '';
let currentLesson = {};
let currentLessonIndex = 0;
let learnedWords = [];
let wordIndex = 0;
let correctCount = 0;
let totalAttempts = 0;

let currentPractice = {};
let practiceItemIndex = 0;

let currentGrammar = {};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
});

// 绑定所有事件
function bindEvents() {
    // 单词学习
    document.getElementById('checkWordBtn').addEventListener('click', checkWord);
    document.getElementById('skipBtn').addEventListener('click', skipWord);
    document.getElementById('nextWordBtn').addEventListener('click', nextWord);
    document.getElementById('playWordBtn').addEventListener('click', playCurrentWord);
    
    // 句子练习
    document.getElementById('checkSentenceBtn').addEventListener('click', checkSentence);
    document.getElementById('resetSentenceBtn').addEventListener('click', resetSentence);
    document.getElementById('finishLessonBtn').addEventListener('click', showCompletion);
    document.getElementById('nextLessonFromCompleteBtn').addEventListener('click', goToNextLesson);
    
    // 专项练习
    document.getElementById('checkPracticeBtn').addEventListener('click', checkPractice);
    document.getElementById('showAnswerBtn').addEventListener('click', showPracticeAnswer);
    document.getElementById('nextPracticeBtn').addEventListener('click', nextPracticeItem);
    
    // 回车键支持
    setupEnterKeyHandlers();
}

// 设置回车键处理
function setupEnterKeyHandlers() {
    document.getElementById('wordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const btn = document.getElementById('nextWordBtn').style.display !== 'none' 
                ? document.getElementById('nextWordBtn') 
                : document.getElementById('checkWordBtn');
            btn.click();
        }
    });
    
    document.getElementById('sentenceInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const btn = document.getElementById('finishLessonBtn').style.display !== 'none'
                ? document.getElementById('finishLessonBtn')
                : document.getElementById('checkSentenceBtn');
            btn.click();
        }
    });
    
    document.getElementById('practiceInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const btn = document.getElementById('nextPracticeBtn').style.display !== 'none'
                ? document.getElementById('nextPracticeBtn')
                : document.getElementById('checkPracticeBtn');
            btn.click();
        }
    });
}

// ========== 页面导航函数 ==========

function hideAllPages() {
    document.querySelectorAll('.content-area, .home-page').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.page').forEach(el => {
        el.style.display = 'none';
    });
}

function showHomePage() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '首页';
    currentPage = 'home';
}

function showLevelSelector() {
    hideAllPages();
    document.getElementById('levelSelectorPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '级别选择';
    currentPage = 'level';
}

function showPracticeList() {
    hideAllPages();
    document.getElementById('practiceListPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '专项练习';
    currentPage = 'practice_list';
    renderPracticeList();
}

function showGrammarGuide() {
    hideAllPages();
    document.getElementById('grammarDetailPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '语法指南';
    currentPage = 'grammar_list';
    renderGrammarList();
}

function selectLevel(level) {
    currentLevel = level;
    
    // 更新按钮样式
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) btn.classList.add('active');
    });
    
    // 获取对应级别的课程
    const lessons = getLessonsByLevel(level);
    const container = document.getElementById('lessonListContainer');
    const listEl = document.getElementById('lessonList');
    const titleEl = document.getElementById('selectedLevelTitle');
    
    container.style.display = 'block';
    titleEl.textContent = `${level} 级课程 - ${lessons.length} 课`;
    
    listEl.innerHTML = lessons.map((l, idx) => `
        <div class="lesson-item" onclick="startLesson(${idx}, true)">
            <div class="lesson-number">${l.lesson}</div>
            <div class="lesson-info">
                <div class="lesson-title">${l.title}</div>
                <div class="lesson-level">${l.words.length} 个单词 + 1 个句子</div>
            </div>
        </div>
    `).join('');
}

function getLessonsByLevel(level) {
    const dbMap = {
        'A1': 'level_a1',
        'A2': 'level_a2',
        'B1': 'level_b1',
        'B2': 'level_b2',
        'C1': 'level_c1',
        'C2': 'level_c2'
    };
    return ENGLISH_DB[dbMap[level]] || [];
}

// ========== 课程学习函数 ==========

function startLesson(index, fromLevel = false) {
    let lessons;
    if (fromLevel) {
        lessons = getLessonsByLevel(currentLevel);
        currentLessonIndex = index;
    } else {
        lessons = COMPLETE_DB.allLessons;
        currentLessonIndex = index;
    }
    
    currentLesson = lessons[index];
    if (!currentLesson) return;
    
    // 重置状态
    learnedWords = [];
    wordIndex = 0;
    correctCount = 0;
    totalAttempts = 0;
    
    // 显示学习页面
    hideAllPages();
    document.getElementById('lessonLearnPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = `第${currentLesson.lesson}课 - ${currentLesson.title}`;
    currentPage = 'lesson';
    
    showPage('word');
    loadWord(wordIndex);
}

function showPage(pageName) {
    ['word', 'sentence', 'complete'].forEach(p => {
        const el = document.getElementById(`page-${p}`);
        if (el) el.style.display = p === pageName ? 'block' : 'none';
    });
    
    // 更新步骤指示器
    const steps = ['step1', 'step2', 'step3'];
    steps.forEach((id, idx) => {
        document.getElementById(id).classList.remove('active', 'completed');
        if (idx + 1 === (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
            document.getElementById(id).classList.add('active');
        } else if (idx + 1 < (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
            document.getElementById(id).classList.add('completed');
        }
    });
}

function loadWord(idx) {
    const words = currentLesson.words || [];
    
    if (idx >= words.length) {
        setTimeout(() => {
            showPage('sentence');
            setupSentencePractice();
        }, 300);
        return;
    }
    
    const wordData = words[idx];
    wordIndex = idx;
    
    document.getElementById('wordInput').value = '';
    document.getElementById('wordInput').className = 'input-large';
    document.getElementById('wordInput').focus();
    
    document.getElementById('chineseHint').textContent = `请输入：${wordData.chinese}`;
    document.getElementById('phoneticDisplay').textContent = `${wordData.word} [${wordData.phonetic}]`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    document.getElementById('checkWordBtn').style.display = 'inline-block';
    document.getElementById('nextWordBtn').style.display = 'none';
    document.getElementById('skipBtn').style.display = 'inline-block';
    
    updateLearnedList();
}

function playCurrentWord() {
    const words = currentLesson.words || [];
    if (wordIndex >= words.length) return;
    speakText(words[wordIndex].word);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
        window.speechSynthesis.speak(utterance);
    }
}

window.playAnyWord = function(word) {
    speakText(word);
};

function checkWord() {
    const words = currentLesson.words || [];
    if (wordIndex >= words.length) return;
    
    const input = document.getElementById('wordInput');
    const userText = input.value.trim().toLowerCase();
    const targetWord = words[wordIndex].word.toLowerCase();
    
    const normalizeText = str => str.replace(/[.,!?;:'"()-]/g, '').trim().toLowerCase();
    
    const normalizedUser = normalizeText(userText);
    const normalizedTarget = normalizeText(targetWord);
    
    totalAttempts++;
    
    if (normalizedUser === normalizedTarget) {
        input.className = 'input-large correct';
        document.getElementById('feedback').textContent = '✓ 正确！Excellent! 🎉';
        document.getElementById('feedback').className = 'feedback correct';
        
        if (!learnedWords.includes(words[wordIndex])) {
            learnedWords.push(words[wordIndex]);
        }
        
        correctCount++;
        playSound('correct');
        speakText(words[wordIndex].word);
        
        document.getElementById('checkWordBtn').style.display = 'none';
        document.getElementById('nextWordBtn').style.display = 'inline-block';
        document.getElementById('skipBtn').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('nextWordBtn').click();
        }, 600);
    } else {
        input.className = 'input-large wrong';
        document.getElementById('feedback').textContent = `✗ 正确答案：${words[wordIndex].word}`;
        document.getElementById('feedback').className = 'feedback wrong';
        playSound('wrong');
        setTimeout(() => {
            input.className = 'input-large';
        }, 500);
    }
}

function skipWord() {
    nextWord();
}

function nextWord() {
    loadWord(wordIndex + 1);
}

function updateLearnedList() {
    const listEl = document.getElementById('learnedList');
    const chipsEl = document.getElementById('learnedChips');
    
    if (learnedWords.length === 0) {
        listEl.style.display = 'none';
        return;
    }
    
    listEl.style.display = 'block';
    chipsEl.innerHTML = learnedWords.map(w => `
        <div class="learned-chip">
            ${w.word}
            <button class="play-btn" onclick="playAnyWord('${w.word}')" title="播放发音">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
    `).join('');
}

function setupSentencePractice() {
    const sentence = currentLesson.sentence;
    if (!sentence) return;
    
    document.getElementById('sentenceChinese').textContent = sentence.chinese;
    document.getElementById('sentenceInput').value = '';
    document.getElementById('sentenceInput').className = 'practice-input';
    document.getElementById('sentenceFeedback').textContent = '';
    document.getElementById('sentenceInput').focus();
    
    document.getElementById('checkSentenceBtn').style.display = 'inline-block';
    document.getElementById('finishLessonBtn').style.display = 'none';
    document.getElementById('resetSentenceBtn').style.display = 'inline-block';
}

function checkSentence() {
    const sentence = currentLesson.sentence;
    if (!sentence) return;
    
    const input = document.getElementById('sentenceInput');
    const userText = input.value.trim();
    const target = sentence.english;
    
    const normalizeText = str => str
        .replace(/[.,!?;:'"()-]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    
    const normalizedUser = normalizeText(userText);
    const normalizedTarget = normalizeText(target);
    
    totalAttempts++;
    
    if (normalizedUser === normalizedTarget) {
        input.className = 'practice-input correct';
        document.getElementById('sentenceFeedback').textContent = '✓ 完美！You did it! 🎊';
        document.getElementById('sentenceFeedback').className = 'feedback correct';
        playSound('correct');
        
        document.getElementById('checkSentenceBtn').style.display = 'none';
        document.getElementById('finishLessonBtn').style.display = 'inline-block';
        document.getElementById('resetSentenceBtn').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('finishLessonBtn').click();
        }, 800);
    } else {
        input.className = 'practice-input wrong';
        document.getElementById('sentenceFeedback').textContent = `✗ 试试这个句子：${target}`;
        document.getElementById('sentenceFeedback').className = 'feedback wrong';
        playSound('wrong');
        setTimeout(() => {
            input.className = 'practice-input';
        }, 500);
    }
}

function resetSentence() {
    setupSentencePractice();
}

function showCompletion() {
    showPage('complete');
    document.getElementById('step1').classList.add('completed');
    document.getElementById('step2').classList.add('completed');
    document.getElementById('step3').classList.add('active');
    
    const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;
    
    document.getElementById('wordsLearnedCount').textContent = learnedWords.length;
    document.getElementById('correctCountVal').textContent = correctCount;
    document.getElementById('accuracyRateVal').textContent = `${accuracy}%`;
    
    playSound('success');
}

function goToNextLesson() {
    if (currentLevel) {
        const lessons = getLessonsByLevel(currentLevel);
        if (currentLessonIndex < lessons.length - 1) {
            startLesson(currentLessonIndex + 1, true);
        } else {
            alert('🎉 恭喜完成此级别所有课程！');
            showLevelSelector();
        }
    } else {
        showLevelSelector();
    }
}

// ========== 专项练习函数 ==========

function renderPracticeList() {
    const categories = {};
    const practices = ENGLISH_DB.special_practices || [];
    
    practices.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });
    
    const container = document.getElementById('practiceCategories');
    container.innerHTML = Object.entries(categories).map(([cat, items]) => `
        <div class="category-section">
            <div class="category-title">
                <i class="fas fa-tag" style="color:#6366f1;"></i> ${cat}
            </div>
            ${items.map(p => `
                <div class="practice-item" onclick="startPractice('${p.id}')">
                    <div class="practice-title">${p.title}</div>
                    <div class="practice-desc">${p.description}</div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function startPractice(practiceId) {
    currentPractice = ENGLISH_DB.special_practices.find(p => p.id === practiceId);
    if (!currentPractice) return;
    
    practiceItemIndex = 0;
    
    hideAllPages();
    document.getElementById('practiceRunPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = currentPractice.title;
    currentPage = 'practice_run';
    
    loadPracticeItem(0);
}

function loadPracticeItem(idx) {
    const items = currentPractice.items || [];
    if (idx >= items.length) {
        alert('恭喜完成本组练习！');
        showPracticeList();
        return;
    }
    
    const item = items[idx];
    practiceItemIndex = idx;
    
    document.getElementById('practiceTitleDisplay').textContent = currentPractice.title;
    document.getElementById('practiceProgress').textContent = `第${idx+1}/${items.length}题`;
    document.getElementById('practiceQuestion').textContent = item.question;
    
    document.getElementById('practiceInput').value = '';
    document.getElementById('practiceInput').className = 'practice-input';
    document.getElementById('practiceInput').focus();
    
    document.getElementById('practiceExplanation').style.display = 'none';
    document.getElementById('practiceFeedback').textContent = '';
    
    document.getElementById('checkPracticeBtn').style.display = 'inline-block';
    document.getElementById('showAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextPracticeBtn').style.display = 'none';
    
    // 显示帮助信息
    const helpEl = document.getElementById('practiceHelp');
    helpEl.style.display = 'block';
    document.getElementById('helpContent').innerHTML = `
        <strong>知识点：</strong>${currentPractice.description}<br>
        <strong>语法规则：</strong>${item.grammar_point}
    `;
}

function checkPractice() {
    const item = currentPractice.items[practiceItemIndex];
    const input = document.getElementById('practiceInput');
    const userAns = input.value.trim().toLowerCase();
    const targetAns = item.answer.toLowerCase();
    
    if (userAns === targetAns) {
        input.className = 'practice-input correct';
        document.getElementById('practiceFeedback').textContent = '✓ 正确！Great job! 🎉';
        document.getElementById('practiceFeedback').className = 'feedback correct';
        playSound('correct');
        
        document.getElementById('practiceExplanation').style.display = 'block';
        document.getElementById('practiceExplanation').innerHTML = `
            <div class="explanation-title"><i class="fas fa-check-circle"></i> 答案解析</div>
            <strong>正确答案：</strong>${item.answer}<br>
            <strong>解析：</strong>${item.explanation}
        `;
        
        document.getElementById('checkPracticeBtn').style.display = 'none';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('nextPracticeBtn').style.display = 'inline-block';
        
        setTimeout(() => {
            document.getElementById('nextPracticeBtn').click();
        }, 800);
    } else {
        input.className = 'practice-input wrong';
        document.getElementById('practiceFeedback').textContent = `✗ 不对，再想想`;
        document.getElementById('practiceFeedback').className = 'feedback wrong';
        playSound('wrong');
        setTimeout(() => {
            input.className = 'practice-input';
        }, 500);
    }
}

function showPracticeAnswer() {
    const item = currentPractice.items[practiceItemIndex];
    document.getElementById('practiceExplanation').style.display = 'block';
    document.getElementById('practiceExplanation').innerHTML = `
        <div class="explanation-title"><i class="fas fa-lightbulb"></i> 答案提示</div>
        <strong>正确答案：</strong>${item.answer}<br>
        <strong>解析：</strong>${item.explanation}
    `;
}

function nextPracticeItem() {
    loadPracticeItem(practiceItemIndex + 1);
}

// ========== 语法讲解函数 ==========

function renderGrammarList() {
    const grammars = ENGLISH_DB.grammar_guide || [];
    const container = document.getElementById('grammarDetailPage');
    
    // 清空后重新渲染列表
    if (!document.getElementById('grammarList')) {
        const listHTML = `
            <h2 style="text-align:center;color:#1f2937;margin:20px 0 30px;">语法指南</h2>
            <div id="grammarList" class="grammar-list"></div>
        `;
        container.insertAdjacentHTML('afterbegin', listHTML);
    }
    
    const listEl = document.getElementById('grammarList');
    listEl.innerHTML = grammars.map(g => `
        <div class="grammar-item" onclick="viewGrammarDetail('${g.id}')">
            <div class="grammar-title">${g.title}</div>
            <div class="grammar-summary">${g.summary}</div>
        </div>
    `).join('');
}

function viewGrammarDetail(grammarId) {
    currentGrammar = ENGLISH_DB.grammar_guide.find(g => g.id === grammarId);
    if (!currentGrammar) return;
    
    // 切换到详细视图（在同一个容器内）
    const detailEl = document.getElementById('grammarDetailView');
    
    if (!detailEl) {
        const listEl = document.getElementById('grammarList');
        listEl.style.display = 'none';
        
        const detailHTML = `
            <div id="grammarDetailView">
                <button class="back-btn" onclick="renderGrammarList();"><i class="fas fa-arrow-left"></i> 返回列表</button>
                <div class="grammar-detail">
                    <div class="grammar-header">
                        <h2 id="detTitle"></h2>
                        <span class="grammar-level-badge" id="detLevel"></span>
                    </div>
                    <div class="grammar-summary" id="detSummary"></div>
                    <div class="grammar-rules" id="detRules"></div>
                    <div class="common-mistakes" id="detMistakes"></div>
                    <h3 style="color:#1f2937;margin:30px 0 15px;">📝 实战练习</h3>
                    <div class="exercise-list" id="detExercises"></div>
                </div>
            </div>
        `;
        document.querySelector('#grammarDetailPage .grammar-detail').insertAdjacentHTML('beforebegin', detailHTML);
    }
    
    document.getElementById('detTitle').textContent = currentGrammar.title;
    document.getElementById('detLevel').textContent = currentGrammar.level;
    document.getElementById('detSummary').textContent = currentGrammar.summary;
    
    // 渲染规则
    const rulesHTML = currentGrammar.rules.map(rule => `
        <div class="rule-card">
            <div class="rule-title">${rule.rule}</div>
            <div class="rule-example">${rule.example}</div>
        </div>
    `).join('');
    document.getElementById('detRules').innerHTML = rulesHTML;
    
    // 渲染常见错误
    const mistakesHTML = currentGrammar.common_mistakes.map(m => 
        `<div class="mistake-item">${m}</div>`
    ).join('');
    document.getElementById('detMistakes').innerHTML = `
        <div class="mistake-title"><i class="fas fa-exclamation-triangle"></i> 常见错误</div>
        ${mistakesHTML}
    `;
    
    // 渲染练习
    const exercisesHTML = currentGrammar.exercises.map(ex => `
        <div class="exercise-item">
            <div class="exercise-q">${ex.q}</div>
            <div class="exercise-answer"><strong>答案：</strong>${ex.a} — ${ex.exp}</div>
        </div>
    `).join('');
    document.getElementById('detExercises').innerHTML = exercisesHTML;
}

// ========== 音效播放 ==========

function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct' || type === 'success') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else {
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    } catch(e) {}
}
