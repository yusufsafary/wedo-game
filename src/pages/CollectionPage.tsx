import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS, TIER_LABELS } from "../data/coins";
import CoinAvatar from "../components/CoinAvatar";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "legendary", label: "Legendary" },
  { id: "rare", label: "Rare" },
  { id: "uncommon", label: "Uncommon" },
  { id: "common", label: "Common" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function CollectionCoinCard({
  coinId,
  count,
  isNew,
}: {
  coinId: string;
  count: number;
  isNew: boolean;
}) {
  const coin = COINS.find((c) => c.id === coinId);
  if (!coin) return null;
  const tierColor = TIER_COLORS[coin.tier];
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${coin.color}12, rgba(0,0,0,0.5))`,
        border: `1px solid ${coin.color}25`,
      }}
    >
      {count > 1 && (
        <div
          className="absolute top-2.5 right-2.5 z-20 min-w-[22px] h-[22px] px-1.5 rounded-lg flex items-center justify-center text-[9px] font-black"
          style={{ background: tierColor, color: "#000", boxShadow: `0 0 8px ${tierColor}60` }}
        >
          ×{count}
        </div>
      )}
      {isNew && (
        <div
          className="absolute top-2.5 right-2.5 z-20 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider"
          style={{ background: "rgba(255,255,255,0.9)", color: "#000" }}
        >
          NEW
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center gap-2.5 px-3 pt-8 pb-3.5">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full pointer-events-none blur-lg"
            style={{ background: coin.color, opacity: 0.12, transform: "scale(0.85)" }}
          />
          <CoinAvatar coin={coin} size="md" showGlow />
        </div>
        <div className="text-center">
          <p
            className="text-xs font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            {coin.name}
          </p>
          <p className="text-[8px] font-mono text-white/25 mt-0.5 tracking-widest">{coin.symbol}</p>
        </div>
        <div
          className="w-full flex items-center justify-between pt-2.5"
          style={{ borderTop: `1px solid ${coin.color}18` }}
        >
          <span
            className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md"
            style={{
              background: `${tierColor}18`,
              color: tierColor,
              border: `1px solid ${tierColor}25`,
            }}
          >
            {TIER_LABELS[coin.tier]}
          </span>
          <span className="text-[9px] font-mono text-green-400 font-bold">{coin.marketCap}</span>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  const { state } = useGame();
  const [, navigate] = useLocation();
  const [filter, setFilter] = useState<FilterId>("all");

  const totalCoins = COINS.length;
  const collectedCount = state.collection.length;
  const pct = Math.round((collectedCount / totalCoins) * 100);

  const tierOrder: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };

  const sortedCollection = state.collection
    .map((e) => ({ ...e, data: COINS.find((c) => c.id === e.coinId) }))
    .filter((e) => e.data)
    .sort((a, b) => {
      if (tierOrder[a.data!.tier] !== tierOrder[b.data!.tier])
        return tierOrder[a.data!.tier] - tierOrder[b.data!.tier];
      return b.count - a.count;
    });

  const filtered = filter === "all" ? sortedCollection : sortedCollection.filter((e) => e.data!.tier === filter);

  if (state.collection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 gap-6">
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center relative"
          style={{
            background: "linear-gradient(145deg, rgba(139,92,246,0.15), rgba(79,70,229,0.05))",
            border: "1.5px solid rgba(139,92,246,0.2)",
            boxShadow: "0 0 40px rgba(139,92,246,0.12)",
          }}
        >
          <PackageOpen className="w-10 h-10 text-white/20" />
        </motion.div>
        <div className="text-center gap-2 flex flex-col">
          <h2
            className="text-2xl font-extrabold text-white"
            style={{ fontFamily: "var(--app-font-display)" }}
          >
            Vault Empty
          </h2>
          <p className="text-sm text-white/35 leading-relaxed">
            Open your first pack to start collecting
            <br />
            coins from orynth.dev's top builders.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="h-13 px-8 rounded-2xl font-bold text-sm text-white flex items-center gap-2 relative overflow-hidden"
          style={{
            height: 52,
            background: "linear-gradient(135deg, #8B5CF6, #4F46E5)",
            boxShadow: "0 4px 28px rgba(139,92,246,0.4)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "btnShimmer 2.2s ease-in-out infinite",
            }}
          />
          <PackageOpen className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Open a Pack</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(124,58,237,0.1) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/25 mb-1">
              Your Vault
            </p>
            <h1
              className="text-3xl font-extrabold text-white leading-none"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              {collectedCount}{" "}
              <span className="text-white/25 text-2xl">/ {totalCoins}</span>
            </h1>
            <p className="text-xs text-white/30 font-medium mt-0.5">
              {totalCoins - collectedCount} coins still undiscovered
            </p>
          </div>
          <div
            className="text-right"
            style={{ color: pct >= 80 ? "#F59E0B" : pct >= 40 ? "#8B5CF6" : "rgba(255,255,255,0.3)" }}
          >
            <span
              className="text-3xl font-extrabold leading-none"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              {pct}%
            </span>
            <p className="text-[9px] uppercase tracking-widest font-bold opacity-60 mt-0.5">Complete</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg, #8B5CF6, #6366F1)" }}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const color =
            f.id === "all"
              ? "#8B5CF6"
              : TIER_COLORS[f.id as keyof typeof TIER_COLORS] ?? "#8B5CF6";
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-extrabold transition-all duration-200"
              style={
                active
                  ? { background: color, color: "#fff", border: `1px solid ${color}` }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.35)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="px-4 pb-6">
        {filtered.length === 0 ? (
          <p className="text-center text-white/20 text-sm py-8">No {filter} coins collected yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {filtered.map((entry) => (
              <CollectionCoinCard
                key={entry.coinId}
                coinId={entry.coinId}
                count={entry.count}
                isNew={Date.now() - entry.firstObtained < 10000}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
