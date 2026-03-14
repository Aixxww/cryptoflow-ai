import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WhaleTransaction, FlowAnalysisResponse } from "@/lib/openclaw";

interface HeatMapState {
  transactions: WhaleTransaction[];
  flowMap: Record<string, { in: number; out: number; net: number }>;
  totalVolume: number;
  riskLevel: "low" | "medium" | "high" | null;
  hotWallets: string[];
  isLoading: boolean;
  error: string | null;

  // Filters
  timeRange: "1h" | "6h" | "24h" | "7d";
  selectedChains: string[];
  minAmount: number;

  // Actions
  setData: (data: FlowAnalysisResponse) => void;
  addTransaction: (tx: WhaleTransaction) => void;
  setTimeRange: (range: "1h" | "6h" | "24h" | "7d") => void;
  setSelectedChains: (chains: string[]) => void;
  setMinAmount: (amount: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useHeatMapStore = create<HeatMapState>()(
  devtools((set) => ({
    transactions: [],
    flowMap: {},
    totalVolume: 0,
    riskLevel: null,
    hotWallets: [],
    isLoading: false,
    error: null,
    timeRange: "24h",
    selectedChains: ["ethereum", "bsc", "solana", "tron"],
    minAmount: 100000,

    setData: (data) =>
      set({
        transactions: data.transactions,
        flowMap: data.flowMap,
        totalVolume: data.totalVolume,
        riskLevel: data.riskLevel,
        hotWallets: data.hotWallets,
        isLoading: false,
        error: null,
      }),

    addTransaction: (tx) =>
      set((state) => ({
        transactions: [tx, ...state.transactions].slice(0, 100),
        totalVolume: state.totalVolume + tx.amount,
      })),

    setTimeRange: (range) => set({ timeRange: range }),
    setSelectedChains: (chains) => set({ selectedChains: chains }),
    setMinAmount: (amount) => set({ minAmount: amount }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error, isLoading: false }),

    reset: () =>
      set({
        transactions: [],
        flowMap: {},
        totalVolume: 0,
        riskLevel: null,
        hotWallets: [],
        error: null,
      }),
  }))
);
