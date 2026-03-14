# GitHub 上传指南 | GitHub Upload Guide

## 中文 Chinese

### 前置准备 Prerequisites

1. **GitHub 账户** | **GitHub Account**
   - 访问 https://github.com/signup 注册
   - 确认用户名是 `aixxww` 或记住你的用户名

2. **本地 Git 配置** | **Local Git Configuration**
   ```bash
   git config --global user.name "aixxww"
   git config --global user.email "your.email@example.com"
   ```

3. **GitHub Token (推荐)** | **GitHub Token (Recommended)**
   - Settings → Developer Settings → Personal access tokens → Tokens (classic)
   - 勾选 `repo` 权限
   - 复制生成的 token

### 方法一：GitHub CLI (推荐) Method 1: GitHub CLI (Recommended)

#### 1. 安装 GitHub CLI | Install GitHub CLI

```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh
```

#### 2. 登录 GitHub | Login to GitHub

```bash
gh auth login
# 选择 GitHub.com
# 选择 HTTPS 或 SSH
# 输入你的 GitHub 凭据
```

#### 3. 创建仓库 | Create Repository

```bash
# 在项目目录下
cd /Users/WiNo/Projects/cryptoflow-ai

# 创建新仓库
gh repo create cryptoflow-ai --public --description "OpenClaw AI Powered Binance Trading Assistant"

# 或者使用现有的仓库（如果已创建）
# gh repo set-default aixxww/cryptoflow-ai
```

#### 4. 推送到 GitHub | Push to GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: Binance AI Dragon Claw - OpenClaw Powered Trading Assistant

- Next.js 16 + React 19 + TypeScript
- Dual theme support (Cool Blue & Dopamine)
- Real-time price tracking and sentiment analysis
- OpenClaw AI + 6551 MCP integration
- Trading dashboard with agent monitoring
- Alert reports with visualization matrix"

# 添加远程仓库
git remote add origin https://github.com/aixxww/cryptoflow-ai.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 方法二：Git 命令行 Method 2: Git Command Line

#### 1. 在 GitHub 创建仓库 Create Repository on GitHub

1. 访问 https://github.com/new
2. 仓库名称: `cryptoflow-ai`
3. 设为 Public 或 Private
4. **不要** 初始化 README、.gitignore 或 license（我们已有这些文件）
5. 点击 "Create repository"

#### 2. 推送到 GitHub Push to GitHub

```bash
cd /Users/WiNo/Projects/cryptoflow-ai

# 初始化 Git
git init

# 添加所有文件
git add .

# 创建提交
git commit -m "Initial commit: Binance AI Dragon Claw - OpenClaw AI Trading Assistant"

# 添加远程仓库 (使用你的 GitHub token)
git remote add origin https://YOUR_TOKEN@github.com/aixxww/cryptoflow-ai.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 方法三：GitHub Desktop Method 3: GitHub Desktop

#### 1. 安装 GitHub Desktop Install GitHub Desktop

下载: https://desktop.github.com/

#### 2. 克隆并推送 Clone and Push

1. 打开 GitHub Desktop
2. File → New Repository
3. 选择项目目录: `/Users/WiNo/Projects/cryptoflow-ai`
4. 填写 Repository Name: `cryptoflow-ai`
5. 选择 "Publish to GitHub"
6. 选择 `aixxww` 作为所有者
7. 勾选 "Keep this code private" (如需私有)
8. 点击 "Publish Repository"

### 后续操作 Subsequent Operations

#### 提交新更改 Commit New Changes

```bash
# 查看更改状态
git status

# 添加更改的文件
git add .

# 提交更改
git commit -m "Add new feature: [描述你的更改]"

# 推送到 GitHub
git push
```

#### 解决冲突 Resolve Conflicts

```bash
# 拉取远程更改
git pull origin main

# 如果有冲突，编辑冲突文件后
git add .
git commit
git push
```

### 📸 添加 GitHub 添加项目截图 Add Project Screenshots

1. 项目根目录创建 `screenshots/` 文件夹
2. 添加截图：`desktop.png`, `mobile.png`, `dashboard.png`
3. 在 README 中添加引用

```markdown
### 🖼️ 截图 Screenshots

![Desktop View](screenshots/desktop.png)
![Mobile View](screenshots/mobile.png)
![Dashboard](screenshots/dashboard.png)
```

### 🏷️ 添加标签 Add Tags

```bash
# 添加版本标签
git tag -a v1.0.0 -m "First stable release"

# 推送标签
git push origin v1.0.0
```

---

## English

### Prerequisites

1. **GitHub Account**
   - Visit https://github.com/signup to register
   - Ensure your username is `aixxww` or remember your username

2. **Local Git Configuration**
   ```bash
   git config --global user.name "aixxww"
   git config --global user.email "your.email@example.com"
   ```

3. **GitHub Token (Recommended)**
   - Settings → Developer Settings → Personal access tokens → Tokens (classic)
   - Check `repo` scope
   - Copy the generated token

### Method 1: GitHub CLI (Recommended)

#### 1. Install GitHub CLI

```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh
```

#### 2. Login to GitHub

```bash
gh auth login
# Select GitHub.com
# Choose HTTPS or SSH
# Enter your GitHub credentials
```

#### 3. Create Repository

```bash
# Navigate to project directory
cd /Users/WiNo/Projects/cryptoflow-ai

# Create new repository
gh repo create cryptoflow-ai --public --description "OpenClaw AI Powered Binance Trading Assistant"

# Or use existing repository (if already created)
# gh repo set-default aixxww/cryptoflow-ai
```

#### 4. Push to GitHub

```bash
# Initialize Git (if not already)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Binance AI Dragon Claw - OpenClaw Powered Trading Assistant

- Next.js 16 + React 19 + TypeScript
- Dual theme support (Cool Blue & Dopamine)
- Real-time price tracking and sentiment analysis
- OpenClaw AI + 6551 MCP integration
- Trading dashboard with agent monitoring
- Alert reports with visualization matrix"

# Add remote repository
git remote add origin https://github.com/aixxww/cryptoflow-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Method 2: Git Command Line

#### 1. Create Repository on GitHub

1. Visit https://github.com/new
2. Repository name: `cryptoflow-ai`
3. Set to Public or Private
4. **Do not** initialize README, .gitignore, or license (we have these files)
5. Click "Create repository"

#### 2. Push to GitHub

```bash
cd /Users/WiNo/Projects/cryptoflow-ai

# Initialize Git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Binance AI Dragon Claw - OpenClaw AI Trading Assistant"

# Add remote repository (use your GitHub token)
git remote add origin https://YOUR_TOKEN@github.com/aixxww/cryptoflow-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Method 3: GitHub Desktop

#### 1. Install GitHub Desktop

Download: https://desktop.github.com/

#### 2. Clone and Push

1. Open GitHub Desktop
2. File → New Repository
3. Select project directory: `/Users/WiNo/Projects/cryptoflow-ai`
4. Fill in Repository Name: `cryptoflow-ai`
5. Choose "Publish to GitHub"
6. Select `aixxww` as owner
7. Check "Keep this code private" (if needed)
8. Click "Publish Repository"

### Subsequent Operations

#### Commit New Changes

```bash
# Check status
git status

# Add changed files
git add .

# Commit changes
git commit -m "Add new feature: [describe your changes]"

# Push to GitHub
git push
```

#### Resolve Conflicts

```bash
# Pull remote changes
git pull origin main

# If conflicts, edit files then
git add .
git commit
git push
```

### 📸 Add Project Screenshots

1. Create `screenshots/` folder in project root
2. Add screenshots: `desktop.png`, `mobile.png`, `dashboard.png`
3. Add reference in README

```markdown
### 🖼️ Screenshots

![Desktop View](screenshots/desktop.png)
![Mobile View](screenshots/mobile.png)
![Dashboard](screenshots/dashboard.png)
```

### 🏷️ Add Tags

```bash
# Add version tag
git tag -a v1.0.0 -m "First stable release"

# Push tag
git push origin v1.0.0
```

---

## 🔗 Useful Links Useful Links

- [GitHub Docs](https://docs.github.com/)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Git Documentation](https://git-scm.com/doc)
- [Creating a Repository](https://docs.github.com/repositories/creating-and-managing-repositories/creating-a-new-repository)

---

<div align="center">

**Happy Coding! 🚀**

</div>
