// ============================================
// 英语大师 Pro - 完整学习系统 v6.1 (修复版)
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
    console.log('App initialized');
    bindEvents();
    
    // 确保数据已加载
    if (typeof ENGLISH_DB === 'undefined') {
        console.error('ENGLISH_DB not loaded!');
        alert('数据加载失败，请刷新页面重试');
        return;
    }
    console.log('Data loaded successfully');
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
    const wordInput = document.getElementById('wordInput');
    const sentenceInput = document.getElementById('sentenceInput');
    const practiceInput = document.getElementById('practiceInput');
    
    if (wordInput) {
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const btn = document.getElementById('nextWordBtn').style.display !== 'none' 
                    ? document.getElementById('nextWordBtn') 
                    : document.getElementById('checkWordBtn');
                btn.click();
            }
        });
    }
    
    if (sentenceInput) {
        sentenceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const btn = document.getElementById('finishLessonBtn').style.display !== 'none'
                    ? document.getElementById('finishLessonBtn')
                    : document.getElementById('checkSentenceBtn');
                btn.click();
            }
        });
    }
    
    if (practiceInput) {
        practiceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const btn = document.getElementById('nextPracticeBtn').style.display !== 'none'
                    ? document.getElementById('nextPracticeBtn')
                    : document.getElementById('checkPracticeBtn');
                btn.click();
            }
        });
    }
}

// ========== 页面导航函数 ==========

window.hideAllPages = function() {
    document.querySelectorAll('.content-area, .home-page').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.page').forEach(el => {
        el.style.display = 'none';
    });
};

window.showHomePage = function() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '首页';
    currentPage = 'home';
};

window.showLevelSelector = function() {
    console.log('showLevelSelector called');
    hideAllPages();
    document.getElementById('levelSelectorPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '级别选择';
    currentPage = 'level';
};

window.showPracticeList = function() {
    hideAllPages();
    document.getElementById('practiceListPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = '专项练习';
    currentPage = 'practice_list';
    renderPracticeList();
};

window.showGrammarGuide = function() {
    hideAllPages();
    
    // 创建语法列表视图（如果不存在）
    let listView = document.getElementById('grammarListView');
    if (!listView) {
        const container = document.querySelector('#grammarDetailPage .grammar-detail');
        const listHTML = `
            <h2 style="text-align:center;color:#1f2937;margin:20px 0 30px;">语法指南</h2>
            <div id="grammarListView" class="grammar-list"></div>
        `;
        container.insertAdjacentHTML('afterbegin', listHTML);
        listView = document.getElementById('grammarListView');
    }
    
    const detailView = document.getElementById('grammarDetailView');
    if (detailView) detailView.style.display = 'none';
    listView.style.display = 'block';
    
    renderGrammarList();
    
    document.getElementById('currentPageBadge').textContent = '语法指南';
    currentPage = 'grammar_list';
};

// 全局暴露的启动课程函数
window.startLesson = function(index, fromLevel = false) {
    console.log('startLesson called with index:', index, 'fromLevel:', fromLevel);
    
    let lessons;
    if (fromLevel) {
        lessons = getLessonsByLevel(currentLevel);
        currentLessonIndex = index;
    } else {
        lessons = COMPLETE_DB.allLessons || [];
        currentLessonIndex = index;
    }
    
    console.log('Lessons loaded:', lessons.length);
    currentLesson = lessons[index];
    
    if (!currentLesson) {
        console.error('Lesson not found at index:', index);
        alert('课程加载失败');
        return;
    }
    
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
};

window.selectLevel = function(level) {
    console.log('selectLevel called with:', level);
    currentLevel = level;
    
    // 更新按钮样式
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) btn.classList.add('active');
    });
    
    // 获取对应级别的课程
    const lessons = getLessonsByLevel(level);
    console.log(`Level ${level} has ${lessons.length} lessons`);
    
    const container = document.getElementById('lessonListContainer');
    const listEl = document.getElementById('lessonList');
    const titleEl = document.getElementById('selectedLevelTitle');
    
    if (container && listEl && titleEl) {
        container.style.display = 'block';
        titleEl.textContent = `${level} 级课程 - ${lessons.length} 课`;
        
        listEl.innerHTML = lessons.map((l, idx) => `
            <div class="lesson-item" onclick="window.startLesson(${idx}, true)">
                <div class="lesson-number">${l.lesson}</div>
                <div class="lesson-info">
                    <div class="lesson-title">${l.title}</div>
                    <div class="lesson-level">${l.words.length} 个单词 + 1 个句子</div>
                </div>
            </div>
        `).join('');
    }
};

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

function showPage(pageName) {
    const pages = ['word', 'sentence', 'complete'];
    pages.forEach(p => {
        const el = document.getElementById(`page-${p}`);
        if (el) el.style.display = p === pageName ? 'block' : 'none';
    });
    
    // 更新步骤指示器
    const steps = ['step1', 'step2', 'step3'];
    steps.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('active', 'completed');
            if (idx + 1 === (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
                el.classList.add('active');
            } else if (idx + 1 < (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
                el.classList.add('completed');
            }
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
    
    const input = document.getElementById('wordInput');
    input.value = '';
    input.className = 'input-large';
    input.focus();
    
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
    
    totalAttempts++;
    
    if (normalizeText(userText) === normalizeText(targetWord)) {
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
            <button class="play-btn" onclick="window.playAnyWord('${w.word}')" title="播放发音">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
    `).join('');
}

function setupSentencePractice() {
    const sentence = currentLesson.sentence;
    if (!sentence) return;
    
    document.getElementById('sentenceChinese').textContent = sentence.chinese;
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
    
    totalAttempts++;
    
    if (normalizeText(userText) === normalizeText(target)) {
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
            window.startLesson(currentLessonIndex + 1, true);
        } else {
            alert('🎉 恭喜完成此级别所有课程！');
            window.showLevelSelector();
        }
    } else {
        window.showLevelSelector();
    }
}

// ========== 专项练习函数 ==========

function renderPracticeList() {
    const practices = ENGLISH_DB.special_practices || [];
    
    // 按分类组织
    const categories = {};
    practices.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });
    
    const container = document.getElementById('practiceCategories');
    if (!container) return;
    
    container.innerHTML = Object.entries(categories).map(([cat, items]) => `
        <div class="category-section">
            <div class="category-title">
                <i class="fas fa-tag" style="color:#6366f1;"></i> ${cat}
            </div>
            ${items.map(p => `
                <div class="practice-item" onclick="window.startPractice('${p.id}')">
                    <div class="practice-title">${p.title}</div>
                    <div class="practice-desc">${p.description}</div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

window.startPractice = function(practiceId) {
    currentPractice = ENGLISH_DB.special_practices.find(p => p.id === practiceId);
    if (!currentPractice) {
        console.error('Practice not found:', practiceId);
        return;
    }
    
    practiceItemIndex = 0;
    
    hideAllPages();
    document.getElementById('practiceRunPage').classList.add('active');
    document.getElementById('currentPageBadge').textContent = currentPractice.title;
    currentPage = 'practice_run';
    
    loadPracticeItem(0);
};

function loadPracticeItem(idx) {
    const items = currentPractice.items || [];
    if (idx >= items.length) {
        alert('恭喜完成本组练习！🎉');
        window.showPracticeList();
        return;
    }
    
    const item = items[idx];
    practiceItemIndex = idx;
    
    document.getElementById('practiceTitleDisplay').textContent = currentPractice.title;
    document.getElementById('practiceProgress').textContent = `第${idx+1}/${items.length}题`;
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
    
    // 显示帮助信息
    const helpEl = document.getElementById('practiceHelp');
    helpEl.style.display = 'block';
    document.getElementById('helpContent').innerHTML = `
        <strong>知识点：</strong>${currentPractice.description}<br>
        <strong>语法规则：</strong>${item.grammar_point || item.explanation}
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
    const listEl = document.getElementById('grammarListView');
    if (!listEl) return;
    
    listEl.innerHTML = grammars.map(g => `
        <div class="grammar-item" onclick="window.viewGrammarDetail('${g.id}')">
            <div class="grammar-title">${g.title}</div>
            <div class="grammar-summary">${g.summary}</div>
        </div>
    `).join('');
}

window.viewGrammarDetail = function(grammarId) {
    currentGrammar = ENGLISH_DB.grammar_guide.find(g => g.id === grammarId);
    if (!currentGrammar) return;
    
    const listView = document.getElementById('grammarListView');
    const detailView = document.getElementById('grammarDetailView');
    
    if (!detailView) {
        const html = `
            <div id="grammarDetailView" style="display:none;">
                <button class="back-btn" onclick="document.getElementById('grammarListView').style.display='block';document.getElementById('grammarDetailView').style.display='none';return false;">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
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
        document.querySelector('#grammarDetailPage .grammar-detail').insertAdjacentHTML('beforeend', html);
    }
    
    const detView = document.getElementById('grammarDetailView');
    if (listView) listView.style.display = 'none';
    if (detView) detView.style.display = 'block';
    
    document.getElementById('detTitle').textContent = currentGrammar.title;
    document.getElementById('detLevel').textContent = currentGrammar.level;
    document.getElementById('detSummary').textContent = currentGrammar.summary;
    
    // 渲染规则
    if (currentGrammar.rules) {
        const rulesHTML = currentGrammar.rules.map(rule => `
            <div class="rule-card">
                <div class="rule-title">${rule.rule}</div>
                <div class="rule-example">${rule.example}</div>
            </div>
        `).join('');
        document.getElementById('detRules').innerHTML = rulesHTML;
    }
    
    // 渲染常见错误
    if (currentGrammar.common_mistakes) {
        const mistakesHTML = currentGrammar.common_mistakes.map(m => 
            `<div class="mistake-item">${m}</div>`
        ).join('');
        document.getElementById('detMistakes').innerHTML = `
            <div class="mistake-title"><i class="fas fa-exclamation-triangle"></i> 常见错误</div>
            ${mistakesHTML}
        `;
    }
    
    // 渲染练习
    if (currentGrammar.exercises) {
        const exercisesHTML = currentGrammar.exercises.map(ex => `
            <div class="exercise-item">
                <div class="exercise-q">${ex.q}</div>
                <div class="exercise-answer"><strong>答案：</strong>${ex.a} — ${ex.exp}</div>
            </div>
        `).join('');
        document.getElementById('detExercises').innerHTML = exercisesHTML;
    }
};

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
    } catch(e) {
        console.log('Audio not supported');
    }
}
