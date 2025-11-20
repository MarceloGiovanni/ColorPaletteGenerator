import type { SwatchItem } from "../components/ColorSwatchGrid";
import type { ColorAPI } from "@app/generatedTypes/ColorAPI";
import { fetchColorByHsl } from "./fetchColorByHsl";
import { CACHE_CONFIG } from "@app/configuration";

type CacheFunctions = {
  getColors: (s: number, l: number) => SwatchItem[] | null;
  setColors: (s: number, l: number, colors: SwatchItem[]) => void;
};

const getCachedColors = (
  cache: CacheFunctions | undefined,
  s: number,
  l: number
): SwatchItem[] | null => {
  if (!cache) return null;

  const cached = cache.getColors(s, l);
  if (cached) {
    return cached;
  }

  return null;
};

const createSwatchItem = (colorData: ColorAPI): SwatchItem => ({
  name: colorData.name.value,
  hsl: {
    h: colorData.hsl.h,
    s: colorData.hsl.s,
    l: colorData.hsl.l,
  },
  rgb: {
    r: colorData.rgb.r,
    g: colorData.rgb.g,
    b: colorData.rgb.b,
  },
});

const storeUniqueColor = (
  uniqueColors: Map<string, SwatchItem>,
  colorData: ColorAPI
): void => {
  const colorName = colorData.name.value;

  if (!uniqueColors.has(colorName)) {
    uniqueColors.set(colorName, createSwatchItem(colorData));
  }
};

const fetchAllHueVariations = async (
  s: number,
  l: number
): Promise<Map<string, SwatchItem>> => {
  const uniqueColors = new Map<string, SwatchItem>();
  const batchSize = CACHE_CONFIG.BATCH_SIZE;

  for (let startH = 0; startH <= 360; startH += batchSize) {
    const batch = Array.from(
      { length: batchSize },
      (_, i) => startH + i
    ).filter((h) => h <= 360);

    const promises = batch.map((h) => fetchColorByHsl(h, s, l));
    const results = await Promise.allSettled(promises);

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        storeUniqueColor(uniqueColors, result.value);
      }
    });
  }

  return uniqueColors;
};

const saveToCache = (
  cache: CacheFunctions | undefined,
  s: number,
  l: number,
  colors: SwatchItem[]
): void => {
  if (!cache) return;

  cache.setColors(s, l, colors);
};

export const fetchUniqueColorsForSL = async (
  s: number,
  l: number,
  cache?: CacheFunctions
): Promise<SwatchItem[]> => {
  const cached = getCachedColors(cache, s, l);
  if (cached) return cached;

  const uniqueColorsMap = await fetchAllHueVariations(s, l);
  const colors = Array.from(uniqueColorsMap.values());

  saveToCache(cache, s, l, colors);
  return colors;
};
