import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化货币
export function formatCurrency(value: number, currency: string = "USD", decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// 格式化数字（带 K, M, B 后缀）
export function formatNumber(value: number, decimals: number = 2): string {
  if (value >= 1e9) return (value / 1e9).toFixed(decimals) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(decimals) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(decimals) + "K";
  return value.toFixed(decimals);
}

// 格式化百分比
export function formatPercent(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

// 获取涨跌颜色
export function getColorForChange(value: number): string {
  if (value > 0) return "text-cyan-400";
  if (value < 0) return "text-pink-500";
  return "text-gray-400";
}

// 获取背景色类
export function getBgForChange(value: number): string {
  if (value > 0) return "bg-cyan-500/10";
  if (value < 0) return "bg-pink-500/10";
  return "bg-gray-500/10";
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 生成 UUID
export function generateId(): string {
  return crypto.randomUUID();
}

// 时间戳转时间
export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// 时间戳转日期
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// 获取相对时间
export function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}天前`;

  return formatDate(timestamp);
}

// 计算 RSI
export function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

// 计算 EMA
export function calculateEMA(prices: number[], period: number = 20): number {
  if (prices.length < period) return prices[prices.length - 1];

  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b) / period;

  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }

  return ema;
}

// 风险评估
export function assessRisk(value: number, change: number, volume: number): "low" | "medium" | "high" {
  const volatility = Math.abs(change);
  const volumeRatio = volume / 1000000; // 基准 100 万

  if (volatility < 2 && volumeRatio > 1) return "low";
  if (volatility < 5 && volumeRatio > 0.5) return "medium";
  return "high";
}

// 截断地址
export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// 验证以太坊地址
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// 验证合约地址
export function isContractAddress(address: string, contracts: Set<string>): boolean {
  return contracts.has(address.toLowerCase());
}
