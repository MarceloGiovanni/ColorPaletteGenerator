import type { ColorAPI } from "@app/generatedTypes/ColorAPI";
import { COLOR_API } from "@app/configuration";

export const fetchColorByHsl = async (
  h: number,
  s: number,
  l: number
): Promise<ColorAPI> => {
  try {
    const url = `${COLOR_API.BASE_URL}/id?hsl=${h},${s}%,${l}%`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("HTTP error");
    }

    return await response.json();
  } catch {
    throw new Error("Failed to fetch color");
  }
};
