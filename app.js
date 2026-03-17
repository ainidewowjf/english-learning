// 完整单词和句子数据
const VOCABULARY = [
    { word: "hello", phonetic: "/həˈloʊ/", chinese: "你好", example: "Hello, how are you?" },
    { word: "goodbye", phonetic: "/ɡʊdˈbaɪ/", chinese: "再见", example: "Goodbye, see you tomorrow!" },
    { word: "thank", phonetic: "/θæŋk/", chinese: "感谢", example: "Thank you very much!" },
    { word: "please", phonetic: "/pliːz/", chinese: "请", example: "Please help me." },
    { word: "sorry", phonetic: "/ˈsɑːri/", chinese: "抱歉", example: "I'm sorry for being late." },
    { word: "friend", phonetic: "/frend/", chinese: "朋友", example: "She is my best friend." },
    { word: "family", phonetic: "/ˈfæməli/", chinese: "家庭", example: "I love my family." },
    { word: "house", phonetic: "/haʊs/", chinese: "房子", example: "This is a big house." },
    { word: "school", phonetic: "/skuːl/", chinese: "学校", example: "I go to school every day." },
    { word: "teacher", phonetic: "/ˈtiːtʃər/", chinese: "老师", example: "My teacher is very kind." },
    { word: "student", phonetic: "/ˈstuːdnt/", chinese: "学生", example: "He is a good student." },
    { word: "book", phonetic: "/bʊk/", chinese: "书", example: "I read a book yesterday." },
    { word: "water", phonetic: "/ˈwɔːtər/", chinese: "水", example: "Drink more water." },
    { word: "food", phonetic: "/fuːd/", chinese: "食物", example: "The food is delicious." },
    { word: "apple", phonetic: "/ˈæpl/", chinese: "苹果", example: "Apples are healthy." },
    { word: "cat", phonetic: "/kæt/", chinese: "猫", example: "The cat is cute." },
    { word: "dog", phonetic: "/dɔːɡ/", chinese: "狗", example: "Dogs are loyal pets." },
    { word: "happy", phonetic: "/ˈhæpi/", chinese: "开心", example: "I feel very happy today." },
    { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", chinese: "美丽", example: "The flowers are beautiful." },
    { word: "important", phonetic: "/ɪmˈpɔːrtnt/", chinese: "重要", example: "Time is important." }
];

const SENTENCES = [
    { 
        chinese: "你好，很高兴认识你。", 
        words: ["Hello", ",", "nice", "to", "meet", "you", "."],
        answer: "Hello, nice to meet you."
    },
    { 
        chinese: "谢谢你帮助我。", 
        words: ["Thank", "you", "for", "helping", "me", "."],
        answer: "Thank you for helping me."
    },
    { 
        chinese: "我明天要去学校。", 
        words: ["I", "will", "go", "to", "school", "tomorrow", "."],
        answer: "I will go to school tomorrow."
    },
    { 
        chinese: "这是我的好朋友。", 
        words: ["This", "is", "my", "good", "friend", "."],
        answer: "This is my good friend."
    },
    { 
        chinese: "她是一名优秀的老师。", 
        words: ["She", "is", "an", "excellent", "teacher", "."],
        answer: "She is an excellent teacher."
    },
    { 
        chinese: "我喜欢吃苹果。", 
        words: ["I", "like", "eating", "apples", "."],
        answer: "I like eating apples."
    },
    { 
        chinese: "今天天气很好。", 
        words: ["The", "weather", "is", "very", "nice", "today", "."],
        answer: "The weather is very nice today."
    },
    { 
        chinese: "我的家人都很健康。", 
        words: ["My", "family", "are", "all", "healthy", "."],
        answer: "My family are all healthy."
    },
    { 
        chinese: "这本书很有趣。", 
        words: ["This", "book", "is", "very", "interesting", "."],
        answer: "This book is very interesting."
    },
    { 
        chinese: "小猫很可爱。", 
        words: ["The", "kitten", "is", "very", "cute", "."],
        answer: "The kitten is very cute."
    }
];

class EnglishLearningApp {
    constructor() {
        this.state = {
            learnedWords: JSON.parse(localStorage.getItem('learnedWords') || '[]'),
            correctAnswers: parseInt(localStorage.getItem('correctAnswers') || '0'),
            totalAttempts: parseInt(localStorage.getItem('totalAttempts') || '0'),
            completedSentences: parseInt(localStorage.getItem('completedSentences') || '0'),
            currentWordIndex: 0,
            currentSentenceIndex: 0,
            showChinese: false
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadCurrentWord();
        this.updateStats();
    }
    
    bindEvents() {
        // 标签切换
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById(e.target.dataset.tab).classList.add('active');
                
                if (e.target.dataset.tab === 'sentence' && !this.currentSentence) {
                    this.loadSentence();
                } else if (e.target.dataset.tab === 'summary') {
                    this.showSummary();
                }
            });
        });
        
        // 单词学习
        document.getElementById('checkBtn').addEventListener('click', () => this.checkWord());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextWord());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        
        // 输入框回车检查
        document.getElementById('wordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkWord();
        });
        
        // 组句练习
        document.getElementById('submitBtn').addEventListener('click', () => this.checkSentence());
        document.getElementById('nextSentenceBtn').addEventListener('click', () => this.nextSentence());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAnswer());
    }
    
    // ========== 单词学习功能 ==========
    loadCurrentWord() {
        const word = VOCABULARY[this.state.currentWordIndex];
        document.getElementById('wordDisplay').textContent = this.state.learnedWords.includes(word.word) ? '✓ ' + word.word : word.word;
        document.getElementById('phoneticDisplay').textContent = word.phonetic;
        document.getElementById('chineseHint').textContent = this.state.showChinese ? `提示：${word.chinese}` : '';
        document.getElementById('currentNum').textContent = this.state.currentWordIndex + 1;
        document.getElementById('totalCount').textContent = VOCABULARY.length;
        
        // 更新进度条
        const progress = ((this.state.currentWordIndex) / VOCABULARY.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // 重置输入框
        const input = document.getElementById('wordInput');
        input.value = '';
        input.className = 'input-field';
        input.disabled = false;
        input.focus();
        
        // 重置按钮
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';
        document.getElementById('checkBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('hintBtn').disabled = this.state.showChinese;
        
        this.state.showChinese = false;
    }
    
    checkWord() {
        const input = document.getElementById('wordInput');
        const userAnswer = input.value.trim().toLowerCase();
        const currentWord = VOCABULARY[this.state.currentWordIndex].word.toLowerCase();
        
        if (!userAnswer) return;
        
        this.state.totalAttempts++;
        const isCorrect = userAnswer === currentWord;
        
        if (isCorrect) {
            input.className = 'input-field correct';
            document.getElementById('feedback').textContent = '✅ 正确！太棒了！';
            document.getElementById('feedback').className = 'feedback correct';
            
            if (!this.state.learnedWords.includes(currentWord)) {
                this.state.learnedWords.push(currentWord);
                this.state.correctAnswers++;
            }
            
            this.playSuccessSound();
        } else {
            input.className = 'input-field wrong';
            document.getElementById('feedback').textContent = `❌ 错误！正确答案是：${VOCABULARY[this.state.currentWordIndex].word}`;
            document.getElementById('feedback').className = 'feedback wrong';
            
            // 震动动画
            input.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
        }
        
        // 保存数据
        localStorage.setItem('learnedWords', JSON.stringify(this.state.learnedWords));
        localStorage.setItem('correctAnswers', this.state.correctAnswers);
        localStorage.setItem('totalAttempts', this.state.totalAttempts);
        
        this.updateStats();
        
        // 禁用输入，显示下一题按钮
        input.disabled = true;
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    
    nextWord() {
        this.state.currentWordIndex++;
        if (this.state.currentWordIndex >= VOCABULARY.length) {
            // 完成所有单词，显示结果
            this.showWordResult();
        } else {
            this.loadCurrentWord();
        }
    }
    
    showHint() {
        const word = VOCABULARY[this.state.currentWordIndex];
        document.getElementById('chineseHint').textContent = `提示：${word.chinese}`;
        this.state.showChinese = true;
        document.getElementById('hintBtn').disabled = true;
    }
    
    showWordResult() {
        const modal = document.getElementById('resultModal');
        modal.classList.add('show');
        
        const accuracy = this.state.totalAttempts > 0 
            ? Math.round((this.state.correctAnswers / this.state.totalAttempts) * 100) 
            : 0;
        
        document.getElementById('resultIcon').textContent = accuracy >= 80 ? '🎉' : '💪';
        document.getElementById('resultTitle').textContent = accuracy >= 80 ? '恭喜完成！' : '继续加油！';
        document.getElementById('resultCorrect').textContent = this.state.correctAnswers;
        document.getElementById('resultTotal').textContent = this.state.totalAttempts;
        document.getElementById('resultPercent').textContent = `${accuracy}%`;
    }
    
    // ========== 组句练习功能 ==========
    loadSentence() {
        const sentence = SENTENCES[this.state.currentSentenceIndex];
        this.currentSentence = sentence;
        
        document.getElementById('sentenceNum').textContent = this.state.currentSentenceIndex + 1;
        document.getElementById('sentenceChinese').textContent = sentence.chinese;
        
        // 打乱单词顺序
        const shuffled = [...sentence.words].sort(() => Math.random() - 0.5);
        
        const wordBank = document.getElementById('wordBank');
        wordBank.innerHTML = '';
        
        shuffled.forEach((word, index) => {
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.textContent = word;
            chip.dataset.word = word;
            chip.onclick = () => this.addToAnswer(chip, word);
            wordBank.appendChild(chip);
        });
        
        // 清空答案区
        const answerArea = document.getElementById('answerArea');
        answerArea.innerHTML = '';
        answerArea.classList.add('empty');
        
        // 重置反馈和按钮
        document.getElementById('sentenceFeedback').textContent = '';
        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('nextSentenceBtn').style.display = 'none';
        
        // 更新进度
        const progress = ((this.state.currentSentenceIndex) / SENTENCES.length) * 100;
        document.getElementById('sentenceProgress').style.width = `${progress}%`;
    }
    
    addToAnswer(chip, word) {
        const answerArea = document.getElementById('answerArea');
        answerArea.classList.remove('empty');
        
        const newChip = document.createElement('div');
        newChip.className = 'word-chip';
        newChip.style.background = '#6366f1';
        newChip.style.color = 'white';
        newChip.textContent = word;
        newChip.onclick = () => {
            newChip.remove();
            chip.style.display = 'block';
            if (answerArea.children.length === 0) {
                answerArea.classList.add('empty');
            }
        };
        
        answerArea.appendChild(newChip);
        chip.style.display = 'none';
    }
    
    clearAnswer() {
        const answerArea = document.getElementById('answerArea');
        const selected = answerArea.querySelectorAll('.word-chip');
        const wordBank = document.getElementById('wordBank');
        
        selected.forEach(chip => {
            const text = chip.textContent;
            const original = Array.from(wordBank.children).find(
                c => c.textContent === text && c.style.display !== 'none'
            );
            if (original) original.style.display = 'block';
        });
        
        answerArea.innerHTML = '';
        answerArea.classList.add('empty');
        document.getElementById('sentenceFeedback').textContent = '';
    }
    
    checkSentence() {
        const answerArea = document.getElementById('answerArea');
        const userWords = Array.from(answerArea.children).map(c => c.textContent);
        
        if (userWords.length === 0) {
            alert('请先选择单词组成句子！');
            return;
        }
        
        const userSentence = userWords.join(' ');
        const correctSentence = this.currentSentence.answer;
        
        const feedback = document.getElementById('sentenceFeedback');
        const isCorrect = userSentence === correctSentence;
        
        if (isCorrect) {
            feedback.textContent = '✅ 正确！非常棒！';
            feedback.style.color = '#10b981';
            
            this.state.completedSentences++;
            localStorage.setItem('completedSentences', this.state.completedSentences);
            
            this.playSuccessSound();
        } else {
            feedback.textContent = `❌ 不对哦！正确答案：${correctSentence}`;
            feedback.style.color = '#ef4444';
        }
        
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextSentenceBtn').style.display = 'inline-block';
    }
    
    nextSentence() {
        this.state.currentSentenceIndex++;
        if (this.state.currentSentenceIndex >= SENTENCES.length) {
            this.showSentenceResult();
        } else {
            this.loadSentence();
        }
    }
    
    showSentenceResult() {
        const modal = document.getElementById('resultModal');
        modal.classList.add('show');
        
        document.getElementById('resultIcon').textContent = '🎉';
        document.getElementById('resultTitle').textContent = '完成所有句子练习！';
        document.getElementById('resultCorrect').textContent = SENTENCES.length;
        document.getElementById('resultTotal').textContent = SENTENCES.length;
        document.getElementById('resultPercent').textContent = '100%';
    }
    
    // ========== 统计功能 ==========
    updateStats() {
        document.getElementById('learnedCount').textContent = this.state.learnedWords.length;
        document.getElementById('correctCount').textContent = this.state.correctAnswers;
        
        const accuracy = this.state.totalAttempts > 0 
            ? Math.round((this.state.correctAnswers / this.state.totalAttempts) * 100) 
            : 0;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        document.getElementById('totalLearned').textContent = this.state.learnedWords.length;
        document.getElementById('totalSentences').textContent = this.state.completedSentences;
        document.getElementById('avgAccuracy').textContent = `${accuracy}%`;
    }
    
    showSummary() {
        this.updateStats();
        
        const container = document.getElementById('masteredWords');
        container.innerHTML = '';
        
        if (this.state.learnedWords.length === 0) {
            container.innerHTML = '<p style="color: #6b7280;">还没有掌握任何单词，快去学习吧！</p>';
            return;
        }
        
        this.state.learnedWords.forEach(word => {
            const chip = document.createElement('span');
            chip.className = 'word-chip';
            chip.style.background = '#10b981';
            chip.style.color = 'white';
            chip.style.borderColor = '#10b981';
            chip.textContent = word;
            container.appendChild(chip);
        });
    }
    
    resetData() {
        if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
            localStorage.removeItem('learnedWords');
            localStorage.removeItem('correctAnswers');
            localStorage.removeItem('totalAttempts');
            localStorage.removeItem('completedSentences');
            
            this.state.learnedWords = [];
            this.state.correctAnswers = 0;
            this.state.totalAttempts = 0;
            this.state.completedSentences = 0;
            this.state.currentWordIndex = 0;
            this.state.currentSentenceIndex = 0;
            
            this.loadCurrentWord();
            this.updateStats();
            this.showSummary();
            
            alert('数据已重置！');
        }
    }
    
    closeResult() {
        document.getElementById('resultModal').classList.remove('show');
        
        // 返回学习页面
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.tab[data-tab="learn"]').classList.add('active');
        
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('learn').classList.add('active');
        
        // 重新开始学习
        this.state.currentWordIndex = 0;
        this.loadCurrentWord();
    }
    
    playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // 静音模式下不播放声音
        }
    }
}

// 启动应用
const app = new EnglishLearningApp();