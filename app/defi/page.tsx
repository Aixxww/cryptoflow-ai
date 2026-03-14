"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { useDeFiAggregatorStore } from "@/store";
import { useEffect, useState } from "react";
import { Layers, RefreshCw, ArrowRight, TrendingUp, DollarSign, Network, BarChart3 } from "lucide-react";

export default function DeFiPage() {
  const {
    prices,
    arbitrage,
    bestRoute,
    isLoading,
    selectedToken,
    selectedChains,
    minLiquidity,
    minSpread,
    showOnlyProfit,
    setData,
    setSelectedToken,
    setSelectedChains,
    setMinLiquidity,
    setMinSpread,
    setShowOnlyProfit,
  } = useDeFiAggregatorStore();

  // 模拟数据加载
  useEffect(() => {
    const mockData = {
      prices: [
        { chain: "ethereum", dex: "Uniswap V3", pair: "WETH/USDC", price: 3450.75, liquidity: 25000000, volume24h: 15000000 },
        { chain: "ethereum", dex: "Curve", pair: "WETH/USDC", price: 3450.20, liquidity: 50000000, volume24h: 8000000 },
        { chain: "ethereum", dex: "SushiSwap", pair: "WETH/USDC", price: 3450.90, liquidity: 8000000, volume24h: 5000000 },
        { chain: "bsc", dex: "PancakeSwap", pair: "WBNB/USDT", price: 620.50, liquidity: 15000000, volume24h: 10000000 },
        { chain: "bsc", dex: "Biswap", pair: "WBNB/USDT", price: 620.40, liquidity: 5000000, volume24h: 3000000 },
        { chain: "polygon", dex: "QuickSwap", pair: "WMATIC/USDC", price: 1.25, liquidity: 10000000, volume24h: 5000000 },
        { chain: "arbitrum", dex: "Uniswap V3", pair: "WETH/USDC", price: 3450.80, liquidity: 15000000, volume24h: 8000000 },
      ],
      arbitrage: [
        {
          token: "WETH/USDC",
          buyOn: { dex: "Curve", chain: "ethereum", price: 3450.20 },
          sellOn: { dex: "SushiSwap", chain: "ethereum", price: 3450.90 },
          spread: 0.20,
          estimatedProfit: 574,
          liquidity: 8000000,
        },
        {
          token: "WBNB/USDT",
          buyOn: { dex: "Biswap", chain: "bsc", price: 620.40 },
          sellOn: { dex: "PancakeSwap", chain: "bsc", price: 620.50 },
          spread: 0.16,
          estimatedProfit: 161,
          liquidity: 5000000,
        },
        {
          token: "BTC/USDT",
          buyOn: { dex: "Uniswap V3", chain: "ethereum", price: 67500 },
          sellOn: { dex: "PancakeSwap", chain: "bsc", price: 67580 },
          spread: 0.12,
          estimatedProfit: 1184,
          liquidity: 20000000,
        },
      ],
      bestRoute: {
        price: 3450.95,
        path: ["USDC", "WETH"],
      },
    };

    setTimeout(() => setData(mockData), 500);
  }, [setData]);

  const chains = ["ethereum", "bsc", "polygon", "arbitrum", "optimism"];
  const tokens = ["WETH/USDC", "WBNB/USDT", "BTC/USDT", "SOL/USDC", "PEPE/ETH"];

  const filteredArbitrage = showOnlyProfit
    ? arbitrage.filter(a => a.estimatedProfit > 0)
    : arbitrage;

  const chainIcons: Record<string, any> = {
    ethereum: "⟠",
    bsc: "BNB",
    polygon: "MATIC",
    arbitrum: "⟠",
    optimism: "OP",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            DeFi 聚合器
          </h1>
          <p className="text-sm text-zinc-400">多链 DEX 价格聚合与套利机会扫描</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setData({ prices, arbitrage, bestRoute })}>
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
          <Button variant="primary" size="sm">开始扫描</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">监控价格点</div>
            <div className="text-2xl font-bold text-cyan-400">{prices.length}</div>
            <div className="text-xs text-zinc-500 mt-1">跨 {selectedChains.length} 条链</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">套利机会</div>
            <div className="text-2xl font-bold text-green-400">{filteredArbitrage.length}</div>
            <div className="text-xs text-zinc-500 mt-1">满足条件</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">总流动性</div>
            <div className="text-2xl font-bold text-purple-400">
              {formatCurrency(prices.reduce((acc, p) => acc + p.liquidity, 0))}
            </div>
            <div className="text-xs text-zinc-500 mt-1">所有 DEX</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">24h 交易量</div>
            <div className="text-2xl font-bold text-pink-400">
              {formatCurrency(prices.reduce((acc, p) => acc + p.volume24h, 0))}
            </div>
            <div className="text-xs text-zinc-500 mt-1">活跃交易</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            筛选条件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">代币:</span>
              <select
                value={selectedToken || ""}
                onChange={(e) => setSelectedToken(e.target.value || null)}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">全部</option>
                {tokens.map((token) => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">最小流动性:</span>
              <input
                type="number"
                value={minLiquidity}
                onChange={(e) => setMinLiquidity(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white w-32 focus:outline-none focus:border-cyan-400"
                step="10000"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">最小价差:</span>
              <input
                type="number"
                value={minSpread}
                onChange={(e) => setMinSpread(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white w-24 focus:outline-none focus:border-cyan-400"
                step="0.1"
                min="0"
                max="100"
              />
              <span className="text-sm text-zinc-500">%</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyProfit}
                onChange={(e) => setShowOnlyProfit(e.target.checked)}
                className="rounded border-zinc-600 bg-zinc-900 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm text-zinc-400">只显示盈利机会</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Chain Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-zinc-400">链:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChains(
                  selectedChains.includes(chain)
                    ? selectedChains.filter(c => c !== chain)
                    : [...selectedChains, chain]
                )}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                  selectedChains.includes(chain)
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                )}
              >
                <span>{chainIcons[chain]}</span>
                <span className="capitalize">{chain}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arbitrage Opportunities */}
        <div>
          <Card>
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                套利机会
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">共 {filteredArbitrage.length} 个</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredArbitrage.map((opp, idx) => (
                  <div
                    key={idx}
                    className="glass-elevated rounded-lg p-4 hover:border-green-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-white">{opp.token}</div>
                      <div className={cn(
                        "text-sm font-bold px-2 py-1 rounded-full",
                        opp.estimatedProfit > 0 ? "text-green-400 bg-green-400/10" : "text-rose-400 bg-rose-400/10"
                      )}>
                        +{formatCurrency(opp.estimatedProfit)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xs text-zinc-500 min-w-20 capitalize">{opp.buyOn.chain}</div>
                      <div className="text-xs text-zinc-400 flex-1">
                        <span className="text-rose-400">{opp.buyOn.dex}</span>
                        <span className="mx-2 text-zinc-600">→</span>
                        <span className="text-green-400">{opp.sellOn.dex}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>价差: {formatPercent(opp.spread / 100)}</span>
                      <span>流动性: {formatCurrency(opp.liquidity)}</span>
                    </div>
                  </div>
                ))}
                {filteredArbitrage.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    暂无满足条件的套利机会
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DEX Prices */}
        <div>
          <Card>
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                DEX 价格
              </CardTitle>
              <Button variant="ghost" size="sm">价格走势</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {prices.map((price, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                        {chainIcons[price.chain] || price.chain.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{price.pair}</div>
                        <div className="text-xs text-zinc-500 capitalize">{price.dex}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-white">${formatCurrency(price.price)}</div>
                      <div className="text-xs text-zinc-500">{formatCurrency(price.volume24h)} 24h</div>
                    </div>
                  </div>
                ))}
                {prices.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    暂无价格数据
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Best Route */}
      {bestRoute && (
        <Card className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border-green-500/30">
          <CardHeader className="flex items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              最优路径
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              {bestRoute.path.map((token, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium">
                    {token}
                  </div>
                  {idx < bestRoute.path.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-zinc-500 mx-2" />
                  )}
                </div>
              ))}
              <div className="ml-4 px-4 py-2 rounded-lg bg-green-500 text-black font-bold">
                ${formatCurrency(bestRoute.price)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
