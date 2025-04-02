// src/components/ui/Button.js
import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useTheme, createBox, createText } from "@shopify/restyle";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Box = createBox();
const Text = createText();

const Button = ({ variant = "primary", label, onPress, icon, ...rest }) => {
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
          variant={`button${
            variant.charAt(0).toUpperCase() + variant.slice(1)
          }`}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          {...rest}
        >
          {icon && <Box marginRight="sm">{icon}</Box>}
          <Text
            variant="button"
            color={variant === "primary" ? "white" : "text"}
          >
            {label}
          </Text>
        </Box>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
