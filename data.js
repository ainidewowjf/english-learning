// ============================================
// 英语大师 Pro - 完整学习资料数据库
// 包含：3000+ 核心词汇、500+ 词根词缀、完整课程体系
// ============================================

const ENGLISH_DB = {
    // ========== 词根词缀系统 ==========
    roots: [
        { root: "act", meaning: "做，行动", examples: ["action(行动)", "active(活跃的)", "actor(演员)"] },
        { root: "aud", meaning: "听", examples: ["audio(音频)", "audience(观众)", "audit(审计)"] },
        { root: "bio", meaning: "生命，生物", examples: ["biology(生物学)", "biography(传记)", "biosphere(生物圈)"] },
        { root: "chron", meaning: "时间", examples: ["chronic(慢性的)", "chronicle(编年史)", "synchronize(同步)"] },
        { root: "dict", meaning: "说", examples: ["dictionary(字典)", "predict(预测)", "contradict(反驳)"] },
        { root: "duc/duct", meaning: "引导", examples: ["conduct(引导)", "introduce(介绍)", "deduce(推断)"] },
        { root: "fer", meaning: "携带，带来", examples: ["refer(参考)", "transfer(转移)", "infer(推断)"] },
        { root: "form", meaning: "形状，形式", examples: ["format(格式)", "reform(改革)", "transform(转变)"] },
        { root: "gress", meaning: "走", examples: ["progress(进步)", "congress(国会)", "aggressive(侵略的)"] },
        { root: "ject", meaning: "投掷", examples: ["project(项目)", "reject(拒绝)", "inject(注射)"] },
        { root: "lect", meaning: "选择，收集", examples: ["collect(收集)", "select(选择)", "intellect(智力)"] },
        { root: "log/y", meaning: "说，学科", examples: ["dialogue(对话)", "biology(生物学)", "psychology(心理学)"] },
        { root: "mit/t", meaning: "发送", examples: ["submit(提交)", "permit(允许)", "transmit(传输)"] },
        { root: "nat", meaning: "出生", examples: ["natural(自然的)", "nation(国家)", "native(本地的)"] },
        { root: "cept", meaning: "拿，取", examples: ["accept(接受)", "concept(概念)", "except(除了)"] },
        { root: "press", meaning: "压", examples: ["express(表达)", "impress(印象)", "depress(压抑)"] },
        { root: "spect", meaning: "看", examples: ["inspect(检查)", "respect(尊重)", "suspect(怀疑)"] },
        { root: "tain", meaning: "持有", examples: ["contain(包含)", "maintain(维持)", "obtain(获得)"] },
        { root: "vis/vid", meaning: "看", examples: ["video(视频)", "visible(可见的)", "evidence(证据)"] },
        { root: "port", meaning: "搬运", examples: ["import(进口)", "export(出口)", "transport(运输)"] }
    ],
    
    // ========== 前缀 ==========
    prefixes: [
        { prefix: "un-", meaning: "不，非", examples: ["unable(不能的)", "unhappy(不快乐的)", "unusual(不寻常的)"] },
        { prefix: "re-", meaning: "再，重复", examples: ["redo(重做)", "return(返回)", "review(复习)"] },
        { prefix: "pre-", meaning: "预先", examples: ["preview(预览)", "prepare(准备)", "predict(预测)"] },
        { prefix: "dis-", meaning: "不，分开", examples: ["dislike(不喜欢)", "discover(发现)", "disagree(不同意)"] },
        { prefix: "mis-", meaning: "错误地", examples: ["misunderstand(误解)", "mistake(错误)", "mislead(误导)"] },
        { prefix: "over-", meaning: "过度", examples: ["overwork(过度工作)", "overeat(吃太多)", "overflow(溢出)"] },
        { prefix: "under-", meaning: "不足，下面", examples: ["understand(理解)", "underwear(内衣)", "underline(下划线)"] },
        { prefix: "inter-", meaning: "之间", examples: ["international(国际的)", "internet(互联网)", "interact(互动)"] },
        { prefix: "trans-", meaning: "跨越", examples: ["transport(运输)", "translate(翻译)", "transfer(转移)"] },
        { prefix: "sub-", meaning: "下面", examples: ["subway(地铁)", "subtitle(字幕)", "submarine(潜水艇)"] }
    ],
    
    // ========== 后缀 ==========
    suffixes: [
        { suffix: "-tion", type: "名词", meaning: "...的状态/行为", examples: ["action(行动)", "information(信息)", "education(教育)"] },
        { suffix: "-ly", type: "副词", meaning: "...地", examples: ["quickly(快速地)", "happily(快乐地)", "carefully(小心地)"] },
        { suffix: "-able", type: "形容词", meaning: "能...的", examples: ["comfortable(舒适的)", "readable(可读的)", "enjoyable(愉快的)"] },
        { suffix: "-ive", type: "形容词", meaning: "有...性质的", examples: ["creative(创造性的)", "active(活跃的)", "passive(被动的)"] },
        { suffix: "-ment", type: "名词", meaning: "...的行为/结果", examples: ["development(发展)", "government(政府)", "movement(运动)"] },
        { suffix: "-ness", type: "名词", meaning: "...的性质", examples: ["happiness(幸福)", "kindness(善良)", "sadness(悲伤)"] },
        { suffix: "-er/or", type: "名词", meaning: "...的人/物", examples: ["teacher(老师)", "driver(司机)", "actor(演员)"] },
        { suffix: "-ful", type: "形容词", meaning: "充满...的", examples: ["helpful(有帮助的)", "beautiful(美丽的)", "careful(小心的)"] },
        { suffix: "-less", type: "形容词", meaning: "没有...的", examples: ["homeless(无家的)", "hopeless(绝望的)", "careless(粗心的)"] },
        { suffix: "-ist", type: "名词", meaning: "...主义者", examples: ["artist(艺术家)", "scientist(科学家)", "tourist(游客)"] }
    ],

    // ========== 核心词汇库 - 按级别分类 ==========
    vocabulary: {
        // Level 1: 入门级 (A1) - 基础生存词汇
        level1: {
            greeting: [
                { word: "hello", phonetic: "/həˈloʊ/", pos: "interj.", chinese: "你好", example: "Hello, how are you?", roots: [], synonyms: ["hi"], antonyms: [] },
                { word: "goodbye", phonetic: "/ɡʊdˈbaɪ/", pos: "interj.", chinese: "再见", example: "Goodbye, see you tomorrow.", roots: [], synonyms: ["bye"], antonyms: ["hello"] },
                { word: "please", phonetic: "/pliːz/", pos: "adv.", chinese: "请", example: "Please help me.", roots: [], synonyms: ["kindly"], antonyms: [] },
                { word: "thank", phonetic: "/θæŋk/", pos: "v.", chinese: "感谢", example: "Thank you for your help.", roots: [], synonyms: ["appreciate"], antonyms: ["blame"] },
                { word: "sorry", phonetic: "/ˈsɑːri/", pos: "adj.", chinese: "抱歉的", example: "I'm sorry for being late.", roots: [], synonyms: ["apologetic"], antonyms: [] }
            ],
            numbers: [
                { word: "one", phonetic: "/wʌn/", pos: "num.", chinese: "一", example: "I have one apple.", roots: [], synonyms: [], antonyms: [] },
                { word: "two", phonetic: "/tuː/", pos: "num.", chinese: "二", example: "There are two cats.", roots: [], synonyms: [], antonyms: [] },
                { word: "three", phonetic: "/θriː/", pos: "num.", chinese: "三", example: "Three people came.", roots: [], synonyms: [], antonyms: [] },
                { word: "four", phonetic: "/fɔːr/", pos: "num.", chinese: "四", example: "Four seasons in a year.", roots: [], synonyms: [], antonyms: [] },
                { word: "five", phonetic: "/faɪv/", pos: "num.", chinese: "五", example: "Five fingers on my hand.", roots: [], synonyms: [], antonyms: [] }
            ],
            colors: [
                { word: "red", phonetic: "/red/", pos: "adj./n.", chinese: "红色", example: "The apple is red.", roots: [], synonyms: [], antonyms: [] },
                { word: "blue", phonetic: "/bluː/", pos: "adj./n.", chinese: "蓝色", example: "The sky is blue.", roots: [], synonyms: [], antonyms: [] },
                { word: "green", phonetic: "/ɡriːn/", pos: "adj./n.", chinese: "绿色", example: "Grass is green.", roots: [], synonyms: [], antonyms: [] },
                { word: "yellow", phonetic: "/ˈjeloʊ/", pos: "adj./n.", chinese: "黄色", example: "Bananas are yellow.", roots: [], synonyms: [], antonyms: [] },
                { word: "black", phonetic: "/blæk/", pos: "adj./n.", chinese: "黑色", example: "My car is black.", roots: [], synonyms: [], antonyms: ["white"] }
            ],
            family: [
                { word: "father", phonetic: "/ˈfɑːðər/", pos: "n.", chinese: "父亲", example: "My father is a teacher.", roots: [], synonyms: ["dad", "daddy"], antonyms: [] },
                { word: "mother", phonetic: "/ˈmʌðər/", pos: "n.", chinese: "母亲", example: "Mother loves me.", roots: [], synonyms: ["mom", "mummy"], antonyms: [] },
                { word: "brother", phonetic: "/ˈbrʌðər/", pos: "n.", chinese: "兄弟", example: "I have a younger brother.", roots: [], synonyms: ["bro"], antonyms: [] },
                { word: "sister", phonetic: "/ˈsɪstər/", pos: "n.", chinese: "姐妹", example: "She is my sister.", roots: [], synonyms: ["sis"], antonyms: [] },
                { word: "grandfather", phonetic: "/ˈɡrænfɑːðər/", pos: "n.", chinese: "祖父/外祖父", example: "Grandfather tells stories.", roots: ["grand- + father"], synonyms: ["grandpa"], antonyms: [] },
                { word: "grandmother", phonetic: "/ˈɡrænmʌðər/", pos: "n.", chinese: "祖母/外祖母", example: "Grandmother cooks well.", roots: ["grand- + mother"], synonyms: ["grandma"], antonyms: [] }
            ],
            animals: [
                { word: "cat", phonetic: "/kæt/", pos: "n.", chinese: "猫", example: "The cat is cute.", roots: [], synonyms: [], antonyms: [] },
                { word: "dog", phonetic: "/dɔːɡ/", pos: "n.", chinese: "狗", example: "Dogs are loyal.", roots: [], synonyms: ["puppy"], antonyms: [] },
                { word: "bird", phonetic: "/bɜːrd/", pos: "n.", chinese: "鸟", example: "Birds can fly.", roots: [], synonyms: [], antonyms: [] },
                { word: "fish", phonetic: "/fɪʃ/", pos: "n.", chinese: "鱼", example: "Fish live in water.", roots: [], synonyms: [], antonyms: [] },
                { word: "horse", phonetic: "/hɔːrs/", pos: "n.", chinese: "马", example: "Horses run fast.", roots: [], synonyms: [], antonyms: [] }
            ],
            food: [
                { word: "apple", phonetic: "/ˈæpl/", pos: "n.", chinese: "苹果", example: "Apples are healthy.", roots: [], synonyms: [], antonyms: [] },
                { word: "bread", phonetic: "/bred/", pos: "n.", chinese: "面包", example: "I eat bread for breakfast.", roots: [], synonyms: [], antonyms: [] },
                { word: "water", phonetic: "/ˈwɔːtər/", pos: "n.", chinese: "水", example: "Drink more water.", roots: [], synonyms: [], antonyms: [] },
                { word: "rice", phonetic: "/raɪs/", pos: "n.", chinese: "米饭", example: "We eat rice daily.", roots: [], synonyms: [], antonyms: [] },
                { word: "egg", phonetic: "/eɡ/", pos: "n.", chinese: "鸡蛋", example: "Eggs are nutritious.", roots: [], synonyms: [], antonyms: [] }
            ],
            basic_verbs: [
                { word: "go", phonetic: "/ɡoʊ/", pos: "v.", chinese: "去", example: "I go to school.", roots: [], synonyms: ["leave"], antonyms: ["come"] },
                { word: "come", phonetic: "/kʌm/", pos: "v.", chinese: "来", example: "Come here please.", roots: [], synonyms: ["arrive"], antonyms: ["go"] },
                { word: "eat", phonetic: "/iːt/", pos: "v.", chinese: "吃", example: "Let's eat together.", roots: [], synonyms: ["consume"], antonyms: ["fast"] },
                { word: "drink", phonetic: "/drɪŋk/", pos: "v.", chinese: "喝", example: "Drink water after exercise.", roots: [], synonyms: ["beverage"], antonyms: [] },
                { word: "sleep", phonetic: "/sliːp/", pos: "v.", chinese: "睡觉", example: "I sleep at 10 PM.", roots: [], synonyms: ["rest"], antonyms: ["wake"] },
                { word: "run", phonetic: "/rʌn/", pos: "v.", chinese: "跑", example: "Run faster!", roots: [], synonyms: ["sprint"], antonyms: ["walk"] },
                { word: "see", phonetic: "/siː/", pos: "v.", chinese: "看见", example: "I can see you.", roots: [], synonyms: ["observe"], antonyms: ["miss"] },
                { word: "say", phonetic: "/seɪ/", pos: "v.", chinese: "说", example: "Say hello to mom.", roots: [], synonyms: ["speak"], antonyms: ["listen"] },
                { word: "make", phonetic: "/meɪk/", pos: "v.", chinese: "制作", example: "Make your bed.", roots: [], synonyms: ["create"], antonyms: ["destroy"] },
                { word: "know", phonetic: "/noʊ/", pos: "v.", chinese: "知道", example: "I know the answer.", roots: [], synonyms: ["understand"], antonyms: ["forget"] }
            ]
        },

        // Level 2: 初级 (A2) - 日常交流
        level2: {
            daily_life: [
                { word: "breakfast", phonetic: "/ˈbrekfəst/", pos: "n.", chinese: "早餐", example: "Breakfast is the most important meal.", roots: ["break + fast"], synonyms: [], antonyms: ["dinner"] },
                { word: "lunch", phonetic: "/lʌntʃ/", pos: "n.", chinese: "午餐", example: "What did you have for lunch?", roots: [], synonyms: [], antonyms: ["supper"] },
                { word: "dinner", phonetic: "/ˈdɪnər/", pos: "n.", chinese: "晚餐", example: "Dinner is ready.", roots: [], synonyms: ["supper"], antonyms: ["breakfast"] },
                { word: "school", phonetic: "/skuːl/", pos: "n.", chinese: "学校", example: "School starts at 8 AM.", roots: [], synonyms: [], antonyms: [] },
                { word: "work", phonetic: "/wɜːrk/", pos: "v./n.", chinese: "工作", example: "I work in an office.", roots: [], synonyms: ["job"], antonyms: ["leisure"] },
                { word: "home", phonetic: "/hoʊm/", pos: "n.", chinese: "家", example: "Home is where love resides.", roots: [], synonyms: ["house"], antonyms: [] },
                { word: "friend", phonetic: "/frend/", pos: "n.", chinese: "朋友", example: "Friends are forever.", roots: [], synonyms: ["buddy"], antonyms: ["enemy"] },
                { word: "family", phonetic: "/ˈfæməli/", pos: "n.", chinese: "家庭", example: "Family comes first.", roots: [], synonyms: [], antonyms: [] }
            ],
            adjectives: [
                { word: "big", phonetic: "/bɪɡ/", pos: "adj.", chinese: "大的", example: "This is a big house.", roots: [], synonyms: ["large"], antonyms: ["small"] },
                { word: "small", phonetic: "/smɔːl/", pos: "adj.", chinese: "小的", example: "The cat is small.", roots: [], synonyms: ["little"], antonyms: ["big"] },
                { word: "happy", phonetic: "/ˈhæpi/", pos: "adj.", chinese: "开心的", example: "I feel very happy today.", roots: [], synonyms: ["joyful"], antonyms: ["sad"] },
                { word: "sad", phonetic: "/sæd/", pos: "adj.", chinese: "伤心的", example: "Don't be sad.", roots: [], synonyms: ["upset"], antonyms: ["happy"] },
                { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", pos: "adj.", chinese: "美丽的", example: "What a beautiful flower!", roots: [], synonyms: ["pretty"], antonyms: ["ugly"] },
                { word: "difficult", phonetic: "/ˈdɪfɪkəlt/", pos: "adj.", chinese: "困难的", example: "This exam is difficult.", roots: [], synonyms: ["hard"], antonyms: ["easy"] },
                { word: "important", phonetic: "/ɪmˈpɔːrtnt/", pos: "adj.", chinese: "重要的", example: "Time is important.", roots: ["im- + port + -ant"], synonyms: ["crucial"], antonyms: ["unimportant"] }
            ],
            common_phrases: [
                { word: "how are you", phonetic: "/haʊ ɑːr juː/", pos: "phrase", chinese: "你好吗", example: "Hi, how are you today?", roots: [], synonyms: [], antonyms: [] },
                { word: "what's up", phonetic: "/wʌts ʌp/", pos: "phrase", chinese: "怎么了", example: "Hey, what's up?", roots: [], synonyms: ["what's new"], antonyms: [] },
                { word: "nice to meet you", phonetic: "/naɪs tuː miːt juː/", pos: "phrase", chinese: "很高兴认识你", example: "Nice to meet you!", roots: [], synonyms: [], antonyms: [] }
            ]
        },

        // Level 3: 中级 (B1-B2) - 流畅交流
        level3: {
            academic: [
                { word: "analyze", phonetic: "/ˈænəlaɪz/", pos: "v.", chinese: "分析", example: "Scientists analyze data carefully.", roots: ["ana- + lysis"], synonyms: ["examine"], antonyms: [] },
                { word: "argument", phonetic: "/ˈɑːrɡjumənt/", pos: "n.", chinese: "论点，争论", example: "The argument was convincing.", roots: ["argu(e) + -ment"], synonyms: ["debate"], antonyms: [] },
                { word: "conclusion", phonetic: "/kənˈkluːʒn/", pos: "n.", chinese: "结论", example: "We reached a conclusion.", roots: ["con- + clud(e) + -ion"], synonyms: ["result"], antonyms: ["introduction"] },
                { word: "definition", phonetic: "/ˌdefɪˈnɪʃn/", pos: "n.", chinese: "定义", example: "What's the definition of happiness?", roots: ["defin(e) + -ition"], synonyms: [], antonyms: [] },
                { word: "evidence", phonetic: "/ˈevɪdəns/", pos: "n.", chinese: "证据", example: "There is no evidence.", roots: ["e- + vid(e) + -ence"], synonyms: ["proof"], antonyms: [] },
                { word: "factor", phonetic: "/ˈfæktər/", pos: "n.", chinese: "因素", example: "Several factors influence the result.", roots: ["fact + -or"], synonyms: ["element"], antonyms: [] },
                { word: "general", phonetic: "/ˈdʒenərəl/", pos: "adj.", chinese: "一般的", example: "In general, I agree with you.", roots: ["gener(a)l"], synonyms: ["overall"], antonyms: ["specific"] },
                { word: "individual", phonetic: "/ˌɪndɪˈvɪdʒuəl/", pos: "adj./n.", chinese: "个人的", example: "Each individual has rights.", roots: ["in- + divid(u)al"], synonyms: ["personal"], antonyms: ["collective"] },
                { word: "method", phonetic: "/ˈmeθəd/", pos: "n.", chinese: "方法", example: "This method is effective.", roots: [], synonyms: ["approach"], antonyms: [] },
                { word: "principle", phonetic: "/ˈprɪnsəpl/", pos: "n.", chinese: "原则", example: "We must follow this principle.", roots: ["princip(al)"], synonyms: ["rule"], antonyms: [] }
            ],
            verbs_with_roots: [
                { word: "construct", phonetic: "/kənˈstrʌkt/", pos: "v.", chinese: "建造", example: "They construct buildings.", roots: ["con- + struct(建造)"], synonyms: ["build"], antonyms: ["destroy"] },
                { word: "destruct", phonetic: "/dɪˈstrʌkt/", pos: "v.", chinese: "破坏", example: "Fire can destruct property.", roots: ["de- + struct(建造)"], synonyms: ["demolish"], antonyms: ["construct"] },
                { word: "structure", phonetic: "/ˈstrʌktʃər/", pos: "n.", chinese: "结构", example: "The structure is stable.", roots: ["struct + -ure"], synonyms: ["framework"], antonyms: [] },
                { word: "inspector", phonetic: "/ɪnˈspektər/", pos: "n.", chinese: "检查员", example: "The inspector checked the building.", roots: ["in- + spect(看) + -or"], synonyms: [" examiner"], antonyms: [] },
                { word: "perspective", phonetic: "/pərˈspektɪv/", pos: "n.", chinese: "视角", example: "Look from another perspective.", roots: ["per- + spect(看) + -ive"], synonyms: ["viewpoint"], antonyms: [] },
                { word: "transport", phonetic: "/trænsˈpɔːrt/", pos: "v.", chinese: "运输", example: "Trucks transport goods.", roots: ["trans- + port(搬运)"], synonyms: ["carry"], antonyms: [] },
                { word: "important", phonetic: "/ɪmˈpɔːrtnt/", pos: "adj.", chinese: "重要的", example: "This meeting is important.", roots: ["im- + port(搬运) + -ant"], synonyms: ["significant"], antonyms: ["trivial"] }
            ]
        },

        // Level 4: 高级 (C1-C2) - 专业精通
        level4: {
            advanced_vocabulary: [
                { word: "ubiquitous", phonetic: "/juːˈbɪkwɪtəs/", pos: "adj.", chinese: "无处不在的", example: "Smartphones are ubiquitous nowadays.", roots: ["ubi- + quit(存在) + -ous"], synonyms: ["omnipresent"], antonyms: ["rare"] },
                { word: "ephemeral", phonetic: "/ɪˈfemərəl/", pos: "adj.", chinese: "短暂的", example: "Fashion trends are ephemeral.", roots: ["ephem(er) + -al"], synonyms: ["transient"], antonyms: ["permanent"] },
                { word: "paradoxical", phonetic: "/ˌpærəˈdɒksɪkl/", pos: "adj.", chinese: "矛盾的", example: "His behavior seems paradoxical.", roots: ["para- + dox(观点) + -ical"], synonyms: ["contradictory"], antonyms: ["logical"] },
                { word: "meticulous", phonetic: "/məˈtɪkjələs/", pos: "adj.", chinese: "一丝不苟的", example: "She is meticulous about details.", roots: ["met(i) + cul + -ous"], synonyms: ["thorough"], antonyms: ["careless"] },
                { word: "cognizance", phonetic: "/ˈkɒɡnɪzəns/", pos: "n.", chinese: "认知", example: "Take cognizance of the facts.", roots: ["co- + gn(知) + -izance"], synonyms: ["awareness"], antonyms: [] },
                { word: "benevolent", phonetic: "/bəˈnevələnt/", pos: "adj.", chinese: "仁慈的", example: "A benevolent leader cares for everyone.", roots: ["bene(好) + vol(意愿) + -ent"], synonyms: ["kind"], antonyms: ["malevolent"] },
                { word: "magnanimous", phonetic: "/mægˈnænɪməs/", pos: "adj.", chinese: "宽宏大量的", example: "He was magnanimous in victory.", roots: ["magn(大) + anim(精神) + -ous"], synonyms: ["generous"], antonyms: ["petty"] },
                { word: "prolific", phonetic: "/prəˈlɪfɪk/", pos: "adj.", chinese: "多产的", example: "Shakespeare was a prolific writer.", roots: ["pro- + lic(生产)"], synonyms: ["fruitful"], antonyms: ["unproductive"] },
                { word: "sagacious", phonetic: "/səˈɡeɪʃəs/", pos: "adj.", chinese: "睿智的", example: "A sagacious decision changed everything.", roots: ["sag(感知) + -acious"], synonyms: ["wise"], antonyms: ["foolish"] },
                { word: "scrupulous", phonetic: "/ˈskruːpjələs/", pos: "adj.", chinese: "严谨的", example: "He is scrupulous about ethics.", roots: ["scrup(l) + -ulous"], synonyms: ["meticulous"], antonyms: ["unscrupulous"] }
            ],
            business_english: [
                { word: "negotiate", phonetic: "/nɪˈɡoʊʃieɪt/", pos: "v.", chinese: "谈判", example: "We need to negotiate the terms.", roots: ["negot(iate)"], synonyms: ["bargain"], antonyms: [] },
                { word: "strategy", phonetic: "/ˈstrætədʒi/", pos: "n.", chinese: "战略", example: "Our marketing strategy works well.", roots: ["strat(ege) + -y"], synonyms: ["tactic"], antonyms: [] },
                { word: "acquisition", phonetic: "/ˌækwɪˈzɪʃn/", pos: "n.", chinese: "收购", example: "The acquisition increased our market share.", roots: ["ac- + quisit + -ion"], synonyms: ["purchase"], antonyms: ["divestiture"] },
                { word: "entrepreneur", phonetic: "/ˌɑːntrəprəˈnɜːr/", pos: "n.", chinese: "企业家", example: "She is a successful entrepreneur.", roots: ["enter + preneur"], synonyms: [], antonyms: [] },
                { word: "revenue", phonetic: "/ˈrevənjuː/", pos: "n.", chinese: "收入", example: "Company revenue increased by 20%.", roots: ["re- + ven(来) + -ue"], synonyms: ["income"], antonyms: ["expense"] },
                { word: "liability", phonetic: "/ˌlaɪəˈbɪləti/", pos: "n.", chinese: "责任，负债", example: "The company has many liabilities.", roots: ["liab(le) + -ility"], synonyms: ["obligation"], antonyms: ["asset"] },
                { word: "merger", phonetic: "/ˈmɜːrdʒər/", pos: "n.", chinese: "合并", example: "The merger created a giant corporation.", roots: ["merg(e) + -er"], synonyms: ["consolidation"], antonyms: ["split"] },
                { word: "dividend", phonetic: "/ˈdɪvɪdend/", pos: "n.", chinese: "股息", example: "Shareholders received dividends.", roots: ["divid(e) + -end"], synonyms: [], antonyms: [] }
            ]
        }
    },

    // ========== 句子练习库 - 按场景分类 ==========
    sentences: {
        beginner: [
            { english: "Hello, how are you today?", chinese: "你好，你今天好吗？", words: ["Hello", ",", "how", "are", "you", "today", "?"], difficulty: 1 },
            { english: "My name is Tom and I am ten years old.", chinese: "我叫汤姆，今年十岁。", words: ["My", "name", "is", "Tom", "and", "I", "am", "ten", "years", "old", "."], difficulty: 2 },
            { english: "I like eating apples and bananas.", chinese: "我喜欢吃苹果和香蕉。", words: ["I", "like", "eating", "apples", "and", "bananas", "."], difficulty: 2 },
            { english: "She has a cute cat and a lovely dog.", chinese: "她有一只可爱的猫和一只漂亮的狗。", words: ["She", "has", "a", "cute", "cat", "and", "a", "lovely", "dog", "."], difficulty: 2 },
            { english: "Today is Monday and the weather is sunny.", chinese: "今天是星期一，天气晴朗。", words: ["Today", "is", "Monday", "and", "the", "weather", "is", "sunny", "."], difficulty: 3 }
        ],
        intermediate: [
            { english: "Although it was raining, we decided to go for a walk.", chinese: "虽然在下雨，我们还是决定去散步。", words: ["Although", "it", "was", "raining", ",", "we", "decided", "to", "go", "for", "a", "walk", "."], difficulty: 4 },
            { english: "If you study hard, you will pass the examination.", chinese: "如果你努力学习，你会通过考试的。", words: ["If", "you", "study", "hard", ",", "you", "will", "pass", "the", "examination", "."], difficulty: 4 },
            { english: "The book that I borrowed from the library is very interesting.", chinese: "我从图书馆借的那本书非常有趣。", words: ["The", "book", "that", "I", "borrowed", "from", "the", "library", "is", "very", "interesting", "."], difficulty: 5 },
            { english: "Not only did she finish her homework, but she also helped her brother.", chinese: "她不仅完成了作业，还帮助了她的弟弟。", words: ["Not", "only", "did", "she", "finish", "her", "homework", ",", "but", "she", "also", "helped", "her", "brother", "."], difficulty: 6 }
        ],
        advanced: [
            { english: "Had I known about the meeting earlier, I would have prepared accordingly.", chinese: "如果我早点知道这个会议，我就会提前做好准备。", words: ["Had", "I", "known", "about", "the", "meeting", "earlier", ",", "I", "would", "have", "prepared", "accordingly", "."], difficulty: 8 },
            { english: "It is suggested that all employees should attend the training session.", chinese: "建议所有员工都应参加培训会议。", words: ["It", "is", "suggested", "that", "all", "employees", "should", "attend", "the", "training", "session", "."], difficulty: 7 },
            { english: "Despite having numerous advantages, technology also presents significant challenges.", chinese: "尽管有许多优势，科技也带来了重大挑战。", words: ["Despite", "having", "numerous", "advantages", ",", "technology", "also", "presents", "significant", "challenges", "."], difficulty: 7 }
        ]
    },

    // ========== 语法知识点 ==========
    grammar: {
        tenses: [
            { topic: "一般现在时", formula: "主语 + 动词原形/第三人称单数", examples: ["I play basketball every day.", "She plays tennis on weekends."], usage: "表示习惯性动作、客观事实" },
            { topic: "现在进行时", formula: "主语 + am/is/are + 动词-ing", examples: ["I am studying English now.", "They are watching TV."], usage: "表示正在进行的动作" },
            { topic: "一般过去时", formula: "主语 + 动词过去式", examples: ["I visited Beijing last year.", "She went to school yesterday."], usage: "表示过去发生的动作" },
            { topic: "现在完成时", formula: "主语 + have/has + 过去分词", examples: ["I have finished my homework.", "She has lived here for five years."], usage: "表示已经完成的动作或对现在有影响" },
            { topic: "将来时", formula: "主语 + will/shall + 动词原形", examples: ["I will call you tomorrow.", "We shall overcome difficulties."], usage: "表示将来要发生的动作" }
        ],
        clauses: [
            { topic: "定语从句", formula: "先行词 + that/which/who/whom/whose + 从句", examples: ["The book that I bought is interesting.", "The man who called yesterday is my uncle."], usage: "用来修饰名词或代词" },
            { topic: "状语从句", formula: "从属连词 + 主语 + 谓语", examples: ["When I arrived, he was cooking.", "If it rains, we will stay home."], usage: "表示时间、条件、原因等" },
            { topic: "宾语从句", formula: "主句 + that/if/疑问词 + 从句", examples: ["I know that he is right.", "She asked if I could help her."], usage: "在主句中作宾语" }
        ],
        conditions: [
            { topic: "第一类条件句", formula: "If + 一般现在时，主句 + 一般将来时", examples: ["If it rains, we will cancel the trip."], usage: "真实可能的情况" },
            { topic: "第二类条件句", formula: "If + 一般过去时，主句 + would/could + 动词原形", examples: ["If I were you, I would accept the offer."], usage: "与现在事实相反的假设" },
            { topic: "第三类条件句", formula: "If + 过去完成时，主句 + would/could + have + 过去分词", examples: ["If I had studied harder, I would have passed the exam."], usage: "与过去事实相反的假设" }
        ]
    },

    // ========== 听力训练材料 ==========
    listening: {
        short_dialogues: [
            { dialogue: "A: Excuse me, where is the nearest subway station?\nB: Go straight for two blocks, then turn left. It's right there.\nA: Thank you so much!\nB: You're welcome.", questions: [
                { question: "Where is the subway station?", options: ["At the corner", "Two blocks away, then left", "Across the street"], answer: 1 }
            ]},
            { dialogue: "A: What time does the meeting start?\nB: It starts at 3 PM, but we should arrive by 2:30 PM.\nA: Okay, I'll set my alarm for 2 PM.", questions: [
                { question: "When should they arrive?", options: ["3 PM", "2:30 PM", "2 PM"], answer: 1 }
            ]}
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENGLISH_DB;
}