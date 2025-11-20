import { useState } from "react";
import toast from "react-hot-toast";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { ColorSwatchGrid, type SwatchItem } from "./components/ColorSwatchGrid";
import { HslColorPicker, type SlColor } from "./components/HslColorPicker";
import { usePaletteCache } from "./context/PaletteContext";
import { fetchUniqueColorsForSL } from "./services/fetchUniqueColorsForSL";

export const ColorPalettePage = () => {
  const cache = usePaletteCache();
  const [slColor, setSlColor] = useState<SlColor>({
    s: 100,
    l: 50,
  });
  const [generatedSlColor, setGeneratedSlColor] = useState<SlColor | null>(null);
  const [swatches, setSwatches] = useState<SwatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const uniqueColors = await fetchUniqueColorsForSL(
        slColor.s,
        slColor.l,
        cache
      );
      setSwatches(uniqueColors);
      setGeneratedSlColor({ s: slColor.s, l: slColor.l });
    } catch {
      toast.error("Failed to fetch colors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Color Palette Generator
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Select Saturation and Lightness
        </Typography>

        <HslColorPicker value={slColor} onChange={setSlColor} />

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleGenerate}
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Palette"}
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Generating color palette...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fetching unique colors from the API
          </Typography>
        </Box>
      )}

      {!loading && swatches.length > 0 && generatedSlColor && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Color Palette for Saturation {generatedSlColor.s} and Lightness {generatedSlColor.l} ({swatches.length} unique colors)
          </Typography>
          <ColorSwatchGrid items={swatches} />
        </Box>
      )}
    </Container>
  );
};
