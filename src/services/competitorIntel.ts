import { supabase } from "@/integrations/supabase/client";
import { CompetitorComparison } from "@/data/competitiveDifferentiation";

export interface LiveCompetitorData extends CompetitorComparison {
  priceChange?: "up" | "down" | "same" | "unknown";
  confidence?: "high" | "medium" | "low";
  isLive?: boolean;
}

export interface CompetitorIntelResult {
  competitors: LiveCompetitorData[];
  marketTrends?: string[];
  lastUpdated: string;
  isLive: boolean;
}

interface CachedIntel {
  data: CompetitorIntelResult;
  timestamp: number;
}

const CACHE_KEY_PREFIX = "competitor_intel_";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Product to competitor mapping
const productCompetitors: Record<string, string[]> = {
  "business-fiber-1g": ["Comcast Business", "Verizon Business", "T-Mobile Business", "Spectrum Business"],
  "business-voice": ["RingCentral", "Vonage Business", "Ooma Office", "Zoom Phone"],
  
  "internet-air-business": ["T-Mobile 5G Business Internet", "Starlink Business", "Verizon 5G Business Internet"],
  "hsia-enterprise": ["Lumen Enterprise", "Comcast Business Enterprise", "Spectrum Enterprise"]
};

function getCacheKey(productId: string): string {
  return `${CACHE_KEY_PREFIX}${productId}`;
}

function getCachedIntel(productId: string): CompetitorIntelResult | null {
  try {
    const cached = localStorage.getItem(getCacheKey(productId));
    if (!cached) return null;

    const parsed: CachedIntel = JSON.parse(cached);
    const now = Date.now();
    
    if (now - parsed.timestamp > CACHE_DURATION_MS) {
      localStorage.removeItem(getCacheKey(productId));
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedIntel(productId: string, data: CompetitorIntelResult): void {
  try {
    const cacheEntry: CachedIntel = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(getCacheKey(productId), JSON.stringify(cacheEntry));
  } catch (e) {
    console.warn("Failed to cache competitor intel:", e);
  }
}

export async function fetchCompetitorIntel(
  productId: string, 
  productName: string,
  forceRefresh = false
): Promise<CompetitorIntelResult> {
  // Check cache first unless force refresh
  if (!forceRefresh) {
    const cached = getCachedIntel(productId);
    if (cached) {
      // Using cached data
      return cached;
    }
  }

  const competitors = productCompetitors[productId] || ["Comcast Business", "Verizon Business"];


  const { data, error } = await supabase.functions.invoke("competitor-intel", {
    body: { productId, productName, competitors }
  });

  if (error) {
    console.error("Error fetching competitor intel:", error);
    throw new Error(error.message || "Failed to fetch competitor intelligence");
  }

  if (!data.success) {
    throw new Error(data.error || "Failed to get competitor data");
  }

  const result: CompetitorIntelResult = {
    competitors: data.data.competitors.map((c: LiveCompetitorData) => ({
      ...c,
      isLive: true
    })),
    marketTrends: data.data.marketTrends,
    lastUpdated: data.lastUpdated,
    isLive: true
  };

  // Cache the result
  setCachedIntel(productId, result);

  return result;
}

export function getLastUpdatedText(lastUpdated: string): string {
  const updated = new Date(lastUpdated);
  const now = new Date();
  const diffMs = now.getTime() - updated.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export function mergeWithStaticData(
  staticComparisons: CompetitorComparison[],
  liveData: LiveCompetitorData[]
): LiveCompetitorData[] {
  // Create a map of live data by competitor name
  const liveMap = new Map(liveData.map(c => [c.competitor.toLowerCase(), c]));

  return staticComparisons.map(static_ => {
    const live = liveMap.get(static_.competitor.toLowerCase());
    
    if (live) {
      // Merge: prefer live data but keep static positioning if better
      return {
        ...static_,
        theirOffer: live.theirOffer || static_.theirOffer,
        attAdvantage: live.attAdvantage || static_.attAdvantage,
        nuance: live.nuance || static_.nuance,
        winningStatement: live.winningStatement || static_.winningStatement,
        priceChange: live.priceChange,
        confidence: live.confidence,
        isLive: true
      };
    }

    return { ...static_, isLive: false };
  });
}

export function clearIntelCache(productId?: string): void {
  if (productId) {
    localStorage.removeItem(getCacheKey(productId));
  } else {
    // Clear all competitor intel cache
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_KEY_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}
