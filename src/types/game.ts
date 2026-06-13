export type Tier = "common" | "uncommon" | "rare" | "legendary";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  marketCap: string;
  description: string;
  tier: Tier;
  color: string;
  emoji: string;
}

export interface Pack {
  id: string;
  name: string;
  cost: number;
  description: string;
  odds: {
    common: number;
    uncommon: number;
    rare: number;
    legendary: number;
  };
  accentColor: string;
  glowColor: string;
  tag: string;
}

export interface CollectionEntry {
  coinId: string;
  count: number;
  firstObtained: number;
}

export interface GameState {
  wedoBalance: number;
  collection: CollectionEntry[];
  totalSwaps: number;
  lastPackId?: string;
}
