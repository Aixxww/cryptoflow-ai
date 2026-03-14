"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AppNav } from "@/components/AppNav";
import {
  FileText,
  DollarSign,
  Globe,
  MessageSquare,
  RefreshCw,
  BarChart3,
  ExternalLink,
  Download,
  Info,
  AlertTriangle,
} from "lucide-react";

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
  symbols: string[];
}

interface SocialSentiment {
  symbol: string;
  score: number;
  mentions: number;
  trend: "up" | "down" | "neutral";
}

interface AlertLevel {
  level: "low" | "medium" | "high";
  message: string;
  symbols: string[];
  timestamp: string;
}

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sentiment, setSentiment] = useState<SocialSentiment[]>([]);
  const [alerts, setAlerts] = useState<AlertLevel[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const pricesResponse = await fetch("/api/prices");
      const pricesData = await pricesResponse.json();
      setPrices(pricesData || []);

      const newsResponse = await fetch("/api/news");
      const newsData = await newsResponse.json();
      setNews(newsData || []);

      const sentimentResponse = await fetch("/api/sentiment");
      const sentimentData = await sentimentResponse.json();
      setSentiment(sentimentData || []);

      const generatedAlerts = generateAlerts(
        pricesData || [],
        newsData || [],
        sentimentData || []
      );
      setAlerts(generatedAlerts);

      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const generateAlerts = (
    p: PriceData[],
    n: NewsItem[],
    s: SocialSentiment[]
  ): AlertLevel[] => {
    const alerts: AlertLevel[] = [];

    p.forEach((price) => {
      if (Math.abs(price.change24h) > 5) {
        alerts.push({
          level: "high",
          message: `${price.symbol} 24H涨跌幅超过5%: ${price.change24h > 0 ? "+" : ""}${price.change24h.toFixed(2)}%`,
          symbols: [price.symbol],
          timestamp: new Date().toISOString(),
        });
      }
    });

    const negativeNews = n.filter((item) => item.sentiment === "negative");
    if (negativeNews.length >= 2) {
      alerts.push({
        level: "medium",
        message: "检测到多条负面新闻，建议谨慎操作",
        symbols: ["ALL"],
        timestamp: new Date().toISOString(),
      });
    }

    s.forEach((s) => {
      if (s.score > 80 && s.trend === "up") {
        alerts.push({
          level: "medium",
          message: `${s.symbol} 社交情绪高涨 (${s.score}分)，提及量 ${s.mentions}`,
          symbols: [s.symbol],
          timestamp: new Date().toISOString(),
        });
      }
    });

    return alerts;
  };

  const formatPrice = (price: number): string => {
    if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 0.01) return price.toFixed(4);
    return price.toFixed(8);
  };

  const getAlertIcon = (level: string) => {
    return <AlertTriangle className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-cyan-400" />
              <div>
                <h1 className="text-lg font-bold text-white">预警研报</h1>
                <p className="text-xs text-zinc-500">实时市场情报与风险预警</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">
                {lastUpdate ? `更新: ${lastUpdate.toLocaleTimeString("zh-CN")}` : "加载中..."}
              </span>
              <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading}>
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </Button>
            </div>
          </div>
          <AppNav />
        </div>
      </header>

      <AppNav variant="bottom" />

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 space-y-6">
        {alerts.length > 0 && (
          <Card className="border border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <CardTitle className="text-lg">市场提醒</CardTitle>
                </div>
                <span className="text-sm text-zinc-500">{alerts.length} 条</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50">
                  {getAlertIcon(alert.level)}
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString("zh-CN")}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {alert.symbols.map((sym) => (
                      <span key={sym} className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <CardTitle>价格概览</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {prices.map((price) => (
                <a
                  key={price.symbol}
                  href={`https://www.binance.com/en/trade/${price.symbol.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-zinc-800 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="text-xs text-zinc-500 mb-1">{price.symbol}</div>
                  <div className="text-lg font-semibold text-white">{formatPrice(price.price)}</div>
                  <div
                    className={cn(
                      "text-xs mt-1",
                      price.change24h >= 0 ? "text-green-400" : "text-rose-400"
                    )}
                  >
                    {price.change24h >= 0 ? "+" : ""}
                    {typeof price.change24h === "number"
                      ? price.change24h.toFixed(2)
                      : price.change24h}
                    %
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <CardTitle>最新资讯</CardTitle>
                </div>
                <a
                  href="https://6551.io/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-cyan-400"
                >
                  OpenNews →
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded",
                        item.sentiment === "positive"
                          ? "text-green-400 bg-green-500/20"
                          : item.sentiment === "negative"
                            ? "text-rose-400 bg-rose-500/20"
                            : "text-yellow-400 bg-yellow-500/20"
                      )}
                    >
                      {item.sentiment === "positive" ? "看涨" : item.sentiment === "negative" ? "看跌" : "中性"}
                    </span>
                    <span className="text-xs text-zinc-500">{item.source}</span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-sm text-white hover:text-cyan-400 transition-colors mb-2">
                      {item.title}
                    </h3>
                  </a>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {item.symbols.map((sym) => (
                        <span key={sym} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {sym}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">
                      {new Date(item.publishedAt).toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  <CardTitle>社交情绪</CardTitle>
                </div>
                <a
                  href="https://6551.io/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-cyan-400"
                >
                  OpenTwitter →
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sentiment.map((s, idx) => (
                <div key={s.symbol || idx} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{s.symbol}</span>
                      <span className="text-xs text-zinc-500">{s.mentions} 提及</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          s.score >= 70 ? "bg-green-500" : s.score >= 40 ? "bg-yellow-500" : "bg-rose-500"
                        )}
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-lg font-bold",
                      s.score >= 70 ? "text-green-400" : s.score >= 40 ? "text-yellow-400" : "text-rose-400"
                    )}
                  >
                    {Math.round(s.score)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-pink-400" />
                  <CardTitle>可视化矩阵</CardTitle>
                </div>
                <a
                  href="https://excalidraw.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-cyan-400 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Excalidraw
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <h3 className="text-sm font-semibold text-white mb-4">市场概览矩阵</h3>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {prices.slice(0, 5).map((price) => (
                      <div
                        key={price.symbol}
                        className={cn(
                          "p-2 rounded",
                          price.change24h >= 0 ? "bg-green-500/20 text-green-400" : "bg-rose-500/20 text-rose-400"
                        )}
                      >
                        <div className="font-medium">{price.symbol.replace("USDT", "")}</div>
                        <div className={price.change24h >= 0 ? "text-green-300" : "text-rose-300"}>
                          {typeof price.change24h === "number"
                            ? (price.change24h >= 0 ? "+" : "") + price.change24h.toFixed(1)
                            : price.change24h}
                          %
                        </div>
                      </div>
                    ))}
                    {[...Array(7)].map((_, i) => (
                      <div key={`empty-${i}`} className="p-2 rounded bg-zinc-800 text-zinc-600">
                        -
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <h3 className="text-sm font-semibold text-white mb-4">情绪矩阵</h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {["看多", "中性", "看空", "观望"].map((mood) => (
                      <div key={mood} className="text-xs text-zinc-500 mb-2">{mood}</div>
                    ))}
                    {sentiment.slice(0, 4).map((s) => (
                      <div
                        key={s.symbol}
                        className={cn(
                          "p-2 rounded text-xs",
                          s.score >= 70
                            ? "bg-green-500/30 text-green-400"
                            : s.score >= 40
                              ? "bg-yellow-500/30 text-yellow-400"
                              : "bg-rose-500/30 text-rose-400"
                        )}
                      >
                        {s.symbol}
                      </div>
                    ))}
                    {[...Array(8 - sentiment.length)].map((_, i) => (
                      <div key={`empty-sentiment-${i}`} className="p-2 rounded bg-zinc-800 text-zinc-600">
                        -
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">
                    基于 OpenClaw AI 的 6551 MCP 实时数据（OpenTwitter、OpenNews、Binance API）
                  </p>
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出研报
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-zinc-400">
                  <p className="text-cyan-400 font-medium mb-2">数据来源说明</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "OpenTwitter", desc: "Twitter/X 社交情绪分析" },
                      { name: "OpenNews", desc: "加密货币新闻聚合" },
                      { name: "Binance API", desc: "实时价格和交易数据" },
                      { name: "Whale Alert", desc: "链上大额交易监控" },
                    ].map((source) => (
                      <a
                        key={source.name}
                        href="https://6551.io/mcp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg border border-zinc-700 text-xs text-zinc-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                      >
                        {source.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
