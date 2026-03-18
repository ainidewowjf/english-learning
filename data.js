// ============================================
// 英语学习知识库 - 精简可用版 V7.0
// ============================================

window.ENGLISH_DB = {
    // A1 级别 - 入门课程（完整可学）
    level_a1: [
        {
            title: '第一课：打招呼',
            words: ['Hello', 'Hi', 'Good morning', 'How are you']
        },
        {
            title: '第二课：数字 1-10',
            words: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
        },
        {
            title: '第三课：基础颜色',
            words: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple']
        },
        {
            title: '第四课：常用问候',
            words: ['Thank you', 'Please', 'Excuse me', 'Sorry', 'You\\'re welcome', 'Goodbye', 'See you']
        },
        {
            title: '第五课：家庭成员',
            words: ['Mother', 'Father', 'Sister', 'Brother', 'Grandmother', 'Grandfather']
        }
    ],
    
    // 句子练习数据
    sentence_practice: [
        { chinese: '你好吗？', blank: '__________', sentence: 'How are you' },
        { chinese: '早上好！', blank: '__________', sentence: 'Good morning' },
        { chinese: '谢谢！', blank: '__________', sentence: 'Thank you' },
        { chinese: '再见！', blank: '__________', sentence: 'Goodbye' }
    ],
    
    // 其他级别占位（开发中）
    level_a2: [],
    level_b1: [],
    level_b2: [],
    level_c1: [],
    level_c2: []
};

console.log('📦 Data loaded:', Object.keys(window.ENGLISH_DB));
console.log('📚 A1 lessons:', window.ENGLISH_DB.level_a1.length);
