import { TIER_COLORS, TIER_LABELS } from "../data/coins";
import type { Coin } from "../types/game";

interface CoinCardProps {
  coin: Coin;
  count?: number;
  compact?: boolean;
  animate?: boolean;
}

export default function CoinCard({ coin, count, compact = false, animate = false }: CoinCardProps) {
  const tierColor = TIER_COLORS[coin.tier];
  const tierLabel = TIER_LABELS[coin.tier];

  if (compact) {
    return (
      <div
        className={`relative rounded-xl border p-3 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 ${animate ? "animate-bounceIn" : ""}`}
        style={{
          borderColor: `${tierColor}40`,
          background: `linear-gradient(135deg, ${coin.color}10 0%, transparent 60%)`,
        }}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ background: `${coin.color}20`, border: `1px solid ${coin.color}40` }}
        >
          {coin.emoji}
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-white leading-tight">{coin.name}</p>
          <p className="text-xs" style={{ color: tierColor }}>{coin.symbol}</p>
        </div>
        {count !== undefined && count > 1 && (
          <span
            className="absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            style={{ background: tierColor, color: "#000" }}
          >
            {count}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl border p-4 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${animate ? "animate-bounceIn" : ""}`}
      style={{
        borderColor: `${tierColor}50`,
        background: `linear-gradient(135deg, ${coin.color}15 0%, rgba(15,5,40,0.9) 60%)`,
        boxShadow: `0 0 24px ${coin.color}20`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${tierColor}25`, color: tierColor, border: `1px solid ${tierColor}50` }}
        >
          {tierLabel}
        </span>
        <span className="text-xs text-white/40">#{coin.rank}</span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
          style={{ background: `${coin.color}20`, border: `1.5px solid ${coin.color}50` }}
        >
          {coin.emoji}
        </div>
        <div>
          <h3 className="font-bold text-white text-sm leading-tight">{coin.name}</h3>
          <p className="text-xs text-white/50 mt-0.5">{coin.symbol}</p>
        </div>
      </div>

      <p className="text-xs text-white/60 leading-relaxed">{coin.description}</p>

      <div className="flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-xs text-white/40">Market Cap</span>
        <span className="text-xs font-semibold" style={{ color: coin.color }}>{coin.marketCap}</span>
      </div>

      {count !== undefined && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Owned</span>
          <span className="text-sm font-bold text-white">{count}x</span>
        </div>
      )}
    </div>
  );
}
