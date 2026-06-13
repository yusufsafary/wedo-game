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
