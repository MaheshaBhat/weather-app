import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ColorValue,
  ViewStyle,
} from "react-native";
// import { useHeaderHeight } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import layout, { normalize } from "../../constants/Layout";

const imageWidth = normalize(100);

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
  // const headHeight = useHeaderHeight();
  // const imageWidth = (layout.window.height - headHeight) * 0.13;
  return (
    <TouchableOpacity
      style={[
        styles.imageStyle,
        dpStyle,
        { height: imageWidth, width: imageWidth, borderRadius: imageWidth / 2 },
      ]}
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
          style={[
            styles.image,
            {
              height: imageWidth,
              width: imageWidth,
              borderRadius: imageWidth / 2,
            },
          ]}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    overflow: "hidden",
    backgroundColor: "#b1b1b1",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderWidth: 3,
  },
});
