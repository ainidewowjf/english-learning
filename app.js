// 课程数据 - 每组单词对应一个句子
const LESSONS = [
    {
        lesson: 1,
        words: [
            { word: "hello", phonetic: "/həˈloʊ/", chinese: "你好" },
            { word: "nice", phonetic: "/naɪs/", chinese: "美好的" },
            { word: "meet", phonetic: "/miːt/", chinese: "遇见" },
            { word: "you", phonetic: "/juː/", chinese: "你" }
        ],
        sentence: {
            chinese: "你好，很高兴认识你。",
            english: "Hello, nice to meet you.",
            hints: ["打招呼"]
        }
    },
    {
        lesson: 2,
        words: [
            { word: "thank", phonetic: "/θæŋk/", chinese: "感谢" },
            { word: "you", phonetic: "/juː/", chinese: "你" },
            { word: "help", phonetic: "/help/", chinese: "帮助" },
            { word: "me", phonetic: "/miː/", chinese: "我" }
        ],
        sentence: {
            chinese: "谢谢你帮助我。",
            english: "Thank you for helping me.",
            hints: ["表达感谢"]
        }
    },
    {
        lesson: 3,
        words: [
            { word: "I", phonetic: "/aɪ/", chinese: "我" },
            { word: "like", phonetic: "/laɪk/", chinese: "喜欢" },
            { word: "apples", phonetic: "/ˈæplz/", chinese: "苹果" },
            { word: "very", phonetic: "/ˈveri/", chinese: "非常" }
        ],
        sentence: {
            chinese: "我非常喜欢苹果。",
            english: "I like apples very much.",
            hints: ["表达喜好"]
        }
    },
    {
        lesson: 4,
        words: [
            { word: "my", phonetic: "/maɪ/", chinese: "我的" },
            { word: "friend", phonetic: "/frend/", chinese: "朋友" },
            { word: "is", phonetic: "/ɪz/", chinese: "是" },
            { word: "kind", phonetic: "/kaɪnd/", chinese: "善良的" }
        ],
        sentence: {
            chinese: "我的朋友很善良。",
            english: "My friend is very kind.",
            hints: ["描述朋友"]
        }
    },
    {
        lesson: 5,
        words: [
            { word: "she", phonetic: "/ʃiː/", chinese: "她" },
            { word: "teacher", phonetic: "/ˈtiːtʃər/", chinese: "老师" },
            { word: "is", phonetic: "/ɪz/", chinese: "是" },
            { word: "good", phonetic: "/ɡʊd/", chinese: "好的" }
        ],
        sentence: {
            chinese: "她是一位好老师。",
            english: "She is a good teacher.",
            hints: ["介绍职业"]
        }
    }
];

class LearningApp {
    constructor() {
        this.state = {
            currentLesson: 0,
            currentWordIndex: 0,
            learnedWords: [],
            correctAnswers: 0,
            totalAttempts: 0,
            currentSentenceAnswer: "",
            lessonComplete: false
        };
        
        this.init();
    }
    
    init() {
        this.loadLesson(this.state.currentLesson);
        this.bindEvents();
    }
    
    loadLesson(lessonIndex) {
        if (lessonIndex >= LESSONS.length) {
            lessonIndex = 0; // 循环学习
        }
        
        this.state.currentLesson = lessonIndex;
        this.state.currentWordIndex = 0;
        this.state.learnedWords = [];
        this.state.lessonComplete = false;
        
        // 更新步骤指示器
        this.updateSteps();
        
        // 显示第 1 步
        this.showPage('word');
        this.loadCurrentWord();
    }
    
    updateSteps() {
        const steps = ['step1', 'step2', 'step3'];
        steps.forEach((step, index) => {
            const el = document.getElementById(step);
            el.className = 'step';
            if (index === 0) el.classList.add('active');
        });
    }
    
    showPage(pageName) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${pageName}`).classList.add('active');
        
        // 更新步骤状态
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        if (pageName === 'word') {
            document.getElementById('step1').classList.add('active');
        } else if (pageName === 'sentence') {
            document.getElementById('step1').classList.add('completed');
            document.getElementById('step1').classList.remove('active');
            document.getElementById('step2').classList.add('active');
        } else if (pageName === 'complete') {
            document.getElementById('step2').classList.add('completed');
            document.getElementById('step2').classList.remove('active');
            document.getElementById('step3').classList.add('active');
        }
    }
    
    bindEvents() {
        // 单词学习
        document.getElementById('checkWordBtn').addEventListener('click', () => this.checkWord());
        document.getElementById('nextWordBtn').addEventListener('click', () => this.nextWord());
        document.getElementById('skipBtn').addEventListener('click', () => this.skipWord());
        
        document.getElementById('wordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkWord();
        });
        
        // 句子练习
        document.getElementById('checkSentenceBtn').addEventListener('click', () => this.checkSentence());
        document.getElementById('resetSentenceBtn').addEventListener('click', () => this.resetSentence());
        document.getElementById('finishBtn').addEventListener('click', () => this.showCompletion());
        document.getElementById('anotherLessonBtn').addEventListener('click', () => this.startNextLesson());
        
        document.getElementById('sentenceInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkSentence();
        });
    }
    
    // ========== 单词学习逻辑 ==========
    loadCurrentWord() {
        const lesson = LESSONS[this.state.currentLesson];
        const wordObj = lesson.words[this.state.currentWordIndex];
        
        document.getElementById('chineseHint').textContent = `请输入：${wordObj.chinese}`;
        document.getElementById('phoneticDisplay').textContent = wordObj.phonetic;
        document.getElementById('feedback').textContent = '';
        
        // 重置输入框
        const input = document.getElementById('wordInput');
        input.value = '';
        input.className = 'input-large';
        input.disabled = false;
        input.focus();
        
        // 按钮状态
        document.getElementById('checkWordBtn').style.display = 'inline-block';
        document.getElementById('nextWordBtn').style.display = 'none';
        
        // 显示已学单词
        this.updateLearnedList();
    }
    
    checkWord() {
        const input = document.getElementById('wordInput');
        const userAnswer = input.value.trim().toLowerCase();
        
        const lesson = LESSONS[this.state.currentLesson];
        const currentWord = lesson.words[this.state.currentWordIndex].word.toLowerCase();
        
        if (!userAnswer) {
            alert('请输入单词！');
            return;
        }
        
        this.state.totalAttempts++;
        const isCorrect = userAnswer === currentWord;
        
        if (isCorrect) {
            input.className = 'input-large correct';
            document.getElementById('feedback').textContent = '✅ 正确！太棒了！';
            document.getElementById('feedback').className = 'feedback correct';
            
            // 记录已学单词
            if (!this.state.learnedWords.includes(currentWord)) {
                this.state.learnedWords.push(currentWord);
            }
            
            this.state.correctAnswers++;
            this.playSuccessSound();
            
            // 禁用输入框，显示下一个按钮
            input.disabled = true;
            document.getElementById('checkWordBtn').style.display = 'none';
            document.getElementById('nextWordBtn').style.display = 'inline-block';
        } else {
            input.className = 'input-large wrong';
            document.getElementById('feedback').textContent = `❌ 错误！正确答案是：${currentWord}`;
            document.getElementById('feedback').className = 'feedback wrong';
            
            // 震动动画
            input.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-20px)' },
                { transform: 'translateX(20px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400 });
        }
        
        this.updateLearnedList();
    }
    
    nextWord() {
        const lesson = LESSONS[this.state.currentLesson];
        this.state.currentWordIndex++;
        
        if (this.state.currentWordIndex >= lesson.words.length) {
            // 所有单词学完，进入组句环节
            this.goToSentencePractice();
        } else {
            this.loadCurrentWord();
        }
    }
    
    skipWord() {
        const lesson = LESSONS[this.state.currentLesson];
        const currentWord = lesson.words[this.state.currentWordIndex].word;
        
        // 跳过也算作学过
        if (!this.state.learnedWords.includes(currentWord.toLowerCase())) {
            this.state.learnedWords.push(currentWord.toLowerCase());
        }
        
        this.nextWord();
    }
    
    updateLearnedList() {
        const listContainer = document.getElementById('learnedList');
        const chipsContainer = document.getElementById('learnedChips');
        
        if (this.state.learnedWords.length > 0) {
            listContainer.style.display = 'block';
            chipsContainer.innerHTML = this.state.learnedWords
                .map(word => `<span class="learned-chip">${word}</span>`)
                .join('');
        }
    }
    
    // ========== 组句练习逻辑 ==========
    goToSentencePractice() {
        this.showPage('sentence');
        
        const lesson = LESSONS[this.state.currentLesson];
        const sentence = lesson.sentence;
        
        document.getElementById('sentenceChinese').textContent = sentence.chinese;
        document.getElementById('sentenceFeedback').textContent = '';
        
        // 清空输入框
        const input = document.getElementById('sentenceInput');
        input.value = '';
        input.className = 'sentence-input';
        input.disabled = false;
        input.focus();
        
        // 清空已使用单词标签
        document.getElementById('usedWords').innerHTML = '';
        
        // 按钮状态
        document.getElementById('checkSentenceBtn').style.display = 'inline-block';
        document.getElementById('finishBtn').style.display = 'none';
    }
    
    checkSentence() {
        const input = document.getElementById('sentenceInput');
        const userAnswer = input.value.trim();
        
        if (!userAnswer) {
            alert('请输入完整的句子！');
            return;
        }
        
        const lesson = LESSONS[this.state.currentLesson];
        const correctSentence = lesson.sentence.english;
        
        // 标准化比较（忽略大小写和多余空格）
        const normalizedUser = userAnswer.replace(/\s+/g, ' ').trim().toLowerCase();
        const normalizedCorrect = correctSentence.replace(/\s+/g, ' ').trim().toLowerCase();
        
        const isCorrect = normalizedUser === normalizedCorrect;
        
        if (isCorrect) {
            input.className = 'sentence-input correct';
            document.getElementById('sentenceFeedback').textContent = '✅ 完美！句子正确！';
            document.getElementById('sentenceFeedback').className = 'feedback correct';
            
            this.state.correctAnswers++;
            this.state.totalAttempts++;
            
            this.playSuccessSound();
            
            // 禁用输入框，显示完成按钮
            input.disabled = true;
            document.getElementById('checkSentenceBtn').style.display = 'none';
            document.getElementById('finishBtn').style.display = 'inline-block';
            
            // 标记句子环节完成
            this.state.lessonComplete = true;
        } else {
            input.className = 'sentence-input wrong';
            document.getElementById('sentenceFeedback').textContent = 
                `❌ 不对哦！正确答案是：${correctSentence}`;
            document.getElementById('sentenceFeedback').className = 'feedback wrong';
            
            this.state.totalAttempts++;
            
            // 震动动画
            input.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-15px)' },
                { transform: 'translateX(15px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400 });
        }
    }
    
    resetSentence() {
        const input = document.getElementById('sentenceInput');
        input.value = '';
        input.className = 'sentence-input';
        document.getElementById('sentenceFeedback').textContent = '';
        input.focus();
        
        document.getElementById('checkSentenceBtn').style.display = 'inline-block';
        document.getElementById('finishBtn').style.display = 'none';
    }
    
    // ========== 完成页面 ==========
    showCompletion() {
        this.showPage('complete');
        document.getElementById('step2').classList.add('completed');
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        
        const accuracy = this.state.totalAttempts > 0
            ? Math.round((this.state.correctAnswers / this.state.totalAttempts) * 100)
            : 0;
        
        document.getElementById('totalWordsLearned').textContent = this.state.learnedWords.length;
        document.getElementById('correctCount').textContent = this.state.correctAnswers;
        document.getElementById('accuracyRate').textContent = `${accuracy}%`;
        
        // 生成回顾列表
        const lesson = LESSONS[this.state.currentLesson];
        const reviewItems = document.getElementById('reviewItems');
        
        let html = '<div style="margin-bottom: 15px;"><strong>📚 学到的单词：</strong></div>';
        html += '<div class="learned-chips" style="margin-bottom: 20px;">';
        html += lesson.words.map(w => 
            `<span class="learned-chip">${w.word} (${w.chinese})</span>`
        ).join('');
        html += '</div>';
        
        html += `<div><strong>✍️ 组成的句子：</strong><br>`;
        html += `<span style="color: #6b7280;">${lesson.sentence.chinese}</span><br>`;
        html += `<span style="font-weight: 600; color: #6366f1;">${lesson.sentence.english}</span></div>`;
        
        reviewItems.innerHTML = html;
    }
    
    startNextLesson() {
        this.loadLesson(this.state.currentLesson + 1);
    }
    
    playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // 静音模式
        }
    }
}

// 启动应用
const app = new LearningApp();