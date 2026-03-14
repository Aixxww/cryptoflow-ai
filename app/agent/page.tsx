"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Bot,
  Terminal,
  Key,
  Settings,
  Play,
  CheckCircle,
  AlertTriangle,
  Copy,
  ArrowRight,
  Code2,
  Globe,
  DollarSign,
  Share2,
  Activity,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "overview",
    icon: Bot,
    title: "Agent 概览",
    items: [
      {
        title: "什么是 OpenClaw Agent",
        description: "了解 AI Agent 如何自动化你的交易",
        content: `
### OpenClaw Agent 简介

OpenClaw Agent 是一个基于 AI 的自主交易助手，可以：
- **监控市场**：24/7 监控价格变化、资金流向、社交情绪
- **分析机会**：识别套利机会和交易信号
- **执行交易**：自动在币安执行交易订单
- **发布内容**：自动发布分析到 Binance Square

### Agent 工作流程

\`\`\`
数据采集 → AI 分析 → 策略决策 → 执行操作 → 结果反馈
\`\`\`

1. **数据采集层**
   - OpenTwitter: 获取推特情绪和 KOL 观点
   - OpenNews: 获取加密货币新闻
   - Binance API: 获取实时价格和交易数据
   - 链上数据: 鲸鱼地址和大额交易

2. **AI 分析层**
   - 市场情绪综合评分
   - 技术指标信号识别
   - 基本面事件分析

3. **策略决策层**
   - 风险评估
   - 进场点位计算
   - 止盈止损设置

4. **执行层**
   - 币安自动下单
   - Binance Square 发布内容
        `,
      },
      {
        title: "Agent 架构",
        description: "系统组件和数据流向",
        content: `
### 核心组件

| 组件 | 功能 | 技术栈 |
|------|------|--------|
| CryptoFlow Web | 用户界面和策略配置 | Next.js + React |
| OpenClaw Agent | AI 核心和决策引擎 | Python + OpenClaw SDK |
| 6551 MCP | 数据源接入服务 | MCP 协议 |
| Binance API | 交易执行 | REST + WebSocket |

### 数据流向

\`\`\`
┌─────────────┐
│  数据源层   │
│ • OpenTwitter│
│ • OpenNews   │
│ • Binance API│
└──────┬──────┘
       │
┌──────▼──────┐
│  MCP 层     │  ← 6551 MCP 统一接入
└──────┬──────┘
       │
┌──────▼──────┐
│  Agent 层   │  ← OpenClaw AI 决策
└──────┬──────┘
       │
┌──────▼──────┐
│  执行层     │  ← 币安/Square 发送
└─────────────┘
        `,
      },
    ],
  },
  {
    id: "setup",
    icon: Settings,
    title: "环境配置",
    items: [
      {
        title: "安装 OpenClaw",
        description: "安装和启动 OpenClaw AI 服务",
        content: `
### 前置要求

\`\`\`bash
# 检查 Python 版本 (需要 3.10+)
python --version

# 检查 Node.js 版本
node --version
\`\`\`

### 安装步骤

#### 1. 安装 OpenClaw

\`\`\`bash
# 克隆 OpenClaw 仓库
git clone https://github.com/6551Team/openclaw.git
cd openclaw

# 安装依赖
npm install

# 启动服务 (默认端口 18789)
npm start
\`\`\`

#### 2. 配置 6551 Token

访问 https://6551.io/mcp 获取 Token

将 Token 配置到 OpenClaw 配置文件：

\`\`\`bash
# 创建配置目录
mkdir -p ~/.openclaw

# 创建配置文件 ~/.openclaw/6551-config.json
\`\`\`

配置内容：
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "apiBase": "https://ai.6551.io"
}
\`\`\`

#### 3. 验证安装

\`\`\`bash
# 测试 OpenClaw 服务
curl http://localhost:18789/health

# 预期响应
{"ok":true,"status":"live"}
\`\`\`
        `,
      },
      {
        title: "配置 Binance API",
        description: "获取和配置币安交易 API 密钥",
        content: `
### 创建 Binance API 密钥

1. 登录 [Binance](https://www.binance.com)
2. 进入「API 管理」
3. 创建 API 密钥，配置权限：
   - ✅ 现货交易 (SPOT)
   - ❌ 提币 (安全考虑)
4. 设置 IP 白名单（推荐）
5. 记录 API Key 和 Secret

### 配置 CryptoFlow

在「设置 → 币安交易」中输入：
- Base URL: \`https://api.binance.com\` (正式网)
- API Key: \`你的 API Key\`
- Secret Key: \`你的 Secret Key\`

### 测试连接

\`\`\`bash
# 测试币安连接
curl -X GET "https://api.binance.com/api/v3/ping"
\`\`\`

### 测试网配置（推荐先用测试网）

\`\`\`bash
# 测试网地址
https://testnet.binance.vision

# 获取测试币
https://testnet.binance.vision/faucet
\`\`\`
        `,
      },
      {
        title: "配置 Binance Square",
        description: "设置自动发帖功能",
        content: `
### Binance Square API

Binance Square 提供了公开的内容发布 API。

### 获取授权

1. 登录 Binance
2. 进入 Binance Square
3. 在设置中生成 API Key

### 配置步骤

在「设置 → Binance Square」中：
1. 启用「自动发帖」开关
2. 输入 Square API Key
3. 点击「测试发帖」验证

### 发帖内容模板

Agent 会自动生成以下类型内容：
- 交易结果分享
- 市场分析观点
- 套利机会预警
- 资金流追踪报告
        `,
      },
    ],
  },
  {
    id: "mcp",
    icon: Globe,
    title: "MCP 服务配置",
    items: [
      {
        title: "OpenTwitter MCP",
        description: "推特数据接入配置",
        content: `
### OpenTwitter MCP 功能

通过 6551 MCP 服务接入推特数据：
- 用户资料查询
- 推文搜索和筛选
- 关注者追踪
- KOL 评分和行为分析

### 配置 Token

使用已有的 6551 Token：

\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "apiBase": "https://ai.6551.io"
}
\`\`\`

### API 示例

\`\`\`bash
# 查询推特用户
curl -X POST https://ai.6551.io/mcp/opentwitter/get_user \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"username": "aixxww"}'

# 搜索推文
curl -X POST https://ai.6551.io/mcp/opentwitter/search_tweets \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "bitcoin", "limit": 10}'
\`\`\`
        `,
      },
      {
        title: "OpenNews MCP",
        description: "加密货币新闻聚合配置",
        content: `
### OpenNews MCP 功能

实时聚合加密货币相关新闻：
- 多来源新闻抓取
- AI 情绪分析
- 热点事件追踪
- 价格影响预测

### API 示例

\`\`\`bash
# 获取最新新闻
curl -X POST https://ai.6551.io/mcp/opennews/discover \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"limit": 20}'

# 搜索特定新闻
curl -X POST https://ai.6551.io/mcp/opennews/search \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "ETF", "limit": 10}'
\`\`\`
        `,
      },
    ],
  },
  {
    id: "agent-create",
    icon: Code2,
    title: "创建 Agent",
    items: [
      {
        title: "Agent 配置文件",
        description: "编写 Agent 配置 JSON",
        content: `
### OpenClaw Agent 配置结构

在 \`~/.openclaw/skills/\` 目录下创建技能配置：

\`\`\`json
{
  "name": "crypto-trading-agent",
  "version": "1.0.0",
  "description": "Automated crypto trading agent",
  "author": "aixxww",

  "settings": {
    "maxPositionSize": 0.5,
    "maxPositions": 3,
    "dailyLossLimit": 0.05,
    "takeProfitPercent": 0.05,
    "stopLossPercent": 0.03
  },

  "mcp": {
    "opentwitter": {
      "enabled": true,
      "monitors": ["aixxww", "binance"],
      "keywords": ["BTC", "ETH", "buy", "sell"]
    },
    "opennews": {
      "enabled": true,
      "categories": ["market", "regulation", "defi"]
    }
  },

  "binance": {
    "enabled": true,
    "tradePairs": ["BTCUSDT", "ETHUSDT", "SOLUSDT"],
    "testnet": false
  },

  "square": {
    "enabled": true,
    "autoPost": true,
    "postTemplate": "交易完成: {pair} | 进场: {entry} | 出场: {exit} | 收益: {pnl}%"
  },

  "strategies": [
    {
      "name": "rsi-oversold",
      "conditions": [
        {"type": "rsi", "value": 30, "operator": "lte"}
      ],
      "actions": [{"type": "buy", "amount": 0.1}]
    },
    {
      "name": "sentiment-surge",
      "conditions": [
        {"type": "sentiment", "value": 70, "operator": "gte"},
        {"type": "volume", "value": 2, "operator": "gte"}
      ],
      "actions": [{"type": "buy", "amount": 0.05}]
    }
  ]
}
\`\`\`

### 配置说明

\`settings\` - 风险控制
- \`maxPositionSize\`: 单个仓位最大比例
- \`maxPositions\`: 最大持仓数
- \`dailyLossLimit\`: 日最大亏损
- \`takeProfitPercent\`: 止盈比例
- \`stopLossPercent\`: 止损比例

\`mcp\` - 数据源
- \`opentwitter\`: 推特监控配置
- \`opennews\`: 新闻源配置

\`binance\` - 交易配置
- \`tradePairs\`: 交易对列表

\`square\` - 发帖配置
- \`autoPost\`: 自动发帖开关
- \`postTemplate\`: 内容模板
        `,
      },
      {
        title: "Agent 代码实现",
        description: "编写自定义 Agent 逻辑",
        content: `
### 创建 Agent 技能文件

在 \`~/.openclaw/skills/\` 创建 Python 文件：

\`\`\`python
# crypto_trading_agent.py

from openclaw import Agent, MCPClient, TradingSystem

class CryptoTradingAgent(Agent):
    def __init__(self, config):
        super().__init__(config)
        self.mcp = MCPClient(token=config["mcp"]["token"])
        self.trading = TradingSystem(
            api_key=config["binance"]["apiKey"],
            api_secret=config["binance"]["apiSecret"]
        )

    async def on_start(self):
        """Agent 启动时的初始化"""
        await self.log("Agent 启动")

        # 连接数据源
        if self.config["mcp"]["opentwitter"]["enabled"]:
            await self.mcp.connect("opentwitter")

        # 初始化币安连接
        if self.config["binance"]["enabled"]:
            await self.trading.connect()

    async def monitor_twitter(self):
        """监控推特信号"""
        monitors = self.config["mcp"]["opentwitter"]["monitors"]

        for username in monitors:
            user = await self.mcp.opentwitter.get_user(username)
            tweets = await self.mcp.opentwitter.get_recent_tweets(username, limit=5)

            for tweet in tweets:
                sentiment = await self.analyze_sentiment(tweet.text)
                await self.on_twitter_signal(username, tweet, sentiment)

    async def on_twitter_signal(self, username, tweet, sentiment):
        """处理推特信号"""
        if sentiment > 0.8:  # 强烈看涨信号
            pairs = self.config["binance"]["tradePairs"]

            # 检查是否满足交易条件
            if await self.check_conditions(pairs[0]):
                # 执行交易
                await self.execute_trade(
                    symbol=pairs[0],
                    action="BUY",
                    amount=0.1
                )

                # 发布到 Square
                await self.post_to_square({
                    "type": "trade",
                    "signal": "twitter",
                    "source": username,
                    "sentiment": sentiment
                })

    async def execute_trade(self, symbol, action, amount):
        """执行交易"""
        order = await self.trading.place_order(
            symbol=symbol,
            side=action,
            type="MARKET",
            quantity=amount
        )

        await self.log(f"订单已执行: {symbol} {action} {amount}")
        return order

    async def post_to_square(self, content):
        """发布到 Binance Square"""
        if self.config["square"]["autoPost"]:
            await self.mcp.binance_square.post(
                content=content,
                tags=["trading", "ai-agent"]
            )

    async def run(self):
        """Agent 主循环"""
        while self.running:
            # 1. 监控推特
            await self.monitor_twitter()

            # 2. 检查市场信号
            await self.check_market_signals()

            # 3. 管理现有仓位
            await self.manage_positions()

            # 4. 等待下一个周期
            await self.sleep(60)  # 每分钟检查一次

# 注册 Agent
register_agent("crypto-trading", CryptoTradingAgent)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "start",
    icon: Play,
    title: "启动 Agent",
    items: [
      {
        title: "本地启动",
        description: "在本地启动 OpenClaw Agent",
        content: `
### 启动 OpenClaw 服务

\`\`\`bash
# 进入 OpenClaw 目录
cd ~/.openclaw

# 启动服务
npm start

# 或者使用 Claude Code 启动
claude-agent run crypto-trading-agent
\`\`\`

### 验证 Agent 状态

\`\`\`bash
# 检查 Agent 状态
curl http://localhost:18789/api/agent/status

# 查看运行日志
tail -f ~/.openclaw/logs/agent.log
\`\`\`

### 停止 Agent

\`\`\`bash
# 停止服务
npm stop

# 或者发送终止信号
curl -X POST http://localhost:18789/api/agent/stop
\`\`\`
        `,
      },
      {
        title: "远程部署",
        description: "部署到云服务器",
        content: `
### 使用 6551 云服务

1. 登录 6551 平台
2. 创建新的 Agent 实例
3. 上传配置文件
4. 启动实例

### 配置 GitHub Actions 自动部署

创建 \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy Agent

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to 6551
        run: |
          curl -X POST https://api.6551.io/agent/deploy \\
            -H "Authorization: Bearer YOUR_TOKEN" \\
            -d '{"config": "$(cat agent.json)", "code": "$(cat agent.py | base64)"}'
\`\`\`

### 设置 Secrets

在 GitHub 仓库设置中添加：
\`\`\`
SIX551_TOKEN = 从 6551.io/mcp 获取
BINANCE_API_KEY = 你的币安 API Key
BINANCE_API_SECRET = 你的币安 API Secret
\`\`\`
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret
\`\`\`
        `,
      },
    ],
  },
  {
    id: "monitoring",
    icon: Activity,
    title: "监控与管理",
    items: [
      {
        title: "Agent 监控面板",
        description: "查看 Agent 运行状态",
        content: `
### Web 控制台

访问 CryptoFlow 仪表盘：
\`\`\`
http://localhost:3000/dashboard
\`\`\`

监控指标：
- ✅ 运行状态
- 📊 持仓概览
- 💰 收益统计
- 🔔 交易信号
- 📰 最近发帖

### API 监控

\`\`\`bash
# 获取 Agent 状态
curl http://localhost:18789/api/agent/status

# 获取交易历史
curl http://localhost:18789/api/agent/trades

# 获取持仓信息
curl http://localhost:18789/api/agent/positions
\`\`\`

### 日志查看

\`\`\`bash
# 实时日志
tail -f ~/.openclaw/logs/agent.log

# 错误日志
tail -f ~/.openclaw/logs/error.log
\`\`\`
        `,
      },
      {
        title: "紧急停止",
        description: "如何快速停止 Agent",
        content: `
### 停止所有交易

\`\`\`bash
# 安全停止（等待当前订单完成）
curl -X POST http://localhost:18789/api/agent/shutdown

# 立即停止（强制）
curl -X POST http://localhost:18789/api/agent/kill

# 取消所有挂单
curl -X POST http://localhost:18789/api/binance/cancel_all
\`\`\`

### 清除危险状态

\`\`\`bash
# 清仓（紧急情况使用）
curl -X POST http://localhost:18789/api/binance/liquidate_all

# 注意：此操作不可逆！
\`\`\`

### 风险控制配置

在 Agent 配置中设置：

\`\`\`json
{
  "safety": {
    "autoStopOnLoss": true,
    "maxDailyLoss": 0.05,
    "manualOverride": true
  }
}
\`\`\`
        `,
      },
    ],
  },
  {
    id: "advanced",
    icon: BookOpen,
    title: "高级功能",
    items: [
      {
        title: "自定义信号源",
        description: "接入更多数据源",
        content: `
### 添加自定义 MCP

1. 创建 MCP 插件：

\`\`\`python
# my_custom_mcp.py
from openclaw.mcp import MCPPlugin

class CustomMCP(MCPPlugin):
    name = "custom-source"

    async def fetch_data(self):
        # 实现自定义数据获取逻辑
        return self.data

    async def analyze(self, data):
        # 实现自定义分析逻辑
        return analysis
\`\`\`

2. 注册到 OpenClaw：

\`\`\`bash
cp my_custom_mcp.py ~/.openclaw/mcp/
\`\`\`

3. 在 Agent 配置中启用：

\`\`\`json
{
  "mcp": {
    "custom-source": {
      "enabled": true
    }
  }
}
\`\`\`
        `,
      },
      {
        title: "多策略组合",
        description: "同时运行多个交易策略",
        content: `
### 策略组合配置

\`\`\`json
{
  "strategyPortfolio": [
    {
      "name": "conservative",
      "weight": 0.4,
      "strategies": ["rsi-oversold", "mean-reversion"]
    },
    {
      "name": "aggressive",
      "weight": 0.3,
      "strategies": ["breakout", "momentum"]
    },
    {
      "name": "arb",
      "weight": 0.3,
      "strategies": ["triangular-arb", "cross-chain-arb"]
    }
  ],

  "allocation": {
    "method": "proportional",  // proportional, equal, custom
    "rebalance": "daily"
  }
}
\`\`\`

### 策略权重说明

- **conservative**: 保守策略，低风险低回报
- **aggressive**: 激进策略，高风险高回报
- **arb**: 套利策略，稳定但收益有限
        `,
      },
    ],
  },
  {
    id: "faq",
    icon: AlertTriangle,
    title: "常见问题",
    items: [
      {
        title: "Agent 没有交易",
        description: "检查配置和权限",
        content: `
### 排查步骤

1. **检查 API 权限**
   \`\`\`bash
   # 验证币安 API 权限
   curl -X GET https://api.binance.com/api/v3/account \\
     -H "X-MBX-APIKEY: YOUR_KEY"
   \`\`\`

2. **检查 Agent 日志**
   \`\`\`bash
   grep ERROR ~/.openclaw/logs/agent.log
   \`\`\`

3. **验证策略条件**
   \`\`\`bash
   # 手动测试策略
   curl -X POST http://localhost:18789/api/agent/test_strategy \\
     -d '{"strategy": "rsi-oversold", "params": {}}'
   \`\`\`

4. **检查资金余额**
   \`\`\`bash
   # 查询账户余额
   curl -X GET https://api.binance.com/api/v3/account
   \`\`\`
        `,
      },
      {
        title: "如何提高收益",
        description: "优化策略和配置",
        content: `
### 收益优化建议

1. **多策略组合**
   - 不要依赖单一策略
   - 组合不同类型的策略
   - 按风险等级分配权重

2. **提高数据质量**
   - 添加更多数据源
   - 使用付费数据服务
   - 建立自己的数据管道

3. **优化参数**
   - 定期回测和调整
   - 使用机器学习优化
   - 考虑市场周期变化

4. **风险控制**
   - 严格执行止损
   - 控制最大仓位
   - 避免过度交易
        `,
      },
    ],
  },
];

export default function AgentPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeItem, setActiveItem] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeSectionData = sections.find((s) => s.id === activeSection);
  const activeContent = activeSectionData?.items[activeItem]?.content || "";
  const codeBlocks = activeContent.match(/```[\s\S]*?```/g) || [];

  const copyCode = async (code: string, index: number) => {
    const cleanCode = code.replace(/```\w*\n?/g, "");
    await navigator.clipboard.writeText(cleanCode);
    setCopiedCode(`${activeSection}-${activeItem}-${index}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass-elevated">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-cyan-400" />
            <div>
              <h1 className="text-lg font-bold text-white">OpenClaw Agent 指南</h1>
              <p className="text-xs text-zinc-500">配置、部署和管理 AI 交易 Agent</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              返回首页
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Agent 配置全指南</h2>
          <p className="text-zinc-400">让 OpenClaw AI 自动化你的加密货币交易</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveItem(0);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                    activeSection === section.id
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-zinc-800 text-zinc-300"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeSectionData && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <activeSectionData.icon className="w-6 h-6 text-cyan-400" />
                      <CardTitle className="text-2xl">{activeSectionData.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeSectionData.items.map((item, index) => (
                      <Card
                        key={index}
                        className={cn(
                          "border-l-4 cursor-pointer transition-all hover:border-cyan-400",
                          activeItem === index ? "border-cyan-400 bg-zinc-800/50" : "border-transparent"
                        )}
                        onClick={() => setActiveItem(index)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="text-zinc-400">{item.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Detail View */}
                {activeSectionData.items[activeItem] && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <activeSectionData.icon className="w-5 h-5 text-cyan-400" />
                          <CardTitle>{activeSectionData.items[activeItem].title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription>{activeSectionData.items[activeItem].description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-invert max-w-none space-y-6">
                        <div className="whitespace-pre-wrap text-zinc-300" />

                        {/* Render code blocks with copy button */}
                        {activeContent.split(/```([\s\S]*?)```/).map((part, idx) => {
                          const isCode = idx % 2 === 1 && part.trim();
                          if (!isCode) {
                            // Render markdown-like content
                            const formatted = part
                              .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-3">$1</h3>')
                              .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-4">$1</h2>')
                              .replace(/^#### (.*$)/gm, '<h4 class="text-base font-semibold text-white mt-4 mb-2">$1</h4>')
                              .replace(/^\|.*$\n?/gm, '') // Remove markdown tables
                              .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-cyan-400">$1</code>')
                              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                              .replace(/^- (.*$)/gm, '<li class="text-zinc-300 ml-4">$1</li>')
                              .replace(/^\* {3}.*$/gm, '')
                              .replace(/\n\n+/g, '</p><p class="my-4">');

                            return (
                              <div
                                key={idx}
                                className="text-zinc-300 space-y-2"
                                dangerouslySetInnerHTML={{ __html: `<p>${formatted}</p>` }}
                              />
                            );
                          }

                          const codeIndex = Math.floor(idx / 2);
                          const langMatch = part.match(/^(\w+)\n/);
                          const lang = langMatch ? langMatch[1] : 'bash';
                          const cleanCode = part.replace(/^\w+\n/, '');

                          return (
                            <div key={idx} className="relative group">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-zinc-500 uppercase">{lang}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyCode(part, codeIndex)}
                                  className="h-6 text-xs"
                                >
                                  {copiedCode === `${activeSection}-${activeItem}-${codeIndex}` ? (
                                    <>
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      已复制
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 mr-1" />
                                      复制
                                    </>
                                  )}
                                </Button>
                              </div>
                              <pre className="bg-zinc-900 rounded-lg p-4 overflow-x-auto border border-zinc-700">
                                <code className="text-sm text-green-400">{cleanCode}</code>
                              </pre>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
