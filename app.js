// ============================================
// 英语大师 - 主应用程序
// ============================================

class EnglishLearningApp {
    constructor() {
        this.state = {
            currentPage: 'home',
            currentLevel: 'beginner',
            stats: this.loadStats(),
            sentenceQueue: [],
            currentSentenceIndex: 0,
            buildLevel: 1,
            learnQueue: [],
            learnIndex: 0
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStatsDisplay();
        this.checkAchievements();
    }
    
    // ========== 事件绑定 ==========
    bindEvents() {
        // 导航菜单
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // 级别选择
        document.getElementById('levelSelect').addEventListener('change', (e) => {
            this.state.currentLevel = e.target.value;
            this.loadCurrentLevelData();
        });
        
        // 快速操作
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', () => {
                const action = card.dataset.action;
                this.handleQuickAction(action);
            });
        });
        
        // 句子练习页面
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('soundBtn').addEventListener('click', () => this.playSound());
        document.getElementById('checkBtn').addEventListener('click', () => this.checkSentence());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSentence());
        
        // 组句挑战
        document.getElementById('resetBuildBtn').addEventListener('click', () => this.resetBuild());
        document.getElementById('submitBuildBtn').addEventListener('click', () => this.submitBuild());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextBuildLevel());
        
        // 单词学习弹窗
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('prevWord').addEventListener('click', () => this.prevWord());
        document.getElementById('nextWord').addEventListener('click', () => this.nextWord());
        document.querySelectorAll('.mastery-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.markWordMastery(e.target.dataset.level));
        });
        
        // 结果弹窗
        document.getElementById('reviewWrongBtn').addEventListener('click', () => this.closeResultModal());
        document.getElementById('continueBtn').addEventListener('click', () => this.closeResultModal());
        
        // 模式切换
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // 筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // 分类卡片
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.startLearnWords(category);
            });
        });
    }
    
    // ========== 导航 ==========
    navigateTo(pageId) {
        // 更新侧边栏
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageId);
        });
        
        // 切换页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        this.state.currentPage = pageId;
        
        // 页面加载时的初始化
        if (pageId === 'sentences') {
            this.loadSentencePractice();
        } else if (pageId === 'build') {
            this.loadBuildChallenge();
        } else if (pageId === 'progress') {
            this.updateProgressPage();
        } else if (pageId === 'words') {
            this.updateWordCategories();
        }
    }
    
    // ========== 统计管理 ==========
    loadStats() {
        const saved = localStorage.getItem('englishAppStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            totalWords: 0,
            totalSentences: 0,
            streak: 0,
            points: 0,
            lastLogin: null,
            learnedWords: [],
            completedSentences: [],
            achievements: []
        };
    }
    
    saveStats() {
        localStorage.setItem('englishAppStats', JSON.stringify(this.state.stats));
    }
    
    updateStatsDisplay() {
        document.getElementById('totalWords').textContent = this.state.stats.totalWords;
        document.getElementById('totalSentences').textContent = this.state.stats.totalSentences;
        document.getElementById('streak').textContent = this.state.stats.streak;
        document.getElementById('points').textContent = this.state.stats.points;
    }
    
    addPoints(points) {
        this.state.stats.points += points;
        this.saveStats();
        this.updateStatsDisplay();
    }
    
    // ========== 快速操作 ==========
    handleQuickAction(action) {
        switch(action) {
            case 'learn-words':
                this.navigateAndStart('words');
                break;
            case 'practice-sentences':
                this.navigateAndStart('sentences');
                break;
            case 'review':
                this.navigateAndStart('words');
                break;
            case 'challenge':
                this.navigateAndStart('build');
                break;
        }
    }
    
    navigateAndStart(page) {
        this.navigateTo(page);
    }
    
    // ========== 句子练习 ==========
    loadSentencePractice() {
        const sentences = sentenceData[this.state.currentLevel] || sentenceData.beginner;
        this.state.sentenceQueue = [...sentences];
        this.state.currentSentenceIndex = 0;
        this.showSentence();
    }
    
    showSentence() {
        const sentence = this.state.sentenceQueue[this.state.currentSentenceIndex];
        if (!sentence) {
            this.showResult();
            return;
        }
        
        // 更新进度条
        const progress = ((this.state.currentSentenceIndex) / this.state.sentenceQueue.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent = 
            `${this.state.currentSentenceIndex + 1}/${this.state.sentenceQueue.length}`;
        
        // 显示中文
        document.getElementById('sentenceChinese').textContent = sentence.chinese;
        
        // 打乱单词顺序
        const shuffledWords = [...sentence.words].sort(() => Math.random() - 0.5);
        
        // 显示单词块
        const wordsContainer = document.getElementById('sentenceWords');
        wordsContainer.innerHTML = '';
        shuffledWords.forEach((word, index) => {
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.textContent = word;
            chip.dataset.word = word;
            chip.dataset.index = index;
            chip.onclick = () => this.selectWord(word, chip);
            wordsContainer.appendChild(chip);
        });
        
        // 清空用户答案区
        document.getElementById('userAnswer').innerHTML = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';
        
        // 控制按钮
        document.getElementById('checkBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').style.display = 'none';
    }
    
    selectWord(word, chipElement) {
        const answerDiv = document.getElementById('userAnswer');
        
        // 如果已经在答案区，移除它
        if (chipElement.parentElement.classList.contains('sentence-words')) {
            const existingChip = Array.from(answerDiv.children).find(
                c => c.textContent === word && !c.classList.contains('used')
            );
            if (existingChip) {
                existingChip.remove();
                chipElement.classList.remove('selected');
                return;
            }
        }
        
        // 添加到答案区
        const newChip = document.createElement('div');
        newChip.className = 'word-chip';
        newChip.textContent = word;
        newChip.onclick = () => {
            chipElement.classList.remove('selected');
            newChip.remove();
        };
        answerDiv.appendChild(newChip);
        chipElement.classList.add('selected');
    }
    
    checkSentence() {
        const userWords = Array.from(document.getElementById('userAnswer').children)
            .map(c => c.textContent);
        const correctSentence = this.state.sentenceQueue[this.state.currentSentenceIndex];
        const correctWords = correctSentence.words.filter(w => w !== '.' && w !== '?');
        
        const isCorrect = JSON.stringify(userWords) === JSON.stringify(correctWords);
        
        const feedback = document.getElementById('feedback');
        if (isCorrect) {
            feedback.textContent = '🎉 正确！太棒了！';
            feedback.className = 'feedback correct';
            
            // 添加积分
            this.addPoints(10);
            
            // 记录完成
            this.state.stats.totalSentences++;
            this.state.stats.learnedWords.push(...correctWords);
            this.saveStats();
            this.updateStatsDisplay();
        } else {
            feedback.textContent = `❌ 错误！正确答案：${correctSentence.english}`;
            feedback.className = 'feedback wrong';
        }
        
        // 禁用点击
        document.querySelectorAll('#sentenceWords .word-chip').forEach(chip => {
            chip.style.pointerEvents = 'none';
        });
        
        // 显示下一题按钮
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    
    nextSentence() {
        this.state.currentSentenceIndex++;
        this.showSentence();
    }
    
    showHint() {
        const sentence = this.state.sentenceQueue[this.state.currentSentenceIndex];
        alert(`提示：${sentence.english.substring(0, 5)}...`);
    }
    
    playSound() {
        const sentence = this.state.sentenceQueue[this.state.currentSentenceIndex];
        const utterance = new SpeechSynthesisUtterance(sentence.english);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
    
    showResult() {
        const modal = document.getElementById('resultModal');
        modal.classList.add('show');
        
        const score = Math.round((this.state.currentSentenceIndex / this.state.sentenceQueue.length) * 100);
        document.getElementById('resultIcon').textContent = score >= 70 ? '🎉' : '💪';
        document.getElementById('resultTitle').textContent = score >= 70 ? '练习完成！' : '继续加油！';
        document.getElementById('resultCorrect').textContent = this.state.currentSentenceIndex;
        document.getElementById('resultWrong').textContent = 
            this.state.sentenceQueue.length - this.state.currentSentenceIndex;
        document.getElementById('resultAccuracy').textContent = `${score}%`;
    }
    
    closeResultModal() {
        document.getElementById('resultModal').classList.remove('show');
        this.navigateTo('home');
    }
    
    // ========== 单词学习 ==========
    startLearnWords(category) {
        const levelData = wordData[this.state.currentLevel];
        if (!levelData || !levelData[category]) {
            alert('这个类别的单词还没有录入，请稍后再试！');
            return;
        }
        
        this.state.learnQueue = [...levelData[category]];
        this.state.learnIndex = 0;
        
        document.getElementById('totalWordsInCategory').textContent = this.state.learnQueue.length;
        this.showLearnCard();
        document.getElementById('learnModal').classList.add('show');
    }
    
    showLearnCard() {
        const wordObj = this.state.learnQueue[this.state.learnIndex];
        
        document.getElementById('learnWord').textContent = wordObj.word;
        document.getElementById('learnPhonetic').textContent = wordObj.phonetic;
        document.getElementById('learnChinese').textContent = wordObj.chinese;
        document.getElementById('learnExample').innerHTML = 
            `<span>${wordObj.example.replace(new RegExp(wordObj.word, 'gi'), matched => 
                `<strong>${matched}</strong>`
            )}</span>`;
        document.getElementById('currentWordIndex').textContent = this.state.learnIndex + 1;
    }
    
    prevWord() {
        if (this.state.learnIndex > 0) {
            this.state.learnIndex--;
            this.showLearnCard();
        }
    }
    
    nextWord() {
        if (this.state.learnIndex < this.state.learnQueue.length - 1) {
            this.state.learnIndex++;
            this.showLearnCard();
        }
    }
    
    markWordMastery(level) {
        const wordObj = this.state.learnQueue[this.state.learnIndex];
        
        // 增加总词数（不重复计算）
        if (!this.state.stats.learnedWords.includes(wordObj.word)) {
            this.state.stats.totalWords++;
            this.state.stats.learnedWords.push(wordObj.word);
            this.addPoints(5 * parseInt(level));
        }
        
        this.saveStats();
        this.updateStatsDisplay();
        this.checkAchievements();
        
        // 自动跳到下一个或关闭
        if (this.state.learnIndex < this.state.learnQueue.length - 1) {
            this.state.learnIndex++;
            this.showLearnCard();
        } else {
            this.closeModal();
        }
    }
    
    closeModal() {
        document.getElementById('learnModal').classList.remove('show');
    }
    
    // ========== 组句挑战 ==========
    loadBuildChallenge() {
        this.generateBuildLevel();
    }
    
    generateBuildLevel() {
        const levelSentences = this.getBuildLevelSentences();
        const sentence = levelSentences[Math.floor(Math.random() * levelSentences.length)];
        
        document.getElementById('buildChinese').textContent = sentence.chinese;
        document.getElementById('currentLevel').textContent = this.state.buildLevel;
        
        // 打乱单词
        const allWords = [...sentence.words];
        const shuffled = allWords.sort(() => Math.random() - 0.5);
        
        const wordBank = document.getElementById('wordBank');
        wordBank.innerHTML = '';
        shuffled.forEach((word, index) => {
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.textContent = word;
            chip.dataset.word = word;
            chip.dataset.available = true;
            chip.onclick = () => this.selectBuildWord(chip);
            wordBank.appendChild(chip);
        });
        
        // 清空放置区
        const dropZone = document.getElementById('dropZone');
        dropZone.innerHTML = '<span class="placeholder">点击单词添加到句子中</span>';
        dropZone.removeAttribute('data-answer');
        dropZone.removeAttribute('data-correct');
        
        document.getElementById('buildFeedback').textContent = '';
        document.getElementById('levelComplete').style.display = 'none';
    }
    
    getBuildLevelSentences() {
        const levels = {
            1: sentenceData.beginner.slice(0, 3),
            2: sentenceData.beginner.slice(3, 6),
            3: sentenceData.beginner.slice(6),
            4: sentenceData.elementary.slice(0, 3),
            5: sentenceData.elementary.slice(3),
            6: sentenceData.intermediate.slice(0, 2),
            7: sentenceData.intermediate.slice(2),
            8: sentenceData.advanced.slice(0, 1)
        };
        return levels[this.state.buildLevel] || levels[1];
    }
    
    selectBuildWord(chip) {
        const dropZone = document.getElementById('dropZone');
        const placeholder = dropZone.querySelector('.placeholder');
        if (placeholder) placeholder.remove();
        
        const newChip = document.createElement('div');
        newChip.className = 'word-chip';
        newChip.textContent = chip.textContent;
        newChip.onclick = () => {
            newChip.remove();
            chip.style.display = 'flex';
            chip.dataset.available = true;
        };
        dropZone.appendChild(newChip);
        chip.style.display = 'none';
        chip.dataset.available = false;
    }
    
    resetBuild() {
        this.generateBuildLevel();
    }
    
    submitBuild() {
        const dropZone = document.getElementById('dropZone');
        const userWords = Array.from(dropZone.children)
            .filter(c => c.tagName === 'DIV')
            .map(c => c.textContent);
        
        // 获取当前题目答案
        const levelSentences = this.getBuildLevelSentences();
        const currentSentence = levelSentences[Math.floor(Math.random() * levelSentences.length)];
        const correctWords = currentSentence.words.filter(w => w !== '.' && w !== '?');
        
        const feedback = document.getElementById('buildFeedback');
        const isCorrect = JSON.stringify(userWords) === JSON.stringify(correctWords);
        
        if (isCorrect) {
            feedback.textContent = '🎉 正确！太棒了！';
            feedback.className = 'feedback correct';
            this.addPoints(15);
            
            setTimeout(() => {
                this.showLevelComplete();
            }, 1500);
        } else {
            feedback.textContent = `❌ 不对哦！正确答案：${currentSentence.english}`;
            feedback.className = 'feedback wrong';
        }
    }
    
    showLevelComplete() {
        document.getElementById('levelComplete').style.display = 'flex';
    }
    
    nextBuildLevel() {
        this.state.buildLevel++;
        this.generateBuildLevel();
    }
    
    // ========== 学习进度页面 ==========
    updateProgressPage() {
        // 总体进度
        const totalLevels = Object.keys(wordData).length;
        const overallPercent = Math.min(100, Math.round((this.state.stats.totalWords / 200) * 100));
        document.getElementById('overallProgress').textContent = `${overallPercent}%`;
        document.getElementById('progressRing').style.strokeDashoffset = 
            283 - (283 * overallPercent / 100);
        
        // 各级别进度
        const levelProgress = {
            beginner: Math.min(100, Math.round((this.state.stats.totalWords / 100) * 100)),
            elementary: Math.min(100, Math.round((this.state.stats.totalWords / 150) * 100)),
            intermediate: Math.min(100, Math.round((this.state.stats.totalWords / 200) * 100)),
            advanced: Math.min(100, Math.round((this.state.stats.totalWords / 250) * 100))
        };
        
        Object.entries(levelProgress).forEach(([level, percent]) => {
            document.getElementById(`${level}Progress`).style.width = `${percent}%`;
            document.getElementById(`${level}Percent`).textContent = `${percent}%`;
        });
        
        // 成就徽章
        this.renderAchievements();
    }
    
    renderAchievements() {
        const grid = document.getElementById('achievementsGrid');
        grid.innerHTML = '';
        
        achievements.forEach(achievement => {
            const isEarned = this.state.stats.achievements?.includes(achievement.id) || 
                            achievement.condition(this.state.stats);
            
            const div = document.createElement('div');
            div.className = `achievement ${isEarned ? 'earned' : 'locked'}`;
            div.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <span class="achievement-name">${achievement.name}</span>
            `;
            grid.appendChild(div);
        });
    }
    
    checkAchievements() {
        let newAchievements = [];
        
        achievements.forEach(achievement => {
            const hasAchievement = this.state.stats.achievements?.includes(achievement.id);
            const canAchieve = achievement.condition(this.state.stats);
            
            if (canAchieve && !hasAchievement) {
                newAchievements.push(achievement.id);
                // 简单提示
                setTimeout(() => {
                    alert(`🏆 新成就解锁：${achievement.name}！`);
                }, 1000);
            }
        });
        
        if (newAchievements.length > 0) {
            this.state.stats.achievements = [
                ...(this.state.stats.achievements || []),
                ...newAchievements
            ];
            this.saveStats();
        }
    }
    
    // ========== 其他辅助方法 ==========
    updateWordCategories() {
        document.querySelectorAll('.category-count').forEach((el, index) => {
            el.textContent = '进行中';
        });
    }
    
    loadCurrentLevelData() {
        // 当级别改变时重新加载数据
        if (this.state.currentPage === 'sentences') {
            this.loadSentencePractice();
        }
    }
}

// ========== 启动应用 ==========
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnglishLearningApp();
});

// ========== 语音合成支持检测 ==========
if (!window.speechSynthesis) {
    console.warn('您的浏览器不支持语音合成功能');
}