import React, { CSSProperties } from "react";
import { StyleSheet, ViewStyle, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Line from "../Line";
import { View, Text } from "../Themed";
import CardContainer from "../CardContainer";

const humidity = require("../../assets/images/humidity.png");
const uvIndex = require("../../assets/images/uvIndex.png");
const pressure = require("../../assets/images/pressure.png");
const visibility = require("../../assets/images/visibility.png");

const icons = [humidity, uvIndex, visibility, pressure];

interface ObjectType {
  name: string;
  index: number;
  type: string;
  color: string;
}
interface Props {
  cardStyle: ViewStyle;
  obj: ObjectType;
  value: number;
  min: number;
}
export default function Card({ cardStyle, obj, value, min }: Props) {
  return (
    <CardContainer cardStyle={cardStyle} color={obj.color}>
      <View style={styles.linearStyle}>
        <View style={styles.dataContainer}>
          <Image
            source={icons[obj.index]}
            resizeMode="center"
            style={{
              height: 30,
              width: obj.index === 3 ? 25 : 30,
              marginBottom: "5%",
            }}
          />
          <Text style={[styles.textStyle, { fontWeight: "bold" }]}>
            {obj.name}
          </Text>
        </View>
        {obj.index % 2 !== 0 && (
          <View style={styles.lineContainer}>
            <Line />
          </View>
        )}
        <View style={styles.dataContainer}>
          <Text
            style={[styles.textStyle, { fontSize: 32, fontFamily: "space-mano-bold" }]}
          >
            {value}
          </Text>
          <Text style={styles.textStyle}>{`${min} minutes ago`}</Text>
        </View>
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  linearStyle: {
    flex: 92,
    backgroundColor: "transparent",
    paddingHorizontal: "14%",
    justifyContent: "center",
  },
  dataContainer: {
    flex: 35,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  lineContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "#fff",
    fontSize: 15,
  },
});
