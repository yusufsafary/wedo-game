import { COINS, TIER_COLORS } from "../data/coins";
import { PACKS } from "../data/packs";

const RARITY_INFO = [
  { tier: "common", rate: "70%", pack: "Basic", cost: "10 W", desc: "The most plentiful. Easy to find, but still part of a complete collection." },
  { tier: "uncommon", rate: "25%", pack: "Mystery", cost: "50 W", desc: "A step above common. Harder to find, worth more." },
  { tier: "rare", rate: "5%", pack: "Epic", cost: "150 W", desc: "Top-tier builders. Only 1-in-20 packs yield a Rare." },
  { tier: "legendary", rate: "0.5%", pack: "Legendary", cost: "500 W", desc: "Orynth's finest. Ultra-scarce. The crown jewel of any collection." },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-2">About WEDO</h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
            WEDO is a collector game featuring the top projects from{" "}
            <a href="https://orynth.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
              Orynth
            </a>
            — a builder community that ranks the most impactful projects across AI, crypto, and product development.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-black text-white mb-4">How to Play</h2>
          <div className="space-y-3">
            {[
              { icon: "💰", title: "Start with 1,000 W", desc: "You begin with 1,000 WEDO tokens to spend on packs." },
              { icon: "🎴", title: "Buy Packs", desc: "Each pack contains 5 random coins. Higher-tier packs cost more but give better odds." },
              { icon: "📊", title: "Collect Coins", desc: "Build your collection by unlocking all 15 coins from Common to Legendary." },
              { icon: "🏆", title: "Complete the Set", desc: "Try to collect every coin in the game — all 15 projects from Orynth's leaderboard." },
            ].map((step) => (
              <div key={step.title} className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-black text-white mb-4">Rarity Tiers</h2>
          <div className="space-y-3">
            {RARITY_INFO.map((r) => (
              <div key={r.tier} className="p-4 rounded-xl border" style={{ borderColor: `${TIER_COLORS[r.tier]}40`, background: `${TIER_COLORS[r.tier]}10` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold capitalize text-sm" style={{ color: TIER_COLORS[r.tier] }}>{r.tier}</span>
                  <span className="text-xs text-white/40">{r.rate} base rate · best in {r.pack} Pack ({r.cost})</span>
                </div>
                <p className="text-xs text-white/60">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-black text-white mb-4">All 15 Coins</h2>
          <div className="grid grid-cols-3 gap-2">
            {COINS.map((coin) => (
              <div
                key={coin.id}
                className="p-3 rounded-xl border flex flex-col items-center gap-1 text-center"
                style={{ borderColor: `${TIER_COLORS[coin.tier]}30`, background: `${coin.color}08` }}
              >
                <span className="text-2xl">{coin.emoji}</span>
                <p className="text-xs font-bold text-white leading-tight">{coin.name}</p>
                <p className="text-[10px]" style={{ color: TIER_COLORS[coin.tier] }}>{coin.tier}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pb-8">
          <p className="text-xs text-white/25">
            WEDO is an unofficial fan game. All projects belong to their respective creators.
          </p>
        </div>
      </div>
    </div>
  );
}
