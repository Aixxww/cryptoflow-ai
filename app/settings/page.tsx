"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Settings,
  Key,
  Shield,
  Save,
  TestTube,
  CheckCircle,
  X,
  ExternalLink,
  AlertTriangle,
  Info,
  CreditCard,
  Share2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";

interface ApiConfig {
  apiKey: string;
  apiSecret: string;
  testnet: boolean;
}

interface SquareConfig {
  apiKey: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [binanceConfig, setBinanceConfig] = useState<ApiConfig>({
    apiKey: "",
    apiSecret: "",
    testnet: true,
  });

  const [squareConfig, setSquareConfig] = useState<SquareConfig>({
    apiKey: "",
    enabled: false,
  });

  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [showSecrets, setShowSecrets] = useState({ binance: false, square: false });

  const testConnection = async () => {
    setConnectionStatus("testing");
    // 模拟测试连接
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (binanceConfig.apiKey && binanceConfig.apiSecret) {
      setConnectionStatus("success");
    } else {
      setConnectionStatus("error");
    }
  };

  const saveBinanceConfig = () => {
    localStorage.setItem("binance-config", JSON.stringify(binanceConfig));
    alert("Binance API 配置已保存");
  };

  const saveSquareConfig = () => {
    localStorage.setItem("square-config", JSON.stringify(squareConfig));
    alert("Binance Square 配置已保存");
  };

  const postToSquare = async () => {
    if (!squareConfig.enabled || !squareConfig.apiKey) {
      alert("请先配置并启用 Binance Square API");
      return;
    }

    // 这里调用实际的发帖 API
    alert("Binance Square 发帖功能（需要实现具体 API 调用）");
  };

  return (
    <div className="min-h-screen bg-grid relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10 sticky top-0 z-50 border-b border-white/10 glass-elevated">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-zinc-400 hover:text-cyan-400">
              首页
            </Link>
            <span className="text-zinc-500">/</span>
            <span className="text-white">配置</span>
          </div>
          <AppNav />
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-6 pb-24 md:pb-6 space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" />
          <h1 className="text-xl md:text-2xl font-bold text-white">设置</h1>
        </div>

      <Tabs defaultValue="binance" className="space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4 overflow-x-auto">
          <TabsList className="flex gap-2 bg-transparent">
            <TabsTrigger
              value="binance"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-black whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              币安交易
            </TabsTrigger>
            <TabsTrigger
              value="square"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-black whitespace-nowrap"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Binance Square
            </TabsTrigger>
            <TabsTrigger
              value="openclaw"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-black whitespace-nowrap"
            >
              <Key className="w-4 h-4 mr-2" />
              OpenClaw
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Binance Trading */}
        <TabsContent value="binance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-yellow-400" />
                Binance 交易 API 配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Info */}
              <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-zinc-400 space-y-1">
                    <p>在 Binance 创建 API 密钥：</p>
                <ol className="list-decimal list-inside pl-2 space-y-1">
                      <li>登录 <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Binance</a></li>
                      <li>进入 API 管理页面 (个人中心 → API 管理)</li>
                      <li>创建新 API 密钥，选择"现货交易"权限</li>
                      <li>记录 API Key 和 Secret Key</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Environment */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">环境</label>
                <div className="flex gap-4">
                  <Button
                    variant={binanceConfig.testnet ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setBinanceConfig({ ...binanceConfig, testnet: true })}
                  >
                    测试网 (Testnet)
                  </Button>
                  <Button
                    variant={!binanceConfig.testnet ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setBinanceConfig({ ...binanceConfig, testnet: false })}
                  >
                    正式网 (Mainnet)
                  </Button>
                </div>
              </div>

              {/* API Key */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block flex items-center gap-2">
                  API Key
                  <a
                    href={`https://www.binance.com${binanceConfig.testnet ? "/en" : ""}/my/settings/api-management`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline text-xs"
                  >
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                    获取
                  </a>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={binanceConfig.apiKey}
                    onChange={(e) => setBinanceConfig({ ...binanceConfig, apiKey: e.target.value })}
                    placeholder="输入 API Key"
                    className="pr-10"
                  />
                </div>
              </div>

              {/* API Secret */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">API Secret</label>
                <div className="relative">
                  <Input
                    type={showSecrets.binance ? "text" : "password"}
                    value={binanceConfig.apiSecret}
                    onChange={(e) => setBinanceConfig({ ...binanceConfig, apiSecret: e.target.value })}
                    placeholder="输入 API Secret"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    onClick={() => setShowSecrets({ ...showSecrets, binance: !showSecrets.binance })}
                  >
                    {showSecrets.binance ? <X className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-rose-300">
                    <p className="font-semibold mb-1">安全提醒</p>
                    <ul className="space-y-1 text-rose-200/80">
                      <li>• 不要启用提币权限，仅保留交易权限</li>
                      <li>• 设置 IP 白名单限制访问</li>
                      <li>• 定期轮换 API 密钥</li>
                      <li>• 推荐先在测试网验证策略</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={testConnection}
                  disabled={connectionStatus === "testing"}
                  className="flex-1 sm:flex-none"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {connectionStatus === "testing" ? "测试中..." : "测试连接"}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={saveBinanceConfig}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
              </div>

              {/* Connection Status */}
              {connectionStatus === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400">连接测试成功</span>
                </div>
              )}
              {connectionStatus === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                  <X className="w-5 h-5 text-rose-400" />
                  <span className="text-sm text-rose-400">连接测试失败，请检查配置</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Binance Square */}
        <TabsContent value="square" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-400" />
                Binance Square 发帖配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Info */}
              <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-zinc-400 space-y-1">
                    <p>Binance Square 是币安的社交平台，可以发布内容、分享观点。</p>
                    <a
                      href="https://www.binance.com/square"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline block mt-2"
                    >
                      访问 Binance Square <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Enable Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg glass">
                <div>
                  <div className="text-white font-medium">启用自动发帖</div>
                  <div className="text-sm text-zinc-400">策略执行后自动发布到 Square</div>
                </div>
                <button
                  onClick={() => setSquareConfig({ ...squareConfig, enabled: !squareConfig.enabled })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    squareConfig.enabled ? "bg-cyan-500" : "bg-zinc-700"
                  )}
                >
                  <div
                    className={cn(
                      "absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all",
                      squareConfig.enabled ? "left-6.5" : "left-0.5"
                    )}
                  />
                </button>
              </div>

              {/* API Key */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">API Key</label>
                <Input
                  type="text"
                  value={squareConfig.apiKey}
                  onChange={(e) => setSquareConfig({ ...squareConfig, apiKey: e.target.value })}
                  placeholder="输入 Binance Square API Key"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={postToSquare}
                  disabled={!squareConfig.enabled}
                  className="flex-1 sm:flex-none"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  测试发帖
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={saveSquareConfig}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OpenClaw */}
        <TabsContent value="openclaw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                OpenClaw AI 配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-zinc-400 space-y-1">
                    <p>OpenClaw AI 是本项目的核心 AI 服务，提供市场分析、策略生成等功能。</p>
                    <p className="mt-2">默认地址：http://localhost:18789</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Base URL</label>
                <Input
                  type="text"
                  defaultValue="http://localhost:18789"
                  placeholder="OpenClaw API 地址"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400 mb-2 block">API Key (可选)</label>
                <Input
                  type="password"
                  placeholder="输入 OpenClaw API Key"
                />
              </div>

              <Button variant="primary" size="sm">
                <Save className="w-4 h-4 mr-2" />
                保存配置
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>

      {/* Mobile Bottom Nav */}
      <AppNav variant="bottom" />
    </div>
  );
}
