"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { useStrategyLabStore } from "@/store";
import { useState } from "react";
import {
  FlaskConical,
  Plus,
  Play,
  Pause,
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Target,
  Shield,
  Zap,
  Sparkles,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const conditionTypes = [
  { value: "price", label: "价格", icon: TrendingUp },
  { value: "rsi", label: "RSI", icon: Activity },
  { value: "volume", label: "成交量", icon: Zap },
  { value: "social", label: "社交情绪", icon: Sparkles },
  { value: "flow", label: "资金流", icon: Activity },
];

const operators = [
  { value: ">", label: "大于" },
  { value: "<", label: "小于" },
  { value: "=", label: "等于" },
  { value: ">=", label: "大于等于" },
  { value: "<=", label: "小于等于" },
];

const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function LabPage() {
  const {
    strategies,
    activeStrategy,
    backtestResults,
    currentSignal,
    signalConfidence,
    isLoading,
    isEditing,
    editingStrategy,
    setStrategies,
    addStrategy,
    updateStrategy,
    deleteStrategy,
    setActiveStrategy,
    setBacktestResult,
    setSignal,
    setLoading,
    setEditing,
    toggleStrategy,
  } = useStrategyLabStore();

  const [showForm, setShowForm] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    name: "",
    description: "",
    risk: 5,
  });

  const [conditions, setConditions] = useState<Array<{
    type: string;
    operator: string;
    value: number;
    timeframe: string;
  }>>([]);

  const [actions, setActions] = useState<Array<{
    type: string;
    symbol: string;
    amount: number;
    price: string;
  }>>([]);

  const handleAddStrategy = () => {
    const strategy = {
      id: `strategy-${Date.now()}`,
      name: newStrategy.name,
      description: newStrategy.description,
      conditions,
      actions,
      risk: newStrategy.risk,
      enabled: true,
    };

    addStrategy(strategy);
    resetForm();
  };

  const handleEditStrategy = (strategy: any) => {
    setEditing(true, strategy);
    setNewStrategy({
      name: strategy.name,
      description: strategy.description,
      risk: strategy.risk,
    });
    setConditions(strategy.conditions);
    setActions(strategy.actions);
    setShowForm(true);
  };

  const handleUpdateStrategy = () => {
    if (editingStrategy) {
      updateStrategy(editingStrategy.id, {
        name: newStrategy.name,
        description: newStrategy.description,
        conditions,
        actions,
        risk: newStrategy.risk,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNewStrategy({ name: "", description: "", risk: 5 });
    setConditions([]);
    setActions([]);
    setShowForm(false);
    setEditing(false, undefined);
  };

  const handleBacktest = async (strategy: any) => {
    setLoading(true);
    setActiveStrategy(strategy);

    // 模拟回测
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = {
      totalTrades: Math.floor(Math.random() * 100) + 20,
      winRate: Math.floor(Math.random() * 30) + 60,
      profitLoss: (Math.random() * 0.3 - 0.05) * 10000,
      maxDrawdown: Math.random() * 0.15,
      sharpeRatio: Math.random() * 2,
      trades: [],
    };

    setBacktestResult(strategy.id, result);
    setLoading(false);
  };

  const getSignal = async (strategy: any) => {
    setLoading(true);
    setActiveStrategy(strategy);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const signals = ["buy", "sell", "hold"];
    const signal = signals[Math.floor(Math.random() * signals.length)] as any;

    setSignal({
      signal,
      confidence: Math.floor(Math.random() * 30) + 70,
      reasoning: `基于 ${strategy.name} 策略分析，当前市场条件`,
    });

    setLoading(false);
  };

  const addCondition = () => {
    setConditions([...conditions, { type: "price", operator: ">", value: 0, timeframe: "1h" }]);
  };

  const addAction = () => {
    setActions([...actions, { type: "buy", symbol: "BTCUSDT", amount: 0.01, price: "market" }]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return "text-green-400 bg-green-400/10 border-green-500/30";
    if (risk <= 7) return "text-yellow-400 bg-yellow-400/10 border-yellow-500/30";
    return "text-rose-400 bg-rose-400/10 border-rose-500/30";
  };

  const getRiskLabel = (risk: number) => {
    if (risk <= 3) return "低风险";
    if (risk <= 7) return "中等风险";
    return "高风险";
  };

  const getSignalIcon = () => {
    if (currentSignal === "buy") return <TrendingUp className="w-8 h-8 text-green-400" />;
    if (currentSignal === "sell") return <TrendingDown className="w-8 h-8 text-rose-400" />;
    return <Activity className="w-8 h-8 text-zinc-400" />;
  };

  const getSignalLabel = () => {
    if (currentSignal === "buy") return "买入";
    if (currentSignal === "sell") return "卖出";
    return "持有";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
            策略实验室
          </h1>
          <p className="text-sm text-zinc-400">低代码构建和回测交易策略</p>
        </div>
        <div className="flex items-center gap-2">
          {!showForm && (
            <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              新建策略
            </Button>
          )}
        </div>
      </div>

      {/* Signal Panel */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getSignalIcon()}
              <div>
                <div className="text-sm text-zinc-400 mb-1">当前信号</div>
                <div className="text-2xl font-bold text-white">
                  {currentSignal ? getSignalLabel() : "运行策略获取信号"}
                </div>
              </div>
            </div>
            <div className="text-right">
              {currentSignal && (
                <>
                  <div className="text-sm text-zinc-400 mb-1">置信度</div>
                  <div className="text-xl font-bold text-cyan-400">{signalConfidence}%</div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="strategies" className="space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <TabsList className="flex gap-2 bg-transparent">
            <TabsTrigger
              value="strategies"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              我的策略
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              策略模板
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Strategy Form */}
        {showForm && (
          <Card className="border-cyan-500/30">
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "编辑策略" : "新建策略"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">策略名称</label>
                  <Input
                    value={newStrategy.name}
                    onChange={(e) => setNewStrategy({ ...newStrategy, name: e.target.value })}
                    placeholder="我的交易策略"
                    glass
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">描述</label>
                  <Input
                    value={newStrategy.description}
                    onChange={(e) => setNewStrategy({ ...newStrategy, description: e.target.value })}
                    placeholder="简要描述策略逻辑"
                    glass
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-zinc-400">风险等级</label>
                  <span className={cn("text-sm px-3 py-1 rounded-full", getRiskColor(newStrategy.risk))}>
                    {getRiskLabel(newStrategy.risk)}
                  </span>
                </div>
                <Slider
                  value={[newStrategy.risk]}
                  onValueChange={([value]) => setNewStrategy({ ...newStrategy, risk: value })}
                  min={1}
                  max={10}
                  step={1}
                  className="flex items-center gap-2"
                >
                  <Slider.Track className="h-2 flex-1 bg-zinc-800 rounded-full">
                    <Slider.Range className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-rose-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb className="w-4 h-4 bg-white rounded-full shadow-lg" />
                </Slider>
              </div>

              {/* Conditions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-zinc-400">触发条件</label>
                  <Button variant="ghost" size="sm" onClick={addCondition}>
                    <Plus className="w-3 h-3 mr-1" />
                    添加条件
                  </Button>
                </div>
                <div className="space-y-2">
                  {conditions.map((condition, idx) => {
                    const Icon = conditionTypes.find(t => t.value === condition.type)?.icon || Activity;
                    return (
                      <div key={idx} className="flex items-center gap-2 p-3 glass rounded-lg">
                        <Icon className="w-4 h-4 text-zinc-400" />
                        <select
                          value={condition.type}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[idx].type = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white"
                        >
                          {conditionTypes.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                        <select
                          value={condition.operator}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[idx].operator = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white"
                        >
                          {operators.map(op => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          value={condition.value || ""}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[idx].value = parseFloat(e.target.value) || 0;
                            setConditions(newConditions);
                          }}
                          placeholder="值"
                          className="w-24"
                          glass
                        />
                        <select
                          value={condition.timeframe}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[idx].timeframe = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white"
                        >
                          {timeframes.map(tf => (
                            <option key={tf} value={tf}>{tf}</option>
                          ))}
                        </select>
                        <Button variant="ghost" size="sm" onClick={() => removeCondition(idx)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                  {conditions.length === 0 && (
                    <div className="text-center py-8 text-zinc-500 text-sm glass rounded-lg">
                      点击"添加条件"来配置触发条件
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-zinc-400">执行动作</label>
                  <Button variant="ghost" size="sm" onClick={addAction}>
                    <Plus className="w-3 h-3 mr-1" />
                    添加动作
                  </Button>
                </div>
                <div className="space-y-2">
                  {actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 glass rounded-lg">
                      <select
                        value={action.type}
                        onChange={(e) => {
                          const newActions = [...actions];
                          newActions[idx].type = e.target.value;
                          setActions(newActions);
                        }}
                        className="bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white"
                      >
                        <option value="buy">买入</option>
                        <option value="sell">卖出</option>
                        <option value="alert">提醒</option>
                        <option value="close">平仓</option>
                      </select>
                      <Input
                        value={action.symbol}
                        onChange={(e) => {
                          const newActions = [...actions];
                          newActions[idx].symbol = e.target.value;
                          setActions(newActions);
                        }}
                        placeholder="BTCUSDT"
                        className="w-28"
                        glass
                      />
                      <Input
                        type="number"
                        value={action.amount || ""}
                        onChange={(e) => {
                          const newActions = [...actions];
                          newActions[idx].amount = parseFloat(e.target.value) || 0;
                          setActions(newActions);
                        }}
                        placeholder="数量"
                        className="w-24"
                        glass
                      />
                      <select
                        value={action.price}
                        onChange={(e) => {
                          const newActions = [...actions];
                          newActions[idx].price = e.target.value;
                          setActions(newActions);
                        }}
                        className="bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-white"
                      >
                        <option value="market">市价</option>
                        <option value="limit">限价</option>
                      </select>
                      <Button variant="ghost" size="sm" onClick={() => removeAction(idx)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {actions.length === 0 && (
                    <div className="text-center py-8 text-zinc-500 text-sm glass rounded-lg">
                      点击"添加动作"来配置执行动作
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" onClick={resetForm}>取消</Button>
              <Button variant="primary" onClick={isEditing ? handleUpdateStrategy : handleAddStrategy}>
                {isEditing ? "更新策略" : "创建策略"}
              </Button>
            </CardFooter>
          </Card>
        )}

        <TabsContent value="strategies" className="space-y-4">
          {strategies.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FlaskConical className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
                <p className="text-zinc-400 mb-4">还没有创建任何策略</p>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                  创建第一个策略
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {strategies.map((strategy) => {
                const result = backtestResults.get(strategy.id);
                return (
                  <Card
                    key={strategy.id}
                    className={cn(
                      "transition-all hover:border-cyan-500/50",
                      !strategy.enabled && "opacity-50"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {strategy.name}
                            {strategy.enabled && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </CardTitle>
                          <div className="text-sm text-zinc-400 mt-1">
                            {strategy.description || "暂无描述"}
                          </div>
                        </div>
                        <div className={cn("text-xs px-2 py-1 rounded-full", getRiskColor(strategy.risk))}>
                          {getRiskLabel(strategy.risk)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Conditions */}
                      <div>
                        <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          触发条件
                        </div>
                        <div className="space-y-1">
                          {strategy.conditions.slice(0, 2).map((c, i) => (
                            <div key={i} className="text-xs text-zinc-400 glass px-2 py-1 rounded">
                              {c.type} {c.operator} {c.value} ({c.timeframe})
                            </div>
                          ))}
                          {strategy.conditions.length > 2 && (
                            <div className="text-xs text-zinc-500">+ {strategy.conditions.length - 2} 个条件</div>
                          )}
                        </div>
                      </div>

                      {/* Backtest Results */}
                      {result && (
                        <div className="pt-3 border-t border-white/5">
                          <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            回测结果
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-lg font-bold text-white">{result.winRate}%</div>
                              <div className="text-xs text-zinc-500">胜率</div>
                            </div>
                            <div>
                              <div className={cn("text-lg font-bold", result.profitLoss >= 0 ? "text-green-400" : "text-rose-400")}>
                                {formatPercent(result.profitLoss / 100)}
                              </div>
                              <div className="text-xs text-zinc-500">收益</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white">{result.totalTrades}</div>
                              <div className="text-xs text-zinc-500">交易次数</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStrategy(strategy.id)}
                        >
                          {strategy.enabled ? (
                            <><Pause className="w-3 h-3 mr-1" /> 暂停</>
                          ) : (
                            <><Play className="w-3 h-3 mr-1" /> 启用</>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBacktest(strategy)}
                          disabled={isLoading}
                        >
                          <Activity className="w-3 h-3 mr-1" />
                          回测
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => getSignal(strategy)}
                          disabled={isLoading}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          获取信号
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditStrategy(strategy)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteStrategy(strategy.id)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: "rsi-oversold",
                name: "RSI 超卖买入",
                description: "当 RSI 低于 30 时买入，高于 70 时卖出",
                risk: 3,
                conditions: [{ type: "rsi", operator: "<", value: 30, timeframe: "1h" }],
              },
              {
                id: "breakout",
                name: "突破交易",
                description: "价格突破 20 日均线时买入",
                risk: 5,
                conditions: [{ type: "price", operator: ">", value: 0, timeframe: "1d" }],
              },
              {
                id: "social-sentiment",
                name: "社交情绪跟随",
                description: "当社交媒体情绪看涨且成交量放大时买入",
                risk: 7,
                conditions: [
                  { type: "social", operator: ">", value: 70, timeframe: "1h" },
                  { type: "volume", operator: ">", value: 2, timeframe: "1h" },
                ],
              },
              {
                id: "whale-accumulation",
                name: "鲸鱼跟单",
                description: "追踪大鲸鱼钱包的买入行为跟单",
                risk: 6,
                conditions: [{ type: "flow", operator: ">", value: 1000000, timeframe: "1h" }],
              },
              {
                id: "grid-trading",
                name: "网格交易",
                description: "在指定价格区间内进行高频交易",
                risk: 4,
                conditions: [{ type: "price", operator: "between", value: [0, 0], timeframe: "1h" }],
              },
              {
                id: "mean-reversion",
                name: "均值回归",
                description: "价格偏离均值时反向交易",
                risk: 5,
                conditions: [{ type: "price", operator: ">", value: 2, timeframe: "4h" }],
              },
            ].map((template) => (
              <Card
                key={template.id}
                className="hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => {
                  setNewStrategy({
                    name: template.name,
                    description: template.description,
                    risk: template.risk,
                  });
                  setConditions(template.conditions);
                  setActions([{ type: "buy", symbol: "BTCUSDT", amount: 0.01, price: "market" }]);
                  setShowForm(true);
                }}
              >
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <div className="text-sm text-zinc-400">{template.description}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className={cn("text-xs px-2 py-1 rounded-full", getRiskColor(template.risk))}>
                      {getRiskLabel(template.risk)}
                    </div>
                    <div className="text-xs text-zinc-500">{template.conditions.length} 个条件</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
