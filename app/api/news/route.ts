import { NextResponse } from 'next/server';

const OPENCLAW_GATEWAY = 'http://localhost:18789';
const OPENCLAW_TOKEN = process.env.OPENCLAW_API_KEY || 'your_openclaw_api_key_here';

async function getFallbackNews() {
  const templates = [
    { title: "比特币突破关键阻力位，多头攻势持续", source: "币安研究院", sentiment: "positive", symbols: ["BTC"] },
    { title: "以太坊Layer2 TVB创历史新高", source: "Messari", sentiment: "positive", symbols: ["ETH"] },
    { title: "Solana生态新DeFi协议上线引发关注", source: "CoinDesk", sentiment: "positive", symbols: ["SOL"] },
    { title: "美联储政策走向影响市场情绪", source: "Reuters", sentiment: "neutral", symbols: ["ALL"] },
    { title: "某知名项目遭遇安全审计警告", source: "The Block", sentiment: "negative", symbols: ["ALT"] },
  ];

  return templates.map((item, idx) => ({
    id: `fallback-${Date.now()}-${idx}`,
    title: item.title,
    source: item.source,
    url: `https://www.binance.com/zh-CN/news`,
    publishedAt: new Date(Date.now() - idx * 3600000 - 600000).toISOString(),
    sentiment: item.sentiment,
    symbols: item.symbols,
  }));
}

export async function GET() {
  try {
    // Try to fetch from OpenClaw OpenNews skill
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${OPENCLAW_GATEWAY}/api/agent/main/skill/6551-opennews/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENCLAW_TOKEN}`,
        },
        body: JSON.stringify({ limit: 10, categories: ['crypto', 'defi', 'trading'] }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('OpenClaw OpenNews response:', data);
        if (data?.news && Array.isArray(data.news)) {
          return NextResponse.json(data.news);
        }
        if (data?.result?.news && Array.isArray(data.result.news)) {
          return NextResponse.json(data.result.news);
        }
      }
    } catch (fetchError) {
      console.log('OpenClaw fetch failed, using fallback:', fetchError);
    }

    // Fallback to generated news
    const news = await getFallbackNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    const news = await getFallbackNews();
    return NextResponse.json(news);
  }
}
