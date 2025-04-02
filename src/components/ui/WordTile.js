// src/components/ui/WordTile.js
import React from "react";
import { TouchableOpacity, Animated } from "react-native";
import { createBox, createText, useTheme } from "@shopify/restyle";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const Box = createBox();
const Text = createText();

const WordTile = ({ word, onPress, isSelected = false, ...rest }) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Box
          variant={isSelected ? "wordTileSelected" : "wordTileDefault"}
          {...rest}
        >
          <Text variant="button">{word}</Text>
        </Box>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WordTile;
