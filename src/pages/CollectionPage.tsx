import { useState } from "react";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS, TIER_LABELS, getCoinById } from "../data/coins";
import CoinCard from "../components/CoinCard";
import type { Tier } from "../types/game";

type Filter = "all" | Tier;

export default function CollectionPage() {
  const { state } = useGame();
  const [filter, setFilter] = useState<Filter>("all");

  const collectedIds = new Set(state.collection.map((e) => e.coinId));
  const total = COINS.length;
  const collected = collectedIds.size;

  const filters: { label: string; value: Filter; color: string }[] = [
    { label: "All", value: "all", color: "#8B5CF6" },
    { label: "Legendary", value: "legendary", color: TIER_COLORS.legendary },
    { label: "Rare", value: "rare", color: TIER_COLORS.rare },
    { label: "Uncommon", value: "uncommon", color: TIER_COLORS.uncommon },
    { label: "Common", value: "common", color: TIER_COLORS.common },
  ];

  const visibleCoins = COINS.filter((c) => filter === "all" || c.tier === filter);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-1">Collection</h1>
          <p className="text-white/50 text-sm">
            {collected} / {total} coins collected
          </p>

          <div className="mt-3 w-full max-w-xs mx-auto h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-500"
              style={{ width: `${(collected / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
              style={
                filter === f.value
                  ? { background: f.color, color: "#000" }
                  : { background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {state.collection.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📦</p>
            <p className="text-white/50 text-sm">No coins yet. Open some packs!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleCoins.map((coin) => {
              const entry = state.collection.find((e) => e.coinId === coin.id);
              if (!entry) return null;
              return <CoinCard key={coin.id} coin={coin} count={entry.count} />;
            })}
          </div>
        )}

        {state.collection.length > 0 && (
          <div className="mt-8 space-y-2">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Missing</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {visibleCoins
                .filter((c) => !collectedIds.has(c.id))
                .map((coin) => (
                  <div
                    key={coin.id}
                    className="rounded-xl border border-white/10 p-3 flex flex-col items-center gap-1.5 opacity-40"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-white/5">
                      {coin.emoji}
                    </div>
                    <p className="text-xs text-white/60 text-center leading-tight">{coin.name}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
