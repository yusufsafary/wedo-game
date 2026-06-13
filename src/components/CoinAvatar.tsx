import { useState } from "react";
import type { Coin } from "../types/game";
import { COIN_LOGOS, COIN_ABBR, COIN_BG_COLORS, COIN_RADIUS, TIER_COLORS } from "../data/coins";

export type CoinAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const SIZE_CONFIG: Record<CoinAvatarSize, { px: number; text: string; ring: number; border: number }> = {
  xs: { px: 32, text: "9px", ring: 4, border: 1.5 },
  sm: { px: 40, text: "11px", ring: 6, border: 1.5 },
  md: { px: 56, text: "13px", ring: 8, border: 2 },
  lg: { px: 72, text: "17px", ring: 10, border: 2.5 },
  xl: { px: 96, text: "22px", ring: 14, border: 3 },
  "2xl": { px: 128, text: "30px", ring: 18, border: 3.5 },
};

interface CoinAvatarProps {
  coin: Coin;
  size?: CoinAvatarSize;
  showGlow?: boolean;
  animate?: boolean;
}

export default function CoinAvatar({ coin, size = "md", showGlow = false, animate = false }: CoinAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = COIN_LOGOS[coin.id];
  const abbr = COIN_ABBR[coin.id] ?? coin.name.slice(0, 2).toUpperCase();
  const bgColor = COIN_BG_COLORS[coin.id] ?? coin.color;
  const radiusClass = COIN_RADIUS[coin.id] ?? "rounded-2xl";
  const tierColor = TIER_COLORS[coin.tier];
  const { px, text, ring, border } = SIZE_CONFIG[size];

  const isCircle = radiusClass === "rounded-full";
  const outerRadius = isCircle ? "9999px" : `${Math.round(px * 0.28) + border + 2}px`;
  const innerRadius = isCircle ? "9999px" : `${Math.round(px * 0.28)}px`;

  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center overflow-visible"
      style={{ width: px, height: px }}
    >
      {/* Conic gradient ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -(border + 2),
          borderRadius: outerRadius,
          background: `conic-gradient(from 135deg,
            rgba(255,255,255,0.6) 0deg,
            rgba(255,255,255,0.06) 80deg,
            rgba(255,255,255,0.5) 180deg,
            rgba(255,255,255,0.04) 260deg,
            rgba(255,255,255,0.6) 360deg)`,
          padding: border + 2,
        }}
      >
        <div className="w-full h-full" style={{ borderRadius: "inherit", background: "rgba(0,0,0,0.9)" }} />
      </div>

      {/* Glow beneath */}
      {showGlow && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: px * 1.4,
            height: px * 0.5,
            bottom: -ring * 0.35,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: coin.color,
            filter: `blur(${ring}px)`,
            opacity: 0.5,
          }}
        />
      )}

      {/* Coin face */}
      <div
        className={`relative flex-shrink-0 overflow-hidden ${radiusClass}`}
        style={{
          width: px,
          height: px,
          background: !logoSrc || imgError ? `radial-gradient(circle at 35% 30%, ${coin.color} 0%, ${bgColor} 70%)` : "#111",
          boxShadow: showGlow
            ? `0 0 ${ring * 1.2}px ${coin.color}80, 0 ${ring * 0.4}px ${ring}px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.25)`
            : `0 ${ring * 0.3}px ${ring * 0.8}px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.2)`,
          borderRadius: innerRadius,
        }}
      >
        {logoSrc && !imgError ? (
          <>
            <img
              src={logoSrc}
              alt={coin.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                borderRadius: "inherit",
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 55%)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.4) 0%, transparent 60%)" }}
            />
            <span
              className="relative z-10 font-black select-none flex items-center justify-center w-full h-full"
              style={{
                fontSize: text,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.02em",
                textShadow: "0 1px 0 rgba(0,0,0,0.4)",
              }}
            >
              {abbr}
            </span>
          </>
        )}

        {/* Legendary spinning border animation */}
        {coin.tier === "legendary" && animate && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, ${tierColor}cc, transparent, ${tierColor}cc, transparent)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "3px",
              animation: "spin 3s linear infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
