// src/components/ui/Card.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { createBox } from "@shopify/restyle";

const Box = createBox();

const Card = ({
  children,
  variant = "primary",
  decorative = true,
  ...rest
}) => {
  return (
    <Box
      variant={`card${variant.charAt(0).toUpperCase() + variant.slice(1)}`}
      {...rest}
    >
      {decorative && <View style={styles.decorativeDot} />}
      {children}
    </Box>
  );
};

const styles = StyleSheet.create({
  decorativeDot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF6B6B", // Primary color
    top: -10,
    left: -10,
    borderWidth: 2,
    borderColor: "#333333",
  },
});

export default Card;
