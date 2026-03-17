# 英语大师 Pro - 英语学习网站

## 🎯 核心特性

### ✨ 完整学习闭环
1. **学单词**：看中文 → 键盘输入英文 → 语音反馈 → 自动加入已学列表
2. **组句子**：用刚学的单词组成完整句子 → 即时检查
3. **完成回顾**：统计 + 复习所有学习内容

### 🔊 语音朗读功能
- 每个单词都有🔊小喇叭图标
- 点击即可播放标准发音（Web Speech API）
- 正确时自动播放读音
- 所有已学单词可随时听读

### ⌨️ 键盘快捷键优化
- **按 Enter**: 快速提交/进入下一个
- 全程无需鼠标操作
- 流畅的学习体验

### 📚 完整知识体系
从 A1 到 C2，涵盖 50+ 课程：
- **A1 入门级** (1-10): 打招呼、数字、颜色、家庭、食物、动物等基础
- **A2 初级** (11-15): 学校、日常、购物、问路、兴趣爱好
- **B1 中级** (21-22): 工作经历、健康状况
- **B2 中高级** (31): 环境、科技等话题
- **C1 高级** (41): 经济分析、商务英语
- **C2 精通级** (51): 学术写作、专业英语

### 🎨 智能交互
- **忽略大小写和标点**：更宽容的检查机制
- ✅ 绿色正确反馈 + 上升音效
- ❌ 红色错误反馈 + 震动动画
- 实时进度追踪和准确率统计

## 🛠️ 技术栈
- 纯 HTML/CSS/JS，无框架依赖
- Web Speech API 实现语音朗读
- 响应式设计，支持手机/电脑

## 🚀 部署

### GitHub Pages（推荐）
```bash
# 启用方式
Settings → Pages → Branch: main, Folder: / → Save
# 访问地址：https://ainidewowjf.github.io/english-learning-site/
```

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

## 📁 项目结构
```
english-learning-site/
├── index.html      # 主页面（含样式）
├── app.js          # 核心应用逻辑
├── data.js         # 完整英语学习知识库
├── README.md       # 本文档
└── .gitignore
```

## 📖 数据结构示例

### 课程数据（data.js）
```javascript
{
  lesson: 1,
  title: '打招呼',
  level: 'A1',
  words: [
    { word: 'hello', phonetic: '/həˈloʊ/', chinese: '你好' }
  ],
  sentence: {
    chinese: '你好，谢谢！',
    english: 'Hello, thank you!',
    hints: ['打招呼 + 感谢']
  }
}
```

### 词根词缀库
- 12 个核心词根（act, aud, bio, dict...）
- 7 个常用前缀（un-, re-, pre-...）
- 4 个常见后缀（-tion, -ly, -able...）

## 💡 使用建议

### 学习者
1. 从 A1 级别开始，循序渐进
2. 遇到不确定的单词可点击🔊听发音
3. 按 Enter 键快速完成，保持节奏感
4. 完成每课后回顾知识点

### 扩展内容
想添加更多课程？在 `data.js` 的对应级别数组中添加：

```javascript
level_a1: [
  // ...现有课程
  {
    lesson: 11,
    title: '新课程标题',
    level: 'A1',
    words: [...],
    sentence: {...}
  }
]
```

## 📈 未来计划
- [ ] 学习进度云同步
- [ ] 每日打卡提醒
- [ ] 错题本功能
- [ ] 更多练习题型（选择题、填空题）
- [ ] 离线 PWA 支持
- [ ] 多语言支持

## 🤝 贡献指南
欢迎提交 PR 添加更多内容或修复 bug！

---

**在线访问**: https://ainidewowjf.github.io/english-learning-site/
