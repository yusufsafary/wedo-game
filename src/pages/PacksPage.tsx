import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CoinAvatar from "../components/CoinAvatar";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS, TIER_LABELS } from "../data/coins";
import {
  PACKS,
  PACK_PREVIEW_COINS,
  PACK_BACKGROUNDS,
  PACK_SERIES,
  NOISE_SVG,
  FLOATING_DOTS,
} from "../data/packs";

function OddsBar({ label, value, color }: { label: string; value: number; color: string }) {
  if (value === 0) return null;
  return (
    <div className="flex-1 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[8px] font-black uppercase tracking-widest" style={{ color }}>
          {label}
        </span>
        <span className="text-[9px] font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}cc, ${color}66)` }}
        />
      </div>
    </div>
  );
}

export default function PacksPage() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const [packIndex, setPackIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const pack = PACKS[packIndex];
  const canAfford = state.wedoBalance >= pack.cost;

  const previewCoins = useMemo(
    () =>
      PACK_PREVIEW_COINS[pack.id]
        .map((id) => COINS.find((c) => c.id === id))
        .filter(Boolean) as typeof COINS,
    [pack.id]
  );

  function selectPack(index: number) {
    setDirection(index > packIndex ? 1 : -1);
    setPackIndex(index);
  }

  function handleSwap() {
    if (!canAfford) {
      toast.error("Not enough WEDO", { description: `You need ${pack.cost} W` });
      return;
    }
    navigate(`/swap/${pack.id}`);
  }

  const moreCount = pack.id === "basic" ? 9 : pack.id === "mystery" ? 12 : 5;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden select-none">
      {/* Pack tab buttons */}
      <div className="flex gap-2 px-4 pt-3 pb-2.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {PACKS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => selectPack(i)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-extrabold transition-all duration-200"
            style={{
              background: packIndex === i ? p.accentColor : "rgba(255,255,255,0.06)",
              color: packIndex === i ? "#fff" : "rgba(255,255,255,0.35)",
              border: `1px solid ${packIndex === i ? p.accentColor : "rgba(255,255,255,0.1)"}`,
              boxShadow: packIndex === i ? `0 2px 14px ${p.glowColor}` : "none",
            }}
          >
            {p.name.replace(" Pack", "")}
          </button>
        ))}
      </div>

      {/* Pack card */}
      <div className="relative px-4 flex-1 min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={pack.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 70, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -70, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden h-full flex flex-col"
            style={{ background: PACK_BACKGROUNDS[pack.id] }}
          >
            {/* Noise texture */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat", opacity: 1 }}
            />
            {/* Shimmer */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `linear-gradient(112deg, transparent 30%, ${pack.accentColor}0e 50%, transparent 70%)`,
                backgroundSize: "200% 100%",
                animation: "packShimmer 7s ease-in-out infinite",
              }}
            />
            {/* Floating dots */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {FLOATING_DOTS.map((dot) => (
                <motion.div
                  key={dot.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: dot.r * 2,
                    height: dot.r * 2,
                    background: pack.accentColor,
                    opacity: 0.3,
                  }}
                  animate={{ y: [-4, 4, -4], opacity: [0.15, 0.45, 0.15] }}
                  transition={{ repeat: Infinity, duration: dot.dur, delay: dot.delay, ease: "easeInOut" }}
                />
              ))}
            </div>
            {/* Inner border */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none z-20"
              style={{
                border: `1px solid ${pack.accentColor}30`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
              }}
            />

            {/* Content layout:
                TOP  → title (fixed height, flex-shrink-0)
                MID  → coins section (fixed height, flex-shrink-0, sits right under title)
                GAP  → flex-1 spacer (absorbs leftover space)
                BOT  → odds bars (fixed height, flex-shrink-0) */}
            <div className="relative z-30 flex flex-col h-full px-5 pt-4 pb-4">

              {/* TOP: Tag + Cost + Series + Name */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  {pack.tag ? (
                    <div
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                      style={{
                        color: pack.accentColor,
                        border: `1px solid ${pack.accentColor}55`,
                        background: `${pack.accentColor}18`,
                      }}
                    >
                      {pack.tag}
                    </div>
                  ) : (
                    <div />
                  )}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl font-black"
                    style={{
                      background: `${pack.accentColor}22`,
                      border: `1.5px solid ${pack.accentColor}60`,
                      color: "#fff",
                      boxShadow: `0 2px 16px ${pack.glowColor}`,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: pack.accentColor, fontSize: 10 }}>⚡</span>
                    <span>{pack.cost === 0 ? "FREE" : `${pack.cost.toLocaleString()} W`}</span>
                  </div>
                </div>
                <p
                  className="font-black uppercase tracking-[0.3em] mb-1"
                  style={{ color: `${pack.accentColor}75`, fontSize: 9 }}
                >
                  {PACK_SERIES[pack.id]}
                </p>
                <h1
                  className="text-white leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(32px, 8vw, 48px)",
                    textShadow: `0 0 40px ${pack.accentColor}50`,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {pack.name.replace(" Pack", "").toUpperCase()}
                </h1>
              </div>

              {/* MIDDLE: Coin preview — fixed height, sits right below title */}
              <div
                className="flex-shrink-0 relative flex flex-col items-center justify-center mt-4"
                style={{ height: "clamp(170px, 30vh, 240px)" }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 45%, ${pack.accentColor}28 0%, ${pack.accentColor}08 55%, transparent 75%)`,
                    filter: "blur(20px)",
                  }}
                />
                <div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: "72%",
                    height: "80%",
                    top: "10%",
                    left: "14%",
                    border: `1px solid ${pack.accentColor}20`,
                    boxShadow: `0 0 30px ${pack.accentColor}15, inset 0 0 30px ${pack.accentColor}08`,
                  }}
                />

                <div className="flex items-end justify-center gap-4 w-full px-2">
                  {previewCoins.map((coin, i) => {
                    const isCenter = i === 1;
                    return (
                      <motion.div
                        key={coin.id}
                        className="flex flex-col items-center gap-1.5"
                        style={{ marginBottom: isCenter ? 14 : 0, zIndex: isCenter ? 2 : 1 }}
                        animate={{ y: [0, isCenter ? -8 : -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: isCenter ? 3.2 : 3.8 + i * 0.4,
                          ease: "easeInOut",
                          delay: i * 0.35,
                        }}
                      >
                        <div className="relative">
                          <CoinAvatar
                            coin={coin}
                            size={isCenter ? "xl" : "lg"}
                            showGlow={coin.tier === "legendary" || coin.tier === "rare"}
                          />
                          {pack.id === "mystery" && coin.tier === "legendary" && (
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{
                                borderRadius: "50%",
                                background: "rgba(10,2,25,0.75)",
                                backdropFilter: "blur(3px)",
                              }}
                            >
                              <span
                                className="font-black"
                                style={{ fontSize: isCenter ? 34 : 26, color: pack.accentColor }}
                              >
                                ?
                              </span>
                            </div>
                          )}
                        </div>
                        {isCenter ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-black text-white/85 leading-none">{coin.name}</span>
                            <span
                              className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full"
                              style={{
                                color: TIER_COLORS[coin.tier],
                                background: `${TIER_COLORS[coin.tier]}20`,
                                border: `1px solid ${TIER_COLORS[coin.tier]}40`,
                              }}
                            >
                              {TIER_LABELS[coin.tier]}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-white/35 leading-tight text-center">{coin.name}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-[9px] font-bold mt-2" style={{ color: `${pack.accentColor}55` }}>
                  + {moreCount} more coins · 5 mystery boxes
                </p>
              </div>

              {/* GAP: absorbs all extra height so odds bars stay at bottom */}
              <div className="flex-1" />

              {/* BOTTOM: Drop rates — always pinned to bottom of card */}
              <div className="flex-shrink-0 flex gap-2">
                <OddsBar label="COM" value={pack.odds.common} color={TIER_COLORS.common} />
                <OddsBar label="UNC" value={pack.odds.uncommon} color={TIER_COLORS.uncommon} />
                <OddsBar label="RAR" value={pack.odds.rare} color={TIER_COLORS.rare} />
                <OddsBar label="LEG" value={pack.odds.legendary} color={TIER_COLORS.legendary} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swap Now button */}
      <div className="flex-shrink-0 px-4 pt-2.5 pb-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSwap}
          className="w-full rounded-2xl font-black text-base text-white flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            height: 54,
            background: canAfford
              ? `linear-gradient(135deg, ${pack.accentColor} 0%, ${pack.accentColor}cc 100%)`
              : "rgba(255,255,255,0.06)",
            boxShadow: canAfford ? `0 4px 24px ${pack.glowColor}` : "none",
            color: canAfford ? "#fff" : "rgba(255,255,255,0.25)",
            border: canAfford ? "none" : "1px solid rgba(255,255,255,0.08)",
            cursor: canAfford ? "pointer" : "not-allowed",
          }}
        >
          {canAfford && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "btnShimmer 2s ease-in-out infinite",
              }}
            />
          )}
          <span className="relative z-10">
            {canAfford ? `Swap Now · ${pack.cost === 0 ? "FREE" : `${pack.cost} W`}` : `Need ${pack.cost} W`}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
