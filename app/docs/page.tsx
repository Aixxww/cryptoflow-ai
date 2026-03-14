"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import {
  BookOpen,
  Rocket,
  Wallet,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Key,
  ExternalLink,
  Heart,
  MessageSquare,
  Copy,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "intro",
    icon: Rocket,
    title: "产品介绍",
    items: [
      {
        title: "什么是币安AI龙爪手",
        description: "了解 OpenClaw AI 智能交易助手",
        content: `
### 币安AI龙爪手

币安AI龙爪手是一个基于 OpenClaw AI 的智能加密货币交易助手，让 AI 帮你自动捕捉交易机会，用大数据和高胜率策略自动赚钱。

### 核心价值

**省心省力，躺赢市场**
- AI 24/7 监控市场
- 自动执行交易策略
- 无需盯盘，智能决策

**OpenClaw AI 驱动**
- 6551 MCP 数据接入
- Twitter 情绪分析
- 多维度策略决策

**安全可靠**
- 本地隐私保护
- 风险控制机制
- 紧急停止功能

### 主题配色

系统提供两套主题风格：

| 主题 | 风格 | 适用场景 |
|------|------|----------|
| 冷蓝 | 专业、冷静 | 深度交易分析 |
| 多巴胺 | 活泼、温暖 | 日常监控查看 |

点击顶部导航栏的主题切换按钮即可切换。
        `,
      },
      {
        title: "功能概览",
        description: "主要功能模块介绍",
        content: `
### 功能模块

| 功能 | 路径 | 说明 |
|------|------|------|
| 仪表盘 | /dashboard | Agent 监控、持仓、交易记录 |
| Agent 指南 | /agent | OpenClaw Agent 配置全指南 |
| 资金流 | /heat-map | 鲸鱼资金流向追踪 |
| 社交雷达 | /radar | Twitter/X 情绪分析 |
| DeFi | /defi | 多链 DEX 价格聚合 |
| 策略实验室 | /lab | 低代码策略构建和回测 |
| 设置 | /settings | Binance API、Square 配置 |
| 文档 | /docs | 详细使用说明 |

### UI 配色方案

系统内置两套配色方案，可通过右上角切换按钮切换：

**冷蓝主题**
- 主色：青色
- 风格：专业、冷静
- 适合：深度分析

**多巴胺主题**
- 主色：粉色
- 风格：活泼、温暖
- 适合：日常监控
        `,
      },
    ],
  },
  {
    id: "setup",
    icon: Key,
    title: "快速开始",
    items: [
      {
        title: "第一步：配置 Binance API",
        description: "设置币安交易 API 密钥",
        content: `
### 获取 Binance API 密钥

1. 登录 [Binance](https://www.binance.com)
2. 进入「个人中心」→「API 管理」
3. 点击「创建 API」
4. 设置标签和权限：
   - ✅ **启用现货交易**
   - ❌ 启用期货交易（如不需要）
   - ❌ **启用提币**（安全考虑，强烈建议禁用）
5. 完成 Google 验证
6. 记录 API Key 和 Secret Key

### IP 白名单设置

强烈建议设置 IP 白名单：
1. 在 API 管理 → 点击 API 标签
2. 在「IP 访问限制」中添加服务器 IP
3. 限制为固定 IP 或 IP 段

### 推荐先用测试网

测试网地址：https://testnet.binance.vision
测试币领取：https://testnet.binance.vision/faucet

### 在币安AI龙爪手中配置

1. 点击「设置」→「币安交易」
2. 选择环境（测试网/正式网）
3. 输入 API Key 和 Secret
4. 点击「测试连接」
5. 测试成功后点击「保存配置」
        `,
      },
      {
        title: "第二步：配置 Binance Square",
        description: "设置自动发帖功能",
        content: `
### 什么是 Binance Square

Binance Square 是币安的社交平台，用户可以发布交易观点、分享策略。

### 自动发帖功能

开启后，当策略执行时会自动发布内容：
- 交易完成通知
- 市场分析观点
- 套利机会预警

### 配置步骤

1. 获取 Binance Square API Key（只需 Key，不需要 Secret）
2. 点击「设置」→「Binance Square」
3. 启用「自动发帖」开关
4. 输入 API Key
5. 点击「测试发帖」验证
6. 点击「保存配置」

### 注意事项

- 确保内容合规，避免夸大宣传
- 保护个人隐私，不暴露实际仓位
- 定期检查发布内容
        `,
      },
      {
        title: "第三步：配置 OpenClaw",
        description: "设置 AI 引擎服务",
        content: `
### OpenClaw AI 简介

OpenClaw AI 是币安AI龙爪手的核心引擎，提供市场分析、策略决策功能。

### MCP 服务集成

通过 6551 MCP 服务接入数据源：
- **OpenTwitter**: Twitter/X 数据访问
- **OpenNews**: 加密货币新闻聚合

### 配置流程

**1. 获取 6551 Token**
\`\`\`
访问: https://6551.io/mcp
获取 Token 后保存
\`\`\`

**2. 配置 OpenClaw**
\`\`\`
# 配置文件位置
~/.openclaw/6551-config.json

# 配置内容
{
  "token": "YOUR_TOKEN",
  "apiBase": "https://ai.6551.io"
}
\`\`\`

**3. 启动 OpenClaw**
\`\`\`
# 启动服务（默认端口 18789）
npm start

# 验证服务
curl http://localhost:18789/health
\`\`\`

**4. 在币安AI龙爪手中配置**
1. 点击「设置」→「OpenClaw」
2. 输入 Base URL（默认：http://localhost:18789）
3. 输入 API Key（可选）
4. 点击「保存配置」
        `,
      },
      {
        title: "第四步：启动 Agent",
        description: "启动智能交易 Agent",
        content: `
### 启动 Agent

1. 点击顶部导航「Agent 指南」
2. 按照 Agent 配置文档完成设置
3. 回到「仪表盘」页面
4. 点击「启动 Agent」按钮

### Agent 状态监控

在「仪表盘」可以查看：
- Agent 运行状态（运行中/已停止/错误）
- 运行时长
- 当前持仓数量
- 总交易数
- 胜率统计

### 紧急停止

如需立即停止交易：
- 点击「暂停 Agent」按钮
- Agent 会等待当前订单完成后安全停止
- 持仓部分建议在市况稳定时手动平仓

### 风险控制

推荐配置以下风险参数：
- 单次交易最大比例：不超过 5%
- 最大持仓数：不超过 3 个
- 每日最大亏损：不超过 3%
- 止盈设置：3-5%
- 止损设置：2%
        `,
      },
    ],
  },
  {
    id: "features",
    icon: Heart,
    title: "功能详解",
    items: [
      {
        title: "仪表盘",
        description: "Agent 监控和交易记录",
        content: `
### Agent 状态卡片

显示 Agent 实时运行状态：
- 状态指示灯（绿色=运行中）
- 运行时长统计
- 最后交易时间
- 当前持仓数
- 总交易数
- 胜率百分比

### 资产概览

| 指标 | 说明 |
|------|------|
| 总资产 | 账户总价值 |
| 今日收益 | 当日盈亏和百分比 |
| 本周收益 | 本周累计收益 |
| 本周表现 | 日收益柱状图 |

### 当前持仓

显示所有未平仓仓位：
- 交易对和方向
- 进场价格、当前价格
- 浮动盈亏
- 触发原因

### 最近交易

显示最近的交易记录：
- 交易对和方向
- 交易金额
- 盈亏情况
- 触发原因（Twitter情绪、RSI超卖等）
        `,
      },
      {
        title: "Agent 指南",
        description: "OpenClaw Agent 完整配置",
        content: `
### Agent 配置范围

Agent 指南页面包含以下配置章节：

1. **Agent 概览** - 了解 Agent 架构和工作流程
2. **环境配置** - OpenClaw、Binance API 配置
3. **MCP 服务** - OpenTwitter、OpenNews 配置
4. **创建 Agent** - Agent 配置文件编写
5. **启动 Agent** - 本地和远程部署方式
6. **监控与管理** - 状态监控和紧急停止
7. **高级功能** - 自定义信号源、多策略组合
8. **常见问题** - 故障排查和优化建议

### Agent 示例配置

\`\`\`json
{
  "name": "crypto-trading-agent",
  "settings": {
    "maxPositionSize": 0.05,
    "maxPositions": 3,
    "dailyLossLimit": 0.03,
    "takeProfitPercent": 0.05,
    "stopLossPercent": 0.02
  },
  "binance": {
    "tradePairs": ["BTCUSDT", "ETHUSDT", "SOLUSDT"],
    "testnet": false
  },
  "square": {
    "autoPost": true
  }
}
\`\`\`

详细配置请查看「Agent 指南」页面。
        `,
      },
      {
        title: "策略实验室",
        description: "低代码策略构建",
        content: `
### 策略组件

**触发条件类型**
- 价格条件：高于/低于/等于某价格
- 技术指标：RSI、MACD、布林带、EMA
- 成交量：交易量放大/缩小
- 社交情绪：Twitter 情绪指数变化
- 资金流：大额交易流入/流出

**执行动作**
- 买入/卖出
- 开仓/平仓
- 设置止盈止损
- 发送通知（Telegram/Square）
- 平仓所有持仓

### 策略模板

内置策略模板：
- **RSI 超卖买入**: RSI < 30 时买入
- **RSI 超买卖出**: RSI > 70 时卖出
- **突破交易**: 价格突破阻力位买入
- **社交情绪跟随**: Twitter 情绪高涨时买入
- **鲸鱼跟单**: 大额流入时跟随买入

### 回测功能

使用历史数据验证策略：
- 选择回测时间范围
- 计算胜率、总收益、最大回撤
- 查看每笔交易明细
- Sharpe 比率评估策略质量
        `,
      },
    ],
  },
  {
    id: "faq",
    icon: MessageSquare,
    title: "常见问题",
    items: [
      {
        title: "端口配置",
        description: "修改应用运行端口",
        content: `
### 默认端口

币安AI龙爪手默认运行在端口 **8848**

访问地址：http://localhost:8848

### 修改端口

编辑 \`package.json\`：

\`\`\`json
{
  "scripts": {
    "dev": "next dev -p 你的端口"
  }
}
\`\`\`

### 端口冲突

如果 8848 端口被占用：

\`\`\`bash
# 查看端口占用
lsof -i :8848

# 停止占用进程
kill -9 <进程ID>
\`\`\`
        `,
      },
      {
        title: "连接失败排查",
        description: "API 连接问题",
        content: `
### 问题症状

- 显示 "Connection error"
- 数据无法刷新
- Agent 无法启动

### 排查步骤

1. **检查网络连接**
   \`\`\`bash
   ping api.binance.com
   curl http://localhost:18789/health
   \`\`\`

2. **验证 API 密钥**
   - 确认 Key 和 Secret 正确复制
   - 检查是否有过期
   - 确认 IP 白名单配置正确

3. **检查 OpenClaw 服务**
   \`\`\`bash
   # 查看 OpenClaw 是否运行
   lsof -i :18789

   # 查看服务日志
   tail -f ~/.openclaw/logs/agent.log
   \`\`\`

4. **清除缓存**
   \`\`\`bash
   rm -rf .next
   npm run dev
   \`\`\`
        `,
      },
      {
        title: "安全使用建议",
        description: "保护资产安全",
        content: `
### API 安全

- ✅ 仅启用交易权限，禁用提币
- ✅ 设置 IP 白名单限制
- ✅ 定期轮换 API 密钥
- ✅ 先在测试网验证策略

### 风险控制

- ✅ 设置最大持仓限制
- ✅ 设置每日最大亏损
- ✅ 配置止盈止损参数
- ✅ 定期检查交易记录

### 隐私保护

- ✅ 不要在 Square 发布真实仓位
- ✅ 不要暴露具体账户信息
- ✅ 交易数据本地存储
- ✅ OpenClaw 服务本地运行

### 应急措施

如遇异常情况：
1. 立即点击「暂停 Agent」
2. 手动平仓所有持仓
3. 撤销所有挂单
4. 临时禁用 API 密钥
        `,
      },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [activeItem, setActiveItem] = useState(0);

  const activeSectionData = sections.find((s) => s.id === activeSection);
  const activeContent = activeSectionData?.items[activeItem]?.content || "";
  const codeBlocks = activeContent.match(/```[\s\S]*?```/g) || [];

  // Get the active section icon and title safely
  const SectionIcon = activeSectionData?.icon ? activeSectionData.icon : BookOpen;
  const sectionTitle = activeSectionData?.title || "文档";

  return (
    <div className="min-h-screen bg-grid relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 glass-elevated">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h1 className="text-xl font-bold text-white neon-cyan">币安AI龙爪手</h1>
                <p className="text-xs text-zinc-500">帮助文档</p>
              </div>
            </div>
            <AppNav />
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-cyan-400">首页</Link>
            <span>/</span>
            <span className="text-white">文档</span>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 sticky top-32 self-start">
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
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "hover:bg-zinc-800 text-zinc-400"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <SectionIcon className="w-6 h-6 text-cyan-400" />
                    <CardTitle className="text-2xl">{sectionTitle}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items list */}
                  <div className="space-y-2">
                    {activeSectionData?.items.map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-all",
                          activeItem === index
                            ? "border-cyan-500 bg-zinc-800/50"
                            : "border-zinc-800 hover:border-zinc-700"
                        )}
                        onClick={() => setActiveItem(index)}
                      >
                        <div className="font-semibold text-white mb-1">{item.title}</div>
                        <div className="text-sm text-zinc-400">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detail View */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{activeSectionData?.items[activeItem]?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-zinc-300" />

                    {/* Render content */}
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
                          .replace(/\n\n+/g, '</p><p class="my-4">')
                          .replace(/^-$/gm, '</li><li class="text-zinc-300 ml-4">-')
                          .replace(/❌/g, '<span class="text-rose-400">❌</span>')
                          .replace(/✅/g, '<span class="text-green-400">✅</span>')
                          .replace(/\|([^|]+)\|/g, '<span class="text-yellow-400">$1</span>');

                        return (
                          <div
                            key={idx}
                            className="text-zinc-300 space-y-2"
                            dangerouslySetInnerHTML={{ __html: `<p>${formatted}</p>` }}
                          />
                        );
                      }

                      const cleanCode = part.replace(/^\w+\n/, '');
                      const langMatch = part.match(/^(\w+)\n/);
                      const lang = langMatch ? langMatch[1] : 'bash';

                      return (
                        <div key={idx} className="my-4">
                          <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto border border-zinc-700">
                            <pre className="text-sm text-green-400">{cleanCode}</pre>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
