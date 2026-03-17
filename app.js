// ============================================
// 英语大师 Pro - 完整学习系统
// 核心功能：单词键盘输入 → 句子组成 → 进度追踪
// ============================================

let currentLesson = {};
let currentLessonIndex = 0;
let learnedWords = [];
let wordIndex = 0;
let correctCount = 0;
let totalAttempts = 0;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 加载所有课程索引
    window.allLessons = COMPLETE_DB.allLessons || ENGLISH_DB.level_a1;
    
    // 设置初始课程
    if (window.allLessons.length > 0) {
        loadLesson(0);
    }
    
    // 绑定事件监听
    bindEvents();
}

// 绑定所有事件
function bindEvents() {
    // 上一课/下一课
    document.getElementById('prevLessonBtn').addEventListener('click', prevLesson);
    document.getElementById('nextLessonBtn').addEventListener('click', nextLesson);
    
    // 单词学习
    document.getElementById('checkWordBtn').addEventListener('click', checkWord);
    document.getElementById('skipBtn').addEventListener('click', skipWord);
    document.getElementById('nextWordBtn').addEventListener('click', nextWord);
    document.getElementById('playWordBtn').addEventListener('click', playCurrentWord);
    
    // 组句练习
    document.getElementById('checkSentenceBtn').addEventListener('click', checkSentence);
    document.getElementById('resetSentenceBtn').addEventListener('click', resetSentence);
    document.getElementById('finishBtn').addEventListener('click', showCompletion);
    
    // 完成页
    document.getElementById('anotherLessonBtn').addEventListener('click', nextLesson);
    
    // 回车键支持
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
            const btn = document.getElementById('finishBtn').style.display !== 'none'
                ? document.getElementById('finishBtn')
                : document.getElementById('checkSentenceBtn');
            btn.click();
        }
    });
}

// 加载指定课程
function loadLesson(index) {
    currentLessonIndex = index;
    currentLesson = window.allLessons[index];
    
    if (!currentLesson) return;
    
    // 重置状态
    learnedWords = [];
    wordIndex = 0;
    correctCount = 0;
    totalAttempts = 0;
    
    // 更新 UI
    updateHeaderInfo();
    showPage('word');
    loadWord(wordIndex);
}

// 更新头部信息
function updateHeaderInfo() {
    const level = currentLesson.level;
    const title = currentLesson.title;
    
    let levelText = '';
    switch(level) {
        case 'A1': levelText = 'A1 入门级'; break;
        case 'A2': levelText = 'A2 初级'; break;
        case 'B1': levelText = 'B1 中级'; break;
        case 'B2': levelText = 'B2 中高级'; break;
        case 'C1': levelText = 'C1 高级'; break;
        case 'C2': levelText = 'C2 精通级'; break;
    }
    
    document.getElementById('currentLevelBadge').textContent = levelText;
    document.getElementById('lessonTitle').textContent = title;
    document.getElementById('lessonInfo').textContent = `第 ${currentLesson.lesson} 课 / 共 ${window.allLessons.length} 课`;
    
    // 更新按钮状态
    document.getElementById('prevLessonBtn').disabled = currentLessonIndex === 0;
    document.getElementById('nextLessonBtn').disabled = currentLessonIndex === window.allLessons.length - 1;
}

// 进入上一课/下一课
function prevLesson() {
    if (currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1);
    }
}

function nextLesson() {
    if (currentLessonIndex < window.allLessons.length - 1) {
        loadLesson(currentLessonIndex + 1);
    } else {
        alert('🎉 恭喜！你已经学完了所有内容！');
    }
}

// 显示页面
function showPage(pageName) {
    ['page-word', 'page-sentence', 'page-complete'].forEach(id => {
        document.getElementById(id).classList.remove('active');
    });
    
    document.getElementById(`page-${pageName}`).classList.add('active');
    
    // 更新步骤指示器
    ['step1', 'step2', 'step3'].forEach((id, idx) => {
        document.getElementById(id).classList.remove('active', 'completed');
        if (idx + 1 === (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
            document.getElementById(id).classList.add('active');
        } else if (idx + 1 < (pageName === 'word' ? 1 : pageName === 'sentence' ? 2 : 3)) {
            document.getElementById(id).classList.add('completed');
        }
    });
}

// 加载单词
function loadWord(idx) {
    const words = currentLesson.words || [];
    
    if (idx >= words.length) {
        // 所有单词学完，进入组句阶段
        setTimeout(() => {
            showPage('sentence');
            setupSentencePractice();
        }, 300);
        return;
    }
    
    const wordData = words[idx];
    wordIndex = idx;
    
    // 清空输入框
    document.getElementById('wordInput').value = '';
    document.getElementById('wordInput').className = 'input-large';
    document.getElementById('wordInput').focus();
    
    // 更新提示文字
    document.getElementById('chineseHint').textContent = `请输入：${wordData.chinese}`;
    document.getElementById('phoneticDisplay').textContent = `${wordData.word} [${wordData.phonetic}]`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    // 隐藏/显示按钮
    document.getElementById('checkWordBtn').style.display = 'inline-block';
    document.getElementById('nextWordBtn').style.display = 'none';
    document.getElementById('skipBtn').style.display = 'inline-block';
    
    // 更新已学单词列表
    updateLearnedList();
}

// 播放当前单词发音
function playCurrentWord() {
    const words = currentLesson.words || [];
    if (wordIndex >= words.length) return;
    
    const text = words[wordIndex].word;
    speakText(text);
}

// 使用 Web Speech API 朗读文本
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // 取消之前的朗读
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // 稍慢一点
        utterance.pitch = 1.0;
        
        // 尝试选择英文语音
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) {
            utterance.voice = enVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持语音朗读功能');
    }
}

// 播放任意单词发音（用于回顾）
function playAnyWord(word) {
    speakText(word);
}

// 检查单词
function checkWord() {
    const words = currentLesson.words || [];
    if (wordIndex >= words.length) return;
    
    const input = document.getElementById('wordInput');
    const userText = input.value.trim().toLowerCase();
    const targetWord = words[wordIndex].word.toLowerCase();
    
    // 标准化处理：移除所有标点符号和空格
    const normalizeText = str => str.replace(/[.,!?;:'"()-]/g, '').trim().toLowerCase();
    
    const normalizedUser = normalizeText(userText);
    const normalizedTarget = normalizeText(targetWord);
    
    totalAttempts++;
    
    if (normalizedUser === normalizedTarget) {
        // 正确
        input.className = 'input-large correct';
        document.getElementById('feedback').textContent = '✓ 正确！Excellent! 🎉';
        document.getElementById('feedback').className = 'feedback correct';
        
        if (!learnedWords.includes(words[wordIndex])) {
            learnedWords.push(words[wordIndex]);
        }
        
        correctCount++;
        playSound('correct');
        
        // 播放发音
        speakText(words[wordIndex].word);
        
        // 显示下一个按钮
        document.getElementById('checkWordBtn').style.display = 'none';
        document.getElementById('nextWordBtn').style.display = 'inline-block';
        document.getElementById('skipBtn').style.display = 'none';
        
        // 延迟后自动进入下一个
        setTimeout(() => {
            document.getElementById('nextWordBtn').click();
        }, 600);
    } else {
        // 错误
        input.className = 'input-large wrong';
        document.getElementById('feedback').textContent = `✗ 正确答案：${words[wordIndex].word}`;
        document.getElementById('feedback').className = 'feedback wrong';
        
        playSound('wrong');
        
        // 震动动画后立即允许重试或跳过
        setTimeout(() => {
            input.className = 'input-large';
        }, 500);
    }
}

// 跳过一个单词
function skipWord() {
    nextWord();
}

// 进入下一个单词
function nextWord() {
    loadWord(wordIndex + 1);
}

// 更新已学单词列表显示
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

// 设置组句练习
function setupSentencePractice() {
    const sentence = currentLesson.sentence;
    if (!sentence) return;
    
    document.getElementById('sentenceChinese').textContent = sentence.chinese;
    document.getElementById('sentenceInput').value = '';
    document.getElementById('sentenceInput').className = 'sentence-input';
    document.getElementById('sentenceFeedback').textContent = '';
    document.getElementById('sentenceInput').focus();
    
    // 隐藏/显示按钮
    document.getElementById('checkSentenceBtn').style.display = 'inline-block';
    document.getElementById('finishBtn').style.display = 'none';
    document.getElementById('resetSentenceBtn').style.display = 'inline-block';
}

// 检查组句
function checkSentence() {
    const sentence = currentLesson.sentence;
    if (!sentence) return;
    
    const input = document.getElementById('sentenceInput');
    const userText = input.value.trim();
    const target = sentence.english;
    
    // 标准化处理：移除标点、转为小写进行比较
    const normalizeText = str => str
        .replace(/[.,!?;:'"()-]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    
    const normalizedUser = normalizeText(userText);
    const normalizedTarget = normalizeText(target);
    
    totalAttempts++;
    
    if (normalizedUser === normalizedTarget) {
        // 正确
        input.className = 'sentence-input correct';
        document.getElementById('sentenceFeedback').textContent = '✓ 完美！You did it! 🎊';
        document.getElementById('sentenceFeedback').className = 'feedback correct';
        
        playSound('correct');
        
        // 显示完成按钮
        document.getElementById('checkSentenceBtn').style.display = 'none';
        document.getElementById('finishBtn').style.display = 'inline-block';
        document.getElementById('resetSentenceBtn').style.display = 'none';
        
        // 可以自动跳转到完成页
        setTimeout(() => {
            document.getElementById('finishBtn').click();
        }, 800);
    } else {
        // 错误
        input.className = 'sentence-input wrong';
        document.getElementById('sentenceFeedback').textContent = `✗ 试试这个句子：${target}`;
        document.getElementById('sentenceFeedback').className = 'feedback wrong';
        
        playSound('wrong');
        
        setTimeout(() => {
            input.className = 'sentence-input';
        }, 500);
    }
}

// 重置组句
function resetSentence() {
    setupSentencePractice();
}

// 显示完成页
function showCompletion() {
    showPage('complete');
    document.getElementById('step1').classList.remove('active', 'completed');
    document.getElementById('step1').classList.add('completed');
    document.getElementById('step2').classList.remove('active', 'completed');
    document.getElementById('step2').classList.add('completed');
    document.getElementById('step3').classList.add('active');
    
    // 更新统计数据
    const accuracy = totalAttempts > 0 
        ? Math.round((correctCount / totalAttempts) * 100) 
        : 100;
    
    document.getElementById('wordsLearned').textContent = learnedWords.length;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
    
    // 显示回顾内容
    displayReview();
    
    playSound('success');
}

// 显示学习内容回顾
function displayReview() {
    const reviewGrid = document.getElementById('reviewGrid');
    const words = currentLesson.words || [];
    
    let html = '<h5 style="margin-bottom:10px;color:#374151;">📖 单词：</h5>';
    words.forEach(w => {
        html += `<div class="review-item">
            <span class="review-word">${w.word}</span>
            <span class="review-meaning">${w.phonetic} ${w.chinese}</span>
            <button class="play-small" onclick="playAnyWord('${w.word}')">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>`;
    });
    
    if (currentLesson.sentence) {
        html += '<h5 style="margin-top:20px;margin-bottom:10px;color:#374151;">💬 句子：</h5>';
        html += `<div class="review-item" style="display:block;text-align:left;">
            <div style="font-size:16px;color:#1f2937;margin-bottom:5px;"><strong>${currentLesson.sentence.english}</strong></div>
            <div style="color:#6b7280;">${currentLesson.sentence.chinese}</div>
        </div>`;
    }
    
    reviewGrid.innerHTML = html;
}

// 播放音效（用简单的 Web Audio API）
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct' || type === 'success') {
            // 成功音效 - 上升音阶
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else {
            // 错误音效 - 下降音
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    } catch(e) {
        // 静音处理
    }
}

// 全局暴露语音功能给 HTML
window.playAnyWord = playAnyWord;