import { createTheme } from "@mui/material/styles";

const prim = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0");
const sec = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0");

const primaryColor = "#2180b9"
const secondaryColor = "#e44b37"

const theme = createTheme({
  palette: {
    primary: {
      // main: primaryColor,
      main: prim
    },
    secondary: {
      // main: secondaryColor
      main: sec
    },
  },
});

export default theme;