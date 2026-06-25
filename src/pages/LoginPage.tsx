import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WedoLogo from "../components/WedoLogo";

function validateUsername(username: string): string {
  if (username.length < 2) return "Username must be at least 2 characters";
  if (username.length > 20) return "Username must be 20 characters or less";
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return "Only letters, numbers, _ and - allowed";
  return "";
}

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateUsername(username.trim());
    if (err) { setError(err); return; }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("wedo_username", username.trim());
      navigate("/");
    }, 600);
  }

  function handleGuest() {
    localStorage.setItem("wedo_username", "");
    navigate("/");
  }

  return (
    <div
      className="flex justify-center min-h-[100dvh]"
      style={{ background: "#030008" }}
    >
      <div
        className="w-full max-w-[430px] flex flex-col relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #070012 0%, #040009 50%, #020006 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Top aurora */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: 300,
            background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 65%)",
          }}
        />

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 relative z-10">
          {/* Logo + title */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 18, stiffness: 160 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <WedoLogo size={56} glowOpacity={0.5} />
            <div>
              <h1 className="font-display text-4xl font-extrabold text-white tracking-tight">WEDO</h1>
              <p className="text-sm font-medium text-white/40 mt-0.5">The Orynth Coin Exchange</p>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-[280px] mt-1">
              Collect digital project coins from orynth.dev's top-ranked builders. Open packs, reveal mystery coins, and build the rarest collection.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
          />

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 ml-1">
                Choose a username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="e.g. CryptoKing99"
                maxLength={20}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full h-13 px-4 rounded-2xl text-white font-semibold text-base placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-1 focus:ring-purple-500/60"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: error
                    ? "1.5px solid rgba(239,68,68,0.5)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  height: 52,
                }}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-red-400 font-medium ml-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-2xl font-display font-bold text-base text-white flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                height: 56,
                background: loading
                  ? "rgba(139,92,246,0.4)"
                  : "linear-gradient(135deg, #8B5CF6 0%, #4F46E5 100%)",
                boxShadow: loading ? "none" : "0 4px 32px rgba(139,92,246,0.45)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "btnShimmer 2.2s ease-in-out infinite",
                }}
              />
              <span className="relative z-10">{loading ? "Entering…" : "Start Playing"}</span>
              {!loading && <ArrowRight className="w-4 h-4 relative z-10" />}
            </motion.button>
          </motion.form>

          <motion.button
            onClick={handleGuest}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-white/30 hover:text-white/60 font-medium transition-colors"
          >
            Continue as Guest
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-1.5 pb-8 relative z-10"
        >
          <p className="text-[10px] text-white/15 font-medium tracking-wide text-center">
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
        </motion.div>
      </div>
    </div>
  );
}
