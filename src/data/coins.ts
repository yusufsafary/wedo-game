import type { Coin } from "../types/game";

export const COINS: Coin[] = [
  { id: "suzupay", name: "SuzuPay", symbol: "SUZ", rank: 6, marketCap: "$22K", description: "QR Code Payment solution", tier: "legendary", color: "#FF4444", emoji: "🔔" },
  { id: "avocado-ai", name: "Avocado AI", symbol: "AVO", rank: 7, marketCap: "$19.7K", description: "Ship client-ready ads instantly", tier: "legendary", color: "#22C55E", emoji: "🥑" },
  { id: "avatar-ui", name: "AVATAR UI", symbol: "AVT", rank: 8, marketCap: "$14.6K", description: "Next-gen interface for the web", tier: "legendary", color: "#A855F7", emoji: "👾" },
  { id: "brain", name: "Brain", symbol: "BRN", rank: 9, marketCap: "$11.4K", description: "The AI infrastructure layer", tier: "rare", color: "#F97316", emoji: "🧠" },
  { id: "relaxsync", name: "Relaxsync", symbol: "RLX", rank: 10, marketCap: "$10.6K", description: "20-sided roll/rotate experience", tier: "rare", color: "#6366F1", emoji: "🎲" },
  { id: "ordina", name: "Ordina", symbol: "ORD", rank: 11, marketCap: "$10.3K", description: "Your 24/7 AI secretary", tier: "rare", color: "#0EA5E9", emoji: "📋" },
  { id: "degen-terminal", name: "Degen Terminal", symbol: "DGN", rank: 12, marketCap: "$9.2K", description: "The AI trading terminal", tier: "uncommon", color: "#EAB308", emoji: "📊" },
  { id: "inspirexgrowth", name: "inspireXgrowth", symbol: "IXG", rank: 13, marketCap: "$9K", description: "AI-powered growth platform", tier: "uncommon", color: "#14B8A6", emoji: "♾️" },
  { id: "aniverse", name: "Aniverse", symbol: "ANV", rank: 14, marketCap: "$7.6K", description: "3D x AI Next-Generation", tier: "uncommon", color: "#8B5CF6", emoji: "🌌" },
  { id: "redcircle", name: "RedCircle", symbol: "RDC", rank: 15, marketCap: "$7K", description: "Bringing Reddit posts to life", tier: "uncommon", color: "#EF4444", emoji: "🔴" },
  { id: "feedrun", name: "FeedRun", symbol: "FDR", rank: 16, marketCap: "$6.4K", description: "Feedback forms for everyone", tier: "common", color: "#F59E0B", emoji: "📝" },
  { id: "whitespace", name: "Whitespace", symbol: "WSP", rank: 17, marketCap: "$6.4K", description: "Personalized Meditation app", tier: "common", color: "#64748B", emoji: "🧘" },
  { id: "xscouter-ai", name: "XScouter AI", symbol: "XSC", rank: 18, marketCap: "$6.3K", description: "Don't Trust. Verify. Score.", tier: "common", color: "#10B981", emoji: "🔍" },
  { id: "cofounder-hunt", name: "Cofounder Hunt", symbol: "CFH", rank: 19, marketCap: "$6.2K", description: "Find your co-founder match", tier: "common", color: "#3B82F6", emoji: "🤝" },
  { id: "lilagents", name: "lil Agents", symbol: "LLA", rank: 20, marketCap: "$6.2K", description: "Agents you can hire to work", tier: "common", color: "#EC4899", emoji: "🤖" },
];

export const TIER_COLORS: Record<string, string> = {
  common: "#94A3B8",
  uncommon: "#34D399",
  rare: "#60A5FA",
  legendary: "#FBBF24",
};

export const TIER_LABELS: Record<string, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  legendary: "Legendary",
};

export function getCoinById(id: string): Coin | undefined {
  return COINS.find((c) => c.id === id);
}
