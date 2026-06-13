import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, MousePointer2 } from "lucide-react";
import CoinAvatar from "../components/CoinAvatar";
import { useGame } from "../context/GameContext";
import { COINS, TIER_COLORS, TIER_LABELS } from "../data/coins";
import { PACK_SERIES } from "../data/packs";
import { getPackById } from "../data/packs";
import type { Coin } from "../types/game";

type Phase = "opening" | "boxes" | "reveal";

const BURST_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: i * 30,
  dist: 60 + (i % 3) * 30,
  size: 4 + (i % 3) * 3,
  delay: (i % 4) * 0.04,
}));

function CoinReveal({ coin }: { coin: Coin }) {
  const tierColor = TIER_COLORS[coin.tier];
  const isLegendary = coin.tier === "legendary";
  const isRare = coin.tier === "rare";

  return (
    <div className="relative w-full flex flex-col items-center gap-5">
      {/* Pulsing bg glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.07, 0.16, 0.07] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${tierColor} 0%, transparent 70%)`,
        }}
      />

      {/* Tier badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="relative z-10 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest border"
        style={{
          color: tierColor,
          borderColor: `${tierColor}50`,
          background: `${tierColor}15`,
          boxShadow: `0 0 16px ${tierColor}40`,
        }}
      >
        {isLegendary ? "✦ " : isRare ? "◆ " : ""}
        {TIER_LABELS[coin.tier]}
      </motion.div>

      {/* Coin avatar */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
        className="relative z-10"
      >
        <CoinAvatar coin={coin} size="2xl" showGlow animate />
        {isLegendary && (
          <motion.div
            className="absolute -inset-6 pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-7 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${tierColor}, transparent)`,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "0 0",
                  transform: `rotate(${i * 45}deg) translate(-50%, -100%) translateY(-68px)`,
                  opacity: 0.55,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Name + info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center flex flex-col gap-1"
      >
        <div className="flex items-center justify-center">
          <span
            className="text-[10px] font-mono font-black px-2 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
          >
            #{coin.rank} orynth.dev
          </span>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight leading-none mt-1">{coin.name}</h2>
        <p className="text-sm font-mono text-white/35 tracking-wider">{coin.symbol}</p>
        <p className="text-sm text-white/50 mt-1 max-w-[240px] mx-auto leading-snug">{coin.description}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 flex gap-2.5 w-full"
      >
        {[
          { label: "Market Cap", value: coin.marketCap, color: "#22C55E" },
          { label: "Rank", value: `#${coin.rank}`, color: "#fff" },
          { label: "Tier", value: TIER_LABELS[coin.tier], color: tierColor },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-[8px] font-black uppercase tracking-widest text-white/25">{label}</span>
            <span className="text-sm font-black" style={{ color }}>{value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface BoxProps {
  index: number;
  coin: Coin;
  isRevealed: boolean;
  isLocked: boolean;
  onClick: () => void;
  packColor: string;
  packGlow: string;
  enterDelay: number;
}

function MysteryBox({ index, coin, isRevealed, isLocked, onClick, packColor, packGlow, enterDelay }: BoxProps) {
  const tierColor = TIER_COLORS[coin.tier];
  const bg = isRevealed
    ? `linear-gradient(145deg, ${coin.color}35, ${coin.color}10)`
    : isLocked
    ? "rgba(255,255,255,0.03)"
    : `linear-gradient(145deg, ${packColor}22, ${packColor}08)`;

  return (
    <motion.button
      initial={{ scale: 0.3, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 16, stiffness: 220, delay: enterDelay }}
      whileHover={!isRevealed && !isLocked ? { scale: 1.06, y: -5 } : {}}
      whileTap={!isRevealed && !isLocked ? { scale: 0.93 } : {}}
      onClick={onClick}
      disabled={isRevealed || isLocked}
      data-testid={`button-box-${index}`}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        width: 104,
        height: 126,
        borderRadius: 18,
        background: bg,
        border: isRevealed
          ? `1.5px solid ${coin.color}50`
          : isLocked
          ? "1.5px solid rgba(255,255,255,0.05)"
          : `1.5px solid ${packColor}40`,
        boxShadow: isRevealed
          ? `0 0 20px ${coin.color}30, 0 4px 16px rgba(0,0,0,0.5)`
          : isLocked
          ? "none"
          : `0 0 14px ${packGlow}, 0 4px 12px rgba(0,0,0,0.4)`,
        cursor: isRevealed || isLocked ? "default" : "pointer",
        opacity: isLocked ? 0.35 : 1,
      }}
    >
      {isRevealed ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14 }}
          className="flex flex-col items-center gap-2"
        >
          <CoinAvatar coin={coin} size="md" showGlow />
          <div className="text-center">
            <p className="text-[9px] font-black text-white leading-tight">{coin.name}</p>
            <p
              className="text-[7px] font-black uppercase px-1.5 py-0.5 rounded-md mt-0.5"
              style={{ color: tierColor, background: `${tierColor}18` }}
            >
              {TIER_LABELS[coin.tier]}
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {!isLocked && (
            <>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${packColor}30, ${packColor}10)`,
                  border: `1.5px solid ${packColor}40`,
                }}
              >
                <span className="text-2xl font-black" style={{ color: packColor }}>?</span>
              </div>
              <p className="text-[8px] font-bold mt-2 text-white/30">Box {index + 1}</p>
            </>
          )}
        </>
      )}
    </motion.button>
  );
}

export default function SwapPage() {
  const params = useParams<{ packId: string }>();
  const [, navigate] = useLocation();
  const { state, spendWedo, addCoinToCollection, incrementSwaps, setLastPackId } = useGame();

  const pack = getPackById(params.packId ?? "mystery");
  const [phase, setPhase] = useState<Phase>("opening");
  const [boxCoins, setBoxCoins] = useState<Coin[]>([]);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [isTopFlip, setIsTopFlip] = useState(false);
  const [isBottomFlip, setIsBottomFlip] = useState(false);
  const [flash, setFlash] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const generateCoins = useCallback(() => {
    if (!pack) return [];
    const result: Coin[] = [];
    for (let i = 0; i < 5; i++) {
      const roll = Math.random() * 100;
      let tier: "common" | "uncommon" | "rare" | "legendary";
      if (roll < pack.odds.legendary) tier = "legendary";
      else if (roll < pack.odds.legendary + pack.odds.rare) tier = "rare";
      else if (roll < pack.odds.legendary + pack.odds.rare + pack.odds.uncommon) tier = "uncommon";
      else tier = "common";
      const pool = COINS.filter((c) => c.tier === tier);
      result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return result;
  }, [pack]);

  const startOpening = useCallback(() => {
    const coins = generateCoins();
    setBoxCoins(coins);
    setRevealedIndex(null);
    setIsTopFlip(false);
    setIsBottomFlip(false);
    setFlash(false);
    setShowBurst(false);
    setPhase("opening");

    const t1 = setTimeout(() => setIsTopFlip(true), 1300);
    const t2 = setTimeout(() => setIsBottomFlip(true), 1350);
    const t3 = setTimeout(() => { setFlash(true); setShowBurst(true); }, 1300);
    const t4 = setTimeout(() => setFlash(false), 1750);
    const t5 = setTimeout(() => { setShowBurst(false); setPhase("boxes"); }, 1800);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [generateCoins]);

  useEffect(() => {
    if (!pack) { navigate("/"); return; }
    if (!spendWedo(pack.cost)) {
      navigate("/");
      return;
    }
    setLastPackId(pack.id);
    const cleanup = startOpening();
    return cleanup;
  }, []);

  function handleSwapAgain() {
    if (!pack) return;
    if (!spendWedo(pack.cost)) return;
    startOpening();
  }

  function handleBoxClick(index: number) {
    if (revealedIndex !== null || !boxCoins[index]) return;
    setRevealedIndex(index);
    const coin = boxCoins[index];
    addCoinToCollection(coin.id);
    incrementSwaps();
    if (coin.tier === "legendary" || coin.tier === "rare") {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
    }
    setTimeout(() => setPhase("reveal"), 700);
  }

  const revealedCoin = revealedIndex !== null ? boxCoins[revealedIndex] : null;

  if (!pack) return null;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{ background: revealedCoin ? TIER_COLORS[revealedCoin.tier] : pack.accentColor }}
          />
        )}
      </AnimatePresence>

      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0 relative z-30">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <ArrowLeft className="w-4 h-4 text-white/70" />
        </button>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-35">Opening</p>
          <p className="text-sm font-black text-white">{pack.name}</p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-black"
          style={{ background: `${pack.accentColor}20`, color: pack.accentColor, border: `1px solid ${pack.accentColor}40` }}
        >
          {pack.cost} W
        </div>
      </div>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === "opening" && (
          <motion.div
            key="opening"
            className="flex-1 flex flex-col items-center justify-center relative"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Burst ring */}
            {showBurst && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${pack.accentColor}30 0%, transparent 70%)` }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 500, height: 500, opacity: [0, 0.6, 0] }}
                transition={{ delay: 0, duration: 0.6, ease: "easeOut" }}
              />
            )}
            {/* Burst particles */}
            {showBurst && BURST_PARTICLES.map((p) => {
              const angle = (p.angle * Math.PI) / 180;
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: pack.accentColor,
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * p.dist,
                    y: Math.sin(angle) * p.dist,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.55, delay: p.delay, ease: "easeOut" }}
                />
              );
            })}

            {/* Pack animation */}
            <div className="relative flex flex-col items-center">
              {/* Top half */}
              <motion.div
                className="relative overflow-hidden flex flex-col items-center justify-end pb-4"
                style={{
                  width: 220,
                  height: 140,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  background: `linear-gradient(170deg, ${pack.accentColor}30 0%, ${pack.accentColor}08 100%)`,
                  border: `1.5px solid ${pack.accentColor}60`,
                  borderBottom: "none",
                }}
                initial={{ y: -60, opacity: 0 }}
                animate={isTopFlip ? { y: -120, opacity: 0, rotateX: -25 } : { y: 0, opacity: 1, rotateX: 0 }}
                transition={
                  isTopFlip
                    ? { duration: 0.35, ease: "easeIn" }
                    : { type: "spring", damping: 18, stiffness: 200, delay: 0.1 }
                }
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(110deg, transparent 30%, ${pack.accentColor}18 50%, transparent 70%)`,
                    backgroundSize: "200% 100%",
                    animation: "packShimmer 3s ease-in-out infinite",
                  }}
                />
                <p
                  className="text-[9px] font-black uppercase tracking-[0.3em] relative z-10"
                  style={{ color: `${pack.accentColor}90` }}
                >
                  {PACK_SERIES[pack.id]}
                </p>
                <p className="font-black text-white text-3xl leading-none relative z-10 tracking-tight">
                  {pack.name.replace(" Pack", "").toUpperCase()}
                </p>
              </motion.div>

              {/* Seam light */}
              <motion.div
                style={{
                  width: 220,
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${pack.accentColor}, transparent)`,
                  boxShadow: `0 0 12px ${pack.accentColor}, 0 0 24px ${pack.accentColor}80`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isTopFlip ? { opacity: 0, scaleX: 1 } : { opacity: [0, 1, 1], scaleX: 1 }}
                transition={isTopFlip ? { duration: 0.2 } : { delay: 0.9, duration: 0.3 }}
              />

              {/* Bottom half */}
              <motion.div
                animate={isBottomFlip ? {} : { x: [0, -6, 6, -5, 5, -3, 3, -2, 2, 0], rotate: [0, -1.5, 1.5, -1, 1, 0] }}
                transition={{ delay: 0.85, duration: 0.4, ease: "easeInOut" }}
              >
                <motion.div
                  className="relative overflow-hidden flex flex-col items-center justify-start pt-4"
                  style={{
                    width: 220,
                    height: 160,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    background: `linear-gradient(170deg, ${pack.accentColor}20 0%, ${pack.accentColor}05 100%)`,
                    border: `1.5px solid ${pack.accentColor}55`,
                    borderTop: "none",
                  }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={isBottomFlip ? { y: 140, opacity: 0, rotateX: 25 } : { y: 0, opacity: 1, rotateX: 0 }}
                  transition={
                    isBottomFlip
                      ? { duration: 0.35, ease: "easeIn" }
                      : { type: "spring", damping: 18, stiffness: 200, delay: 0.15 }
                  }
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <motion.div
                    animate={isBottomFlip ? {} : { y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{
                        background: `linear-gradient(145deg, ${pack.accentColor}35, ${pack.accentColor}10)`,
                        border: `1.5px solid ${pack.accentColor}50`,
                        boxShadow: `0 8px 32px ${pack.glowColor}`,
                      }}
                    >
                      {pack.id === "basic" ? "📦" : pack.id === "mystery" ? "🔮" : pack.id === "epic" ? "⚡" : "👑"}
                    </div>
                  </motion.div>
                  <div
                    className="relative z-10 mt-3 px-3 py-1 rounded-full text-xs font-black"
                    style={{ background: `${pack.accentColor}25`, color: pack.accentColor, border: `1px solid ${pack.accentColor}50` }}
                  >
                    ⚡ {pack.cost} W
                  </div>
                </motion.div>
              </motion.div>

              <motion.p
                className="mt-5 text-xs font-bold"
                style={{ color: `${pack.accentColor}60` }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                initial={{ opacity: 0, y: 10 }}
              >
                Opening pack…
              </motion.p>
            </div>
          </motion.div>
        )}

        {phase === "boxes" && (
          <motion.div
            key="boxes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col items-center justify-center px-5 gap-6"
          >
            <motion.div
              className="text-center"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-white/60 text-sm font-bold">Choose one box to reveal your coin</p>
              <p className="text-white/25 text-xs mt-0.5">The others stay hidden forever</p>
            </motion.div>

            <div className="flex flex-col gap-3 w-full">
              {/* Row 1: boxes 0, 1 */}
              <div className="flex gap-3 justify-center">
                {[0, 1].map((i) => (
                  <MysteryBox
                    key={i}
                    index={i}
                    coin={boxCoins[i]}
                    isRevealed={revealedIndex === i}
                    isLocked={revealedIndex !== null && revealedIndex !== i}
                    onClick={() => handleBoxClick(i)}
                    packColor={pack.accentColor}
                    packGlow={pack.glowColor}
                    enterDelay={i * 0.08}
                  />
                ))}
              </div>
              {/* Row 2: boxes 2, 3, 4 */}
              <div className="flex gap-3 justify-center">
                {[2, 3, 4].map((i) => (
                  <MysteryBox
                    key={i}
                    index={i}
                    coin={boxCoins[i]}
                    isRevealed={revealedIndex === i}
                    isLocked={revealedIndex !== null && revealedIndex !== i}
                    onClick={() => handleBoxClick(i)}
                    packColor={pack.accentColor}
                    packGlow={pack.glowColor}
                    enterDelay={0.12 + (i - 2) * 0.08}
                  />
                ))}
              </div>
            </div>

            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-1.5 text-white/30 text-xs"
            >
              <MousePointer2 className="w-3 h-3" />
              Tap a box to reveal
            </motion.div>
          </motion.div>
        )}

        {phase === "reveal" && revealedCoin && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <CoinReveal coin={revealedCoin} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom buttons (reveal state) */}
      <AnimatePresence>
        {phase === "reveal" && revealedCoin && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex-shrink-0 px-4 pb-5 flex flex-col gap-2.5"
          >
            <button
              onClick={handleSwapAgain}
              data-testid="button-swap-again"
              className="w-full rounded-2xl font-black text-base text-white flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                height: 56,
                background: `linear-gradient(135deg, ${pack.accentColor} 0%, ${pack.accentColor}cc 100%)`,
                boxShadow: `0 4px 24px ${pack.glowColor}`,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "btnShimmer 2s ease-in-out infinite",
                }}
              />
              <RotateCcw className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Swap Again · {pack.cost} W</span>
            </button>
            <button
              onClick={() => navigate("/collection")}
              data-testid="button-view-collection"
              className="w-full rounded-xl font-bold text-sm text-white/50 border"
              style={{
                height: 44,
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              View Collection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
