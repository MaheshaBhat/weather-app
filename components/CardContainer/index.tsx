import React, { CSSProperties, ReactChild, ReactChildren } from "react";
import { StyleSheet, ViewStyle, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Line from "../Line";
import { View, Text } from "../Themed";

const humidity = require("../../assets/images/humidity.png");
const uvIndex = require("../../assets/images/uvIndex.png");
const pressure = require("../../assets/images/pressure.png");
const visibility = require("../../assets/images/visibility.png");

const icons = [humidity, uvIndex, visibility, pressure];

interface Props {
  cardStyle: ViewStyle;
  color: string;
  children: ReactChild;
}
export default function CardContainer({ cardStyle, color, children }: Props) {
  return (
    <View style={[styles.container, cardStyle]}>
      <LinearGradient colors={[color, `${color}80`]} style={styles.linearStyle}>
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  linearStyle: {
    flex: 1,
    flexDirection: "row",
    zIndex: 10,
  },
});
