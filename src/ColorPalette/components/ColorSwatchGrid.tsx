import { memo } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export type HslColor = {
  h: number;
  s: number;
  l: number;
};

export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type SwatchItem = {
  name: string;
  hsl: HslColor;
  rgb: RgbColor;
};

type ColorSwatchGridProps = {
  items: SwatchItem[];
};

const GridRoot = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  },
}));

const SwatchCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const SwatchColor = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: theme.shape.borderRadius / 2,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(1),
}));

const SwatchLabel = styled(Typography)({
  fontSize: "0.75rem",
  fontWeight: 600,
});

export const ColorSwatchGrid = memo<ColorSwatchGridProps>(({ items }) => {
  return (
    <GridRoot>
      {items.map(({ name, hsl, rgb }, index) => {
        const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        return (
          <SwatchCard key={`${name}-${index}`}>
            <SwatchColor
              role="img"
              aria-label={`${name} - ${hslString}`}
              sx={{ backgroundColor: hslString }}
            />
            <SwatchLabel>{name}</SwatchLabel>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              RGB({rgb.r}, {rgb.g}, {rgb.b})
            </Typography>
          </SwatchCard>
        );
      })}
    </GridRoot>
  );
});

ColorSwatchGrid.displayName = "ColorSwatchGrid";
