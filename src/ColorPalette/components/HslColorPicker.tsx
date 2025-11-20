import { Box, TextField, Slider, Typography, Stack } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

export type SlColor = {
  s: number;
  l: number;
};

type HslColorPickerProps = {
  value: SlColor;
  onChange: (color: SlColor) => void;
};

const numberInputStyles = {
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

export const HslColorPicker = ({ value, onChange }: HslColorPickerProps) => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography gutterBottom>Saturation (0-100%)</Typography>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={2}>
            <TextField
              type="number"
              value={value.s}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= 100) {
                  onChange({ ...value, s: val });
                }
              }}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              size="small"
              fullWidth
              sx={numberInputStyles}
            />
          </Grid2>
          <Grid2 size={10}>
            <Slider
              value={value.s}
              onChange={(_, newValue) =>
                onChange({ ...value, s: newValue as number })
              }
              min={0}
              max={100}
              aria-label="Saturation"
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box>
        <Typography gutterBottom>Lightness (0-100%)</Typography>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={2}>
            <TextField
              type="number"
              value={value.l}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= 100) {
                  onChange({ ...value, l: val });
                }
              }}
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              size="small"
              fullWidth
              sx={numberInputStyles}
            />
          </Grid2>
          <Grid2 size={10}>
            <Slider
              value={value.l}
              onChange={(_, newValue) =>
                onChange({ ...value, l: newValue as number })
              }
              min={0}
              max={100}
              aria-label="Lightness"
            />
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};
