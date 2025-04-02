// src/theme/index.js
import { createTheme } from "@shopify/restyle";

// Neo Memphis theme as detailed in specifications
export const neoMemphisTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    text: "#333333",
    primary: "#FF6B6B", // Coral Red
    secondary: "#48DBFB", // Sky Blue
    accent1: "#FECA57", // Sunshine Yellow
    accent2: "#1DD1A1", // Mint Green
    outline: "#333333", // Black for outlines
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    sm: 8,
    md: 12,
    lg: 24,
    round: 9999,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 32,
      color: "text",
      textTransform: "uppercase",
    },
    title: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 24,
      color: "text",
    },
    subtitle: {
      fontFamily: "WorkSans-Medium",
      fontSize: 18,
      color: "text",
    },
    body: {
      fontFamily: "WorkSans-Regular",
      fontSize: 16,
      color: "text",
    },
    small: {
      fontFamily: "WorkSans-Light",
      fontSize: 14,
      color: "text",
    },
    button: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 16,
      color: "text",
      textTransform: "uppercase",
    },
  },
  cardVariants: {
    primary: {
      backgroundColor: "white",
      borderWidth: 3,
      borderColor: "outline",
      borderRadius: "md",
      padding: "lg",
      shadowColor: "outline",
      shadowOffset: { width: 8, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 0,
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: "primary",
      borderWidth: 2,
      borderColor: "outline",
      borderRadius: "sm",
      paddingVertical: "md",
      paddingHorizontal: "lg",
      shadowColor: "outline",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    secondary: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "outline",
      borderRadius: "sm",
      paddingVertical: "md",
      paddingHorizontal: "lg",
      shadowColor: "outline",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    icon: {
      width: 60,
      height: 60,
      borderRadius: "round",
      backgroundColor: "accent1",
      borderWidth: 2,
      borderColor: "outline",
      shadowColor: "outline",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  },
  wordTileVariants: {
    default: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "outline",
      borderRadius: "sm",
      paddingVertical: "md",
      paddingHorizontal: "lg",
      shadowColor: "outline",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    selected: {
      backgroundColor: "secondary",
      borderWidth: 2,
      borderColor: "outline",
      borderRadius: "sm",
      paddingVertical: "md",
      paddingHorizontal: "lg",
      shadowColor: "outline",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
  },
});

export default neoMemphisTheme;
