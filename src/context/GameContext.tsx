import React, { createContext, useContext, useState, useEffect } from "react";
import type { GameState, CollectionEntry, Pack, Coin } from "../types/game";
import { COINS } from "../data/coins";

const INITIAL_BALANCE = 1000;
const STORAGE_KEY = "wedo_game_state";

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { wedoBalance: INITIAL_BALANCE, collection: [], totalSwaps: 0 };
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addToCollection(collection: CollectionEntry[], coinId: string): CollectionEntry[] {
  const existing = collection.find((e) => e.coinId === coinId);
  if (existing) {
    return collection.map((e) =>
      e.coinId === coinId ? { ...e, count: e.count + 1 } : e
    );
  }
  return [...collection, { coinId, count: 1, firstObtained: Date.now() }];
}

export function rollCoin(pack: Pack): Coin {
  const roll = Math.random() * 100;
  let tier: "common" | "uncommon" | "rare" | "legendary";
  if (roll < pack.odds.legendary) tier = "legendary";
  else if (roll < pack.odds.legendary + pack.odds.rare) tier = "rare";
  else if (roll < pack.odds.legendary + pack.odds.rare + pack.odds.uncommon) tier = "uncommon";
  else tier = "common";
  const pool = COINS.filter((c) => c.tier === tier);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateBoxCoins(pack: Pack): Coin[] {
  return Array.from({ length: 5 }, () => rollCoin(pack));
}

interface GameContextValue {
  state: GameState;
  spendWedo: (amount: number) => boolean;
  addCoinToCollection: (coinId: string) => void;
  incrementSwaps: () => void;
  setLastPackId: (id: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const spendWedo = (amount: number): boolean => {
    if (state.wedoBalance < amount) return false;
    setState((s) => ({ ...s, wedoBalance: s.wedoBalance - amount }));
    return true;
  };

  const addCoinToCollection = (coinId: string) => {
    setState((s) => ({
      ...s,
      collection: addToCollection(s.collection, coinId),
    }));
  };

  const incrementSwaps = () => {
    setState((s) => ({ ...s, totalSwaps: s.totalSwaps + 1 }));
  };

  const setLastPackId = (id: string) => {
    setState((s) => ({ ...s, lastPackId: id }));
  };

  const resetGame = () => {
    setState({ wedoBalance: INITIAL_BALANCE, collection: [], totalSwaps: 0 });
  };

  return (
    <GameContext.Provider
      value={{ state, spendWedo, addCoinToCollection, incrementSwaps, setLastPackId, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
