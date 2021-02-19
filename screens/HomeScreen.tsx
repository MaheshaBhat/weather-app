import React, {
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

import { Text, View } from "../components/Themed";
import Card from "../components/Card";
import { AppContext, contextType } from "../context";
import { getUVData, getWeatherData } from "../api-service";
import DP from "../components/DP";

const weatherData = [
  { name: "Humidity", index: 0, type: "humidity", color: "#6b29ff" },
  { name: "UV index", index: 1, type: "uvIndex", color: "#ff6861" },
  { name: "Visibility", index: 2, type: "visibility", color: "#f1ae84" },
  { name: "Pressure", index: 3, type: "pressure", color: "#61c5f9" },
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];


const getDate = (date: Date) =>
  `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

interface Weather {
  humidity: number;
  uvIndex: number;
  pressure: number;
  visibility: number;
}
export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  // const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [permission, setPermission] = useState(false);
  const [min, setMin] = useState(0);
  const [weather, setWeather] = useState({
    humidity: 0,
    uvIndex: 0,
    pressure: 0,
    visibility: 0,
  });
  const { userName, image, theme } = useContext<contextType>(AppContext);
  // console.log(image);
  const dateRef = useRef<Date>(new Date());

  useEffect(() => {
    const myInterval = setInterval(() => {
      setMin((m) => m + 1);
    }, 60000);

    return () => clearInterval(myInterval);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (!refreshing) return;
      setPermission(false);
      setErrorMsg("");
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const tmpLocation = await Location.getCurrentPositionAsync({});
      // setLocation(tmpLocation);
      Promise.all([getWeatherData(tmpLocation), getUVData(tmpLocation)])
        .then((res) => {
          setRefreshing(false);
          setWeather({ ...res[0], uvIndex: res[1] });
          setMin(0);
        })
        .catch((err) => {
          setRefreshing(false);
          setErrorMsg(err.toString());
        });
    })();
  }, [refreshing, permission]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        {!permission && (
          <TouchableOpacity onPress={() => setPermission(true)}>
            <Text style={{ color: "blue" }}>Give Permission</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerContainer}>
        <View style={styles.vc} />
        <View style={styles.userNameContainer}>
          <Text style={styles.dateStyle}>{getDate(dateRef.current)}</Text>
          <Text style={styles.userNameStyle}>{userName.split("@")[0]}</Text>
        </View>
        <View style={styles.vc} />
        <View style={styles.imageContainer}>
          <DP color={ theme.colors.primaryColor} disabled image={image} />
        </View>
        <View style={styles.vc} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.vc} />
        <View style={styles.colContainer}>
          <View style={styles.hr} />
          <Card
            cardStyle={styles.shortCardStyle}
            obj={weatherData[0]}
            key={0}
            value={weather.humidity}
            min={min}
          />
          <View style={styles.hr} />
          <Card
            cardStyle={styles.longCardStyle}
            obj={weatherData[1]}
            key={1}
            value={weather.uvIndex}
            min={min}
          />
          <View style={styles.hr} />
        </View>
        <View style={styles.vc} />
        <View style={styles.colContainer}>
          <View style={styles.hr} />
          <Card
            cardStyle={styles.longCardStyle}
            obj={weatherData[3]}
            key={3}
            value={weather.pressure}
            min={min}
          />
          <View style={styles.hr} />
          <Card
            cardStyle={styles.shortCardStyle}
            obj={weatherData[2]}
            key={2}
            value={weather.visibility}
            min={min}
          />
          <View style={styles.hr} />
        </View>
        <View style={styles.vc} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 10,
    flexDirection: "row",
  },
  subContainer: {
    flex: 80,
    flexDirection: "row",
  },
  colContainer: {
    flex: 44,
    justifyContent: "space-between",
  },
  shortCardStyle: {
    flex: 34,
  },
  longCardStyle: {
    flex: 54,
  },
  hr: {
    flex: 4,
  },
  vc: {
    flex: 4,
  },
  userNameContainer: {
    flex: 64,
    justifyContent: "center",
  },
  imageContainer: {
    flex: 24,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userNameStyle: {
    fontSize: 17,
    fontFamily: "space-mano-bold",
    textTransform: "capitalize",
  },
  dateStyle: { color: "grey", fontSize: 15 },
});
