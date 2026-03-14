import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TradingStrategy, BacktestResult, StrategyEngineResponse } from "@/lib/openclaw";

interface StrategyLabState {
  strategies: TradingStrategy[];
  activeStrategy: TradingStrategy | null;
  backtestResults: Map<string, BacktestResult>;
  currentSignal: string | null;
  signalConfidence: number;
  isLoading: boolean;
  error: string | null;

  // UI State
  isEditing: boolean;
  editingStrategy: TradingStrategy | null;

  // Actions
  setStrategies: (strategies: TradingStrategy[]) => void;
  addStrategy: (strategy: TradingStrategy) => void;
  updateStrategy: (id: string, strategy: Partial<TradingStrategy>) => void;
  deleteStrategy: (id: string) => void;
  setActiveStrategy: (strategy: TradingStrategy | null) => void;
  setBacktestResult: (strategyId: string, result: BacktestResult) => void;
  setSignal: (response: StrategyEngineResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setEditing: (isEditing: boolean, strategy?: TradingStrategy) => void;
  toggleStrategy: (id: string) => void;
}

export const useStrategyLabStore = create<StrategyLabState>()(
  devtools(
    persist(
      (set) => ({
        strategies: [
          {
            id: "default-rsi",
            name: "RSI 超卖买入",
            description: "当 RSI 低于 30 时买入",
            conditions: [
              { type: "rsi", operator: "<", value: 30, timeframe: "1h" },
            ],
            actions: [{ type: "buy", symbol: "BTCUSDT", amount: 0.01, price: "market" }],
            risk: 5,
            enabled: false,
          },
        ],
        activeStrategy: null,
        backtestResults: new Map(),
        currentSignal: null,
        signalConfidence: 0,
        isLoading: false,
        error: null,
        isEditing: false,
        editingStrategy: null,

        setStrategies: (strategies) => set({ strategies }),

        addStrategy: (strategy) =>
          set((state) => ({
            strategies: [...state.strategies, strategy],
          })),

        updateStrategy: (id, updates) =>
          set((state) => ({
            strategies: state.strategies.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
          })),

        deleteStrategy: (id) =>
          set((state) => {
            const backtestResults = new Map(state.backtestResults);
            backtestResults.delete(id);
            return {
              strategies: state.strategies.filter((s) => s.id !== id),
              backtestResults,
            };
          }),

        setActiveStrategy: (strategy) => set({ activeStrategy: strategy }),

        setBacktestResult: (strategyId, result) =>
          set((state) => {
            const backtestResults = new Map(state.backtestResults);
            backtestResults.set(strategyId, result);
            return { backtestResults };
          }),

        setSignal: (response) =>
          set({
            currentSignal: response.signal ?? null,
            signalConfidence: response.confidence,
          }),

        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error, isLoading: false }),

        setEditing: (isEditing, strategy) =>
          set({ isEditing, editingStrategy: strategy ?? null }),

        toggleStrategy: (id) =>
          set((state) => ({
            strategies: state.strategies.map((s) =>
              s.id === id ? { ...s, enabled: !s.enabled } : s
            ),
          })),
      }),
      {
        name: "cryptoflow-strategy",
        partialize: (state) => ({
          strategies: state.strategies,
          activeStrategy: state.activeStrategy?.id,
        }),
      }
    ),
    { name: "StrategyLabStore" }
  )
);
