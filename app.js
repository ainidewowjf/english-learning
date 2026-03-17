// ============================================
// 英语大师 Pro - 完整学习系统
// ============================================

class EnglishLearningPro {
    constructor() {
        this.state = {
            currentPage: 'dashboard',
            currentLevel: 'level1',
            currentCategory: 'all',
            stats: this.loadStats(),
            wordQueue: [],
            wordIndex: 0,
            sentenceQueue: [],
            sentenceIndex: 0,
            selectedDifficulty: 1,
            rootsType: 'roots'
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStatsDisplay();
        this.checkAchievements();
        this.renderDashboard();
    }
    
    loadStats() {
        const saved = localStorage.getItem('englishProStats');
        return saved ? JSON.parse(saved) : {
            totalWordsLearned: 0,
            totalSentencesCompleted: 0,
            totalStudyTime: 0,
            streak: 0,
            points: 0,
            learnedWords: {},
            completedSentences: [],
            achievements: [],
            lastLogin: null
        };
    }
    
    saveStats() {
        localStorage.setItem('englishProStats', JSON.stringify(this.state.stats));
    }
    
    bindEvents() {
        // 导航
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.navigateTo(item.dataset.page);
            });
        });
        
        // 级别选择
        document.getElementById('currentLevel').addEventListener('change', (e) => {
            this.state.currentLevel = e.target.value;
            this.handleLevelChange();
        });
        
        // 词汇分类筛选
        document.querySelectorAll('.tab-btn[data-category]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn[data-category]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.currentCategory = e.target.dataset.category;
                this.renderVocabularyList();
            });
        });
        
        // 词根类型切换
        document.querySelectorAll('.root-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.root-tab').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.rootsType = e.target.dataset.type;
                this.renderRootsList();
            });
        });
        
        // 难度选择
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.selectedDifficulty = parseInt(e.target.dataset.level);
                this.startSentences();
            });
        });
    }
    
    navigateTo(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        this.state.currentPage = pageId;
        
        if (pageId === 'vocabulary') this.renderVocabularyList();
        else if (pageId === 'roots') this.renderRootsList();
        else if (pageId === 'sentences') this.startSentences();
        else if (pageId === 'grammar') this.renderGrammar();
        else if (pageId === 'listening') this.renderListening();
        else if (pageId === 'progress') this.renderProgress();
        else if (pageId === 'dashboard') this.renderDashboard();
    }
    
    handleLevelChange() {
        if (this.state.currentPage === 'vocabulary') this.renderVocabularyList();
        else if (this.state.currentPage === 'roots') this.renderRootsList();
    }
    
    updateStatsDisplay() {
        document.getElementById('miniWords').textContent = Object.keys(this.state.stats.learnedWords).length;
        document.getElementById('miniStreak').textContent = this.state.stats.streak;
        document.getElementById('totalWordsLearned').textContent = Object.keys(this.state.stats.learnedWords).length;
        document.getElementById('totalSentencesCompleted').textContent = this.state.stats.completedSentences.length;
        document.getElementById('totalStudyTime').textContent = Math.round(this.state.stats.totalStudyTime / 60);
        document.getElementById('currentStreak').textContent = this.state.stats.streak;
        
        const totalWords = 150; // 总单词数
        const percent = Math.min(100, Math.round((Object.keys(this.state.stats.learnedWords).length / totalWords) * 100));
        document.getElementById('overallPercent').textContent = `${percent}%`;
        document.getElementById('overallProgressRing').style.strokeDashoffset = 283 - (283 * percent / 100);
        
        document.getElementById('achievementCount').textContent = this.state.stats.achievements?.length || 0;
    }
    
    renderDashboard() {
        this.updateStatsDisplay();
    }
    
    // ========== 词汇学习 ==========
    renderVocabularyList() {
        const levelData = ENGLISH_DB.vocabulary[this.state.currentLevel];
        const container = document.getElementById('wordList');
        container.innerHTML = '';
        
        let words = [];
        if (this.state.currentCategory === 'all') {
            Object.values(levelData).flat().forEach(w => words.push(w));
        } else {
            words = levelData[this.state.currentCategory] || [];
        }
        
        words.forEach(wordObj => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `
                <div class="word">${wordObj.word}</div>
                <div class="phonetic">${wordObj.phonetic}</div>
                <div class="chinese">${wordObj.chinese}</div>
            `;
            card.onclick = () => this.openWordModal(wordObj);
            container.appendChild(card);
        });
    }
    
    openWordModal(wordObj) {
        document.getElementById('modalWord').textContent = wordObj.word;
        document.getElementById('modalPhonetic').textContent = wordObj.phonetic;
        document.getElementById('modalPos').textContent = wordObj.pos;
        document.getElementById('modalChinese').textContent = wordObj.chinese;
        document.getElementById('modalExample').innerHTML = `<em>${wordObj.example}</em>`;
        
        const rootsDiv = document.getElementById('modalRoots');
        rootsDiv.innerHTML = wordObj.roots && wordObj.roots.length > 0 
            ? `<strong>词根:</strong> ${wordObj.roots.join(', ')}`
            : '';
        
        const synonymsDiv = document.getElementById('modalSynonyms');
        synonymsDiv.innerHTML = wordObj.synonyms && wordObj.synonyms.length > 0
            ? `<strong>同义词:</strong> ${wordObj.synonyms.join(', ')}`
            : '';
        
        document.getElementById('wordModal').classList.add('show');
        this.currentWordObj = wordObj;
    }
    
    closeWordModal() {
        document.getElementById('wordModal').classList.remove('show');
    }
    
    playWordAudio() {
        if (this.currentWordObj) {
            const utterance = new SpeechSynthesisUtterance(this.currentWordObj.word);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    }
    
    rateWord(score) {
        if (!this.currentWordObj) return;
        
        const wordName = this.currentWordObj.word;
        if (!this.state.stats.learnedWords[wordName]) {
            this.state.stats.learnedWords[wordName] = { score, count: 1 };
            this.state.stats.totalWordsLearned++;
        } else {
            this.state.stats.learnedWords[wordName].score = score;
            this.state.stats.learnedWords[wordName].count++;
        }
        
        this.state.stats.points += score * 5;
        this.state.stats.totalStudyTime += 30;
        this.saveStats();
        this.updateStatsDisplay();
        this.checkAchievements();
        
        this.closeWordModal();
    }
    
    // ========== 词根词缀 ==========
    renderRootsList() {
        const type = this.state.rootsType;
        const data = ENGLISH_DB[type] || [];
        const container = document.getElementById('rootsContent');
        container.innerHTML = '';
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'word-card';
            const key = type === 'roots' ? 'root' : (type === 'prefixes' ? 'prefix' : 'suffix');
            card.innerHTML = `
                <div class="word" style="color: var(--secondary)">${item[key]}</div>
                <div class="chinese">${item.meaning}</div>
                <div style="margin-top: 10px; font-size: 13px; color: #666;">
                    ${item.examples.map(e => `📌 ${e}`).join('<br>')}
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    // ========== 句子练习 ==========
    startSentences() {
        const sentences = ENGLISH_DB.sentences['intermediate'] || ENGLISH_DB.sentences['beginner'];
        this.state.sentenceQueue = [...sentences].sort(() => Math.random() - 0.5).slice(0, 5);
        this.state.sentenceIndex = 0;
        this.showSentence();
    }
    
    showSentence() {
        const sentence = this.state.sentenceQueue[this.state.sentenceIndex];
        document.getElementById('chineseSentence').textContent = sentence.chinese;
        
        const shuffled = [...sentence.words].sort(() => Math.random() - 0.5);
        const wordBank = document.getElementById('wordBank');
        wordBank.innerHTML = '';
        
        shuffled.forEach(word => {
            const chip = document.createElement('button');
            chip.className = 'btn btn-secondary';
            chip.textContent = word;
            chip.onclick = () => this.addWordToAnswer(word, chip);
            wordBank.appendChild(chip);
        });
        
        document.getElementById('answerZone').innerHTML = '<span class="placeholder">点击单词组成句子</span>';
        document.getElementById('sentenceFeedback').textContent = '';
        document.getElementById('nextSentenceBtn').style.display = 'none';
    }
    
    addWordToAnswer(word, chip) {
        const answerZone = document.getElementById('answerZone');
        const placeholder = answerZone.querySelector('.placeholder');
        if (placeholder) placeholder.remove();
        
        const newChip = document.createElement('button');
        newChip.className = 'btn btn-primary';
        newChip.textContent = word;
        newChip.onclick = () => {
            newChip.remove();
            chip.style.display = 'inline-flex';
        };
        answerZone.appendChild(newChip);
        chip.style.display = 'none';
    }
    
    checkSentence() {
        const userWords = Array.from(document.getElementById('answerZone').children)
            .filter(c => c.tagName === 'BUTTON')
            .map(c => c.textContent);
        
        const current = this.state.sentenceQueue[this.state.sentenceIndex];
        const correct = current.words.filter(w => w !== '.' && w !== '?');
        
        const isCorrect = JSON.stringify(userWords) === JSON.stringify(correct);
        const feedback = document.getElementById('sentenceFeedback');
        
        if (isCorrect) {
            feedback.textContent = '✅ 正确！太棒了！';
            feedback.style.color = 'var(--secondary)';
            this.state.stats.points += 15;
            this.state.stats.completedSentences.push(current.english);
            this.state.stats.totalSentencesCompleted++;
        } else {
            feedback.textContent = `❌ 错误！正确答案：${current.english}`;
            feedback.style.color = 'var(--danger)';
        }
        
        this.saveStats();
        this.updateStatsDisplay();
        document.getElementById('nextSentenceBtn').style.display = 'inline-flex';
    }
    
    nextSentence() {
        this.state.sentenceIndex++;
        if (this.state.sentenceIndex >= this.state.sentenceQueue.length) {
            this.showResult();
        } else {
            this.showSentence();
        }
    }
    
    showHint() {
        const current = this.state.sentenceQueue[this.state.sentenceIndex];
        alert(`提示：${current.english.substring(0, 10)}...`);
    }
    
    playAudio() {
        const current = this.state.sentenceQueue[this.state.sentenceIndex];
        const utterance = new SpeechSynthesisUtterance(current.english);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
    
    showResult() {
        const modal = document.getElementById('resultModal');
        modal.classList.add('show');
        
        document.getElementById('resultIcon').textContent = '🎉';
        document.getElementById('resultTitle').textContent = '练习完成!';
        document.getElementById('resultCorrect').textContent = this.state.sentenceQueue.length;
        document.getElementById('resultWrong').textContent = 0;
        document.getElementById('resultAccuracy').textContent = '100%';
        document.getElementById('earnedPoints').textContent = this.state.sentenceQueue.length * 15;
    }
    
    continueLearning() {
        document.getElementById('resultModal').classList.remove('show');
        this.navigateTo('dashboard');
    }
    
    reviewMistakes() {
        this.continueLearning();
    }
    
    // ========== 语法和听力 ==========
    renderGrammar() {
        const renderList = (listId, data) => {
            const container = document.getElementById(listId);
            container.innerHTML = data.map(item => `
                <div class="word-card">
                    <h4>${item.topic}</h4>
                    <p><strong>公式:</strong> ${item.formula}</p>
                    <p><strong>用法:</strong> ${item.usage}</p>
                    <p><strong>例句:</strong> ${item.examples.slice(0, 2).join('; ')}</p>
                </div>
            `).join('');
        };
        
        renderList('tensesList', ENGLISH_DB.grammar.tenses);
        renderList('clausesList', ENGLISH_DB.grammar.clauses);
        renderList('conditionsList', ENGLISH_DB.grammar.conditions);
    }
    
    renderListening() {
        const container = document.getElementById('listeningList');
        container.innerHTML = ENGLISH_DB.listening.short_dialogues.map((item, idx) => `
            <div class="word-card">
                <h4>对话 ${idx + 1}</h4>
                <pre style="white-space: pre-wrap; font-size: 14px;">${item.dialogue}</pre>
                ${item.questions.map(q => `
                    <div style="margin-top: 15px;">
                        <p><strong>问题:</strong> ${q.question}</p>
                        <div style="margin-top: 10px;">
                            ${q.options.map((opt, i) => `
                                <button class="btn btn-secondary" style="margin-right: 10px;" onclick="app.checkListeningAnswer(this, ${i}, ${q.answer})">${opt}</button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
    
    checkListeningAnswer(btn, selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            btn.style.background = 'var(--secondary)';
            btn.style.color = 'white';
            this.state.stats.points += 10;
        } else {
            btn.style.background = 'var(--danger)';
            btn.style.color = 'white';
        }
        this.saveStats();
        this.updateStatsDisplay();
    }
    
    // ========== 成就系统 ==========
    checkAchievements() {
        const achievements = [
            { id: 'first_word', name: '初学乍练', condition: () => Object.keys(this.state.stats.learnedWords).length >= 1 },
            { id: 'word_10', name: '词汇入门', condition: () => Object.keys(this.state.stats.learnedWords).length >= 10 },
            { id: 'sentence_5', name: '句子新星', condition: () => this.state.stats.totalSentencesCompleted >= 5 },
            { id: 'streak_3', name: '坚持三天', condition: () => this.state.stats.streak >= 3 },
            { id: 'points_100', name: '积分达人', condition: () => this.state.stats.points >= 100 }
        ];
        
        achievements.forEach(ach => {
            if (ach.condition() && !this.state.stats.achievements?.includes(ach.id)) {
                this.state.stats.achievements = [...(this.state.stats.achievements || []), ach.id];
                setTimeout(() => alert(`🏆 新成就解锁：${ach.name}!`), 1000);
            }
        });
        
        this.saveStats();
    }
    
    renderProgress() {
        this.updateStatsDisplay();
        // 实现进度渲染逻辑
    }
    
    exportData() {
        const dataStr = JSON.stringify(this.state.stats, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'english_learning_data.json';
        a.click();
    }
    
    resetProgress() {
        if (confirm('确定要重置所有学习进度吗？此操作不可恢复！')) {
            localStorage.removeItem('englishProStats');
            location.reload();
        }
    }
}

// 启动应用
window.app = new EnglishLearningPro();
