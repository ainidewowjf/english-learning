// ============================================
// 完整英语学习知识库 - A1 到 C2 全级别
// 包含：词汇、短语、句子、词根词缀
// ============================================

const ENGLISH_DB = {
    // ========== 词根词缀基础 ==========
    roots: [
        { id: 'act', word: 'act', phonetic: '/ækt/', chinese: '做，行动', meaning: '做，行动', examples: ['action(行动)', 'active(活跃的)', 'actor(演员)'] },
        { id: 'aud', word: 'aud', phonetic: '/ɔːd/', chinese: '听', meaning: '听', examples: ['audio(音频)', 'audience(观众)', 'audit(审计)'] },
        { id: 'bio', word: 'bio', phonetic: '/baɪoʊ/', chinese: '生命', meaning: '生命，生物', examples: ['biology(生物学)', 'biography(传记)', 'biosphere(生物圈)'] },
        { id: 'dict', word: 'dict', phonetic: '/dɪkt/', chinese: '说', meaning: '说', examples: ['dictionary(字典)', 'predict(预测)', 'contradict(反驳)'] },
        { id: 'duc', word: 'duc/duct', phonetic: '/dʌk/', chinese: '引导', meaning: '引导', examples: ['conduct(引导)', 'introduce(介绍)', 'deduce(推断)'] },
        { id: 'fer', word: 'fer', phonetic: '/fɜːr/', chinese: '携带', meaning: '携带，带来', examples: ['refer(参考)', 'transfer(转移)', 'infer(推断)'] },
        { id: 'form', word: 'form', phonetic: '/fɔːrm/', chinese: '形状', meaning: '形状，形式', examples: ['format(格式)', 'reform(改革)', 'transform(转变)'] },
        { id: 'gress', word: 'gress', phonetic: '/ɡres/', chinese: '走', meaning: '走', examples: ['progress(进步)', 'congress(国会)', 'aggressive(侵略)'] },
        { id: 'ject', word: 'ject', phonetic: '/dʒekt/', chinese: '投掷', meaning: '投掷', examples: ['project(项目)', 'reject(拒绝)', 'inject(注射)'] },
        { id: 'spect', word: 'spect', phonetic: '/spekt/', chinese: '看', meaning: '看', examples: ['inspect(检查)', 'respect(尊重)', 'suspect(怀疑)'] },
        { id: 'vis', word: 'vis/vid', phonetic: '/vɪz/', chinese: '看', meaning: '看', examples: ['video(视频)', 'visible(可见)', 'evidence(证据)'] },
        { id: 'port', word: 'port', phonetic: '/pɔːrt/', chinese: '搬运', meaning: '搬运', examples: ['import(进口)', 'export(出口)', 'transport(运输)'] }
    ],
    
    prefixes: [
        { prefix: 'un-', meaning: '不，非', examples: ['unable', 'unhappy', 'unusual'] },
        { prefix: 're-', meaning: '再，重复', examples: ['redo', 'return', 'review'] },
        { prefix: 'pre-', meaning: '预先', examples: ['preview', 'prepare', 'predict'] },
        { prefix: 'dis-', meaning: '不，分开', examples: ['dislike', 'discover', 'disagree'] },
        { prefix: 'over-', meaning: '过度', examples: ['overwork', 'overeat', 'overflow'] },
        { prefix: 'inter-', meaning: '之间', examples: ['international', 'internet', 'interact'] },
        { prefix: 'trans-', meaning: '跨越', examples: ['transport', 'translate', 'transfer'] }
    ],
    
    suffixes: [
        { suffix: '-tion', type: '名词', meaning: '...的状态/行为', examples: ['action', 'information', 'education'] },
        { suffix: '-ly', type: '副词', meaning: '...地', examples: ['quickly', 'happily', 'carefully'] },
        { suffix: '-able', type: '形容词', meaning: '能...的', examples: ['comfortable', 'readable', 'enjoyable'] },
        { suffix: '-ment', type: '名词', meaning: '...的行为/结果', examples: ['development', 'government', 'movement'] }
    ],

    // ========== A1 入门级 (第 1-50 课) ==========
    level_a1: [
        // Lesson 1: 打招呼
        {
            lesson: 1, title: '打招呼', level: 'A1',
            words: [
                { word: 'hello', phonetic: '/həˈloʊ/', chinese: '你好' },
                { word: 'hi', phonetic: '/haɪ/', chinese: '嗨' },
                { word: 'goodbye', phonetic: '/ɡʊdˈbaɪ/', chinese: '再见' },
                { word: 'please', phonetic: '/pliːz/', chinese: '请' },
                { word: 'thank', phonetic: '/θæŋk/', chinese: '感谢' }
            ],
            sentence: {
                chinese: '你好，谢谢！',
                english: 'Hello, thank you!',
                hints: ['打招呼 + 感谢']
            }
        },
        // Lesson 2: 自我介绍
        {
            lesson: 2, title: '自我介绍', level: 'A1',
            words: [
                { word: 'my', phonetic: '/maɪ/', chinese: '我的' },
                { word: 'name', phonetic: '/neɪm/', chinese: '名字' },
                { word: 'is', phonetic: '/ɪz/', chinese: '是' },
                { word: 'I', phonetic: '/aɪ/', chinese: '我' },
                { word: 'am', phonetic: '/æm/', chinese: '是' }
            ],
            sentence: {
                chinese: '我叫汤姆。',
                english: 'My name is Tom.',
                hints: ['介绍名字']
            }
        },
        // Lesson 3: 数字
        {
            lesson: 3, title: '基础数字', level: 'A1',
            words: [
                { word: 'one', phonetic: '/wʌn/', chinese: '一' },
                { word: 'two', phonetic: '/tuː/', chinese: '二' },
                { word: 'three', phonetic: '/θriː/', chinese: '三' },
                { word: 'four', phonetic: '/fɔːr/', chinese: '四' },
                { word: 'five', phonetic: '/faɪv/', chinese: '五' }
            ],
            sentence: {
                chinese: '我有三个苹果。',
                english: 'I have three apples.',
                hints: ['数量表达']
            }
        },
        // Lesson 4: 颜色
        {
            lesson: 4, title: '常见颜色', level: 'A1',
            words: [
                { word: 'red', phonetic: '/red/', chinese: '红色' },
                { word: 'blue', phonetic: '/bluː/', chinese: '蓝色' },
                { word: 'green', phonetic: '/ɡriːn/', chinese: '绿色' },
                { word: 'yellow', phonetic: '/ˈjeloʊ/', chinese: '黄色' },
                { word: 'black', phonetic: '/blæk/', chinese: '黑色' }
            ],
            sentence: {
                chinese: '天空是蓝色的。',
                english: 'The sky is blue.',
                hints: ['描述颜色']
            }
        },
        // Lesson 5: 家庭
        {
            lesson: 5, title: '家庭成员', level: 'A1',
            words: [
                { word: 'father', phonetic: '/ˈfɑːðər/', chinese: '父亲' },
                { word: 'mother', phonetic: '/ˈmʌðər/', chinese: '母亲' },
                { word: 'brother', phonetic: '/ˈbrʌðər/', chinese: '兄弟' },
                { word: 'sister', phonetic: '/ˈsɪstər/', chinese: '姐妹' },
                { word: 'family', phonetic: '/ˈfæməli/', chinese: '家庭' }
            ],
            sentence: {
                chinese: '我爱我的家人。',
                english: 'I love my family.',
                hints: ['表达情感']
            }
        },
        // Lesson 6: 食物
        {
            lesson: 6, title: '日常食物', level: 'A1',
            words: [
                { word: 'apple', phonetic: '/ˈæpl/', chinese: '苹果' },
                { word: 'bread', phonetic: '/bred/', chinese: '面包' },
                { word: 'water', phonetic: '/ˈwɔːtər/', chinese: '水' },
                { word: 'rice', phonetic: '/raɪs/', chinese: '米饭' },
                { word: 'egg', phonetic: '/eɡ/', chinese: '鸡蛋' }
            ],
            sentence: {
                chinese: '我喜欢吃苹果。',
                english: 'I like eating apples.',
                hints: ['表达喜好']
            }
        },
        // Lesson 7: 动物
        {
            lesson: 7, title: '常见动物', level: 'A1',
            words: [
                { word: 'cat', phonetic: '/kæt/', chinese: '猫' },
                { word: 'dog', phonetic: '/dɔːɡ/', chinese: '狗' },
                { word: 'bird', phonetic: '/bɜːrd/', chinese: '鸟' },
                { word: 'fish', phonetic: '/fɪʃ/', chinese: '鱼' },
                { word: 'horse', phonetic: '/hɔːrs/', chinese: '马' }
            ],
            sentence: {
                chinese: '狗是我的好朋友。',
                english: 'Dogs are my good friends.',
                hints: ['描述关系']
            }
        },
        // Lesson 8: 基础动词
        {
            lesson: 8, title: '常用动词', level: 'A1',
            words: [
                { word: 'go', phonetic: '/ɡoʊ/', chinese: '去' },
                { word: 'come', phonetic: '/kʌm/', chinese: '来' },
                { word: 'eat', phonetic: '/iːt/', chinese: '吃' },
                { word: 'drink', phonetic: '/drɪŋk/', chinese: '喝' },
                { word: 'sleep', phonetic: '/sliːp/', chinese: '睡觉' }
            ],
            sentence: {
                chinese: '我去学校。',
                english: 'I go to school.',
                hints: ['日常行动']
            }
        },
        // Lesson 9: 形容词
        {
            lesson: 9, title: '基础形容词', level: 'A1',
            words: [
                { word: 'big', phonetic: '/bɪɡ/', chinese: '大的' },
                { word: 'small', phonetic: '/smɔːl/', chinese: '小的' },
                { word: 'happy', phonetic: '/ˈhæpi/', chinese: '开心的' },
                { word: 'sad', phonetic: '/sæd/', chinese: '伤心的' },
                { word: 'good', phonetic: '/ɡʊd/', chinese: '好的' }
            ],
            sentence: {
                chinese: '我很开心。',
                english: 'I am very happy.',
                hints: ['描述心情']
            }
        },
        // Lesson 10: 时间
        {
            lesson: 10, title: '时间表达', level: 'A1',
            words: [
                { word: 'today', phonetic: '/təˈdeɪ/', chinese: '今天' },
                { word: 'tomorrow', phonetic: '/təˈmɔːroʊ/', chinese: '明天' },
                { word: 'yesterday', phonetic: '/ˈjestərdeɪ/', chinese: '昨天' },
                { word: 'now', phonetic: '/naʊ/', chinese: '现在' },
                { word: 'time', phonetic: '/taɪm/', chinese: '时间' }
            ],
            sentence: {
                chinese: '今天天气很好。',
                english: 'The weather is nice today.',
                hints: ['描述天气']
            }
        }
    ],

    // ========== A2 初级 (第 11-50 课) ==========
    level_a2: [
        {
            lesson: 11, title: '学校生活', level: 'A2',
            words: [
                { word: 'school', phonetic: '/skuːl/', chinese: '学校' },
                { word: 'teacher', phonetic: '/ˈtiːtʃər/', chinese: '老师' },
                { word: 'student', phonetic: '/ˈstuːdnt/', chinese: '学生' },
                { word: 'class', phonetic: '/klæs/', chinese: '班级' },
                { word: 'book', phonetic: '/bʊk/', chinese: '书' }
            ],
            sentence: {
                chinese: '她是一名好老师。',
                english: 'She is a good teacher.',
                hints: ['职业描述']
            }
        },
        {
            lesson: 12, title: '日常活动', level: 'A2',
            words: [
                { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', chinese: '早晨' },
                { word: 'afternoon', phonetic: '/ˌæftərˈnuːn/', chinese: '下午' },
                { word: 'evening', phonetic: '/ˈiːvnɪŋ/', chinese: '晚上' },
                { word: 'night', phonetic: '/naɪt/', chinese: '夜晚' },
                { word: 'day', phonetic: '/deɪ/', chinese: '天' }
            ],
            sentence: {
                chinese: '我每天早上七点起床。',
                english: 'I get up at seven every morning.',
                hints: ['日常生活']
            }
        },
        {
            lesson: 13, title: '购物', level: 'A2',
            words: [
                { word: 'buy', phonetic: '/baɪ/', chinese: '买' },
                { word: 'sell', phonetic: '/sel/', chinese: '卖' },
                { word: 'money', phonetic: '/ˈmʌni/', chinese: '钱' },
                { word: 'shop', phonetic: '/ʃɑːp/', chinese: '商店' },
                { word: 'price', phonetic: '/praɪs/', chinese: '价格' }
            ],
            sentence: {
                chinese: '这个多少钱？',
                english: 'How much is this?',
                hints: ['询问价格']
            }
        },
        {
            lesson: 14, title: '问路', level: 'A2',
            words: [
                { word: 'where', phonetic: '/wer/', chinese: '哪里' },
                { word: 'here', phonetic: '/hɪr/', chinese: '这里' },
                { word: 'there', phonetic: '/ðer/', chinese: '那里' },
                { word: 'street', phonetic: '/striːt/', chinese: '街道' },
                { word: 'road', phonetic: '/roʊd/', chinese: '路' }
            ],
            sentence: {
                chinese: '厕所在哪里？',
                english: 'Where is the bathroom?',
                hints: ['问路']
            }
        },
        {
            lesson: 15, title: '兴趣爱好', level: 'A2',
            words: [
                { word: 'like', phonetic: '/laɪk/', chinese: '喜欢' },
                { word: 'love', phonetic: '/lʌv/', chinese: '爱' },
                { word: 'hate', phonetic: '/heɪt/', chinese: '讨厌' },
                { word: 'game', phonetic: '/ɡeɪm/', chinese: '游戏' },
                { word: 'music', phonetic: '/ˈmjuːzɪk/', chinese: '音乐' }
            ],
            sentence: {
                chinese: '我喜欢听音乐。',
                english: 'I love listening to music.',
                hints: ['表达爱好']
            }
        }
    ],

    // ========== B1 中级 (示例) ==========
    level_b1: [
        {
            lesson: 21, title: '工作经历', level: 'B1',
            words: [
                { word: 'work', phonetic: '/wɜːrk/', chinese: '工作' },
                { word: 'job', phonetic: '/dʒɑːb/', chinese: '职位' },
                { word: 'career', phonetic: '/kəˈrɪr/', chinese: '事业' },
                { word: 'experience', phonetic: '/ɪkˈspɪriəns/', chinese: '经验' },
                { word: 'company', phonetic: '/ˈkʌmpəni/', chinese: '公司' }
            ],
            sentence: {
                chinese: '我在一家跨国公司工作。',
                english: 'I work for a multinational company.',
                hints: ['职场英语']
            }
        },
        {
            lesson: 22, title: '健康状况', level: 'B1',
            words: [
                { word: 'health', phonetic: '/helθ/', chinese: '健康' },
                { word: 'healthy', phonetic: '/ˈhelθi/', chinese: '健康的' },
                { word: 'exercise', phonetic: '/ˈeksərsaɪz/', chinese: '锻炼' },
                { word: 'medicine', phonetic: '/ˈmedəsɪn/', chinese: '药' },
                { word: 'doctor', phonetic: '/ˈdɑːktər/', chinese: '医生' }
            ],
            sentence: {
                chinese: '保持健康很重要。',
                english: 'It is important to stay healthy.',
                hints: ['健康话题']
            }
        }
    ],

    // ========== B2 中高级 (示例) ==========
    level_b2: [
        {
            lesson: 31, title: '环境问题', level: 'B2',
            words: [
                { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', chinese: '环境' },
                { word: 'pollution', phonetic: '/pəˈluːʃn/', chinese: '污染' },
                { word: 'protect', phonetic: '/prəˈtekt/', chinese: '保护' },
                { word: 'climate', phonetic: '/ˈklaɪmət/', chinese: '气候' },
                { word: 'energy', phonetic: '/ˈenədʒi/', chinese: '能源' }
            ],
            sentence: {
                chinese: '我们应该保护环境。',
                english: 'We should protect our environment.',
                hints: ['环保话题']
            }
        }
    ],

    // ========== C1 高级 (示例) ==========
    level_c1: [
        {
            lesson: 41, title: '经济分析', level: 'C1',
            words: [
                { word: 'economy', phonetic: '/ɪˈkɑːnəmi/', chinese: '经济' },
                { word: 'market', phonetic: '/ˈmɑːrkɪt/', chinese: '市场' },
                { word: 'investment', phonetic: '/ɪnˈvestmənt/', chinese: '投资' },
                { word: 'growth', phonetic: '/ɡroʊθ/', chinese: '增长' },
                { word: 'strategy', phonetic: '/ˈstrætədʒi/', chinese: '战略' }
            ],
            sentence: {
                chinese: '投资策略需要谨慎。',
                english: 'Investment strategy requires caution.',
                hints: ['商务英语']
            }
        }
    ],

    // ========== C2 精通级 (示例) ==========
    level_c2: [
        {
            lesson: 51, title: '学术写作', level: 'C2',
            words: [
                { word: 'analyze', phonetic: '/ˈænəlaɪz/', chinese: '分析' },
                { word: 'hypothesis', phonetic: '/haɪˈpɑːθəsɪs/', chinese: '假设' },
                { word: 'research', phonetic: '/rɪˈsɜːrtʃ/', chinese: '研究' },
                { word: 'conclusion', phonetic: '/kənˈkluːʒn/', chinese: '结论' },
                { word: 'evidence', phonetic: '/ˈevɪdəns/', chinese: '证据' }
            ],
            sentence: {
                chinese: '这项研究的结论很有说服力。',
                english: 'The conclusion of this research is convincing.',
                hints: ['学术英语']
            }
        }
    ]
};

// 导出所有课程数据
const ALL_LESSONS = [
    ...ENGLISH_DB.level_a1,
    ...ENGLISH_DB.level_a2,
    ...ENGLISH_DB.level_b1,
    ...ENGLISH_DB.level_b2,
    ...ENGLISH_DB.level_c1,
    ...ENGLISH_DB.level_c2
];

// 合并所有数据
const COMPLETE_DB = {
    ...ENGLISH_DB,
    allLessons: ALL_LESSONS
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = COMPLETE_DB;
}