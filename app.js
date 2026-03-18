// ============================================
// 英语大师 - 核心应用逻辑 V7.0
// ============================================

// 全局状态
let currentLessons = [];
let currentIndex = 0;
let learnedWords = [];
let currentWord = null;

// ========== 页面导航 ==========
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showHomePage() { showPage('homePage'); }

function showLevelSelector() {
    const grid = document.getElementById('levelGrid');
    grid.innerHTML = '';
    
    const levels = [
        { id: 'A1', name: 'A1', desc: '入门级' },
        { id: 'A2', name: 'A2', desc: '初级' },
        { id: 'B1', name: 'B1', desc: '中级' },
        { id: 'B2', name: 'B2', desc: '中高级' },
        { id: 'C1', name: 'C1', desc: '高级' },
        { id: 'C2', name: 'C2', desc: '精通级' }
    ];
    
    levels.forEach(level => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerHTML = `${level.name}<small>${level.desc}</small>`;
        btn.onclick = () => selectLevel(level.id);
        grid.appendChild(btn);
    });
    
    showPage('levelSelectorPage');
}

function selectLevel(levelId) {
    if (!window.ENGLISH_DB || !window.ENGLISH_DB['level_' + levelId.toLowerCase()]) {
        alert('该级别课程正在开发中，目前只有 A1 级别可用！');
        return;
    }
    
    currentLessons = window.ENGLISH_DB['level_' + levelId.toLowerCase()];
    
    const list = document.getElementById('lessonList');
    list.innerHTML = '';
    document.getElementById('levelTitle').textContent = levelId + ' 级别课程';
    
    currentLessons.forEach((lesson, idx) => {
        const item = document.createElement('div');
        item.className = 'lesson-item';
        item.innerHTML = `<h4>${lesson.title}</h4><p>${lesson.words.length}个单词 + 句子练习</p>`;
        item.onclick = () => startLesson(idx);
        list.appendChild(item);
    });
    
    showPage('lessonListPage');
}

function showPracticeList() { showPage('practicePage'); }
function showGrammarGuide() { showPage('grammarPage'); }

// ========== 学习功能 ==========
function startLesson(index) {
    if (!currentLessons[index]) return;
    
    currentIndex = 0;
    learnedWords = [];
    currentLessons = currentLessons[index].words;
    
    loadWord();
    showPage('learningPage');
}

function loadWord() {
    if (currentIndex >= currentLessons.length) {
        // 所有单词学完，进入句子练习
        enterSentencePractice();
        return;
    }
    
    const wordObj = currentLessons[currentIndex];
    currentWord = typeof wordObj === 'string' ? wordObj : wordObj.word;
    
    document.getElementById('wordText').textContent = currentWord;
    document.getElementById('wordPhonetic').textContent = 
        (typeof wordObj === 'object' && wordObj.phonetic) || '';
    document.getElementById('wordChinese').textContent = 
        (typeof wordObj === 'object' && wordObj.chinese) || wordObj;
    
    document.getElementById('wordInput').value = '';
    document.getElementById('wordInput').className = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('wordInput').focus();
}

function handleInput(e) {
    if (e.key === 'Enter') {
        const checkBtn = document.getElementById('checkBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (checkBtn.style.display !== 'none') {
            checkAnswer();
        } else if (nextBtn.style.display !== 'none') {
            nextWord();
        } else if (document.getElementById('sentenceInput')) {
            checkSentence();
        }
    }
}

function checkAnswer() {
    const input = document.getElementById('wordInput');
    const userValue = input.value.trim().toLowerCase();
    const correctValue = currentWord.toLowerCase();
    
    if (userValue === correctValue) {
        input.className = 'correct';
        document.getElementById('feedback').textContent = '✅ 正确！';
        document.getElementById('feedback').className = 'feedback success';
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        speak(currentWord);
        learnedWords.push(currentWord);
    } else {
        input.className = 'wrong';
        document.getElementById('feedback').textContent = `❌ 错误，正确答案：${currentWord}`;
        document.getElementById('feedback').className = 'feedback error';
        setTimeout(() => {
            input.className = '';
            document.getElementById('feedback').textContent = '';
        }, 2000);
    }
}

function nextWord() {
    currentIndex++;
    loadWord();
}

function enterSentencePractice() {
    const sentenceData = window.ENGLISH_DB.sentence_practice;
    if (!sentenceData || sentenceData.length === 0) {
        finishLesson();
        return;
    }
    
    document.getElementById('sentenceChinese').textContent = sentenceData[currentIndex]?.chinese || '完成这个句子';
    document.getElementById('sentenceBlank').textContent = sentenceData[currentIndex]?.blank || '__________';
    
    document.getElementById('sentenceInput').value = '';
    document.getElementById('sentenceInput').className = '';
    document.getElementById('sentenceFeedback').textContent = '';
    document.getElementById('sentenceCheckBtn').style.display = 'inline-block';
    document.getElementById('finishBtn').style.display = 'none';
    document.getElementById('sentenceInput').focus();
    
    showPage('sentencePage');
}

function checkSentence() {
    const input = document.getElementById('sentenceInput');
    const sentenceData = window.ENGLISH_DB.sentence_practice;
    const expected = sentenceData[currentIndex]?.sentence || '';
    const userValue = input.value.trim().toLowerCase();
    const correctValue = expected.toLowerCase();
    
    if (userValue === correctValue) {
        input.className = 'correct';
        document.getElementById('sentenceFeedback').textContent = '✅ 完美！';
        document.getElementById('sentenceFeedback').className = 'feedback success';
        document.getElementById('sentenceCheckBtn').style.display = 'none';
        document.getElementById('finishBtn').style.display = 'inline-block';
        speak(expected);
    } else {
        input.className = 'wrong';
        document.getElementById('sentenceFeedback').textContent = `❌ 再试试!`;
        document.getElementById('sentenceFeedback').className = 'feedback error';
    }
}

function finishLesson() {
    document.getElementById('learnedCount').textContent = 
        `你学会了 ${learnedWords.length} 个单词和 ${currentIndex + 1} 个句子！`;
    showPage('completePage');
}

function quitLesson() {
    if (confirm('确定要退出当前课程吗？进度将不保存。')) {
        showLevelSelector();
    }
}

// ========== 语音功能 ==========
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

function speakCurrentWord() {
    if (currentWord) speak(currentWord);
}

function speakSentence() {
    const sentenceData = window.ENGLISH_DB.sentence_practice;
    if (sentenceData && sentenceData[currentIndex]) {
        speak(sentenceData[currentIndex].sentence);
    }
}

// ========== 初始化 ==========
console.log('🚀 App initializing...');
console.log('ENGLISH_DB available:', !!window.ENGLISH_DB);

if (window.ENGLISH_DB) {
    console.log('✅ Data loaded successfully');
} else {
    console.error('❌ Data not loaded yet!');
}
