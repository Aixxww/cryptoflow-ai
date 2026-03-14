import { NextResponse } from 'next/server';

const OPENCLAW_GATEWAY = 'http://localhost:18789';
const OPENCLAW_TOKEN = '4fcab2e477fef7d6b80d61b9be52f8c1734cc5b581e33d82';

async function getFallbackSentiment() {
  const symbols = ['BTC', 'ETH', 'SOL', 'PEPE'];
  const timeFactor = Math.floor(Date.now() / 300000);

  return symbols.map((symbol) => {
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = hash + timeFactor;
    const pseudoRandom = ((seed * 9301 + 49297) % 233280) / 233280;
    const baseScore = 30 + pseudoRandom * 50;
    const mentions = 5000 + Math.floor(pseudoRandom * 25000);
    const trendValue = pseudoRandom > 0.6 ? 'up' : pseudoRandom > 0.3 ? 'down' : 'neutral';

    return {
      symbol,
      score: Math.min(100, Math.max(0, baseScore)),
      mentions,
      trend: trendValue,
    };
  });
}

export async function GET() {
  try {
    const symbols = ['BTC', 'ETH', 'SOL', 'PEPE'];

    // Try to fetch from OpenClaw OpenTwitter skill
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${OPENCLAW_GATEWAY}/api/agent/main/skill/6551-opentwitter/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENCLAW_TOKEN}`,
        },
        body: JSON.stringify({
          query: `${symbols.join(' OR ')} sentiment analysis`,
          limit: 10,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('OpenClaw OpenTwitter response:', data);
        // Try multiple response formats
        if (data?.tweets && Array.isArray(data.tweets)) {
          // Analyze sentiment from tweets
          const sentimentBySymbol = new Map();
          data.tweets.forEach((tweet: any) => {
            symbols.forEach((symbol) => {
              if (tweet.text?.toUpperCase().includes(symbol)) {
                const current = sentimentBySymbol.get(symbol) || {
                  symbol,
                  score: 50,
                  mentions: 0,
                };
                current.mentions += 1;
                current.score += tweet.sentiment === 'positive' ? 5 : tweet.sentiment === 'negative' ? -5 : 0;
                current.trend = tweet.sentiment || 'neutral';
                sentimentBySymbol.set(symbol, current);
              }
            });
          });
          const result = Array.from(sentimentBySymbol.values());
          if (result.length > 0) {
            return NextResponse.json(result);
          }
        }
        if (data?.sentiment && Array.isArray(data.sentiment)) {
          return NextResponse.json(data.sentiment);
        }
        if (data?.result?.sentiment && Array.isArray(data.result.sentiment)) {
          return NextResponse.json(data.result.sentiment);
        }
      }
    } catch (fetchError) {
      console.log('OpenClaw fetch failed, using fallback:', fetchError);
    }

    // Fallback to generated sentiment
    const sentiment = await getFallbackSentiment();
    return NextResponse.json(sentiment);
  } catch (error) {
    console.error('Failed to fetch sentiment:', error);
    const sentiment = await getFallbackSentiment();
    return NextResponse.json(sentiment);
  }
}
