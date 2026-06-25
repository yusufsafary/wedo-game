import { motion } from "framer-motion";
import { PackageOpen, Layers, Coins, Star } from "lucide-react";
import WedoLogo from "../components/WedoLogo";
import CoinAvatar from "../components/CoinAvatar";
import { COINS, TIER_COLORS, TIER_LABELS } from "../data/coins";

const stagger = {
  container: {
    initial: {},
    animate: { transition: { staggerChildren: 0.07 } },
  },
  item: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  },
};

const HOW_TO_PLAY = [
  {
    icon: <PackageOpen className="w-5 h-5" />,
    color: "#60A5FA",
    title: "Choose Your Pack",
    desc: "Pick from 4 pack tiers — Basic, Mystery, Epic, or Legendary. Higher tiers cost more WEDO but unlock rarer coins.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    color: "#A78BFA",
    title: "Open the Mystery",
    desc: "5 mystery boxes appear. Tap one to reveal your coin. The other 4 stay hidden — one shot, no second chances.",
  },
  {
    icon: <Coins className="w-5 h-5" />,
    color: "#F59E0B",
    title: "Build Your Collection",
    desc: "Collect all 15 unique project coins from orynth.dev's top-ranked builders. Duplicates stack your count.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    color: "#34D399",
    title: "Flex Your Rarest",
    desc: "Your Collection page ranks every coin by tier. Land a Legendary and it becomes your Crown Jewel.",
  },
];

const PACK_TIERS = [
  {
    tier: "common",
    rate: "70%",
    pack: "Basic",
    cost: "10 W",
    desc: "The foundation of every collection. Still real, still valuable.",
  },
  {
    tier: "uncommon",
    rate: "25%",
    pack: "Mystery",
    cost: "50 W",
    desc: "Projects making serious noise. Harder to find, worth more.",
  },
  {
    tier: "rare",
    rate: "5%",
    pack: "Epic",
    cost: "150 W",
    desc: "Top-tier builders. Only 1-in-20 packs yield a Rare.",
  },
  {
    tier: "legendary",
    rate: "5%",
    pack: "Legendary",
    cost: "500 W",
    desc: "The rarest of the rare. Elite-only, near-impossible.",
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <p className="text-[9px] uppercase tracking-[0.25em] font-black text-white/20 whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-10 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 65%),
            linear-gradient(180deg, #0c0420 0%, transparent 100%)
          `,
        }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 160 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <WedoLogo size={52} glowOpacity={0.5} />
          <div>
            <h1 className="font-display text-4xl font-extrabold text-white tracking-tight">WEDO</h1>
            <p className="text-sm font-medium text-white/40 mt-0.5">The Orynth Coin Exchange</p>
          </div>
          <p className="text-sm text-white/55 leading-relaxed max-w-[280px] mt-1">
            Collect digital project coins from orynth.dev's top-ranked builders. Open packs, reveal mystery
            coins, and build the rarest collection.
          </p>
        </motion.div>
      </section>

      <div className="px-4 flex flex-col gap-8 pb-8">
        {/* How to Play */}
        <div>
          <SectionLabel>How to Play</SectionLabel>
          <motion.div
            variants={stagger.container}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-3"
          >
            {HOW_TO_PLAY.map((step, i) => (
              <motion.div
                key={i}
                variants={stagger.item}
                className="flex items-start gap-3.5 p-4 rounded-2xl"
                style={{ background: `${step.color}08`, border: `1px solid ${step.color}20` }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${step.color}18`, color: step.color }}
                >
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: `${step.color}70` }}
                    >
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm leading-snug">{step.title}</p>
                  <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pack Tiers */}
        <div>
          <SectionLabel>Pack Tiers</SectionLabel>
          <motion.div
            variants={stagger.container}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-2.5"
          >
            {PACK_TIERS.map((t) => {
              const color = TIER_COLORS[t.tier];
              return (
                <motion.div
                  key={t.tier}
                  variants={stagger.item}
                  className="p-4 rounded-2xl"
                  style={{ background: `${color}0a`, border: `1px solid ${color}28` }}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <span
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color }}
                      >
                        {TIER_LABELS[t.tier]}
                      </span>
                      <p className="text-[10px] text-white/30 font-medium">
                        {t.pack} Pack · {t.cost}
                      </p>
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-full text-xs font-black"
                      style={{ background: `${color}18`, color }}
                    >
                      {t.rate}
                    </div>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{t.desc}</p>
                  <div className="mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: t.rate,
                        background: `linear-gradient(90deg, ${color}cc, ${color}66)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* The 15 Coins */}
        <div>
          <SectionLabel>The 15 Coins · orynth.dev</SectionLabel>
          <motion.div
            variants={stagger.container}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-3 gap-2.5"
          >
            {COINS.map((coin) => {
              const tierColor = TIER_COLORS[coin.tier];
              return (
                <motion.div
                  key={coin.id}
                  variants={stagger.item}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl"
                  style={{ background: `${coin.color}0a`, border: `1px solid ${coin.color}20` }}
                >
                  <CoinAvatar coin={coin} size="sm" />
                  <p className="text-[9px] font-bold text-white/70 text-center leading-tight">{coin.name}</p>
                  <span
                    className="text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase"
                    style={{ background: `${tierColor}18`, color: tierColor }}
                  >
                    {TIER_LABELS[coin.tier]}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* About orynth.dev */}
        <div>
          <SectionLabel>About orynth.dev</SectionLabel>
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <p className="text-sm text-white/50 leading-relaxed">
              orynth.dev is a leaderboard of the top builder projects ranked by on-chain market cap. WEDO
              lets you collect coins representing these real projects.
            </p>
            <a
              href="https://orynth.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Visit orynth.dev →
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 pb-2">
          <p className="text-center text-[10px] text-white/15 font-medium tracking-wide">
            Coin data powered by{" "}
            <a
              href="https://orynth.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-purple-400 transition-colors"
            >
              orynth.dev
            </a>
          </p>
          <a
            href="https://x.com/jimvoxies"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-white/25 hover:text-white/60 font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            @jimvoxies
          </a>
        </div>
      </div>
    </div>
  );
}
