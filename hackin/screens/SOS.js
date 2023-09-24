import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

function SOSButton({ navigation }) {
  const [isCounting, setIsCounting] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsCounting(true);

    setTimeout(() => {
      if (isCounting) {
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          setIsCounting(false);
          animationValue.setValue(0);
          navigation.navigate("SosDetails");
        });
      }
    }, 5000);
  };

  const handlePressOut = () => {
    setIsCounting(false); 
    animationValue.setValue(0);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.button,
            {
              transform: [
                {
                  scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5], 
                  }),
                },
              ],
            },
          ]}
        >
          {!isCounting && (
            <Text style={styles.buttonText}>Hold for 5s to toggle.</Text>
          )}
          {isCounting && (
            <CountdownCircleTimer
              isPlaying
              duration={5}
              size={200}
              strokeWidth={15}
              colors={["#ff1100"]}
              onComplete={() => {
                navigation.navigate("SosDetails");
              }}
            >
              {({ remainingTime, animatedColor }) => (
                <Animated.Text
                  style={[styles.countdownText, { color: animatedColor }]}
                >
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  countdownText: {
    fontSize: 24,
    color: "white",
  },
  sosGif: {
    width: 100,
    height: 100,
  },
});

export default SOSButton;
