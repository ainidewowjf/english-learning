// 单词数据 - 按级别和分类组织
const wordData = {
    beginner: {
        greetings: [
            { word: "hello", phonetic: "/həˈloʊ/", chinese: "你好", example: "Hello, nice to meet you." },
            { word: "goodbye", phonetic: "/ɡʊdˈbaɪ/", chinese: "再见", example: "Goodbye, see you tomorrow." },
            { word: "good", phonetic: "/ɡʊd/", chinese: "好的", example: "This is a good book." },
            { word: "morning", phonetic: "/ˈmɔːrnɪŋ/", chinese: "早晨", example: "Good morning, everyone." },
            { word: "afternoon", phonetic: "/ˌæftərˈnuːn/", chinese: "下午", example: "Good afternoon, sir." },
            { word: "evening", phonetic: "/ˈiːvnɪŋ/", chinese: "晚上", example: "Good evening, mom." },
            { word: "night", phonetic: "/naɪt/", chinese: "夜晚", example: "Good night, sweet dreams." },
            { word: "please", phonetic: "/pliːz/", chinese: "请", example: "Please help me." },
            { word: "thank", phonetic: "/θæŋk/", chinese: "感谢", example: "Thank you very much." },
            { word: "sorry", phonetic: "/ˈsɑːri/", chinese: "抱歉", example: "I'm sorry for being late." },
            { word: "excuse", phonetic: "/ɪkˈskjuːz/", chinese: "原谅", example: "Excuse me, where is the bathroom?" },
            { word: "welcome", phonetic: "/ˈwelkəm/", chinese: "欢迎", example: "Welcome to my home." }
        ],
        numbers: [
            { word: "one", phonetic: "/wʌn/", chinese: "一", example: "I have one apple." },
            { word: "two", phonetic: "/tuː/", chinese: "二", example: "There are two cats." },
            { word: "three", phonetic: "/θriː/", chinese: "三", example: "I have three books." },
            { word: "four", phonetic: "/fɔːr/", chinese: "四", example: "She has four dogs." },
            { word: "five", phonetic: "/faɪv/", chinese: "五", example: "Give me five dollars." },
            { word: "six", phonetic: "/sɪks/", chinese: "六", example: "It's six o'clock." },
            { word: "seven", phonetic: "/ˈsevn/", chinese: "七", example: "There are seven days in a week." },
            { word: "eight", phonetic: "/eɪt/", chinese: "八", example: "He is eight years old." },
            { word: "nine", phonetic: "/naɪn/", chinese: "九", example: "I wake up at nine." },
            { word: "ten", phonetic: "/ten/", chinese: "十", example: "I can count to ten." }
        ],
        colors: [
            { word: "red", phonetic: "/red/", chinese: "红色", example: "The apple is red." },
            { word: "blue", phonetic: "/bluː/", chinese: "蓝色", example: "The sky is blue." },
            { word: "green", phonetic: "/ɡriːn/", chinese: "绿色", example: "The grass is green." },
            { word: "yellow", phonetic: "/ˈjeloʊ/", chinese: "黄色", example: "The banana is yellow." },
            { word: "black", phonetic: "/blæk/", chinese: "黑色", example: "My car is black." },
            { word: "white", phonetic: "/waɪt/", chinese: "白色", example: "The snow is white." },
            { word: "orange", phonetic: "/ˈɔːrɪndʒ/", chinese: "橙色", example: "I like orange juice." },
            { word: "pink", phonetic: "/pɪŋk/", chinese: "粉色", example: "She wears a pink dress." }
        ],
        family: [
            { word: "father", phonetic: "/ˈfɑːðər/", chinese: "父亲", example: "My father is a teacher." },
            { word: "mother", phonetic: "/ˈmʌðər/", chinese: "母亲", example: "My mother loves cooking." },
            { word: "brother", phonetic: "/ˈbrʌðər/", chinese: "兄弟", example: "I have a younger brother." },
            { word: "sister", phonetic: "/ˈsɪstər/", chinese: "姐妹", example: "My sister is five years old." },
            { word: "grandfather", phonetic: "/ˈɡrænfɑːðər/", chinese: "祖父", example: "My grandfather is 80 years old." },
            { word: "grandmother", phonetic: "/ˈɡrænmʌðər/", chinese: "祖母", example: "My grandmother tells stories." },
            { word: "son", phonetic: "/sʌn/", chinese: "儿子", example: "He is my son." },
            { word: "daughter", phonetic: "/ˈdɔːtər/", chinese: "女儿", example: "She is my daughter." },
            { word: "uncle", phonetic: "/ˈʌŋkl/", chinese: "叔叔", example: "My uncle lives in Beijing." },
            { word: "aunt", phonetic: "/ænt/", chinese: "阿姨", example: "My aunt is a doctor." }
        ]
    },
    elementary: {
        food: [
            { word: "apple", phonetic: "/ˈæpl/", chinese: "苹果", example: "I eat an apple every day." },
            { word: "bread", phonetic: "/bred/", chinese: "面包", example: "I have bread for breakfast." },
            { word: "water", phonetic: "/ˈwɔːtər/", chinese: "水", example: "Please give me some water." },
            { word: "milk", phonetic: "/mɪlk/", chinese: "牛奶", example: "Children drink milk." },
            { word: "rice", phonetic: "/raɪs/", chinese: "米饭", example: "We eat rice for lunch." },
            { word: "egg", phonetic: "/eɡ/", chinese: "鸡蛋", example: "I want two eggs." },
            { word: "meat", phonetic: "/miːt/", chinese: "肉", example: "I don't eat meat." },
            { word: "fish", phonetic: "/fɪʃ/", chinese: "鱼", example: "The fish is fresh." },
            { word: "vegetable", phonetic: "/ˈvedʒtəbl/", chinese: "蔬菜", example: "Eat more vegetables." },
            { word: "fruit", phonetic: "/fruːt/", chinese: "水果", example: "Fruit is healthy." }
        ],
        animals: [
            { word: "cat", phonetic: "/kæt/", chinese: "猫", example: "I have a cute cat." },
            { word: "dog", phonetic: "/dɔːɡ/", chinese: "狗", example: "The dog is my friend." },
            { word: "bird", phonetic: "/bɜːrd/", chinese: "鸟", example: "The bird can fly." },
            { word: "fish", phonetic: "/fɪʃ/", chinese: "鱼", example: "Fish live in water." },
            { word: "horse", phonetic: "/hɔːrs/", chinese: "马", example: "The horse runs fast." },
            { word: "cow", phonetic: "/kaʊ/", chinese: "牛", example: "The cow gives us milk." },
            { word: "pig", phonetic: "/pɪɡ/", chinese: "猪", example: "The pig is pink." },
            { word: "sheep", phonetic: "/ʃiːp/", chinese: "羊", example: "The sheep has soft wool." },
            { word: "chicken", phonetic: "/ˈtʃɪkɪn/", chinese: "鸡", example: "The chicken lays eggs." },
            { word: "duck", phonetic: "/dʌk/", chinese: "鸭子", example: "The duck swims well." }
        ],
        verbs: [
            { word: "eat", phonetic: "/iːt/", chinese: "吃", example: "I eat breakfast at 7." },
            { word: "drink", phonetic: "/drɪŋk/", chinese: "喝", example: "Drink more water." },
            { word: "go", phonetic: "/ɡoʊ/", chinese: "去", example: "I go to school." },
            { word: "come", phonetic: "/kʌm/", chinese: "来", example: "Come here, please." },
            { word: "see", phonetic: "/siː/", chinese: "看见", example: "I can see you." },
            { word: "hear", phonetic: "/hɪr/", chinese: "听见", example: "I hear a sound." },
            { word: "speak", phonetic: "/spiːk/", chinese: "说", example: "Speak slowly, please." },
            { word: "run", phonetic: "/rʌn/", chinese: "跑", example: "Run fast!" },
            { word: "walk", phonetic: "/wɔːk/", chinese: "走", example: "Let's walk together." },
            { word: "sleep", phonetic: "/sliːp/", chinese: "睡觉", example: "I sleep at 10 PM." }
        ]
    },
    intermediate: {
        daily: [
            { word: "breakfast", phonetic: "/ˈbrekfəst/", chinese: "早餐", example: "I have breakfast at 7 AM." },
            { word: "lunch", phonetic: "/lʌntʃ/", chinese: "午餐", example: "Let's have lunch together." },
            { word: "dinner", phonetic: "/ˈdɪnər/", chinese: "晚餐", example: "Dinner is ready." },
            { word: "school", phonetic: "/skuːl/", chinese: "学校", example: "I go to school by bus." },
            { word: "work", phonetic: "/wɜːrk/", chinese: "工作", example: "I work in an office." },
            { word: "home", phonetic: "/hoʊm/", chinese: "家", example: "I'm going home now." },
            { word: "friend", phonetic: "/frend/", chinese: "朋友", example: "She is my best friend." },
            { word: "family", phonetic: "/ˈfæməli/", chinese: "家庭", example: "I love my family." }
        ],
        adjectives: [
            { word: "big", phonetic: "/bɪɡ/", chinese: "大的", example: "This is a big house." },
            { word: "small", phonetic: "/smɔːl/", chinese: "小的", example: "The cat is small." },
            { word: "tall", phonetic: "/tɔːl/", chinese: "高的", example: "He is very tall." },
            { word: "short", phonetic: "/ʃɔːrt/", chinese: "矮的/短的", example: "The pencil is short." },
            { word: "happy", phonetic: "/ˈhæpi/", chinese: "开心的", example: "I am so happy." },
            { word: "sad", phonetic: "/sæd/", chinese: "伤心的", example: "Don't be sad." },
            { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", chinese: "美丽的", example: "The flower is beautiful." },
            { word: "important", phonetic: "/ɪmˈpɔːrtnt/", chinese: "重要的", example: "This is important." }
        ]
    },
    advanced: {
        business: [
            { word: "meeting", phonetic: "/ˈmiːtɪŋ/", chinese: "会议", example: "We have a meeting at 2 PM." },
            { word: "project", phonetic: "/ˈprɑːdʒekt/", chinese: "项目", example: "The project is on schedule." },
            { word: "deadline", phonetic: "/ˈdedlaɪn/", chinese: "截止日期", example: "The deadline is next Friday." },
            { word: "report", phonetic: "/rɪˈpɔːrt/", chinese: "报告", example: "Please submit the report." },
            { word: "client", phonetic: "/ˈklaɪənt/", chinese: "客户", example: "The client is satisfied." }
        ]
    }
};

// 句子练习数据 - 按级别组织
const sentenceData = {
    beginner: [
        { english: "Hello, how are you?", chinese: "你好，你好吗？", words: ["Hello", "how", "are", "you", "?"] },
        { english: "Good morning, teacher.", chinese: "早上好，老师。", words: ["Good", "morning", "teacher", "."] },
        { english: "Nice to meet you.", chinese: "很高兴认识你。", words: ["Nice", "to", "meet", "you", "."] },
        { english: "Thank you very much.", chinese: "非常感谢你。", words: ["Thank", "you", "very", "much", "."] },
        { english: "I am a student.", chinese: "我是一名学生。", words: ["I", "am", "a", "student", "."] },
        { english: "This is my book.", chinese: "这是我的书。", words: ["This", "is", "my", "book", "."] },
        { english: "What is your name?", chinese: "你叫什么名字？", words: ["What", "is", "your", "name", "?"] },
        { english: "My name is Tom.", chinese: "我的名字叫汤姆。", words: ["My", "name", "is", "Tom", "."] },
        { english: "How old are you?", chinese: "你几岁了？", words: ["How", "old", "are", "you", "?"] },
        { english: "I am ten years old.", chinese: "我十岁了。", words: ["I", "am", "ten", "years", "old", "."] }
    ],
    elementary: [
        { english: "I like eating apples.", chinese: "我喜欢吃苹果。", words: ["I", "like", "eating", "apples", "."] },
        { english: "She has a cute cat.", chinese: "她有一只可爱的猫。", words: ["She", "has", "a", "cute", "cat", "."] },
        { english: "We go to school by bus.", chinese: "我们坐公交车去学校。", words: ["We", "go", "to", "school", "by", "bus", "."] },
        { english: "The sky is blue today.", chinese: "今天天空是蓝色的。", words: ["The", "sky", "is", "blue", "today", "."] },
        { english: "My father is a teacher.", chinese: "我的父亲是一名老师。", words: ["My", "father", "is", "a", "teacher", "."] },
        { english: "I have two brothers.", chinese: "我有两个兄弟。", words: ["I", "have", "two", "brothers", "."] },
        { english: "Please give me some water.", chinese: "请给我一些水。", words: ["Please", "give", "me", "some", "water", "."] },
        { english: "The bird can fly high.", chinese: "鸟可以飞得很高。", words: ["The", "bird", "can", "fly", "high", "."] }
    ],
    intermediate: [
        { english: "I usually have breakfast at seven.", chinese: "我通常七点吃早餐。", words: ["I", "usually", "have", "breakfast", "at", "seven", "."] },
        { english: "She goes to work by subway.", chinese: "她坐地铁去上班。", words: ["She", "goes", "to", "work", "by", "subway", "."] },
        { english: "They are playing in the park.", chinese: "他们正在公园里玩。", words: ["They", "are", "playing", "in", "the", "park", "."] },
        { english: "What time do you get up?", chinese: "你几点起床？", words: ["What", "time", "do", "you", "get", "up", "?"] },
        { english: "I want to learn English well.", chinese: "我想学好英语。", words: ["I", "want", "to", "learn", "English", "well", "."] },
        { english: "This book is very interesting.", chinese: "这本书很有趣。", words: ["This", "book", "is", "very", "interesting", "."] }
    ],
    advanced: [
        { english: "The meeting has been postponed until next Monday.", chinese: "会议已推迟到下周一。", words: ["The", "meeting", "has", "been", "postponed", "until", "next", "Monday", "."] },
        { english: "Could you please send me the report by Friday?", chinese: "请你在周五之前把报告发给我好吗？", words: ["Could", "you", "please", "send", "me", "the", "report", "by", "Friday", "?"] },
        { english: "I appreciate your help with this project.", chinese: "感谢你在这个项目上的帮助。", words: ["I", "appreciate", "your", "help", "with", "this", "project", "."] }
    ]
};

// 成就系统
const achievements = [
    { id: 'first_word', name: '初学者', icon: '🌱', desc: '学习第一个单词', condition: (stats) => stats.totalWords >= 1 },
    { id: 'word_10', name: '词汇入门', icon: '📖', desc: '学习10个单词', condition: (stats) => stats.totalWords >= 10 },
    { id: 'word_50', name: '词汇达人', icon: '📚', desc: '学习50个单词', condition: (stats) => stats.totalWords >= 50 },
    { id: 'word_100', name: '词汇大师', icon: '🏆', desc: '学习100个单词', condition: (stats) => stats.totalWords >= 100 },
    { id: 'sentence_10', name: '句子新星', icon: '✍️', desc: '完成10个句子', condition: (stats) => stats.totalSentences >= 10 },
    { id: 'sentence_50', name: '句子能手', icon: '💬', desc: '完成50个句子', condition: (stats) => stats.totalSentences >= 50 },
    { id: 'streak_3', name: '坚持三天', icon: '🔥', desc: '连续学习3天', condition: (stats) => stats.streak >= 3 },
    { id: 'streak_7', name: '一周达人', icon: '⭐', desc: '连续学习7天', condition: (stats) => stats.streak >= 7 },
    { id: 'points_100', name: '百分达人', icon: '🎯', desc: '获得100积分', condition: (stats) => stats.points >= 100 },
    { id: 'points_500', name: '积分富翁', icon: '💎', desc: '获得500积分', condition: (stats) => stats.points >= 500 }
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { wordData, sentenceData, achievements };
}