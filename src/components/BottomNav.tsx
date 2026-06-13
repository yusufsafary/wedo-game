import { Link, useLocation } from "wouter";
import WedoLogo from "./WedoLogo";
import { useGame } from "../context/GameContext";

const NAV = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/shop", label: "Shop", icon: "🎴" },
  { href: "/collection", label: "Collection", icon: "📦" },
  { href: "/info", label: "Info", icon: "ℹ️" },
];

export default function BottomNav() {
  const [location] = useLocation();
  const { state } = useGame();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0c0420]/90 backdrop-blur-xl">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {NAV.map((item) => {
          const active = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-150">
                <span className="text-xl">{item.icon}</span>
                <span
                  className="text-[10px] font-semibold transition-colors"
                  style={{ color: active ? "#A855F7" : "rgba(255,255,255,0.35)" }}
                >
                  {item.label}
                </span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-violet-400 mt-0.5" />
                )}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
