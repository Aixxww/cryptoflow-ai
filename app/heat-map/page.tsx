"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, getRelativeTime, truncateAddress } from "@/lib/utils";
import { useHeatMapStore } from "@/store";
import { useEffect, useState } from "react";
import { Waves, RefreshCw, Filter, ArrowUpRight, ArrowDownRight, Activity, AlertTriangle } from "lucide-react";

export default function HeatMapPage() {
  const {
    transactions,
    flowMap,
    totalVolume,
    riskLevel,
    hotWallets,
    isLoading,
    timeRange,
    selectedChains,
    minAmount,
    setTimeRange,
    setSelectedChains,
    setMinAmount,
    setLoading,
    setData,
    reset,
  } = useHeatMapStore();
  const [isPlaying, setIsPlaying] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    const mockData = {
      transactions: [
        {
          hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          from: "0xabcdef1234567890abcdef1234567890abcdef12",
          to: "0xfedcba0987654321fedcba0987654321fedcba09",
          amount: 5000000,
          symbol: "USDT",
          timestamp: Date.now() - 5 * 60 * 1000,
          type: "in",
          exchange: "Binance",
        },
        {
          hash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
          from: "0x1111112222223333334444445555556666667777",
          to: "0x8888889999990000001111112222223333334444",
          amount: 250000,
          symbol: "BTC",
          timestamp: Date.now() - 15 * 60 * 1000,
          type: "out",
          exchange: "Coinbase",
        },
        {
          hash: "0xaabbccddeeff11223344556677889900ffaabbccddeeff11223344556677889900",
          from: "0x9876543210abcdef9876543210abcdef98765432",
          to: "0x0123456789abcdef0123456789abcdef01234567",
          amount: 10000000,
          symbol: "ETH",
          timestamp: Date.now() - 30 * 60 * 1000,
          type: "in",
          exchange: "Kraken",
        },
      ],
      flowMap: {
        "Binance": { in: 15000000, out: 5000000, net: 10000000 },
        "Coinbase": { in: 250000, out: 5000000, net: -4750000 },
        "Kraken": { in: 10000000, out: 0, net: 10000000 },
      },
      totalVolume: 25250000,
      riskLevel: "medium" as const,
      hotWallets: [
        "0xabcdef1234567890abcdef1234567890abcdef12",
        "0x9876543210abcdef9876543210abcdef98765432",
      ],
    };

    setTimeout(() => setData(mockData), 500);
  }, [setData]);

  const chains = ["ethereum", "bsc", "solana", "tron"];

  const getRiskColor = (level: typeof riskLevel) => {
    switch (level) {
      case "low": return "text-green-400 bg-green-400/10";
      case "medium": return "text-yellow-400 bg-yellow-400/10";
      case "high": return "text-rose-400 bg-rose-400/10";
      default: return "text-gray-400";
    }
  };

  const getRiskText = (level: typeof riskLevel) => {
    switch (level) {
      case "low": return "低风险";
      case "medium": return "中等风险";
      case "high": return "高风险";
      default: return "未知";
    }
  };

  const flowEntries = Object.entries(flowMap);
  const maxFlow = Math.max(...flowEntries.map(([, v]) => Math.max(v.in, v.out)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Waves className="w-6 h-6 text-cyan-400" />
            资金流追踪
          </h1>
          <p className="text-sm text-zinc-400">实时追踪鲸鱼和聪明钱流向</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLoading(!isLoading)}>
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "暂停" : "播放"}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">总资金流</div>
            <div className="text-2xl font-bold text-cyan-400">{formatCurrency(totalVolume)}</div>
            <div className="text-xs text-zinc-500 mt-1">{timeRange}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">交易笔数</div>
            <div className="text-2xl font-bold text-white">{transactions.length}</div>
            <div className="text-xs text-green-400 mt-1">+{transactions.length * 2} 新增</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">风险等级</div>
            <div className={cn("text-2xl font-bold px-3 py-1 rounded-full text-sm", getRiskColor(riskLevel))}>
              {getRiskText(riskLevel)}
            </div>
            <div className="text-xs text-zinc-500 mt-1">基于大额转账</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">活跃钱包</div>
            <div className="text-2xl font-bold text-purple-400">{hotWallets.length}</div>
            <div className="text-xs text-zinc-500 mt-1">热钱包</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            筛选条件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">时间范围:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="1h">1小时</option>
                <option value="6h">6小时</option>
                <option value="24h">24小时</option>
                <option value="7d">7天</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">最小金额:</span>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white w-32 focus:outline-none focus:border-cyan-400"
                step="10000"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">链:</span>
              <div className="flex gap-2">
                {chains.map((chain) => (
                  <button
                    key={chain}
                    onClick={() => setSelectedChains(
                      selectedChains.includes(chain)
                        ? selectedChains.filter(c => c !== chain)
                        : [...selectedChains, chain]
                    )}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      selectedChains.includes(chain)
                        ? "bg-cyan-500 text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    )}
                  >
                    {chain.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                资金流向图
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flowEntries.map(([exchange, data], idx) => (
                  <div key={exchange} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-cyan" />
                        <span className="text-white font-medium">{exchange}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          data.net > 0 ? "bg-green-500/20 text-green-400" : data.net < 0 ? "bg-rose-500/20 text-rose-400" : "bg-zinc-700 text-zinc-400"
                        )}>
                          {data.net > 0 ? "+" : ""}{formatCurrency(data.net)}
                        </span>
                      </div>
                      <div className="text-zinc-400 text-xs">{formatCurrency(data.in + data.out)}</div>
                    </div>
                    <div className="h-6 flex gap-1 rounded-lg overflow-hidden bg-zinc-900">
                      <div
                        className="flex items-center justify-end pr-2 text-xs text-white transition-all duration-500 bg-green-500/30"
                        style={{ width: `${(data.in / maxFlow) * 100}%` }}
                      >
                        {data.in > maxFlow * 0.1 && "流入"}
                      </div>
                      <div
                        className="flex items-center justify-start pl-2 text-xs text-white transition-all duration-500 bg-rose-500/30"
                        style={{ width: `${(data.out / maxFlow) * 100}%` }}
                      >
                        {data.out > maxFlow * 0.1 && "流出"}
                      </div>
                    </div>
                  </div>
                ))}
                {flowEntries.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    暂无数据
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="mt-6">
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                大额交易
              </CardTitle>
              <Button variant="ghost" size="sm">查看全部</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.hash}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        tx.type === "in" ? "bg-green-500/20 text-green-400" : "bg-rose-500/20 text-rose-400"
                      )}>
                        {tx.type === "in" ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-white">{formatCurrency(tx.amount)} {tx.symbol}</div>
                        <div className="text-xs text-zinc-500">
                          {tx.exchange} • {getRelativeTime(tx.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 font-mono">{truncateAddress(tx.to)}</div>
                      <div className="text-xs text-zinc-500">{truncateAddress(tx.from)}</div>
                    </div>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    暂无交易数据
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                实时预警
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "warning", message: "大额 BTC 流出 Coinbase", time: "2分钟前" },
                  { type: "info", message: "USDT 大量流入 Binance", time: "5分钟前" },
                  { type: "alert", message: "检测到疑似洗钱行为", time: "15分钟前" },
                ].map((alert, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-3 rounded-lg border-l-2",
                      alert.type === "warning" && "border-yellow-500 bg-yellow-500/10",
                      alert.type === "info" && "border-cyan-500 bg-cyan-500/10",
                      alert.type === "alert" && "border-rose-500 bg-rose-500/10"
                    )}
                  >
                    <div className="text-sm text-white">{alert.message}</div>
                    <div className="text-xs text-zinc-500 mt-1">{alert.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>热钱包监控</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hotWallets.slice(0, 5).map((wallet, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                    <div className="text-sm font-mono text-zinc-400">{truncateAddress(wallet)}</div>
                    <div className="text-xs text-cyan-400">活跃</div>
                  </div>
                ))}
                {hotWallets.length === 0 && (
                  <div className="text-center py-6 text-zinc-500 text-sm">
                    暂无热钱包
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
