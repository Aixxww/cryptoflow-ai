"use client";

import Link from "next/link";
import { Bot, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TickerPrice {
  symbol: string;
  price: string;
  change: number;
}

export default function Home() {
  const [ticker, setTicker] = useState<TickerPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/prices');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const prices: TickerPrice[] = data.slice(0, 5).map((item: any) => ({
            symbol: item.symbol.replace('USDT', ''),
            price: formatPrice(item.price),
            change: parseFloat(item.change24h),
          }));
          setTicker(prices);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 0.01) return price.toFixed(4);
    return price.toFixed(8);
  };

  const features = [
    {
      icon: "🌊",
      title: "资金流追踪",
      description: "实时追踪鲸鱼和聪明钱流向，可视化大额转账",
      path: "/heat-map",
    },
    {
      icon: "📡",
      title: "社交雷达",
      description: "从社交媒体捕获情绪反转点和 KOL 观点",
      path: "/radar",
    },
    {
      icon: "🔀",
      title: "DeFi 聚合",
      description: "多链 DEX 价格聚合，发现套利机会",
      path: "/defi",
    },
    {
      icon: "🧪",
      title: "策略实验室",
      description: "低代码构建和回测交易策略",
      path: "/lab",
    },
  ];

  return (
    <div className="min-h-screen bg-grid relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 glass-elevated">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h1 className="text-lg font-bold text-white neon-cyan">币安AI龙爪手</h1>
                <p className="text-xs text-zinc-500">OpenClaw AI 智能助手</p>
              </div>
            </div>
            <AppNav />
          </div>
        </header>

        {/* Mobile Bottom Nav */}
        <AppNav variant="bottom" />

        {/* Ticker Bar */}
        {!loading && ticker.length > 0 && (
          <div className="hidden md:block border-b border-white/5 bg-zinc-900/50">
            <div className="container mx-auto px-4 py-2 overflow-hidden">
              <div className="flex gap-8">
                {ticker.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm whitespace-nowrap">
                    <span className="text-zinc-400">{item.symbol}</span>
                    <span className="text-white font-medium">${item.price}</span>
                    <span className={cn(
                      "flex items-center gap-1",
                      item.change >= 0 ? "text-green-400" : "text-rose-400"
                    )}>
                      {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center md:py-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            由 OpenClaw AI 驱动
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            OpenClaw AI
            <br />接管你的币安交易
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            让 AI 自动捕捉交易机会，用大数据和高胜率策略自动赚钱
            <br />省心省力，躺赢市场
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="px-6 py-3 rounded-lg bg-gradient-cyan text-black font-semibold hover:shadow-[0_0_30px_rgba(0,255,245,0.4)] transition-all duration-300">
                开始使用
              </button>
            </Link>
            <Link href="/docs">
              <button className="px-6 py-3 rounded-lg glass border border-zinc-700 text-white hover:border-cyan-400 transition-all duration-300">
                查看文档
              </button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">核心功能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.path}
                className="group"
              >
                <div className="glass-elevated rounded-xl p-6 h-full hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-elevated rounded-2xl p-8 border border-zinc-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
                <div className="text-sm text-zinc-400">数据源</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">&lt;100ms</div>
                <div className="text-sm text-zinc-400">延迟</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-sm text-zinc-400">监控</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-sm text-zinc-400">可用性</div>
              </div>
            </div>
          </div>
        </section>

        {/* OpenClaw Integration */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">OpenClaw AI 深度集成</h2>
            <p className="text-zinc-400 mb-8">
              通过 6551 MCP 连接 OpenTwitter、OpenNews 和自定义链上数据服务，
              让 OpenClaw AI 帮你分析市场、生成策略、自动交易
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["OpenTwitter", "OpenNews", "Binance API", "Binance Square", "DEX Screener", "Whale Alert", "Etherscan"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full glass border border-zinc-700 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20 pb-24 md:pb-0">
          <div className="container mx-auto px-4 py-8 text-center text-zinc-500 text-sm">
            <p>币安AI龙爪手 • OpenClaw AI 驱动 • 让 AI 替你赚钱</p>
            <p className="mt-3 flex items-center justify-center gap-6">
              <Link href="https://github.com/aixxww" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-1.475-4.035-1.475-.54-1.38-1.335-1.74-1.335-1.125-1.515.09-1.515 1.125 0 .69.42 1.125.42 1.125 2.25 3.81 5.925 2.715 7.32 2.075.225-1.65.87-2.76 1.575-2.76 1.74 0 0 1.425-.57 1.425-.57 2.4 0 4.215 1.575 4.215 4.215 0 2.685-2.07 4.8-4.905 4.8-.39 0-.765-.045-1.125-.135C3.795 22.395 1.5 19.755 1.5 16.275c0-3.12 2.235-5.655 5.265-5.655.54 0 1.065.09 1.56.27.255-1.53 1.02-2.58 2.355-2.94-.12-.645-.375-2.775 0-4.92 1.815.54 3.555 2.64 3.555 2.64 1.62 2.775 4.23 1.98 5.265 1.515.165-1.17.63-1.98 1.14-2.415 3.15-.09 5.7 2.61 5.7 5.85 0 4.41-3.6 7.95-8.085 7.95C5.37 24 0 18.63 0 12"/></svg>
                GitHub
              </Link>
              <Link href="https://x.com/aixxww" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                @aixxww
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
