import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { DEXPrice, ArbitrageOpportunity, DeFiAggregatorResponse } from "@/lib/openclaw";

interface DeFiAggregatorState {
  prices: DEXPrice[];
  arbitrage: ArbitrageOpportunity[];
  bestRoute: { price: number; path: string[] } | null;
  isLoading: boolean;
  error: string | null;

  // Filters
  selectedToken: string | null;
  selectedChains: string[];
  minLiquidity: number;
  minSpread: number;
  showOnlyProfit: boolean;

  // Actions
  setData: (data: DeFiAggregatorResponse) => void;
  setSelectedToken: (token: string | null) => void;
  setSelectedChains: (chains: string[]) => void;
  setMinLiquidity: (liquidity: number) => void;
  setMinSpread: (spread: number) => void;
  setShowOnlyProfit: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updatePrice: (price: DEXPrice) => void;
}

export const useDeFiAggregatorStore = create<DeFiAggregatorState>()(
  devtools(
    persist(
      (set) => ({
        prices: [],
        arbitrage: [],
        bestRoute: null,
        isLoading: false,
        error: null,
        selectedToken: null,
        selectedChains: ["ethereum", "bsc", "polygon", "arbitrum"],
        minLiquidity: 100000,
        minSpread: 0.5,
        showOnlyProfit: false,

        setData: (data) =>
          set({
            prices: data.prices,
            arbitrage: data.arbitrage,
            bestRoute: data.bestRoute ?? null,
            isLoading: false,
            error: null,
          }),

        setSelectedToken: (token) => set({ selectedToken: token }),
        setSelectedChains: (chains) => set({ selectedChains: chains }),
        setMinLiquidity: (liquidity) => set({ minLiquidity: liquidity }),
        setMinSpread: (spread) => set({ minSpread: spread }),
        setShowOnlyProfit: (show) => set({ showOnlyProfit: show }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error, isLoading: false }),

        updatePrice: (price) =>
          set((state) => {
            const prices = state.prices.map((p) =>
              p.dex === price.dex && p.pair === price.pair ? price : p
            );
            return { prices };
          }),
      }),
      {
        name: "cryptoflow-defi",
        partialize: (state) => ({
          selectedChains: state.selectedChains,
          minLiquidity: state.minLiquidity,
          minSpread: state.minSpread,
          showOnlyProfit: state.showOnlyProfit,
        }),
      }
    ),
    { name: "DeFiAggregatorStore" }
  )
);
