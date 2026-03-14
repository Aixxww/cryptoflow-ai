import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SentimentData, SocialRadarResponse } from "@/lib/openclaw";

interface SocialRadarState {
  overallSentiment: number; // 0-100
  platforms: SentimentData[];
  hotTopics: string[];
  kols: Array<{ name: string; platform: string; sentiment: number; confidence: number }>;
  fearGreedIndex: number | null;
  isLoading: boolean;
  error: string | null;

  // Filters
  timeRange: number; // minutes
  selectedPlatforms: string[];
  autoRefresh: boolean;

  // Actions
  setData: (data: SocialRadarResponse) => void;
  setTimeRange: (range: number) => void;
  setSelectedPlatforms: (platforms: string[]) => void;
  setAutoRefresh: (auto: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addTopic: (topic: string) => void;
}

export const useSocialRadarStore = create<SocialRadarState>()(
  devtools((set) => ({
    overallSentiment: 50,
    platforms: [],
    hotTopics: [],
    kols: [],
    fearGreedIndex: null,
    isLoading: false,
    error: null,
    timeRange: 60,
    selectedPlatforms: ["twitter", "telegram"],
    autoRefresh: true,

    setData: (data) =>
      set({
        overallSentiment: data.overallSentiment,
        platforms: data.platforms,
        hotTopics: data.hotTopics,
        kols: data.kols,
        fearGreedIndex: data.fearGreedIndex ?? null,
        isLoading: false,
        error: null,
      }),

    setTimeRange: (range) => set({ timeRange: range }),
    setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
    setAutoRefresh: (auto) => set({ autoRefresh: auto }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error, isLoading: false }),

    addTopic: (topic) =>
      set((state) => ({
        hotTopics: [topic, ...state.hotTopics].slice(0, 10),
      })),
  }))
);
