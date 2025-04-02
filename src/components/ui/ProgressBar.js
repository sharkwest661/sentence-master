// src/components/ui/ProgressBar.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { createBox } from "@shopify/restyle";

const Box = createBox();

const ProgressBar = ({ progress, height = 15, ...rest }) => {
  return (
    <Box
      backgroundColor="background"
      borderWidth={2}
      borderColor="outline"
      borderRadius="sm"
      height={height}
      overflow="hidden"
      {...rest}
    >
      <Box
        backgroundColor="secondary"
        height="100%"
        width={`${progress}%`}
        borderRadius="sm"
      />
    </Box>
  );
};

export default ProgressBar;
