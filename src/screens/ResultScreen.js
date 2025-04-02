// src/screens/ResultScreen.js
import React, { useEffect } from "react";
import { StyleSheet, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import { Star, Trophy, ArrowRight, RotateCcw, Home } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  withSpring,
} from "react-native-reanimated";

import { Button, Card } from "../components/ui";
import useGameStore from "../store/useGameStore";
import { getSentenceById } from "../data/sentences";

const Box = createBox();
const AnimatedBox = Animated.createAnimatedComponent(Box);
const Text = createText();

const DecorativeShape = ({ style, color }) => (
  <Box
    style={[styles.decorativeShape, style]}
    backgroundColor={color}
    borderWidth={2}
    borderColor="outline"
  />
);

const ResultScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { levelId, score, stars, correctSentence } = route.params;

  const completedLevels = useGameStore((state) => state.completedLevels);
  const currentLevel = useGameStore((state) => state.currentLevel);
  const setCurrentLevel = useGameStore((state) => state.setCurrentLevel);
  const startLevel = useGameStore((state) => state.startLevel);

  const levelData = getSentenceById(levelId);
  const nextLevelData = getSentenceById(
    `${levelData.category}-${levelData.level + 1}`
  );

  // Animation values
  const cardScale = useSharedValue(0.8);
  const cardOpacity = useSharedValue(0);
  const star1Scale = useSharedValue(0);
  const star2Scale = useSharedValue(0);
  const star3Scale = useSharedValue(0);
  const scoreOpacity = useSharedValue(0);
  const scoreScale = useSharedValue(0.5);

  // Handle back button - prevent going back
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true; // Prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, []);

  // Start animations
  useEffect(() => {
    // Card animation
    cardScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.elastic(1.2),
    });
    cardOpacity.value = withTiming(1, { duration: 500 });

    // Score animation
    scoreOpacity.value = withDelay(600, withTiming(1, { duration: 300 }));
    scoreScale.value = withDelay(
      600,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
      })
    );

    // Stars animation with sequential delay
    star1Scale.value = withDelay(
      900,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
      })
    );

    if (stars >= 2) {
      star2Scale.value = withDelay(
        1100,
        withSpring(1, {
          damping: 12,
          stiffness: 100,
        })
      );
    }

    if (stars >= 3) {
      star3Scale.value = withDelay(
        1300,
        withSpring(1, {
          damping: 12,
          stiffness: 100,
        })
      );
    }
  }, []);

  const handleNextLevel = () => {
    if (nextLevelData) {
      setCurrentLevel(nextLevelData.level);
      startLevel(nextLevelData);
      navigation.replace("Game", { levelId: nextLevelData.id });
    }
  };

  const handleReplayLevel = () => {
    startLevel(levelData);
    navigation.replace("Game", { levelId: levelData.id });
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
      opacity: cardOpacity.value,
    };
  });

  const scoreAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: scoreOpacity.value,
      transform: [{ scale: scoreScale.value }],
    };
  });

  const star1AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: star1Scale.value }],
    };
  });

  const star2AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: star2Scale.value }],
    };
  });

  const star3AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: star3Scale.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative background elements */}
      <DecorativeShape
        style={{ top: 60, right: 20 }}
        color={theme.colors.primary}
      />
      <DecorativeShape
        style={{
          top: 180,
          left: 20,
          width: 15,
          height: 15,
          borderRadius: 5,
          transform: [{ rotate: "45deg" }],
        }}
        color={theme.colors.accent1}
      />
      <DecorativeShape
        style={{
          bottom: 140,
          right: 30,
          width: 25,
          height: 25,
          borderRadius: 3,
        }}
        color={theme.colors.accent2}
      />
      <DecorativeShape
        style={{
          bottom: 100,
          left: 40,
          width: 18,
          height: 18,
          borderRadius: 9,
        }}
        color={theme.colors.secondary}
      />

      <Box flex={1} justifyContent="center" alignItems="center" padding="lg">
        <AnimatedBox style={cardAnimatedStyle} width="100%">
          <Card padding="xl">
            <Box alignItems="center">
              <Box
                backgroundColor="accent1"
                width={60}
                height={60}
                borderRadius={30}
                justifyContent="center"
                alignItems="center"
                borderWidth={2}
                borderColor="outline"
                marginBottom="lg"
              >
                <Trophy color={theme.colors.text} size={30} />
              </Box>

              <Text variant="title" textAlign="center" marginBottom="md">
                Level Completed!
              </Text>

              <Box
                flexDirection="row"
                justifyContent="center"
                marginVertical="lg"
              >
                <AnimatedBox style={star1AnimatedStyle} marginHorizontal="xs">
                  <Star
                    color={theme.colors.text}
                    size={36}
                    fill={theme.colors.accent1}
                  />
                </AnimatedBox>
                <AnimatedBox style={star2AnimatedStyle} marginHorizontal="xs">
                  <Star
                    color={theme.colors.text}
                    size={36}
                    fill={stars >= 2 ? theme.colors.accent1 : "transparent"}
                  />
                </AnimatedBox>
                <AnimatedBox style={star3AnimatedStyle} marginHorizontal="xs">
                  <Star
                    color={theme.colors.text}
                    size={36}
                    fill={stars >= 3 ? theme.colors.accent1 : "transparent"}
                  />
                </AnimatedBox>
              </Box>

              <AnimatedBox style={scoreAnimatedStyle}>
                <Text variant="body" textAlign="center">
                  Your Score
                </Text>
                <Text
                  variant="header"
                  color="primary"
                  textAlign="center"
                  marginBottom="lg"
                >
                  {score} points
                </Text>
              </AnimatedBox>

              <Box
                backgroundColor="background"
                borderWidth={2}
                borderColor="outline"
                borderRadius="sm"
                padding="md"
                width="100%"
                marginBottom="lg"
              >
                <Text variant="small" textAlign="center">
                  Correct Sentence:
                </Text>
                <Text variant="body" textAlign="center" fontWeight="bold">
                  {correctSentence}
                </Text>
              </Box>

              <Box width="100%" marginTop="md">
                {nextLevelData && (
                  <Button
                    variant="primary"
                    label="Next Level"
                    icon={<ArrowRight color={theme.colors.white} size={20} />}
                    onPress={handleNextLevel}
                    marginBottom="md"
                  />
                )}

                <Button
                  variant="secondary"
                  label="Play Again"
                  icon={<RotateCcw color={theme.colors.text} size={20} />}
                  onPress={handleReplayLevel}
                  marginBottom="md"
                />

                <Button
                  variant="secondary"
                  label="Home"
                  icon={<Home color={theme.colors.text} size={20} />}
                  onPress={handleHome}
                />
              </Box>
            </Box>
          </Card>
        </AnimatedBox>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  decorativeShape: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: -1,
  },
});

export default ResultScreen;
