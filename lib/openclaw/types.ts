// OpenClaw API 类型定义

export interface OpenClawConfig {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
}

export interface OpenClawResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============ 资金流分析 ============
export interface WhaleTransaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  symbol: string;
  timestamp: number;
  type: "in" | "out";
  exchange?: string;
}

export interface FlowAnalysisRequest {
  timeRange: "1h" | "6h" | "24h" | "7d";
  minAmount?: number;
  tokens?: string[];
  exchanges?: string[];
}

export interface FlowAnalysisResponse {
  totalVolume: number;
  transactions: WhaleTransaction[];
  flowMap: Record<string, { in: number; out: number; net: number }>;
  hotWallets: string[];
  riskLevel: "low" | "medium" | "high";
}

// ============ 社交情绪分析 ============
export interface SentimentData {
  platform: string;
  score: number; // 0-100
  volume: number;
  keywords: string[];
  trend: "up" | "down" | "neutral";
  timestamp: number;
}

export interface SocialRadarRequest {
  keywords?: string[];
  platforms?: string[];
  timeRange: number; // 分钟
}

export interface SocialRadarResponse {
  overallSentiment: number;
  platforms: SentimentData[];
  hotTopics: string[];
  kols: Array<{
    name: string;
    platform: string;
    sentiment: number;
    confidence: number;
  }>;
  fearGreedIndex?: number;
}

// ============ DeFi 聚合 ============
export interface DEXPrice {
  chain: string;
  dex: string;
  pair: string;
  price: number;
  liquidity: number;
  volume24h: number;
}

export interface ArbitrageOpportunity {
  token: string;
  buyOn: { dex: string; chain: string; price: number };
  sellOn: { dex: string; chain: string; price: number };
  spread: number;
  estimatedProfit: number;
  liquidity: number;
  path?: string[];
}

export interface DeFiAggregatorRequest {
  token?: string;
  chains?: string[];
  minLiquidity?: number;
  minSpread?: number;
}

export interface DeFiAggregatorResponse {
  prices: DEXPrice[];
  arbitrage: ArbitrageOpportunity[];
  bestRoute?: { price: number; path: string[] };
}

// ============ 策略引擎 ============
export interface StrategyCondition {
  type: "price" | "rsi" | "volume" | "social" | "flow" | "sentiment";
  operator: ">" | "<" | "=" | ">=" | "<=" | "between";
  value: any;
  timeframe?: string;
}

export interface StrategyAction {
  type: "buy" | "sell" | "alert" | "close";
  symbol: string;
  amount?: number;
  price?: "market" | "limit" | { type: "limit"; value: number };
}

export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  conditions: StrategyCondition[];
  actions: StrategyAction[];
  risk: number; // 1-10
  enabled: boolean;
}

export interface BacktestResult {
  totalTrades: number;
  winRate: number;
  profitLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: Array<{
    entryTime: number;
    exitTime: number;
    entryPrice: number;
    exitPrice: number;
    profit: number;
  }>;
}

export interface StrategyEngineRequest {
  strategy: TradingStrategy;
  symbol: string;
  period: string;
  action?: "analyze" | "backtest" | "signal";
}

export interface StrategyEngineResponse {
  signal?: "buy" | "sell" | "hold";
  confidence: number;
  reasoning?: string;
  backtest?: BacktestResult;
}

// ============ 自然语言指令 ============
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
}

export interface ChatRequest {
  messages: ChatMessage[];
  context?: {
    currentSymbol?: string;
    portfolio?: Record<string, number>;
    openOrders?: any[];
  };
}

export interface ChatResponse {
  message: string;
  suggestedActions?: Array<{
    type: string;
    params: any;
    label: string;
  }>;
  data?: any;
}

// ============ 订单执行 ============
export interface OrderParams {
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit";
  amount: number;
  price?: number;
  tpPrice?: number;
  slPrice?: number;
}

export interface ExecuteTradeRequest {
  exchange: string;
  order: OrderParams;
  confirm: boolean;
}

export interface ExecuteTradeResponse {
  success: boolean;
  orderId?: string;
  executedPrice?: number;
  executedAmount?: number;
  error?: string;
}
