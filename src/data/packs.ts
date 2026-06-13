import type { Pack } from "../types/game";

export const PACKS: Pack[] = [
  {
    id: "basic",
    name: "Basic Pack",
    cost: 10,
    description: "Starter pack for new collectors",
    odds: { common: 70, uncommon: 25, rare: 5, legendary: 0 },
    accentColor: "#64748B",
    glowColor: "rgba(100,116,139,0.4)",
    tag: "FREE STARTER",
  },
  {
    id: "mystery",
    name: "Mystery Pack",
    cost: 50,
    description: "Balanced mystery with rare chances",
    odds: { common: 30, uncommon: 40, rare: 25, legendary: 5 },
    accentColor: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.4)",
    tag: "POPULAR",
  },
  {
    id: "epic",
    name: "Epic Pack",
    cost: 150,
    description: "High-tier coins guaranteed",
    odds: { common: 0, uncommon: 20, rare: 60, legendary: 20 },
    accentColor: "#F97316",
    glowColor: "rgba(249,115,22,0.4)",
    tag: "HOT",
  },
  {
    id: "legendary",
    name: "Legendary Pack",
    cost: 500,
    description: "Elite pack with top-tier coins",
    odds: { common: 0, uncommon: 0, rare: 30, legendary: 70 },
    accentColor: "#EAB308",
    glowColor: "rgba(234,179,8,0.5)",
    tag: "ULTRA RARE",
  },
];

export const PACK_PREVIEW_COINS: Record<string, string[]> = {
  basic: ["brain", "relaxsync", "aniverse"],
  mystery: ["suzupay", "brain", "feedrun"],
  epic: ["avocado-ai", "avatar-ui", "brain"],
  legendary: ["suzupay", "avatar-ui", "avocado-ai"],
};

export const PACK_BACKGROUNDS: Record<string, string> = {
  basic: `
    radial-gradient(ellipse 90% 55% at 50% 5%,  #1e4a7a44 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 15% 70%, #1a3a6044 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 85% 40%, #0d2a4a33 0%, transparent 55%),
    linear-gradient(175deg, #0e2540 0%, #07111e 55%, #040810 100%)
  `,
  mystery: `
    radial-gradient(ellipse 80% 50% at 50% 0%,  #4c1d9555 0%, transparent 60%),
    radial-gradient(ellipse 55% 45% at 10% 60%, #6b21a844 0%, transparent 50%),
    radial-gradient(ellipse 65% 45% at 90% 35%, #db277744 0%, transparent 50%),
    linear-gradient(175deg, #1e0b4a 0%, #100527 55%, #060210 100%)
  `,
  epic: `
    radial-gradient(ellipse 80% 55% at 50% 5%,  #c2410c55 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 20% 65%, #9a340844 0%, transparent 50%),
    radial-gradient(ellipse 70% 45% at 80% 35%, #dc262644 0%, transparent 50%),
    linear-gradient(175deg, #2d0e04 0%, #1a0802 55%, #080300 100%)
  `,
  legendary: `
    radial-gradient(ellipse 80% 50% at 50% 5%,  #b4580466 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 15% 65%, #92400e55 0%, transparent 50%),
    radial-gradient(ellipse 70% 45% at 85% 35%, #d9770655 0%, transparent 50%),
    linear-gradient(175deg, #211200 0%, #120a00 55%, #080400 100%)
  `,
};

export const PACK_SERIES: Record<string, string> = {
  basic: "STARTER SERIES",
  mystery: "MYSTERY SERIES",
  epic: "POWER SERIES",
  legendary: "ELITE SERIES",
};

export const PACK_EMOJIS: Record<string, string> = {
  basic: "📦",
  mystery: "🔮",
  epic: "⚡",
  legendary: "👑",
};

export const NOISE_SVG = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.07'/></svg>")`;

export const FLOATING_DOTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 5 + ((i * 37 + 17) % 90),
  y: 5 + ((i * 53 + 29) % 85),
  r: 1 + (i * 7) % 3,
  delay: (i * 0.4) % 4,
  dur: 2.5 + (i * 0.6) % 3,
}));

export function getPackById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}
