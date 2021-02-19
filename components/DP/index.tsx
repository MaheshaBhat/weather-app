import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ColorValue,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { normalize } from "../../constants/Layout";

const imageWidth = normalize(60);

interface Props {
  image: string;
  onPress?: () => {};
  color: ColorValue;
  disabled?: boolean;
  dpStyle?: ViewStyle;
}

export default function DP({
  image,
  onPress,
  color,
  disabled = false,
  dpStyle,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.imageStyle, dpStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      {!image ? (
        <Ionicons
          name="person-circle-outline"
          size={imageWidth}
          color={color}
        />
      ) : (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
    overflow: "hidden",
    backgroundColor: "#b1b1b1",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: imageWidth,
    width: imageWidth,
    borderWidth: 3,
    borderRadius: imageWidth / 2,
  },
});
