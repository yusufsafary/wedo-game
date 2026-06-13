import { useLocation, Link } from "wouter";
import { PackageOpen, Layers, Coins, Info, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import WedoLogo from "./WedoLogo";
import { useGame } from "../context/GameContext";

const NAV_ITEMS = [
  { href: "/", icon: PackageOpen, label: "Packs" },
  { href: "/swap", icon: Layers, label: "Swap" },
  { href: "/collection", icon: Coins, label: "Collect" },
  { href: "/about", icon: Info, label: "About" },
  { href: "/profile", icon: User, label: "Profile" },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const { state } = useGame();

  const username = localStorage.getItem("wedo_username");
  const isSwapRoute = location.startsWith("/swap");

  function isActive(href: string) {
    if (href === "/swap") return isSwapRoute;
    return location === href;
  }

  function getNavHref(href: string) {
    if (href === "/swap") {
      return state.lastPackId ? `/swap/${state.lastPackId}` : "/swap/mystery";
    }
    return href;
  }

  return (
    <div
      className="w-full max-w-[430px] flex flex-col"
      style={{
        background: "linear-gradient(180deg, #070012 0%, #040009 50%, #020006 100%)",
        borderLeft: "1px solid rgba(255,255,255,0.04)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 0 80px rgba(0,0,0,0.8)",
        height: "100dvh",
      }}
    >
      {/* Header */}
      <header
        className="z-50 px-5 py-3 flex items-center justify-between flex-shrink-0"
        style={{
          background: "rgba(7,0,18,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 1px 0 rgba(124,58,237,0.08)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 select-none">
          <WedoLogo size={30} />
          <span
            className="font-display font-extrabold text-xl text-white tracking-tight leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            WEDO
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {username && (
            <span className="text-[10px] font-semibold text-white/25 hidden sm:inline">
              {username}
            </span>
          )}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-bold text-sm"
            style={{
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.2)",
              color: "#EAB308",
            }}
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current opacity-80">
              <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="8" y="11.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor">W</text>
            </svg>
            <span>{state.wedoBalance.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar" style={{ minHeight: 0 }}>
        {children}
      </main>

      {/* Bottom nav — in flex flow so it's never hidden behind system bars */}
      <nav
        className="flex-shrink-0 w-full flex items-center justify-around px-1"
        style={{
          paddingTop: 10,
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 10px)",
          minHeight: 62,
          background: "rgba(5,0,14,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 -1px 0 rgba(124,58,237,0.06), 0 -8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={getNavHref(href)}>
              <div className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 relative cursor-pointer select-none">
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #8B5CF6, #6366F1)" }}
                      transition={{ type: "spring", damping: 20, stiffness: 260 }}
                    />
                  )}
                </AnimatePresence>
                <div
                  className="transition-all duration-200"
                  style={{ color: active ? "#A78BFA" : "rgba(255,255,255,0.28)" }}
                >
                  <Icon
                    style={{
                      width: 18,
                      height: 18,
                      filter: active ? "drop-shadow(0 0 6px rgba(167,139,250,0.7))" : "none",
                    }}
                  />
                </div>
                <span
                  className="text-[9px] font-bold tracking-wide transition-all duration-200 leading-none"
                  style={{ color: active ? "#A78BFA" : "rgba(255,255,255,0.22)" }}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
