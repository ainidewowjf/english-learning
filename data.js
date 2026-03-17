// ============================================
// 完整英语学习知识库 - A1 到 C2 全级别
// 包含：词汇、短语、句子、词根词缀、专项练习、语法详解
// ============================================

var ENGLISH_DB = {
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

    // ========== 专项练习模块 ==========
    special_practices: [
        // 代词专项
        {
            id: 'pronouns_personal',
            title: '人称代词专项',
            category: '代词',
            level: 'A1',
            description: '区分 I, you, he, she, it, we, they 的用法',
            items: [
                { 
                    question: '___ am a student (我是一名学生)',
                    answer: 'I',
                    explanation: '第一人称单数主语用"I"，be 动词用"am"',
                    grammar_point: '主格代词 - I 用于说话者自己作主语'
                },
                { 
                    question: '___ are my friend (你是我的朋友)',
                    answer: 'You',
                    explanation: '第二人称用"You"，be 动词用"are"',
                    grammar_point: '主格代词 - You 用于对话中的对方'
                },
                { 
                    question: '___ is a boy (他是一个男孩)',
                    answer: 'He',
                    explanation: '第三人称单数男性用"He"，be 动词用"is"',
                    grammar_point: '主格代词 - He 指代男性第三人称'
                },
                { 
                    question: '___ is a girl (她是一个女孩)',
                    answer: 'She',
                    explanation: '第三人称单数女性用"She"，be 动词用"is"',
                    grammar_point: '主格代词 - She 指代女性第三人称'
                },
                { 
                    question: '___ is a cat (它是一只猫)',
                    answer: 'It',
                    explanation: '第三人称单数动物/物品用"It"',
                    grammar_point: '主格代词 - It 指代无生命物体或动物'
                },
                { 
                    question: '___ are students (我们是学生)',
                    answer: 'We',
                    explanation: '第一人称复数用"We"，be 动词用"are"',
                    grammar_point: '主格代词 - We 指包括说话者在内的多人'
                },
                { 
                    question: '___ are teachers (他们是老师)',
                    answer: 'They',
                    explanation: '第三人称复数用"They"，be 动词用"are"',
                    grammar_point: '主格代词 - They 指代多个第三方'
                }
            ]
        },
        {
            id: 'pronouns_object',
            title: '宾格代词专项',
            category: '代词',
            level: 'A1',
            description: '区分 me, you, him, her, it, us, them 的用法',
            items: [
                { 
                    question: 'She loves ___ (她爱我)',
                    answer: 'me',
                    explanation: '宾语位置用宾格"me"',
                    grammar_point: '宾格代词 - me 是 I 的宾格形式，作动词或介词的宾语'
                },
                { 
                    question: 'I call ___ every day (我每天给他打电话)',
                    answer: 'him',
                    explanation: '宾语位置用宾格"him"',
                    grammar_point: '宾格代词 - him 是 he 的宾格形式'
                },
                { 
                    question: 'This gift is for ___ (这个礼物是给她的)',
                    answer: 'her',
                    explanation: '介词 for 后用宾格"her"',
                    grammar_point: '宾格代词 - her 是 she 的宾格形式'
                },
                { 
                    question: 'Please help ___ (请帮助我们)',
                    answer: 'us',
                    explanation: '宾语位置用宾格"us"',
                    grammar_point: '宾格代词 - us 是 we 的宾格形式'
                },
                { 
                    question: 'I don't know ___ (我不认识他们)',
                    answer: 'them',
                    explanation: '宾语位置用宾格"them"',
                    grammar_point: '宾格代词 - them 是 they 的宾格形式'
                }
            ]
        },
        // 单复数专项
        {
            id: 'plural_forms',
            title: '名词单复数专项',
            category: '名词',
            level: 'A1',
            description: '掌握可数名词的单复数变化规则',
            items: [
                { 
                    question: 'one apple, two ___ (一个苹果，两个苹果)',
                    answer: 'apples',
                    explanation: '一般名词加 s 变复数',
                    grammar_point: '名词复数规则 1: 大多数名词直接加-s'
                },
                { 
                    question: 'one box, three ___ (一个盒子，三个盒子)',
                    answer: 'boxes',
                    explanation: '以 x, s, sh, ch 结尾加 es',
                    grammar_point: '名词复数规则 2: 以 x, s, sh, ch 结尾的名词加-es'
                },
                { 
                    question: 'one baby, many ___ (一个婴儿，许多婴儿)',
                    answer: 'babies',
                    explanation: '辅音+y 结尾，变 y 为 i 再加 es',
                    grammar_point: '名词复数规则 3: 辅音字母+y 结尾，变 y 为 i 再加-es'
                },
                { 
                    question: 'one man, two ___ (一个男人，两个男人)',
                    answer: 'men',
                    explanation: '不规则变化，man→men',
                    grammar_point: '不规则复数：man→men, woman→women'
                },
                { 
                    question: 'one child, five ___ (一个孩子，五个孩子)',
                    answer: 'children',
                    explanation: '不规则变化，child→children',
                    grammar_point: '不规则复数：child→children'
                }
            ]
        },
        // 动词时态专项
        {
            id: 'tenses_present',
            title: '一般现在时专项',
            category: '动词时态',
            level: 'A1',
            description: '掌握一般现在时的用法和第三人称单数变化',
            items: [
                { 
                    question: 'I ___ (play/plays) football every day',
                    answer: 'play',
                    explanation: '第一人称用动词原形',
                    grammar_point: '一般现在时 - 主语是 I/you/we/they 时用动词原形'
                },
                { 
                    question: 'He ___ (play/plays) football every day',
                    answer: 'plays',
                    explanation: '第三人称单数要加 s',
                    grammar_point: '一般现在时 - 主语是 he/she/it 时动词加-s/-es'
                },
                { 
                    question: 'She ___ (go/goes) to school by bus',
                    answer: 'goes',
                    explanation: 'go 的第三人称单数加 es',
                    grammar_point: '一般现在时 - go/watch/teach 等加-es'
                },
                { 
                    question: 'Tom ___ (study/studies) hard',
                    answer: 'studies',
                    explanation: '辅音+y 结尾，变 y 为 i 再加 es',
                    grammar_point: '一般现在时 - 辅音+y 结尾的动词变 y 为 i 再加-es'
                }
            ]
        },
        {
            id: 'tenses_progressive',
            title: '现在进行时专项',
            category: '动词时态',
            level: 'A1',
            description: '掌握 be + doing 的结构',
            items: [
                { 
                    question: 'I ___ (read) a book now',
                    answer: 'am reading',
                    explanation: '现在进行时需要 be(am/is/are) + doing',
                    grammar_point: '现在进行时 - am/is/are + 动词-ing 表示正在进行的动作'
                },
                { 
                    question: 'She ___ (watch) TV at the moment',
                    answer: 'is watching',
                    explanation: '第三人称单数用 is + doing',
                    grammar_point: '现在进行时 - she/he/it 用 is + verb-ing'
                },
                { 
                    question: 'They ___ (play) basketball now',
                    answer: 'are playing',
                    explanation: '复数主语用 are + doing',
                    grammar_point: '现在进行时 - they/we/you 用 are + verb-ing'
                },
                { 
                    question: 'Look! The dog ___ (run) fast',
                    answer: 'is running',
                    explanation: '双写 r 再加 ing',
                    grammar_point: '动词-ing 变化 - 重读闭音节双写末尾辅音字母'
                }
            ]
        },
        // 冠词专项
        {
            id: 'articles',
            title: '冠词使用专项',
            category: '冠词',
            level: 'A1',
            description: '掌握 a, an, the 的正确使用',
            items: [
                { 
                    question: 'I have ___ apple (我有一个苹果)',
                    answer: 'an',
                    explanation: '元音开头的单词前用 an',
                    grammar_point: '不定冠词 - a/an 用于泛指，an 用在元音音素前'
                },
                { 
                    question: 'She is ___ teacher (她是一名老师)',
                    answer: 'a',
                    explanation: '辅音开头的单词前用 a',
                    grammar_point: '不定冠词 - a 用在辅音音素前，表示'一个''
                },
                { 
                    question: '___ sun is bright (太阳很亮)',
                    answer: 'The',
                    explanation: '独一无二的事物用 the',
                    grammar_point: '定冠词 - the 用于特指，如世间独一无二的事物'
                },
                { 
                    question: 'He is ___ engineer (他是一名工程师)',
                    answer: 'an',
                    explanation: 'engineer 发音以元音开头',
                    grammar_point: '注意：用 a 还是 an 取决于发音而非拼写'
                }
            ]
        },
        // there be 句型专项
        {
            id: 'there_be',
            title: 'There Be 句型专项',
            category: '句型',
            level: 'A1',
            description: '掌握 There is / There are 的使用',
            items: [
                { 
                    question: '___ a book on the table (桌子上有一本书)',
                    answer: 'There is',
                    explanation: '单数名词用 There is',
                    grammar_point: 'There be 句型 - 单数/不可数名词用 is，复数用 are'
                },
                { 
                    question: '___ many students in the classroom (教室里有很多学生)',
                    answer: 'There are',
                    explanation: '复数名词用 There are',
                    grammar_point: 'There be 句型 - 就近原则：be 动词与最近的名词一致'
                },
                { 
                    question: '___ some water in the bottle (瓶子里有一些水)',
                    answer: 'There is',
                    explanation: '不可数名词用 There is',
                    grammar_point: 'There be 句型 - 不可数名词视为单数'
                },
                { 
                    question: '___ a pen and two pencils (一支钢笔和两支铅笔)',
                    answer: 'There is',
                    explanation: '就近原则，第一个名词是单数',
                    grammar_point: 'There be 句型 - 并列主语时遵循就近原则'
                }
            ]
        }
    ],

    // ========== 语法详解模块 ==========
    grammar_guide: [
        {
            id: 'g01',
            title: '主谓一致',
            category: '基本语法',
            level: 'A1',
            summary: '主语和谓语必须在单复数上保持一致',
            rules: [
                {
                    rule: '主语是 I → 谓语用 am/do/have',
                    example: 'I am a student. I do my homework. I have a pen.',
                    practice_sentence: 'I ___ (be) a teacher.',
                    practice_answer: 'am'
                },
                {
                    rule: '主语是 you/we/they → 谓语用 are/do/have',
                    example: 'You are great. We do exercise. They have time.',
                    practice_sentence: 'They ___ (have) many books.',
                    practice_answer: 'have'
                },
                {
                    rule: '主语是 he/she/it → 谓语用 is/does/has (+s/es)',
                    example: 'She is happy. He does well. It has legs.',
                    practice_sentence: 'My mother ___ (work) every day.',
                    practice_answer: 'works'
                }
            ],
            common_mistakes: [
                '✗ He like apples → ✓ He likes apples',
                '✗ She go to school → ✓ She goes to school',
                '✗ My father watch TV → ✓ My father watches TV'
            ],
            exercises: [
                { q: 'She ___ (like) music', a: 'likes', exp: '第三人称单数加-s' },
                { q: 'Tom ___ (not/play) soccer', a: 'does not play/doesn\\'t play', exp: '否定句用 does not + 动词原形' },
                { q: 'What ___ she ___ (do)?', a: 'does/do', exp: '疑问句用助动词 does + 动词原形' }
            ]
        },
        {
            id: 'g02',
            title: '一般过去时',
            category: '时态',
            level: 'A1',
            summary: '描述过去发生的动作或状态',
            rules: [
                {
                    rule: '规则动词：动词 + ed',
                    example: 'work→worked, play→played, watch→watched',
                    practice_sentence: 'Yesterday I ___ (visit) my friend.',
                    practice_answer: 'visited'
                },
                {
                    rule: '不规则动词需记忆',
                    example: 'go→went, eat→ate, see→saw, have→had',
                    practice_sentence: 'Last week I ___ (go) to Beijing.',
                    practice_answer: 'went'
                },
                {
                    rule: 'be 动词过去式：was/were',
                    example: 'I/he/she/it → was; you/we/they → were',
                    practice_sentence: 'She ___ (be) at home yesterday.',
                    practice_answer: 'was'
                }
            ],
            common_mistakes: [
                '✗ I goed to school → ✓ I went to school',
                '✗ She eated lunch → ✓ She ate lunch',
                '✗ They was happy → ✓ They were happy'
            ],
            exercises: [
                { q: 'I ___ (see) a movie last night', a: 'saw', exp: 'see 的过去式是不规则的 saw' },
                { q: 'He ___ (not/watch) TV yesterday', a: 'did not watch/didn\\'t watch', exp: '过去时否定用 did not + 动词原形' },
                { q: '___ you ___ (be) at school?', a: 'Were/you', exp: 'be 动词过去时的疑问句' }
            ]
        },
        {
            id: 'g03',
            title: '现在进行时',
            category: '时态',
            level: 'A1',
            summary: '描述此刻正在进行的动作',
            structure: 'am/is/are + 动词-ing',
            rules: [
                {
                    rule: '动词-ing 的基本规则：直接加 ing',
                    example: 'work→working, play→playing, read→reading',
                    practice_sentence: 'I ___ (read) a book now.',
                    practice_answer: 'am reading'
                },
                {
                    rule: '不发音的 e 结尾：去 e 加 ing',
                    example: 'make→making, write→writing, take→taking',
                    practice_sentence: 'She is ___ (write) a letter.',
                    practice_answer: 'writing'
                },
                {
                    rule: '重读闭音节：双写末尾辅音加 ing',
                    example: 'run→running, sit→sitting, swim→swimming',
                    practice_sentence: 'They are ___ (run).',
                    practice_answer: 'running'
                }
            ],
            common_mistakes: [
                '✗ I working now → ✓ I am working now (缺少 be 动词)',
                '✗ She is make dinner → ✓ She is making dinner (动词未加 ing)',
                '✗ They are runs → ✓ They are running (结构错误)'
            ],
            exercises: [
                { q: 'Look! It ___ (rain)', a: 'is raining', exp: '此刻正在发生用现在进行时' },
                { q: 'What ___ you ___ (do)?', a: 'are/doing', exp: '特殊疑问句结构' },
                { q: 'He ___ (not/sleep) now', a: 'is not sleeping/isn\\'t sleeping', exp: '否定形式在 be 后加 not' }
            ]
        },
        {
            id: 'g04',
            title: '一般将来时',
            category: '时态',
            level: 'A2',
            summary: '描述将要发生的动作',
            structure: 'will + 动词原形 / be going to + 动词原形',
            rules: [
                {
                    rule: 'will + 动词原形：临时决定或预测',
                    example: 'I will help you. It will rain tomorrow.',
                    practice_sentence: 'I think it ___ (be) sunny tomorrow.',
                    practice_answer: 'will be'
                },
                {
                    rule: 'be going to + 动词原形：已有计划',
                    example: 'I am going to visit my grandma. She is going to study.',
                    practice_sentence: 'We ___ (travel) to Japan next month.',
                    practice_answer: 'are going to travel'
                }
            ],
            common_mistakes: [
                '✗ I will to go → ✓ I will go (will 后不加 to)',
                '✗ She going to eat → ✓ She is going to eat (缺少 be)',
                '✗ They will eats → ✓ They will eat (will 后用原形)'
            ],
            exercises: [
                { q: 'I promise I ___ (call) you', a: 'will call', exp: '承诺用 will' },
                { q: 'Look at the clouds! It ___ (rain)', a: 'is going to rain', exp: '根据迹象预测用 be going to' },
                { q: 'She ___ (not/come) to the party', a: 'will not come/won\\'t come', exp: '将来时否定' }
            ]
        },
        {
            id: 'g05',
            title: '情态动词',
            category: '情态动词',
            level: 'A2',
            summary: 'can, could, may, might, must, should 等的用法',
            rules: [
                {
                    rule: 'can/could: 能力和请求',
                    example: 'I can swim. Can you help me? Could you pass the salt?',
                    grammar_explanation': 'can 表能力或较随意的请求；could 更礼貌'
                },
                {
                    rule: 'must: 必须',
                    example: 'You must wear a seatbelt. Students must listen.',
                    grammar_explanation': 'must 表示强制或强烈建议，否定是 must not'
                },
                {
                    rule: 'should: 应该',
                    example: 'You should study harder. He should see a doctor.',
                    grammar_explanation': 'should 给出建议，语气比 must 温和'
                },
                {
                    rule: 'may/might: 可能',
                    example: 'It may rain. She might come later.',
                    grammar_explanation': 'might 比 may 可能性更小'
                }
            ],
            common_mistakes: [
                '✗ I can to swim → ✓ I can swim (情态动词后不加 to)',
                '✗ You must to go → ✓ You must go',
                '✗ She cans swim → ✓ She can swim (can 无第三人称变化)'
            ],
            exercises: [
                { q: '___ you speak English?', a: 'Can', exp: '询问能力用 Can' },
                { q: 'You ___ wear a helmet (规定)', a: 'must', exp: '强制性规定用 must' },
                { q: 'You ___ smoke here (禁止)', a: 'must not/mustn\\'t', exp: '禁止用 must not' }
            ]
        },
        {
            id: 'g06',
            title: '比较级和最高级',
            category: '形容词',
            level: 'B1',
            summary: '形容词的比较和最高形式',
            rules: [
                {
                    rule: '单音节词：-er / -est',
                    example: 'tall→taller→tallest, fast→faster→fastest',
                    practice_sentence: 'This book is ___ (good) than that one.'
                },
                {
                    rule: '以 y 结尾：变 y 为 i + -er/-est',
                    example: 'happy→happier→happiest, busy→busier→busiest',
                    practice_sentence: 'She is the ___ (happy) person I know.'
                },
                {
                    rule: '多音节词：more / most + 形容词',
                    example: 'beautiful→more beautiful→most beautiful',
                    practice_sentence: 'This is the ___ (interesting) movie ever.'
                },
                {
                    rule: '不规则变化',
                    example: 'good→better→best, bad→worse→worst, far→farther→farthest',
                    practice_sentence: 'Of all, he runs the ___ (fast).'
                }
            ],
            common_mistakes: [
                '✗ more better → ✓ better (双重比较错误)',
                '✗ most best → ✓ best',
                '✗ more tall → ✓ taller'
            ],
            exercises: [
                { q: 'This car is ___ (expensive) than mine', a: 'more expensive', exp: '多音节用 more' },
                { q: 'He is the ___ (tall) in our class', a: 'tallest', exp: '三者以上比较用最高级' },
                { q: 'Nothing is ___ (important) than health', a: 'more important', exp: '比较级+than 结构' }
            ]
        }
    ],

    // ========== 常规课程 (A1-C2) ==========
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

    // ========== A2 初级 ==========
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

    // ========== B1 中级 ==========
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

    // ========== B2 中高级 ==========
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

    // ========== C1 高级 ==========
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

    // ========== C2 精通级 ==========
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

// 合并所有课程数据
const ALL_LESSONS = [
    ...ENGLISH_DB.level_a1,
    ...ENGLISH_DB.level_a2,
    ...ENGLISH_DB.level_b1,
    ...ENGLISH_DB.level_b2,
    ...ENGLISH_DB.level_c1,
    ...ENGLISH_DB.level_c2
];

// 导出完整数据库到全局
window.COMPLETE_DB = {
    ...ENGLISH_DB,
    allLessons: ALL_LESSONS
};

// 确保 ENGLISH_DB 全局可访问
if (typeof window !== 'undefined') {
    window.ENGLISH_DB = ENGLISH_DB;
}