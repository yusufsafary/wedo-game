import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Coins, RotateCcw, Star, LogOut, ChevronRight } from "lucide-react";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS, TIER_LABELS } from "../data/coins";
import CoinAvatar from "../components/CoinAvatar";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <p className="text-[9px] uppercase tracking-[0.25em] font-black text-white/20 whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div
      className="rounded-2xl p-3.5 flex flex-col gap-1.5 relative overflow-hidden"
      style={{ background: `${color}0a`, border: `1px solid ${color}1e` }}
    >
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}15 0%, transparent 70%)` }}
      />
      <div style={{ color }} className="[&>svg]:w-4 [&>svg]:h-4 relative z-10">
        {icon}
      </div>
      <p
        className="text-2xl font-extrabold text-white relative z-10"
        style={{ fontFamily: "var(--app-font-display)" }}
      >
        {value}
      </p>
      <p
        className="text-[8px] uppercase tracking-widest font-bold relative z-10"
        style={{ color: `${color}70` }}
      >
        {label}
      </p>
    </div>
  );
}

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { state, resetGame } = useGame();

  const username = localStorage.getItem("wedo_username") || "Guest";
  const uniqueCoins = state.collection.length;

  const tierCounts = {
    legendary: state.collection.filter((e) => COINS.find((c) => c.id === e.coinId)?.tier === "legendary").length,
    rare: state.collection.filter((e) => COINS.find((c) => c.id === e.coinId)?.tier === "rare").length,
    uncommon: state.collection.filter((e) => COINS.find((c) => c.id === e.coinId)?.tier === "uncommon").length,
    common: state.collection.filter((e) => COINS.find((c) => c.id === e.coinId)?.tier === "common").length,
  };

  const tierOrder: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };
  const crownJewel = state.collection
    .map((e) => COINS.find((c) => c.id === e.coinId))
    .filter(Boolean)
    .sort((a, b) => tierOrder[a!.tier] - tierOrder[b!.tier])[0];

  function handleLogout() {
    localStorage.removeItem("wedo_username");
    navigate("/login");
  }

  const initials = username.slice(0, 2).toUpperCase();
  const tierColor = crownJewel ? TIER_COLORS[crownJewel.tier] : "#8B5CF6";
  const tierLabel = crownJewel ? TIER_LABELS[crownJewel.tier] : "";

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      <div className="px-4 pt-4 pb-6 flex flex-col gap-5">

        {/* User avatar + name */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white"
              style={{
                fontFamily: "var(--app-font-display)",
                background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
                boxShadow: "0 0 24px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {initials}
            </div>
            {crownJewel && (
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: "#070012",
                  background: tierColor,
                  boxShadow: `0 0 8px ${tierColor}80`,
                }}
              >
                <Star className="w-2.5 h-2.5 text-black" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl font-extrabold text-white truncate leading-tight"
              style={{ fontFamily: "var(--app-font-display)" }}
            >
              {username}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {crownJewel && (
                <>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wide"
                    style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}
                  >
                    {tierLabel}
                  </span>
                  <span className="text-[10px] text-white/25 font-medium">orynth.dev</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Balance */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between px-3 py-3 rounded-2xl"
          style={{ background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.15)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(234,179,8,0.15)" }}
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current text-yellow-400">
                <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <text x="8" y="11.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor">W</text>
              </svg>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/25 font-bold">Balance</p>
              <p
                className="text-lg font-extrabold text-yellow-400 leading-tight"
                style={{ fontFamily: "var(--app-font-display)" }}
              >
                {state.wedoBalance.toLocaleString()}
                <span className="text-xs font-bold ml-1 text-yellow-400/60">W</span>
              </p>
            </div>
          </div>
          <div
            className="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wide"
            style={{ background: "rgba(234,179,8,0.12)", color: "#EAB308" }}
          >
            Demo
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-2.5"
        >
          <StatCard icon={<RotateCcw />} label="Swaps" value={state.totalSwaps} color="#8B5CF6" />
          <StatCard icon={<Coins />} label="Collected" value={uniqueCoins} color="#22C55E" />
          <StatCard icon={<Star />} label="Unique" value={uniqueCoins} color="#F59E0B" />
        </motion.div>

        {/* Crown Jewel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <SectionLabel>Crown Jewel</SectionLabel>
          {crownJewel ? (
            <div
              className="rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${crownJewel.color}14, rgba(0,0,0,0.4))`,
                border: `1px solid ${crownJewel.color}30`,
                boxShadow: `0 0 24px ${crownJewel.color}18, inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 70% 70% at 20% 50%, ${crownJewel.color}10 0%, transparent 65%)`,
                }}
              />
              <div className="relative z-10 flex-shrink-0">
                <CoinAvatar coin={crownJewel} size="lg" showGlow animate />
              </div>
              <div className="flex-1 relative z-10 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider"
                    style={{ background: `${TIER_COLORS[crownJewel.tier]}20`, color: TIER_COLORS[crownJewel.tier] }}
                  >
                    {TIER_LABELS[crownJewel.tier]}
                  </span>
                  <span className="text-[9px] font-mono text-white/25">#{crownJewel.rank}</span>
                </div>
                <p
                  className="font-extrabold text-white text-base leading-tight truncate"
                  style={{ fontFamily: "var(--app-font-display)" }}
                >
                  {crownJewel.name}
                </p>
                <p className="text-[10px] text-green-400 font-bold font-mono mt-0.5">{crownJewel.marketCap}</p>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-sm text-white/20">Swap packs to discover your rarest coin</p>
            </div>
          )}
        </motion.div>

        {/* Breakdown */}
        {state.collection.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionLabel>Breakdown</SectionLabel>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {(["legendary", "rare", "uncommon", "common"] as const).map((tier, i) => {
                const count = tierCounts[tier];
                if (count === 0) return null;
                const color = TIER_COLORS[tier];
                return (
                  <div
                    key={tier}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                      />
                      <span className="text-sm font-bold capitalize" style={{ color }}>
                        {TIER_LABELS[tier]}
                      </span>
                    </div>
                    <span
                      className="font-extrabold text-white text-sm"
                      style={{ fontFamily: "var(--app-font-display)" }}
                    >
                      {count}
                      <span className="text-white/25 font-normal text-xs ml-1">coins</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="flex flex-col gap-2"
        >
          <SectionLabel>Quick Links</SectionLabel>
          {[
            { label: "Browse Packs", sub: "Open packs & collect coins", href: "/" },
            { label: "View Collection", sub: `${uniqueCoins} of 15 discovered`, href: "/collection" },
            { label: "About WEDO", sub: "How it works, tiers, coins", href: "/about" },
          ].map(({ label, sub, href }) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-left">
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-[10px] text-white/30 mt-0.5 font-medium">{sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleLogout}
            className="w-full rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm transition-all active:scale-[0.97]"
            style={{
              height: 52,
              background: "rgba(239,68,68,0.07)",
              border: "1.5px solid rgba(239,68,68,0.2)",
              color: "rgba(239,68,68,0.75)",
            }}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
          <p className="text-center text-[10px] text-white/[0.12] font-medium mt-3 tracking-wide">
            WEDO v1.0 · Beta · {uniqueCoins}/{COINS.length} Coins
          </p>
        </motion.div>
      </div>
    </div>
  );
}
