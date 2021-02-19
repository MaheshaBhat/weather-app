import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { View, Text } from "../Themed";

export default function Description({ description }: { description: string }) {
  const [readMore, setReadMore] = useState<boolean>(true);

  return (
    <>
      <View style={styles.descriptionStyle}>
        <Text style={{ fontSize: 14 }} numberOfLines={readMore ? 5 : undefined}>
          {description}
        </Text>
      </View>
      <TouchableOpacity
        style={{ paddingHorizontal: "4%", marginLeft: "auto" }}
        onPress={() => setReadMore((r) => !r)}
      >
        <Text style={[styles.linkTextStyle, { paddingBottom: "5%" }]}>
          {readMore ? "read more" : "read less"}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  linkTextStyle: {
    color: "#039be5",
  },
  descriptionStyle: {
    backgroundColor: "transparent",
    paddingHorizontal: "4%",
    width: "100%",
    flex: 1,
  },
});
