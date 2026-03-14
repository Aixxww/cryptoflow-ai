# 币安AI龙爪手 | Binance AI Dragon Claw

<div align="center">

**OpenClaw AI 驱动的智能交易助手 | AI-Powered Trading Assistant by OpenClaw AI**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-AI-purple)](https://github.com/anthropics/openclaw)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[English](#english) | [中文](#中文)

</div>

---

## 中文 Chinese

### ✨ 特性 Features

#### 🎯 核心功能 Core Features

| 功能 | 描述 |
|------|------|
| **交易仪表盘** | Agent 状态监控、持仓管理、交易历史、实时收益统计 |
| **预警研报** | 实时市场预警、新闻聚合、社交情绪分析、可视化矩阵 |
| **资金流追踪** | 鲸鱼资金流向、大额转账可视化、智能链上分析 |
| **社交雷达** | Twitter/X 情绪分析、KOL 观点追踪、叙事热点捕捉 |
| **DeFi 聚合** | 多链 DEX 价格聚合、套利机会扫描、最优路径计算 |
| **策略实验室** | 低代码策略构建、AI 辅助生成、历史数据回测 |

#### 🎨 UI/UX Features

- **双主题模式** | **Dual Theme Mode**: 冷蓝 & 多巴胺 | Cool Blue & Dopamine
- **响应式设计** | **Responsive Design**: 支持桌面和移动端 | Desktop & Mobile Support
- **实时数据** | **Real-time Data**: 30秒价格刷新 | 30-second Price Refresh
- **暗色风格** | **Dark Mode**: 专业交易界面 | Professional Trading UI

### 🤖 OpenClaw AI 集成 Integration

项目深度集成 OpenClaw AI 和 6551 MCP：

```
Frontend (Next.js) → API Routes → OpenClaw Gateway (18789) → [Skills]
                                                                       ├─ 6551-OpenNews
                                                                       ├─ 6551-OpenTwitter
                                                                       ├─ Binance API
                                                                       └─ Custom Skills
```

### 🚀 快速开始 Quick Start

#### 前置要求 Prerequisites

- Node.js 18+
- OpenClaw (本地运行) | OpenClaw (Running Locally)
- 6551 MCP Token: https://6551.io/mcp

#### 一键安装 One-Click Install

```bash
# 克隆项目 | Clone the repo
git clone https://github.com/aixxww/cryptoflow-ai.git
cd cryptoflow-ai

# 运行安装脚本 | Run installation script
./install.sh

# 启动开发服务器 | Start dev server
npm run dev
```

访问 http://localhost:8848

#### 手动安装 Manual Installation

```bash
# 安装依赖 | Install dependencies
npm install

# 配置环境变量 | Configure environment variables
cp .env.example .env.local
# 编辑 .env.local 填入你的 OpenClaw API Key
# Edit .env.local with your OpenClaw API Key

# 启动开发服务器 | Start dev server
npm run dev
```

### 📁 项目结构 Project Structure

```
cryptoflow-ai/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── prices/         # 价格数据 | Price Data
│   │   ├── news/           # 新闻聚合 | News Aggregation
│   │   └── sentiment/      # 情绪分析 | Sentiment Analysis
│   ├── dashboard/          # 交易仪表盘 | Trading Dashboard
│   ├── report/            # 预警研报 | Alert Report
│   ├── heat-map/          # 资金流追踪 | Capital Flow
│   ├── radar/             # 社交雷达 | Social Radar
│   ├── defi/              # DeFi 聚合 | DeFi Aggregator
│   └── lab/               # 策略实验室 | Strategy Lab
├── components/            # React 组件
│   ├── ui/               # UI 组件库
│   ├── AppNav.tsx       # 导航组件
│   └── ThemeToggle.tsx  # 主题切换
├── contexts/             # React Context
│   └── ThemeContext.tsx # 主题管理
├── lib/                  # 工具库
├── openclaw-skills/      # OpenClaw Skills
│   ├── binance-trader/  # 币安交易 | Binance Trading
│   ├── binance-market/  # 币安行情 | Binance Market
│   └── binance-square/  # 币安广场 | Binance Square
├── public/              # 静态资源
└── install.sh          # 一键安装脚本 | One-Click Install
```

### 🔧 配置详解 Configuration

#### OpenClaw 配置 OpenClaw Config

```json
{
  "gateway": {
    "port": 18789,
    "auth": {
      "token": "your-openclaw-token"
    }
  },
  "skills": {
    "entries": {
      "6551-opennews": {
        "env": {
          "OPENNEWS_TOKEN": "your-6551-token"
        }
      },
      "6551-opentwitter": {
        "env": {
          "TWITTER_TOKEN": "your-6551-token"
        }
      }
    }
  }
}
```

#### 环境变量 Environment Variables

```bash
# OpenClaw 集成 | OpenClaw Integration
OPENCLAW_URL=http://localhost:18789
OPENCLAW_API_KEY=your_openclaw_token

# 币安 API (可选) | Binance API (Optional)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_secret
```

### 📊 数据来源 Data Sources

| 来源 | 用途 | 状态 |
|------|------|------|
| 6551-OpenNews | 加密货币新闻聚合 | ✅ 已集成 |
| 6551-OpenTwitter | 社交情绪分析 | ✅ 已集成 |
| Binance API | 实时价格和交易 | ✅ 公开 API |
| CoinGecko | 价格数据补充 | ✅ 已集成 |
| Whale Alert | 链上大额交易 | 🔄 待集成 |
| Etherscan | ETH 链上数据 | 🔄 待集成 |

### 🎯 路线图 Roadmap

- [ ] OpenClaw WebSocket 实时数据推送
- [ ] 实际成交订单执行 (需要 API Key)
- [ ] 策略回测引擎
- [ ] 自动化交易 Agent
- [ ] 多交易所支持
- [ ] 移动端 App

### 📝 许可证 License

MIT License - see [LICENSE](LICENSE) file for details.

### 🙏 致谢 Thanks to

- [OpenClaw AI](https://github.com/anthropics/openclaw) - AI Agent Framework
- [6551 MCP](https://6551.io/mcp) - Data Provider
- [Binance](https://www.binance.com/) - Trading Platform
- [Next.js](https://nextjs.org/) - Web Framework

---

## English

### ✨ Features

#### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **Trading Dashboard** | Agent status monitoring, position management, trade history, real-time P&L |
| **Alert Report** | Real-time market alerts, news aggregation, sentiment analysis, visualization |
| **Capital Flow Tracker** | Whale tracking, large transaction visualization, on-chain analysis |
| **Social Radar** | Twitter/X sentiment analysis, KOL opinions, narrative tracking |
| **DeFi Aggregator** | Multi-chain DEX price aggregation, arbitrage scanning, optimal routing |
| **Strategy Lab** | Low-code strategy builder, AI-assisted generation, backtesting |

#### 🎨 UI/UX Features

- **Dual Theme Mode**: Cool Blue & Dopamine (Warm)
- **Responsive Design**: Desktop & Mobile Support
- **Real-time Data**: 30-second price refresh
- **Dark Mode**: Professional trading UI

### 🤖 OpenClaw AI Integration

Deep integration with OpenClaw AI and 6551 MCP:

```
Frontend (Next.js) → API Routes → OpenClaw Gateway (18789) → [Skills]
                                                                       ├─ 6551-OpenNews
                                                                       ├─ 6551-OpenTwitter
                                                                       ├─ Binance API
                                                                       └─ Custom Skills
```

### 🚀 Quick Start

#### Prerequisites

- Node.js 18+
- OpenClaw (Running Locally)
- 6551 MCP Token: https://6551.io/mcp

#### One-Click Install

```bash
# Clone the repo
git clone https://github.com/aixxww/cryptoflow-ai.git
cd cryptoflow-ai

# Run installation script
./install.sh

# Start dev server
npm run dev
```

Visit http://localhost:8848

#### Manual Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your OpenClaw API Key

# Start dev server
npm run dev
```

### 📁 Project Structure

```
cryptoflow-ai/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── prices/         # Price Data
│   │   ├── news/           # News Aggregation
│   │   └── sentiment/      # Sentiment Analysis
│   ├── dashboard/          # Trading Dashboard
│   ├── report/            # Alert Report
│   ├── heat-map/          # Capital Flow
│   ├── radar/             # Social Radar
│   ├── defi/              # DeFi Aggregator
│   └── lab/               # Strategy Lab
├── components/            # React Components
│   ├── ui/               # UI Components
│   ├── AppNav.tsx       # Navigation
│   └── ThemeToggle.tsx  # Theme Toggle
├── contexts/             # React Context
│   └── ThemeContext.tsx # Theme Management
├── lib/                  # Utilities
├── openclaw-skills/      # OpenClaw Skills
│   ├── binance-trader/  # Binance Trading
│   ├── binance-market/  # Binance Market
│   └── binance-square/  # Binance Square
├── public/              # Static Assets
└── install.sh          # Installation Script
```

### 🔧 Configuration

#### OpenClaw Config

```json
{
  "gateway": {
    "port": 18789,
    "auth": {
      "token": "your-openclaw-token"
    }
  },
  "skills": {
    "entries": {
      "6551-opennews": {
        "env": {
          "OPENNEWS_TOKEN": "your-6551-token"
        }
      },
      "6551-opentwitter": {
        "env": {
          "TWITTER_TOKEN": "your-6551-token"
        }
      }
    }
  }
}
```

#### Environment Variables

```bash
# OpenClaw Integration
OPENCLAW_URL=http://localhost:18789
OPENCLAW_API_KEY=your_openclaw_token

# Binance API (Optional)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_secret
```

### 📊 Data Sources

| Source | Purpose | Status |
|--------|---------|--------|
| 6551-OpenNews | Crypto News Aggregation | ✅ Integrated |
| 6551-OpenTwitter | Social Sentiment Analysis | ✅ Integrated |
| Binance API | Real-time Prices & Trading | ✅ Public API |
| CoinGecko | Price Data Backup | ✅ Integrated |
| Whale Alert | On-Chain Large Transactions | 🔄 Pending |
| Etherscan | ETH On-Chain Data | 🔄 Pending |

### 🎯 Roadmap

- [ ] OpenClaw WebSocket real-time streaming
- [ ] Actual order execution (requires API Key)
- [ ] Strategy backtesting engine
- [ ] Automated trading Agent
- [ ] Multi-exchange support
- [ ] Mobile App

### 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

### 🙏 Thanks to

- [OpenClaw AI](https://github.com/anthropics/openclaw) - AI Agent Framework
- [6551 MCP](https://6551.io/mcp) - Data Provider
- [Binance](https://www.binance.com/) - Trading Platform
- [Next.js](https://nextjs.org/) - Web Framework

---

<div align="center">

🚀 **Built by [aixxww](https://github.com/aixxww) with ❤️**

Powered by [OpenClaw AI](https://github.com/anthropics/openclaw)

</div>
