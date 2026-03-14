"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn, getRelativeTime, formatNumber } from "@/lib/utils";
import { useSocialRadarStore } from "@/store";
import { useEffect, useState } from "react";
import { Radar, Zap, TrendingUp, TrendingDown, Minus, MessageSquare, Hash, Users, Radio, Filter } from "lucide-react";

export default function RadarPage() {
  const {
    overallSentiment,
    platforms,
    hotTopics,
    kols,
    fearGreedIndex,
    isLoading,
    timeRange,
    selectedPlatforms,
    autoRefresh,
    setData,
    setTimeRange,
    setSelectedPlatforms,
    setAutoRefresh,
  } = useSocialRadarStore();
  const [showChart, setShowChart] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    const mockData = {
      overallSentiment: 65,
      platforms: [
        { platform: "twitter", score: 72, volume: 15000, keywords: ["bullish", "breakout", "moon"], trend: "up", timestamp: Date.now() },
        { platform: "telegram", score: 58, volume: 8000, keywords: ["accumulation", "hold", "dip"], trend: "neutral", timestamp: Date.now() },
        { platform: "discord", score: 45, volume: 5000, keywords: ["dump", "fud", "bearish"], trend: "down", timestamp: Date.now() },
      ],
      hotTopics: [
        "Bitcoin ETF Approval",
        "Solana DeFi Growth",
        "Meme Coin Season",
        "Regulatory News",
        "Whale Accumulation",
      ],
      kols: [
        { name: "CryptoWhale", platform: "twitter", sentiment: 80, confidence: 0.92 },
        { name: "DeFiGuru", platform: "twitter", sentiment: 70, confidence: 0.85 },
        { name: "TokenAnalyst", platform: "telegram", sentiment: 55, confidence: 0.78 },
        { name: "ChainWatchers", platform: "discord", sentiment: 40, confidence: 0.75 },
      ],
      fearGreedIndex: 67,
    };

    setTimeout(() => setData(mockData), 500);
  }, [setData]);

  const platformOptions = [
    { id: "twitter", name: "Twitter/X", icon: MessageSquare },
    { id: "telegram", name: "Telegram", icon: Radio },
    { id: "discord", name: "Discord", icon: Users },
    { id: "reddit", name: "Reddit", icon: Hash },
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-400 bg-green-400/10";
    if (score >= 50) return "text-yellow-400 bg-yellow-400/10";
    return "text-rose-400 bg-rose-400/10";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down": return <TrendingDown className="w-4 h-4 text-rose-400" />;
      default: return <Minus className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getFearGreedColor = (index: number) => {
    if (index >= 75) return "text-green-400";
    if (index >= 55) return "text-yellow-400";
    if (index >= 25) return "text-rose-400";
    return "text-purple-400";
  };

  const getFearGreedText = (index: number) => {
    if (index >= 75) return "极度贪婪";
    if (index >= 55) return "贪婪";
    if (index >= 45) return "中性";
    if (index >= 25) return "恐惧";
    return "极度恐惧";
  };

  // 雷达图数据
  const radarData = [
    { label: "乐观", value: overallSentiment },
    { label: "恐惧", value: 100 - overallSentiment },
    { label: "热度", value: 70 },
    { label: "波动", value: 45 },
    { label: "趋势", value: 60 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Radar className="w-6 h-6 text-purple-400" />
            社交雷达
          </h1>
          <p className="text-sm text-zinc-400">实时监控社交媒体情绪和叙事热点</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn("gap-2", autoRefresh && "text-cyan-400")}
          >
            <Zap className={cn("w-4 h-4", autoRefresh && "animate-pulse")} />
            自动刷新
          </Button>
          <Button variant="primary" size="sm">
            导出报告
          </Button>
        </div>
      </div>

      {/* Fear & Greed Index */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-zinc-400 mb-2">恐慌与贪婪指数</div>
              <div className="flex items-baseline gap-3">
                <div className={cn("text-5xl font-bold", getFearGreedColor(fearGreedIndex || 50))}>
                  {fearGreedIndex ?? "--"}
                </div>
                <div className="text-xl text-zinc-300">{getFearGreedText(fearGreedIndex || 50)}</div>
              </div>
            </div>
            <div className="w-64">
              {/* Progress Bar */}
              <div className="h-3 rounded-full bg-gradient-to-r from-purple-500 via-yellow-500 to-green-500 relative">
                <div
                  className="absolute w-6 h-6 bg-white rounded-full border-4 border-zinc-900 transform -translate-y-1/2 shadow-lg"
                  style={{ left: `${fearGreedIndex || 50}%`, top: "50%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>极度恐惧</span>
                <span>中度</span>
                <span>极度贪婪</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">整体情绪</div>
            <div className={cn("text-2xl font-bold px-3 py-1 rounded-full text-sm", getSentimentColor(overallSentiment))}>
              {overallSentiment}/100
            </div>
            <div className="text-xs text-zinc-500 mt-1">{timeRange} 分钟内</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">讨论热度</div>
            <div className="text-2xl font-bold text-purple-400">
              {formatNumber(platforms.reduce((acc, p) => acc + p.volume, 0))}
            </div>
            <div className="text-xs text-green-400 mt-1">+15.3%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-zinc-400 mb-1">监控 KOL</div>
            <div className="text-2xl font-bold text-cyan-400">{kols.length}</div>
            <div className="text-xs text-zinc-500 mt-1">活跃发言</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Sentiment */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                平台情绪
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => {
                  const Icon = platformOptions.find(p => p.id === platform.platform)?.icon ?? MessageSquare;
                  return (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-zinc-400" />
                          <span className="text-white font-medium capitalize">{platform.platform}</span>
                          <span className={cn("text-sm px-2 py-0.5 rounded-full", getSentimentColor(platform.score))}>
                            {platform.score}
                          </span>
                          {getTrendIcon(platform.trend)}
                        </div>
                        <div className="text-zinc-500 text-sm">{formatNumber(platform.volume)} 讨论</div>
                      </div>
                      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-500",
                            platform.score >= 70 ? "bg-green-500" : platform.score >= 50 ? "bg-yellow-500" : "bg-rose-500"
                          )}
                          style={{ width: `${platform.score}%` }}
                        />
                      </div>
                      <div className="flex gap-2 mt-1">
                        {platform.keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs text-zinc-500">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {platforms.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    暂无数据
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hot Topics */}
          <Card className="mt-6">
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                热门话题
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {hotTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "px-4 py-2 rounded-full border transition-all hover:scale-105 cursor-pointer",
                      idx === 0 ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" :
                      idx === 1 ? "border-purple-500 bg-purple-500/10 text-purple-400" :
                      "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-3 h-3" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOL Views */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                KOL 观点
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kols.map((kol, idx) => {
                  const Icon = platformOptions.find(p => p.id === kol.platform)?.icon ?? MessageSquare;
                  return (
                    <div key={idx} className="glass-elevated rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-cyan flex items-center justify-center text-black font-bold">
                          {kol.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{kol.name}</div>
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Icon className="w-3 h-3" />
                            <span className="capitalize">{kol.platform}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">情绪指数</span>
                        <span className={cn("text-sm font-medium", kol.sentiment >= 60 ? "text-green-400" : kol.sentiment >= 40 ? "text-yellow-400" : "text-rose-400")}>
                          {kol.sentiment}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-500",
                            kol.sentiment >= 60 ? "bg-green-500" : kol.sentiment >= 40 ? "bg-yellow-500" : "bg-rose-500"
                          )}
                          style={{ width: `${kol.sentiment}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
                        <span>置信度</span>
                        <span>{Math.round(kol.confidence * 100)}%</span>
                      </div>
                    </div>
                  );
                })}
                {kols.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 text-sm">
                    暂无 KOL 数据
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            平台过滤
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {platformOptions.map((platform) => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatforms(
                    selectedPlatforms.includes(platform.id)
                      ? selectedPlatforms.filter(p => p !== platform.id)
                      : [...selectedPlatforms, platform.id]
                  )}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    selectedPlatforms.includes(platform.id)
                      ? "bg-cyan-500 text-black font-medium"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{platform.name}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
