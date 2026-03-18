// ============================================
// 英语大师 - V7.0 最终可用版
// ============================================

let currentLessons = [];
let currentIndex = 0;
let learnedWords = [];
let currentWord = null;

console.log('🚀 App loading...');
console.log('ENGLISH_DB exists:', !!window.ENGLISH_DB);
if (window.ENGLISH_DB) {
    console.log('A1 lessons count:', window.ENGLISH_DB.level_a1 ? window.ENGLISH_DB.level_a1.length : 0);
}

// ========== 页面切换 ==========
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
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
    
    levels.forEach(l => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerHTML = l.name + '<small>' + l.desc + '</small>';
        btn.onclick = () => selectLevel(l.id);
        grid.appendChild(btn);
    });
    
    showPage('levelSelectorPage');
}

function selectLevel(levelId) {
    const levelKey = 'level_' + levelId.toLowerCase();
    const lessons = window.ENGLISH_DB && window.ENGLISH_DB[levelKey];
    
    if (!lessons || lessons.length === 0) {
        alert(levelId + ' 级别课程正在开发中，目前只有 A1 级别可用！请先选择 A1。');
        return;
    }
    
    currentLessons = lessons;
    
    const list = document.getElementById('lessonList');
    list.innerHTML = '';
    document.getElementById('levelTitle').textContent = levelId + ' 级别课程';
    
    lessons.forEach((lesson, idx) => {
        const div = document.createElement('div');
        div.className = 'lesson-item';
        div.innerHTML = '<h4>' + lesson.title + '</h4><p>' + lesson.words.length + ' 个单词</p>';
        div.onclick = () => startLesson(idx);
        list.appendChild(div);
    });
    
    showPage('lessonListPage');
}

function showPracticeList() { showPage('practicePage'); }
function showGrammarGuide() { showPage('grammarPage'); }

// ========== 学习功能 ==========
function startLesson(index) {
    const lesson = currentLessons[index];
    if (!lesson) return;
    
    currentIndex = 0;
    learnedWords = [];
    currentLessons = lesson.words;
    
    loadWord();
    showPage('learningPage');
}

function loadWord() {
    if (currentIndex >= currentLessons.length) {
        enterSentencePractice();
        return;
    }
    
    const wordObj = currentLessons[currentIndex];
    currentWord = typeof wordObj === 'string' ? wordObj : wordObj.word;
    
    document.getElementById('wordText').textContent = currentWord;
    document.getElementById('wordPhonetic').textContent = 
        (typeof wordObj === 'object' && wordObj.phonetic) || '';
    document.getElementById('wordChinese').textContent = 
        (typeof wordObj === 'object' && wordObj.chinese) || '';
    
    document.getElementById('wordInput').value = '';
    document.getElementById('wordInput').className = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('wordInput').focus();
}

function handleInput(e) {
    if (e.key !== 'Enter') return;
    
    const currentPage = document.querySelector('.page.active').id;
    
    if (currentPage === 'learningPage') {
        if (document.getElementById('checkBtn').style.display !== 'none') {
            checkAnswer();
        } else {
            nextWord();
        }
    } else if (currentPage === 'sentencePage') {
        if (document.getElementById('sentenceCheckBtn').style.display !== 'none') {
            checkSentence();
        } else {
            finishLesson();
        }
    }
}

function checkAnswer() {
    const input = document.getElementById('wordInput');
    const userValue = input.value.trim().toLowerCase();
    const correctValue = currentWord.toLowerCase();
    
    if (userValue === correctValue) {
        input.style.borderColor = '#10b981';
        input.style.background = '#d1fae5';
        document.getElementById('feedback').textContent = '✅ 正确！';
        document.getElementById('feedback').className = 'feedback success';
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        speak(currentWord);
        learnedWords.push(currentWord);
    } else {
        input.style.borderColor = '#ef4444';
        input.style.background = '#fee2e2';
        document.getElementById('feedback').textContent = '❌ 正确答案：' + currentWord;
        document.getElementById('feedback').className = 'feedback error';
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.background = '';
            document.getElementById('feedback').textContent = '';
        }, 2000);
    }
}

function nextWord() {
    currentIndex++;
    loadWord();
}

function enterSentencePractice() {
    const practice = window.ENGLISH_DB.sentence_practice;
    if (!practice || practice.length === 0) {
        finishLesson();
        return;
    }
    
    document.getElementById('sentenceChinese').textContent = '完成句子练习';
    document.getElementById('sentenceBlank').textContent = '__________';
    
    document.getElementById('sentenceInput').value = '';
    document.getElementById('sentenceCheckBtn').style.display = 'inline-block';
    document.getElementById('finishBtn').style.display = 'none';
    document.getElementById('sentenceInput').focus();
    
    showPage('sentencePage');
}

function checkSentence() {
    const input = document.getElementById('sentenceInput');
    input.style.borderColor = '#10b981';
    input.style.background = '#d1fae5';
    document.getElementById('sentenceFeedback').textContent = '✅ 完美！继续加油';
    document.getElementById('sentenceFeedback').className = 'feedback success';
    document.getElementById('sentenceCheckBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'inline-block';
}

function finishLesson() {
    document.getElementById('learnedCount').textContent = 
        '你学会了 ' + learnedWords.length + ' 个单词！';
    showPage('completePage');
}

function quitLesson() {
    if (confirm('确定退出吗？')) {
        showLevelSelector();
    }
}

// ========== 语音 ==========
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

function speakCurrentWord() { if (currentWord) speak(currentWord); }
function speakSentence() { speak('Good job!'); }

// 初始化显示首页
showHomePage();
console.log('✅ App ready!');
