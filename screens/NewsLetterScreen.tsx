import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import * as Linking from "expo-linking";

import { Text, View } from "../components/Themed";
import { AppContext, contextType } from "../context";
import Colors from "../constants/Colors";
import { getFeeds } from "../api-service";
import CardContainer from "../components/CardContainer";
import Description from "../components/Description";

export default function TabTwoScreen() {
  const { theme } = useContext<contextType>(AppContext);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (!refreshing) return;
    getFeeds()
      .then(({ articles }) => {
        const art = articles.filter(
          ({ urlToImage }: any) => urlToImage !== null
        );
        setFeeds(art);
        setRefreshing(false);
      })
      .catch((er) => setError("some thing went wrong"));
  }, [refreshing]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const { title, url, urlToImage, description, source } = item;
      return (
        <>
          <CardContainer
            cardStyle={{
              // flex: 1,
              marginTop: "4%",
              marginBottom: "4%",
              marginHorizontal: "8%",
            }}
            color={
              theme.dark
                ? Colors.light.colors.primaryColor
                : Colors.dark.colors.primaryColor
            }
            key={title + source.name}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "transparent",
                position: "relative",
                overflow: "visible",
              }}
            >
              <View
                style={[
                  styles.titleStyle,
                  { backgroundColor: theme.colors.primaryColor + 40 },
                ]}
              >
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              </View>
              <View style={styles.imageStyle}>
                <Image
                  source={{ uri: urlToImage }}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </View>
              <TouchableOpacity
                style={styles.linkStyle}
                onPress={() => Linking.openURL(url)}
              >
                <Text style={styles.linkTextStyle}>Link to full story</Text>
              </TouchableOpacity>

              <Description description={description} />
            </View>
          </CardContainer>
          {index === feeds.length - 1 && (
            <View style={{ marginBottom: "7.5%" }} />
          )}
        </>
      );
    },
    [feeds.length, theme.colors.primaryColor, theme.dark]
  );

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={feeds}
      keyExtractor={({ source, title }: any) => source.name + title}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: "4%",
    marginBottom: "4%",
  },
  titleStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff90",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    width: "100%",
  },
  title: {
    fontSize: 17,
    fontFamily: "space-mano-bold",
  },
  imageStyle: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#b1b1b1",
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    flex: 1,
    paddingVertical: "30%",
  },
  linkStyle: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
  },
  linkTextStyle: {
    color: "#039be5",
  },
});
