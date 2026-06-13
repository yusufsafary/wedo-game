import { useState } from "react";
import { PACKS } from "../data/packs";
import { useGame, openPack } from "../context/GameContext";
import PackCard from "../components/PackCard";
import CoinCard from "../components/CoinCard";
import type { Coin, Pack } from "../types/game";

type Phase = "shop" | "opening" | "reveal";

export default function ShopPage() {
  const { state, spendWedo, addCoinsToCollection, incrementSwaps, setLastPackId } = useGame();
  const [phase, setPhase] = useState<Phase>("shop");
  const [revealedCoins, setRevealedCoins] = useState<Coin[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleBuy = (pack: Pack) => {
    if (!spendWedo(pack.cost)) return;
    setLastPackId(pack.id);
    incrementSwaps();
    const coins = openPack(pack);
    setRevealedCoins(coins);
    setRevealedCount(0);
    setPhase("opening");

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setRevealedCount(i);
      if (i >= coins.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 300);
      }
    }, 350);
  };

  const handleKeep = () => {
    addCoinsToCollection(revealedCoins);
    setRevealedCoins([]);
    setPhase("shop");
  };

  if (phase === "opening" || phase === "reveal") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-black text-white text-center mb-2">Opening Pack...</h2>
          <p className="text-white/40 text-center text-sm mb-8">
            {phase === "opening" ? "Revealing your coins" : "Your pack results!"}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {revealedCoins.slice(0, revealedCount).map((coin, i) => (
              <div
                key={i}
                className="opacity-0 translate-y-4"
                style={{ animation: `slideUp 0.4s ease forwards` }}
              >
                <CoinCard coin={coin} animate />
              </div>
            ))}
          </div>

          {phase === "reveal" && (
            <button
              onClick={handleKeep}
              className="mt-8 w-full py-3 rounded-xl font-bold text-base bg-violet-600 hover:bg-violet-500 text-white transition-all duration-200 active:scale-95"
            >
              Add to Collection
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-1">Pack Shop</h1>
          <p className="text-white/50 text-sm">Open packs to collect WEDO coins</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-900/50 border border-violet-700/50">
            <span className="text-violet-300 font-bold text-sm">Balance:</span>
            <span className="text-white font-black">{state.wedoBalance.toLocaleString()} W</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PACKS.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              onBuy={handleBuy}
              canAfford={state.wedoBalance >= pack.cost}
            />
          ))}
        </div>

        {state.wedoBalance < 10 && (
          <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-center">
            <p className="text-amber-400 text-sm font-semibold">Not enough WEDO</p>
            <p className="text-white/40 text-xs mt-0.5">Reset the game to get 1,000 W to start fresh</p>
          </div>
        )}
      </div>
    </div>
  );
}
