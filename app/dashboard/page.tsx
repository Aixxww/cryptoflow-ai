"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Clock,
  Share2,
  RefreshCw,
  Play,
  Pause,
  Settings,
  AlertCircle,
  Bot,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AppNav } from "@/components/AppNav";

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

// Mock data - would come from OpenClaw API in production
const mockAgentStatus = {
  status: "running" as "running" | "stopped" | "error",
  uptime: "2d 14h 32m",
  lastTrade: "2026-03-14 14:25:10",
  activePositions: 2,
  totalTrades: 156,
  winRate: 67.3,
};

const initialPortfolio = {
  totalValue: 12450.67,
  todayPnl: 342.50,
  todayPnlPercent: 2.84,
  positions: [
    {
      symbol: "BTCUSDT",
      side: "LONG",
      entryPrice: 67250.50,
      currentPrice: 68320.00,
      quantity: 0.05,
      pnl: 53.38,
      pnlPercent: 1.59,
      size: 3362.53,
    },
    {
      symbol: "ETHUSDT",
      side: "LONG",
      entryPrice: 3450.20,
      currentPrice: 3520.00,
      quantity: 1.2,
      pnl: 83.76,
      pnlPercent: 2.02,
      size: 4224.24,
    },
  ],
  assets: [
    { symbol: "USDT", balance: 4863.90, value: 4863.90 },
    { symbol: "BTC", balance: 0.05, value: 3416.00 },
    { symbol: "ETH", balance: 1.2, value: 4224.00 },
  ],
};

const mockTrades = [
  {
    id: "1",
    symbol: "SOLUSDT",
    side: "BUY",
    price: 145.20,
    quantity: 10,
    value: 1452.00,
    pnl: 23.50,
    pnlPercent: 1.62,
    status: "CLOSED",
    timestamp: "2026-03-14 14:25:10",
    trigger: "RSI Oversold, High Momentum",
  },
  {
    id: "2",
    symbol: "PEPEUSDT",
    side: "SELL",
    price: 0.00001850,
    quantity: 1000000,
    value: 18.50,
    pnl: -3.20,
    pnlPercent: -0.22,
    status: "CLOSED",
    timestamp: "2026-03-14 13:15:22",
    trigger: "Stop Loss Triggered",
  },
  {
    id: "3",
    symbol: "BTCUSDT",
    side: "BUY",
    price: 67250.50,
    quantity: 0.05,
    value: 3362.53,
    pnl: 53.38,
    pnlPercent: 1.59,
    status: "OPEN",
    timestamp: "2026-03-14 12:30:00",
    trigger: "Twitter Sentiment Surge (@binance)",
  },
  {
    id: "4",
    symbol: "ETHUSDT",
    side: "BUY",
    price: 3450.20,
    quantity: 1.2,
    value: 4224.24,
    pnl: 83.76,
    pnlPercent: 2.02,
    status: "OPEN",
    timestamp: "2026-03-14 11:45:33",
    trigger: "Momentum Breakout",
  },
  {
    id: "5",
    symbol: "DOGEUSDT",
    side: "SELL",
    price: 0.1520,
    quantity: 5000,
    value: 760.00,
    pnl: 45.60,
    pnlPercent: 3.02,
    status: "CLOSED",
    timestamp: "2026-03-14 10:20:15",
    trigger: "Take Profit Reached",
  },
];

const mockSquarePosts = [
  {
    id: "1",
    type: "trade",
    content: "交易完成: SOLUSDT | 进场: $145.20 | 出场: $147.55 | 收益: +1.62% 📈",
    timestamp: "2026-03-14 14:26:00",
    likes: 124,
    comments: 8,
  },
  {
    id: "2",
    type: "analysis",
    content: "市场情绪分析: BTC 持续走强，突破 $68K 阻力位。ETH 紧跟其后，DeFi 板块活跃度上升。建议关注相关代币机会 🔥",
    timestamp: "2026-03-14 13:00:00",
    likes: 256,
    comments: 34,
  },
  {
    id: "3",
    type: "alert",
    content: "套利机会预警: Binance/USDT 与 Binance/BUSD 之间发现小幅价格差异，适合快速套利",
    timestamp: "2026-03-14 11:00:00",
    likes: 89,
    comments: 12,
  },
];

const mockPerformance = {
  weekly: [
    { date: "03-08", pnl: 124.50, trades: 12, winRate: 66.7 },
    { date: "03-09", pnl: -56.30, trades: 8, winRate: 50.0 },
    { date: "03-10", pnl: 234.80, trades: 15, winRate: 73.3 },
    { date: "03-11", pnl: 189.20, trades: 11, winRate: 72.7 },
    { date: "03-12", pnl: 312.40, trades: 18, winRate: 77.8 },
    { date: "03-13", pnl: -23.50, trades: 6, winRate: 50.0 },
    { date: "03-14", pnl: 342.50, trades: 14, winRate: 78.6 },
  ],
  totalPnl: 1123.60,
  totalTrades: 84,
  avgTradesPerDay: 12,
  bestDay: 312.40,
  worstDay: -56.30,
};

export default function DashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [agentStatus, setAgentStatus] = useState(mockAgentStatus);
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const toggleAgent = () => {
    setAgentStatus({
      ...agentStatus,
      status: agentStatus.status === "running" ? "stopped" : "running",
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatPrice = (num: number) => {
    if (num >= 1) {
      return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (num >= 0.01) {
      return num.toFixed(4);
    } else {
      return num.toFixed(8);
    }
  };

  const [prices, setPrices] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/prices');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPrices(data);

          // Update portfolio positions and assets with live prices
          const updatedPositions = portfolio.positions.map(pos => {
            const livePrice = data.find((p: PriceData) => p.symbol === pos.symbol);
            if (livePrice) {
              return {
                ...pos,
                currentPrice: livePrice.price,
                pnl: pos.side === 'LONG'
                  ? (livePrice.price - pos.entryPrice) * pos.quantity
                  : (pos.entryPrice - livePrice.price) * pos.quantity,
                pnlPercent: pos.side === 'LONG'
                  ? ((livePrice.price - pos.entryPrice) / pos.entryPrice) * 100
                  : ((pos.entryPrice - livePrice.price) / pos.entryPrice) * 100,
              };
            }
            return pos;
          });

          const updatedAssets = portfolio.assets.map(asset => {
            if (asset.symbol === 'USDT') return asset;
            const livePrice = data.find((p: PriceData) => p.symbol === `${asset.symbol}USDT`);
            if (livePrice) {
              return {
                ...asset,
                value: asset.balance * livePrice.price,
              };
            }
            return asset;
          });

          const totalValue = updatedPositions.reduce((sum, pos) => sum + pos.size, 0) +
            updatedAssets.reduce((sum, asset) => sum + asset.value, 0);

          setPortfolio({
            ...portfolio,
            positions: updatedPositions,
            assets: updatedAssets,
            totalValue,
          });
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400";
      case "stopped":
        return "text-zinc-400";
      case "error":
        return "text-rose-400";
      default:
        return "text-zinc-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-400";
      case "stopped":
        return "bg-zinc-400";
      case "error":
        return "bg-rose-400";
      default:
        return "bg-zinc-400";
    }
  };

  const maxPnl = Math.max(...mockPerformance.weekly.map((d) => d.pnl), 1);
  const minPnl = Math.min(...mockPerformance.weekly.map((d) => d.pnl), 0);

  return (
    <div className="min-h-screen bg-grid relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 glass-elevated">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-lg font-bold text-white">交易仪表盘</h1>
                  <p className="text-xs text-zinc-500">OpenClaw Agent 监控面板</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
                  刷新
                </Button>
                <Button
                  variant={agentStatus.status === "running" ? "destructive" : "primary"}
                  size="sm"
                  onClick={toggleAgent}
                >
                  {agentStatus.status === "running" ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {agentStatus.status === "running" ? "暂停" : "启动"}
                </Button>
                <Link href="/settings">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <AppNav />
          </div>
        </header>

        {/* Mobile Bottom Nav */}
        <AppNav variant="bottom" />

        <div className="container mx-auto px-4 py-6 space-y-6 pb-24 md:pb-6">
          {/* Agent Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full", getStatusBg(agentStatus.status))} />
                  <CardTitle className="text-lg">Agent 状态</CardTitle>
                </div>
                <span className={cn("text-sm font-medium", getStatusColor(agentStatus.status))}>
                  {agentStatus.status === "running" ? "运行中" : agentStatus.status === "stopped" ? "已停止" : "错误"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">运行时间</div>
                  <div className="text-sm font-medium text-white">{agentStatus.uptime}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">最后交易</div>
                  <div className="text-sm font-medium text-white">{agentStatus.lastTrade}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">当前持仓</div>
                  <div className="text-sm font-medium text-white">{agentStatus.activePositions}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">总交易数</div>
                  <div className="text-sm font-medium text-white">{agentStatus.totalTrades}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">胜率</div>
                  <div className="text-sm font-medium text-cyan-400">{agentStatus.winRate}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                  <CardTitle>总资产</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">${formatNumber(portfolio.totalValue)}</div>
                <div className="flex items-center gap-2 mt-2">
                  {portfolio.todayPnl >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-rose-400" />
                  )}
                  <span className={cn("text-sm", portfolio.todayPnl >= 0 ? "text-green-400" : "text-rose-400")}>
                    {portfolio.todayPnl >= 0 ? "+" : ""}${formatNumber(portfolio.todayPnl)} (
                    {portfolio.todayPnlPercent}%)
                  </span>
                  <span className="text-xs text-zinc-500 ml-2">今日收益</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <CardTitle>本周收益</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  +${formatNumber(mockPerformance.totalPnl)}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-zinc-500">总交易</span>
                    <span className="text-white ml-1">{mockPerformance.totalTrades}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">日均交易</span>
                    <span className="text-white ml-1">{mockPerformance.avgTradesPerDay}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <CardTitle>本周表现</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-end h-16">
                  {mockPerformance.weekly.map((d, i) => {
                    const chartHeight = 200;
                    const barHeight = Math.round(
                      ((d.pnl - minPnl) / (maxPnl - minPnl || 1)) * chartHeight * 0.8 + chartHeight * 0.1
                    );
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className={cn(
                            "w-full rounded-sm transition-all min-h-2",
                            d.pnl >= 0 ? "bg-green-500/50" : "bg-rose-500/50"
                          )}
                          style={{ height: `${Math.max(barHeight, 8)}px` }}
                        />
                        <span className="text-xs text-zinc-500">{d.date}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <span className="text-zinc-500">最佳</span>
                    <span className="text-green-400 ml-1">+${formatNumber(mockPerformance.bestDay)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">最差</span>
                    <span className="text-rose-400 ml-1">${formatNumber(mockPerformance.worstDay)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Positions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <CardTitle>当前持仓</CardTitle>
                  </div>
                  <span className="text-sm text-zinc-500">{portfolio.positions.length} 个</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {portfolio.positions.map((pos) => (
                  <div key={pos.symbol} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{pos.symbol}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          pos.side === "LONG" ? "bg-green-500/20 text-green-400" : "bg-rose-500/20 text-rose-400"
                        )}>
                          {pos.side}
                        </span>
                      </div>
                      <div className={cn(
                        "text-sm font-semibold",
                        pos.pnl >= 0 ? "text-green-400" : "text-rose-400"
                      )}>
                        {pos.pnl >= 0 ? "+" : ""}${formatNumber(pos.pnl)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-zinc-500">进场</span>
                        <div className="text-zinc-300">${formatPrice(pos.entryPrice)}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500">现价</span>
                        <div className="text-zinc-300">${formatPrice(pos.currentPrice)}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500">盈亏</span>
                        <div className={cn(
                          "font-medium",
                          pos.pnlPercent >= 0 ? "text-green-400" : "text-rose-400"
                        )}>
                          {pos.pnlPercent >= 0 ? "+" : ""}{pos.pnlPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {portfolio.positions.length === 0 && (
                  <div className="text-center py-8 text-zinc-500">
                    暂无持仓
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <CardTitle>最近交易</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    查看全部
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockTrades.slice(0, 5).map((trade) => (
                  <div
                    key={trade.id}
                    className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{trade.symbol}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          trade.side === "BUY" ? "bg-green-500/20 text-green-400" : "bg-rose-500/20 text-rose-400"
                        )}>
                          {trade.side === "BUY" ? "买入" : "卖出"}
                        </span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          trade.status === "OPEN" ? "bg-yellow-500/20 text-yellow-400" : "bg-zinc-700 text-zinc-400"
                        )}>
                          {trade.status === "OPEN" ? "持仓中" : "已平仓"}
                        </span>
                      </div>
                      <div className={cn(
                        " text-sm font-semibold",
                        trade.pnl >= 0 ? "text-green-400" : "text-rose-400"
                      )}>
                        {trade.pnl >= 0 ? "+" : ""}${formatNumber(trade.pnl)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-zinc-500">金额:</span>
                        <span className="text-zinc-300 ml-1">${formatNumber(trade.value)}</span>
                      </div>
                      <div className="text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trade.timestamp}
                      </div>
                    </div>
                    {trade.trigger && (
                      <div className="mt-2 text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded inline-block">
                        {trade.trigger}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Asset Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-purple-400" />
                  <CardTitle>资产分布</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolio.assets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{asset.symbol}</div>
                          <div className="text-xs text-zinc-500">
                            {asset.balance >= 1 ? formatNumber(asset.balance) : formatPrice(asset.balance)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">${formatNumber(asset.value)}</div>
                        <div className="text-xs text-zinc-500">
                          {((asset.value / portfolio.totalValue) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Square Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-pink-400" />
                    <CardTitle>Binance Square</CardTitle>
                  </div>
                  <Link href="https://www.binance.com/square" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="text-xs">
                      查看全部
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSquarePosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex gap-2 mb-2">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded",
                        post.type === "trade" ? "bg-green-500/20 text-green-400" :
                        post.type === "analysis" ? "bg-blue-500/20 text-blue-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      )}>
                        {post.type === "trade" ? "交易" : post.type === "analysis" ? "分析" : "预警"}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-2">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </div>
                      <div className="flex items-center gap-3">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Warning Note */}
          <Card className="border-rose-500/30 bg-rose-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-zinc-400">
                  <p className="text-rose-400 font-medium mb-1">风险提示</p>
                  <p>加密货币交易存在高风险，Agent 自动化交易可能导致资金损失。请：</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>仅在测试网验证策略后再使用正式网</li>
                    <li>设置合理的风险控制参数（止损、最大仓位）</li>
                    <li>定期检查 Agent 运行状态和交易记录</li>
                    <li>遇到异常情况立即使用"紧急停止"功能</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
