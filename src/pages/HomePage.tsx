import { Link } from "wouter";
import WedoLogo from "../components/WedoLogo";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS } from "../data/coins";

export default function HomePage() {
  const { state, resetGame } = useGame();
  const collectedIds = new Set(state.collection.map((e) => e.coinId));
  const total = COINS.length;
  const collected = collectedIds.size;
  const pct = Math.round((collected / total) * 100);

  const legendaryOwned = state.collection.filter((e) => {
    const c = COINS.find((coin) => coin.id === e.coinId);
    return c?.tier === "legendary";
  }).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <WedoLogo size={64} glow />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">WEDO</h1>
            <p className="text-violet-400 text-sm font-semibold mt-0.5">Collect · Trade · Build</p>
          </div>
          <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
            Collect the top 15 builder projects from Orynth. Open packs, complete the set.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-800/40 bg-violet-950/30 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">Your Stats</span>
            <button
              onClick={() => {
                if (confirm("Reset the game? You'll lose all coins and start with 1,000 W again.")) {
                  resetGame();
                }
              }}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-xl font-black text-white">{state.wedoBalance.toLocaleString()}</p>
              <p className="text-[10px] text-white/40 mt-0.5">WEDO Balance</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-xl font-black text-white">{collected}/{total}</p>
              <p className="text-[10px] text-white/40 mt-0.5">Collected</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-xl font-black text-white">{state.totalSwaps}</p>
              <p className="text-[10px] text-white/40 mt-0.5">Packs Opened</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/40 mb-1.5">
              <span>Collection Progress</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                }}
              />
            </div>
          </div>

          {legendaryOwned > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <span className="text-lg">🏆</span>
              <p className="text-xs text-amber-400 font-semibold">
                {legendaryOwned} Legendary coin{legendaryOwned > 1 ? "s" : ""} in collection!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/shop">
            <a className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-violet-600/50 bg-violet-900/30 hover:bg-violet-900/50 transition-all duration-200 hover:scale-[1.02] active:scale-95">
              <span className="text-3xl">🎴</span>
              <span className="text-sm font-bold text-white">Open Packs</span>
              <span className="text-xs text-violet-400">from 10 W</span>
            </a>
          </Link>
          <Link href="/collection">
            <a className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95">
              <span className="text-3xl">📦</span>
              <span className="text-sm font-bold text-white">Collection</span>
              <span className="text-xs text-white/40">{collected} coins</span>
            </a>
          </Link>
        </div>

        {state.collection.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Recently Collected</h3>
            <div className="grid grid-cols-5 gap-2">
              {state.collection.slice(-5).reverse().map((entry) => {
                const coin = COINS.find((c) => c.id === entry.coinId);
                if (!coin) return null;
                return (
                  <div
                    key={entry.coinId}
                    className="aspect-square rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${coin.color}15`,
                      border: `1px solid ${TIER_COLORS[coin.tier]}40`,
                    }}
                    title={coin.name}
                  >
                    {coin.emoji}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Link href="/info">
          <a className="block text-center text-xs text-white/25 hover:text-white/50 transition-colors py-2">
            How to play &rarr;
          </a>
        </Link>
      </div>
    </div>
  );
}
