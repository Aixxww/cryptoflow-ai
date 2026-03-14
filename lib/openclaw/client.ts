import type {
  OpenClawConfig,
  OpenClawResponse,
  FlowAnalysisRequest,
  FlowAnalysisResponse,
  SocialRadarRequest,
  SocialRadarResponse,
  DeFiAggregatorRequest,
  DeFiAggregatorResponse,
  StrategyEngineRequest,
  StrategyEngineResponse,
  ChatRequest,
  ChatResponse,
  ExecuteTradeRequest,
  ExecuteTradeResponse,
} from "./types";

/**
 * OpenClaw AI 客户端
 * 通过 HTTP API 与 OpenClaw 通信
 */
export class OpenClawClient {
  private config: OpenClawConfig;

  constructor(config?: Partial<OpenClawConfig>) {
    this.config = {
      baseURL: config?.baseURL || "http://localhost:18789", // OpenClaw 默认端口
      apiKey: config?.apiKey,
      timeout: config?.timeout || 30000,
    };
  }

  private async request<T = any>(
    endpoint: string,
    method: string = "GET",
    body?: any
  ): Promise<OpenClawResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.config.apiKey) {
      headers["Authorization"] = `Bearer ${this.config.apiKey}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Request failed",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * 资金流分析
   */
  async analyzeFlow(params: FlowAnalysisRequest): Promise<OpenClawResponse<FlowAnalysisResponse>> {
    return this.request<FlowAnalysisResponse>("/api/crypto/flow", "POST", params);
  }

  /**
   * 社交雷达分析
   */
  async analyzeSocial(params: SocialRadarRequest): Promise<OpenClawResponse<SocialRadarResponse>> {
    return this.request<SocialRadarResponse>("/api/crypto/social", "POST", params);
  }

  /**
   * DeFi 聚合
   */
  async aggregateDeFi(params: DeFiAggregatorRequest): Promise<OpenClawResponse<DeFiAggregatorResponse>> {
    return this.request<DeFiAggregatorResponse>("/api/crypto/defi", "POST", params);
  }

  /**
   * 策略引擎
   */
  async executeStrategy(params: StrategyEngineRequest): Promise<OpenClawResponse<StrategyEngineResponse>> {
    return this.request<StrategyEngineResponse>("/api/crypto/strategy", "POST", params);
  }

  /**
   * AI 聊天
   */
  async chat(params: ChatRequest): Promise<OpenClawResponse<ChatResponse>> {
    return this.request<ChatResponse>("/api/crypto/chat", "POST", params);
  }

  /**
   * 执行交易
   */
  async executeTrade(params: ExecuteTradeRequest): Promise<OpenClawResponse<ExecuteTradeResponse>> {
    return this.request<ExecuteTradeResponse>("/api/crypto/trade", "POST", params);
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/health`, {
        method: "GET",
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// 导出单例
export const openclaw = new OpenClawClient();
