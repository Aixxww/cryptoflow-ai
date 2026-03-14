import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface MarketTicker {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
}

interface MarketState {
  // Tickers
  tickers: Map<string, MarketTicker>;
  selectedSymbol: string;
  trendingSymbols: string[];

  // Chart data
  klines: Map<string, Array<{ time: number; open: number; high: number; low: number; close: number; volume: number }>>;

  // Connection status
  isConnected: boolean;
  lastUpdate: number;

  // Actions
  setTicker: (symbol: string, ticker: MarketTicker) => void;
  setTickers: (tickers: MarketTicker[]) => void;
  setSelectedSymbol: (symbol: string) => void;
  setKlines: (symbol: string, klines: any[]) => void;
  addKline: (symbol: string, kline: any) => void;
  setConnected: (connected: boolean) => void;
  setTrending: (symbols: string[]) => void;
}

export const useMarketStore = create<MarketState>()(
  devtools(
    persist(
      (set, get) => ({
        tickers: new Map(),
        selectedSymbol: "BTCUSDT",
        trendingSymbols: ["BTCUSDT", "ETHUSDT", "DOGEUSDT", "PEPEUSDT", "WIFUSDT"],
        klines: new Map(),
        isConnected: false,
        lastUpdate: 0,

        setTicker: (symbol, ticker) =>
          set((state) => {
            const tickers = new Map(state.tickers);
            tickers.set(symbol, ticker);
            return { tickers, lastUpdate: Date.now() };
          }),

        setTickers: (newTickers) =>
          set((state) => {
            const tickers = new Map(state.tickers);
            newTickers.forEach((ticker) => tickers.set(ticker.symbol, ticker));
            return { tickers, lastUpdate: Date.now() };
          }),

        setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),

        setKlines: (symbol, klines) =>
          set((state) => {
            const newKlines = new Map(state.klines);
            newKlines.set(symbol, klines);
            return { klines: newKlines };
          }),

        addKline: (symbol, kline) =>
          set((state) => {
            const klines = new Map(state.klines);
            const existing = klines.get(symbol) || [];

            // Update last candle or add new one
            if (existing.length > 0 && existing[existing.length - 1].time === kline.time) {
              existing[existing.length - 1] = kline;
            } else {
              existing.push(kline);
              if (existing.length > 300) existing.shift();
            }

            klines.set(symbol, existing);
            return { klines };
          }),

        setConnected: (connected) => set({ isConnected: connected }),

        setTrending: (symbols) => set({ trendingSymbols: symbols }),
      }),
      {
        name: "cryptoflow-market",
        partialize: (state) => ({
          selectedSymbol: state.selectedSymbol,
        }),
      }
    ),
    { name: "MarketStore" }
  )
);
