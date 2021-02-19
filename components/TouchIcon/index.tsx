import React from "react";
import { ColorValue, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "../../constants/Layout";

interface Props {
  onPress?: () => {};
  touchStyle?: ViewStyle;
  color: ColorValue;
  name: any;
  size: number;
  disabled?: boolean;
}

export default function TouchIcon({
  onPress,
  touchStyle,
  color,
  name,
  size,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={touchStyle} disabled={disabled}>
      <Ionicons name={name} size={normalize(size)} color={color} />
    </TouchableOpacity>
  );
}
