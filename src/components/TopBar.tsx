import WedoLogo from "./WedoLogo";
import { useGame } from "../context/GameContext";
import { useLocation } from "wouter";

const TITLES: Record<string, string> = {
  "/": "WEDO",
  "/shop": "Pack Shop",
  "/collection": "Collection",
  "/info": "About",
};

export default function TopBar() {
  const { state } = useGame();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0420]/90 backdrop-blur-xl">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WedoLogo size={24} />
          <span className="text-sm font-black text-white">{TITLES[location] ?? "WEDO"}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-950/60 border border-violet-800/50">
          <span className="text-xs text-violet-300 font-semibold">W</span>
          <span className="text-sm font-black text-white">{state.wedoBalance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}
