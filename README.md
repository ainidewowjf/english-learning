# 英语大师 - 从单词到句子的英语学习平台

一个互动式的英语学习网站，帮助英语小白从入门到精通。通过练习单词并组成句子，循序渐进地掌握英语。

## ✨ 主要功能

### 📚 单词学习
- **分级词汇**：入门级、初级、中级、高级四个级别
- **分类学习**：问候语、数字、颜色、家庭、食物、动物、动词、形容词等8大类别
- **即时反馈**：点击单词即可查看音标、中文释义和例句
- **掌握程度标记**：不认识、模糊、认识、熟练四级标记系统

### 💬 句子练习
- **看中文组英文**：根据中文提示，用打乱的英文单词组成正确句子
- **语音朗读**：点击发音按钮听取标准英文发音
- **即时反馈**：回答后立即显示对错
- **进度追踪**：实时显示练习进度和正确率

### 🧩 组句挑战
- **关卡制**：从易到难共8个关卡
- **拖拽式交互**：点击单词添加到句子中
- **星级评价**：每关通关后获得星星奖励
- **无限挑战**：通关后解锁更高级别

### 📊 学习进度
- **数据统计**：已学单词、完成句子、连续天数、积分
- **进度环图**：可视化展示总体学习进度
- **成就系统**：10+ 个成就徽章等待解锁
- **历史记录**：查看每次学习的记录

## 🚀 如何部署到公网（永久免费）

### 方法一：GitHub Pages（推荐）

#### 步骤 1: 创建 GitHub 仓库
```bash
# 1. 登录 https://github.com
# 2. 点击右上角 "+" -> "New repository"
# 3. 仓库名例如：english-learning
# 4. 勾选 "Add a README file"
# 5. 点击 "Create repository"
```

#### 步骤 2: 上传代码
```bash
cd /mnt/workspace/.copaw/english-learning-site

# 初始化 git（如果尚未初始化）
git init

# 添加远程仓库（替换为你的 GitHub 用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/english-learning.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: English learning website"

# 推送
git branch -M main
git push -u origin main
```

#### 步骤 3: 启用 GitHub Pages
1. 进入你的 GitHub 仓库页面
2. 点击 **Settings** (设置)
3. 左侧菜单选择 **Pages**
4. 在 **Branch** 下拉框选择 `main` 分支，文件夹选择 `/ (root)`
5. 点击 **Save**
6. 等待 1-2 分钟，你的网站就会发布在：
   ```
   https://YOUR_USERNAME.github.io/english-learning/
   ```

### 方法二：Vercel（零配置部署）

#### 步骤 1: 创建 Vercel 账号
- 访问 https://vercel.com
- 使用 GitHub 账号登录

#### 步骤 2: 导入项目
1. 点击 **"Add New..."** -> **"Project"**
2. 导入你的 GitHub 仓库
3. 直接点击 **"Deploy"**

#### 步骤 3: 获取网址
- 部署完成后会生成类似地址：
  ```
  https://english-learning.vercel.app
  ```

### 方法三: Netlify

#### 步骤 1: 拖拽部署（最简单）
1. 访问 https://app.netlify.com/drop
2. 将 `english-learning-site` 文件夹拖拽到指定区域
3. 几秒钟后即可获得网址

---

## 📁 文件结构

```
english-learning-site/
├── index.html          # 主 HTML 文件
├── styles.css          # 样式文件
├── app.js              # 核心 JavaScript
├── data.js             # 单词和句子数据
└── README.md           # 说明文档
```

## 🎮 使用说明

### 对于学习者：
1. **选择级别**：根据自己水平选择入门/初级/中级/高级
2. **学习单词**：先点击左侧「单词学习」，选择分类开始学习
3. **练习句子**：学完单词后，进入「句子练习」或「组句挑战」
4. **查看进度**：随时进入「学习进度」查看自己的成长

### 对于教师/家长：
- 可以打印 README.md 中的词汇表作为教学材料
- 监督孩子使用「组句挑战」功能巩固学习成果
- 查看「学习进度」了解学习情况

## 🔧 自定义修改

### 添加更多单词
编辑 `data.js` 文件，在对应级别和分类下添加：
```javascript
{ word: "新单词", phonetic: "/音标/", chinese: "中文", example: "例句" }
```

### 添加更多句子
在 `data.js` 的 `sentenceData` 中添加新句子。

### 修改颜色和主题
编辑 `styles.css` 中的 CSS 变量：
```css
:root {
    --primary: #6366f1;       /* 主色调 */
    --secondary: #10b981;     /* 辅助色 */
    /* ... */
}
```

## 📱 浏览器兼容性

- ✅ Chrome/Edge (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ⚠️ IE 不支持（建议使用现代浏览器）

## 🌟 特性亮点

- **完全离线可用**：首次加载后可在断网状态下使用
- **响应式设计**：手机、平板、电脑完美适配
- **无需后台**：纯静态网站，零服务器成本
- **数据安全**：所有数据存储在本地浏览器
- **持续更新**：可随时添加新的单词和句子

## 📞 技术支持

如遇问题，请检查：
1. 是否使用现代浏览器（Chrome/Edge/Firefox/Safari）
2. 是否启用了 JavaScript
3. 网络连接是否正常

---

**祝学习愉快！Happy Learning! 🎉**
