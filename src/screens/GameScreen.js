// src/screens/GameScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Pressable, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBox, createText, useTheme } from "@shopify/restyle";
import { ArrowLeft, RefreshCw, Lightbulb, Check, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

import { Button, Card, WordTile, ProgressBar } from "../components/ui";
import useGameStore from "../store/useGameStore";
import useSettingsStore from "../store/useSettingsStore";

const Box = createBox();
const AnimatedBox = Animated.createAnimatedComponent(Box);
const Text = createText();

const GameScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { levelId } = route.params;

  // Animation values
  const sentenceContainerScale = useSharedValue(1);
  const sentenceContainerRotate = useSharedValue(0);
  const confettiOpacity = useSharedValue(0);

  // Game state from Zustand
  const levelData = useGameStore((state) => state.levelData);
  const currentSentence = useGameStore((state) => state.currentSentence);
  const availableWords = useGameStore((state) => state.availableWords);
  const isCorrect = useGameStore((state) => state.isCorrect);
  const isWrong = useGameStore((state) => state.isWrong);
  const hintsUsed = useGameStore((state) => state.hintsUsed);

  // Game actions from Zustand
  const addWordToSentence = useGameStore((state) => state.addWordToSentence);
  const removeWordFromSentence = useGameStore(
    (state) => state.removeWordFromSentence
  );
  const checkSentence = useGameStore((state) => state.checkSentence);
  const resetSentence = useGameStore((state) => state.resetSentence);
  const useHint = useGameStore((state) => state.useHint);
  const completeLevel = useGameStore((state) => state.completeLevel);

  // Settings from Zustand
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const vibrationEnabled = useSettingsStore((state) => state.vibrationEnabled);
  const showHints = useSettingsStore((state) => state.showHints);

  // Game timer
  const [timeLeft, setTimeLeft] = useState(levelData?.timeLimit || 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || isCorrect) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          // Handle time out - could navigate to results or show replay option
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isCorrect]);

  // Calculate score based on time left and hints used
  const calculateScore = () => {
    const basePoints = levelData.points || 100;
    const timeBonus = Math.floor((timeLeft / levelData.timeLimit) * 50);
    const hintPenalty = hintsUsed * 10;

    return Math.max(basePoints + timeBonus - hintPenalty, 0);
  };

  // Calculate stars based on score
  const calculateStars = (score) => {
    const maxScore = levelData.points + 50; // Max possible score

    if (score >= maxScore * 0.9) return 3;
    if (score >= maxScore * 0.7) return 2;
    return 1;
  };

  const handleWordPress = (word) => {
    if (isCorrect) return;

    addWordToSentence(word);
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSentenceWordPress = (index) => {
    if (isCorrect) return;

    removeWordFromSentence(index);
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleCheckSentence = () => {
    const result = checkSentence();

    if (result) {
      // Sentence is correct - show celebration animation
      if (vibrationEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Animations for correct answer
      sentenceContainerScale.value = withSequence(
        withTiming(1.05, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );

      confettiOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(1500, withTiming(0, { duration: 500 }))
      );

      // Calculate score and complete the level
      const score = calculateScore();
      const stars = calculateStars(score);
      completeLevel(levelData.id, score, stars);

      // Navigate to result screen after a short delay
      setTimeout(() => {
        navigation.navigate("Result", {
          levelId: levelData.id,
          score,
          stars,
          correctSentence: currentSentence.join(" "),
        });
      }, 1500);
    } else {
      // Sentence is wrong - show error animation
      if (vibrationEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      sentenceContainerRotate.value = withSequence(
        withTiming(-2, { duration: 50 }),
        withTiming(2, { duration: 100 }),
        withTiming(-2, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
    }
  };

  const handleResetSentence = () => {
    resetSentence();
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleUseHint = () => {
    useHint();
    // Here you could show a hint modal or highlight something
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  // Animated styles
  const sentenceContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: sentenceContainerScale.value },
        { rotate: `${sentenceContainerRotate.value}deg` },
      ],
    };
  });

  const confettiAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: confettiOpacity.value,
    };
  });

  // Render confetti elements
  const renderConfetti = () => {
    const confettiElements = [];
    const colors = [
      theme.colors.primary,
      theme.colors.accent1,
      theme.colors.accent2,
      theme.colors.secondary,
    ];

    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 12 + 8;
      confettiElements.push(
        <Box
          key={i}
          position="absolute"
          width={size}
          height={size}
          borderRadius={size / 2}
          backgroundColor={colors[Math.floor(Math.random() * colors.length)]}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          style={{
            transform: [
              { translateY: Math.random() * 200 - 100 },
              { rotate: `${Math.random() * 360}deg` },
            ],
          }}
        />
      );
    }

    return confettiElements;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="lg"
        paddingVertical="md"
        borderBottomWidth={3}
        borderBottomColor="outline"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft color={theme.colors.text} size={24} />
        </Pressable>

        <Text variant="subtitle">Level {levelData?.level}</Text>

        <Box
          paddingHorizontal="md"
          paddingVertical="xs"
          backgroundColor="primary"
          borderRadius="sm"
          borderWidth={2}
          borderColor="outline"
        >
          <Text variant="small" color="white">
            {timeLeft}s
          </Text>
        </Box>
      </Box>

      {/* Confetti animation container */}
      <AnimatedBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
        style={confettiAnimatedStyle}
      >
        {renderConfetti()}
      </AnimatedBox>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions */}
        <Card marginBottom="lg">
          <Text variant="subtitle">{levelData?.instructions}</Text>
        </Card>

        {/* Sentence construction area */}
        <AnimatedBox
          style={sentenceContainerAnimatedStyle}
          backgroundColor="background"
          borderWidth={3}
          borderColor="outline"
          borderRadius="md"
          padding="lg"
          minHeight={120}
          marginBottom="lg"
        >
          {currentSentence.length > 0 ? (
            <Box flexDirection="row" flexWrap="wrap">
              {currentSentence.map((word, index) => (
                <WordTile
                  key={`sentence-${index}`}
                  word={word}
                  isSelected={true}
                  onPress={() => handleSentenceWordPress(index)}
                  margin="xs"
                />
              ))}
            </Box>
          ) : (
            <Text variant="body" color="text" opacity={0.5}>
              Drag words here to form a sentence...
            </Text>
          )}

          {isCorrect && (
            <Box
              position="absolute"
              top={0}
              right={0}
              padding="sm"
              backgroundColor="accent2"
              borderBottomLeftRadius="md"
              borderTopRightRadius="md"
            >
              <X color={theme.colors.white} size={20} />
            </Box>
          )}
        </AnimatedBox>

        {/* Available words */}
        <Text variant="subtitle" marginBottom="md">
          Available Words:
        </Text>

        <Box flexDirection="row" flexWrap="wrap" marginBottom="xl">
          {availableWords.map((word, index) => (
            <WordTile
              key={`available-${index}`}
              word={word}
              onPress={() => handleWordPress(word)}
              margin="xs"
            />
          ))}
        </Box>

        {/* Action buttons */}
        <Box flexDirection="row" justifyContent="space-between">
          <Button
            variant="secondary"
            label="Reset"
            icon={<RefreshCw color={theme.colors.text} size={18} />}
            onPress={handleResetSentence}
            paddingHorizontal="md"
          />

          {showHints && (
            <Button
              variant="secondary"
              label="Hint"
              icon={<Lightbulb color={theme.colors.text} size={18} />}
              onPress={handleUseHint}
              paddingHorizontal="md"
            />
          )}

          <Button
            variant="primary"
            label="Check"
            icon={<Check color={theme.colors.white} size={18} />}
            onPress={handleCheckSentence}
            disabled={currentSentence.length === 0}
            opacity={currentSentence.length === 0 ? 0.5 : 1}
            paddingHorizontal="md"
          />
        </Box>

        {/* Grammar tip */}
        {levelData?.grammarTip && (
          <Card marginTop="xl">
            <Text variant="small" opacity={0.7}>
              Tip:
            </Text>
            <Text variant="body">{levelData.grammarTip}</Text>

            {levelData.example && (
              <Text variant="small" marginTop="sm" fontStyle="italic">
                Example: {levelData.example}
              </Text>
            )}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
});

export default GameScreen;
