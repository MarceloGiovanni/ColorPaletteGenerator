import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { SwatchItem } from "../components/ColorSwatchGrid";
import { CACHE_CONFIG } from "@app/configuration";

type PaletteContextType = {
  getColors: (s: number, l: number) => SwatchItem[] | null;
  setColors: (s: number, l: number, colors: SwatchItem[]) => void;
  getCacheSize: () => number;
};

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<Map<string, SwatchItem[]>>(new Map());
  const [_accessOrder, setAccessOrder] = useState<string[]>([]);

  const createKey = (s: number, l: number): string => `${s}-${l}`;

  const moveToFront = (key: string): void => {
    setAccessOrder((prev) => {
      const filtered = prev.filter((k) => k !== key);
      return [key, ...filtered];
    });
  };

  const addKeyToFront = (key: string, currentOrder: string[]): string[] => {
    const filtered = currentOrder.filter((k) => k !== key);
    return [key, ...filtered];
  };

  const evictOldestIfNeeded = (order: string[]): string[] => {
    if (order.length > CACHE_CONFIG.MAX_SIZE) {
      const evicted = order.pop();
      if (evicted) {
        setCache((c) => {
          const updated = new Map(c);
          updated.delete(evicted);
          return updated;
        });
      }
      return order;
    }
    return order;
  };

  const getColors = useCallback(
    (s: number, l: number): SwatchItem[] | null => {
      const key = createKey(s, l);
      const colors = cache.get(key);

      if (colors) {
        moveToFront(key);
        return colors;
      }

      return null;
    },
    [cache]
  );

  const setColors = useCallback(
    (s: number, l: number, colors: SwatchItem[]) => {
      const key = createKey(s, l);

      setCache((prev) => {
        const newCache = new Map(prev);
        newCache.set(key, colors);
        return newCache;
      });

      setAccessOrder((prev) => {
        const newOrder = addKeyToFront(key, prev);
        return evictOldestIfNeeded(newOrder);
      });
    },
    []
  );

  const getCacheSize = useCallback(() => cache.size, [cache]);

  return (
    <PaletteContext.Provider value={{ getColors, setColors, getCacheSize }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePaletteCache = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePaletteCache must be used within PaletteProvider");
  }
  return context;
};
