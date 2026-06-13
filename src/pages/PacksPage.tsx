import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../context/GameContext";
import {
  PACKS,
  PACK_BACKGROUNDS,
  PACK_SERIES,
  PACK_EMOJIS,
  NOISE_SVG,
} from "../data/packs";

const PACK_COINS: Record<string, number> = {
  basic: 3,
  mystery: 3,
  epic: 4,
  legendary: 5,
};

const PACK_COLLECTORS: Record<string, number> = {
  basic: 1240,
  mystery: 876,
  epic: 342,
  legendary: 97,
};

export default function PacksPage() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const [packIndex, setPackIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const pack = PACKS[packIndex];
  const canAfford = state.wedoBalance >= pack.cost;

  function go(delta: number) {
    const next = (packIndex + delta + PACKS.length) % PACKS.length;
    setDirection(delta);
    setPackIndex(next);
  }

  function handleSwap() {
    if (!canAfford) {
      toast.error("Not enough WEDO", { description: `You need ${pack.cost} W` });
      return;
    }
    navigate(`/swap/${pack.id}`);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden select-none px-4 pb-4 pt-3 gap-3">

      {/* Tab pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
        {PACKS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setDirection(i > packIndex ? 1 : -1); setPackIndex(i); }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all duration-200"
            style={{
              background: packIndex === i ? p.accentColor : "rgba(255,255,255,0.07)",
              color: packIndex === i ? "#fff" : "rgba(255,255,255,0.38)",
              border: `1px solid ${packIndex === i ? p.accentColor : "rgba(255,255,255,0.1)"}`,
              boxShadow: packIndex === i ? `0 2px 16px ${p.glowColor}` : "none",
            }}
          >
            <span style={{ fontSize: 13 }}>{PACK_EMOJIS[p.id]}</span>
            {p.name.replace(" Pack", "")}
          </button>
        ))}
      </div>

      {/* Card + side arrows row */}
      <div className="flex-1 min-h-0 flex items-stretch gap-2">

        {/* Left arrow */}
        <button
          onClick={() => go(-1)}
          className="flex-shrink-0 flex items-center justify-center w-9 rounded-2xl transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ChevronLeft size={20} color="rgba(255,255,255,0.5)" />
        </button>

        {/* Card */}
        <div className="flex-1 relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={pack.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -80, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col"
              style={{ background: PACK_BACKGROUNDS[pack.id] }}
            >
              {/* Noise */}
              <div className="absolute inset-0 pointer-events-none z-10" style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat" }} />

              {/* Holographic shimmer */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${pack.accentColor}18 30%, rgba(255,255,255,0.06) 50%, ${pack.accentColor}12 70%, transparent 100%)`,
                  backgroundSize: "200% 200%",
                  animation: "packShimmer 5s ease-in-out infinite",
                }}
              />

              {/* Radial glow center */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${pack.accentColor}28 0%, transparent 65%)` }}
              />

              {/* Inner border */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                style={{ border: `1px solid ${pack.accentColor}35`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)` }}
              />

              {/* Content */}
              <div className="relative z-30 flex flex-col h-full px-6 pt-6 pb-5">

                {/* Top: tag + series */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1 mb-auto">
                  {pack.tag && (
                    <div
                      className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                      style={{ color: pack.accentColor, background: `${pack.accentColor}20`, border: `1px solid ${pack.accentColor}45` }}
                    >
                      {pack.tag}
                    </div>
                  )}
                  <p className="text-[9px] font-black uppercase tracking-[0.35em] mt-1" style={{ color: `${pack.accentColor}80` }}>
                    {PACK_SERIES[pack.id]}
                  </p>
                </div>

                {/* Center: pack emoji + name */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  {/* Pack art circle */}
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 96,
                      height: 96,
                      background: `radial-gradient(circle, ${pack.accentColor}35 0%, ${pack.accentColor}10 60%, transparent 100%)`,
                      border: `2px solid ${pack.accentColor}40`,
                      boxShadow: `0 0 40px ${pack.accentColor}40, 0 0 80px ${pack.accentColor}18`,
                      fontSize: 48,
                    }}
                  >
                    {PACK_EMOJIS[pack.id]}
                  </div>

                  {/* Pack name */}
                  <div className="flex flex-col items-center gap-0.5">
                    <h1
                      className="text-white text-center leading-none"
                      style={{
                        fontFamily: "var(--app-font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(32px, 9vw, 48px)",
                        letterSpacing: "-0.02em",
                        textShadow: `0 0 50px ${pack.accentColor}70, 0 2px 12px rgba(0,0,0,0.6)`,
                      }}
                    >
                      {pack.name.replace(" Pack", "").toUpperCase()}
                      <br />
                      <span style={{ color: `${pack.accentColor}`, fontSize: "0.75em" }}>PACK</span>
                    </h1>
                  </div>

                  {/* Collector count */}
                  <p className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {PACK_COLLECTORS[pack.id].toLocaleString()} collectors opened this
                  </p>
                </div>

                {/* Bottom: divider + coin count */}
                <div className="flex-shrink-0">
                  <div className="w-full h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${pack.accentColor}40, transparent)` }} />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>You get</span>
                      <span className="text-xl font-black text-white leading-none">
                        {PACK_COINS[pack.id]} COINS
                      </span>
                    </div>
                    <div
                      className="px-4 py-2 rounded-2xl flex items-center gap-1.5 font-black text-sm"
                      style={{
                        background: `${pack.accentColor}25`,
                        border: `1.5px solid ${pack.accentColor}55`,
                        color: "#fff",
                        boxShadow: `0 2px 16px ${pack.glowColor}`,
                      }}
                    >
                      <span style={{ color: pack.accentColor, fontSize: 12 }}>⚡</span>
                      {pack.cost === 0 ? "FREE" : `${pack.cost} W`}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => go(1)}
          className="flex-shrink-0 flex items-center justify-center w-9 rounded-2xl transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ChevronRight size={20} color="rgba(255,255,255,0.5)" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex-shrink-0 flex items-center justify-center gap-1.5">
        {PACKS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: packIndex === i ? 20 : 5,
              height: 5,
              background: packIndex === i ? pack.accentColor : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Swap button */}
      <div className="flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSwap}
          className="w-full rounded-2xl font-black text-base flex items-center justify-center relative overflow-hidden"
          style={{
            height: 56,
            background: canAfford
              ? `linear-gradient(135deg, ${pack.accentColor} 0%, ${pack.accentColor}cc 100%)`
              : "rgba(255,255,255,0.06)",
            boxShadow: canAfford ? `0 4px 28px ${pack.glowColor}` : "none",
            color: canAfford ? "#fff" : "rgba(255,255,255,0.25)",
            border: canAfford ? "none" : "1px solid rgba(255,255,255,0.08)",
            cursor: canAfford ? "pointer" : "not-allowed",
          }}
        >
          {canAfford && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "btnShimmer 2.5s ease-in-out infinite",
              }}
            />
          )}
          <span className="relative z-10">
            {canAfford
              ? `Swap Now · ${pack.cost === 0 ? "FREE" : `${pack.cost} W`}`
              : `Need ${pack.cost} W`}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
