// src/components/ui/AchievementIcon.js
import React from "react";
import { View } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { useTheme } from "@shopify/restyle";

const Box = createBox();
const Text = createText();

const AchievementIcon = ({ icon, size = 60, ...rest }) => {
  const theme = useTheme();

  return (
    <Box variant="buttonIcon" width={size} height={size} {...rest}>
      {icon}
    </Box>
  );
};

export default AchievementIcon;
