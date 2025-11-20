import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ColorPalettePage } from "./ColorPalette";
import { PaletteProvider } from "./ColorPalette/context/PaletteContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaletteProvider>
      <ColorPalettePage />
      <Toaster position="top-right" />
    </PaletteProvider>
  </StrictMode>
);
