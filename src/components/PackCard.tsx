import type { Pack } from "../types/game";

interface PackCardProps {
  pack: Pack;
  onBuy: (pack: Pack) => void;
  canAfford: boolean;
}

const TIER_ORDER = ["legendary", "rare", "uncommon", "common"] as const;

export default function PackCard({ pack, onBuy, canAfford }: PackCardProps) {
  return (
    <div
      className="relative rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
      style={{
        borderColor: `${pack.accentColor}50`,
        background: `linear-gradient(135deg, ${pack.accentColor}12 0%, rgba(10,4,30,0.95) 70%)`,
        boxShadow: `0 0 32px ${pack.glowColor}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span
            className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: `${pack.accentColor}30`, color: pack.accentColor }}
          >
            {pack.tag}
          </span>
          <h3 className="text-lg font-black text-white mt-2">{pack.name}</h3>
          <p className="text-xs text-white/50 mt-0.5">{pack.description}</p>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: `${pack.accentColor}20`, border: `1.5px solid ${pack.accentColor}50` }}
        >
          🎴
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Drop Rates</p>
        {TIER_ORDER.map((tier) => {
          const rate = pack.odds[tier];
          if (rate === 0) return null;
          const colors: Record<string, string> = {
            legendary: "#FBBF24",
            rare: "#60A5FA",
            uncommon: "#34D399",
            common: "#94A3B8",
          };
          return (
            <div key={tier} className="flex items-center gap-2">
              <div className="w-16 text-xs capitalize" style={{ color: colors[tier] }}>{tier}</div>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${rate}%`, background: colors[tier] }}
                />
              </div>
              <div className="text-xs text-white/50 w-8 text-right">{rate}%</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onBuy(pack)}
        disabled={!canAfford}
        className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
        style={{
          background: canAfford
            ? `linear-gradient(135deg, ${pack.accentColor}, ${pack.accentColor}bb)`
            : "#1e1e2e",
          color: canAfford ? "#000" : "#ffffff60",
          border: canAfford ? "none" : `1px solid ${pack.accentColor}40`,
        }}
      >
        {canAfford ? `Open for ${pack.cost} W` : `Need ${pack.cost} W`}
      </button>
    </div>
  );
}
