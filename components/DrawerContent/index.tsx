import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { StackActions, useNavigation } from "@react-navigation/native";

import { View, Text } from "../Themed";
import { AppContext, contextType } from "../../context";
import { save } from "../../api-service";
import DP from "../DP";
import TouchIcon from "../TouchIcon";

export default function DrawerContent(Props: any) {
  const {
    setImage,
    theme,
    userName,
    setThemeType,
    setUsername,
    image,
  } = useContext<contextType>(AppContext);
  const [name, setName] = useState<string>(userName);
  const [type, setType] = useState<boolean>(false);
  const [isSave, setSave] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Home");
  const [localImage, setLocalImage] = useState(image);
  const navigation = useNavigation();

  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  const getPermission = useCallback(async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return false;
      }
      return true;
    }
  }, []);

  const pickImage = useCallback(async () => {
    const perm = await getPermission();
    if (!perm) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLocalImage(result.uri);
      setSave(true);
    }
  }, [getPermission]);

  const saveImage = useCallback(async () => {
    try {
      if (!localImage) {
        await save("user-image", "");
        setImage("");
        setSave(false);
        return;
      }
      await FileSystem.copyAsync({
        from: localImage,
        to: `${FileSystem.documentDirectory}username.png`,
      });
      const res = await FileSystem.getInfoAsync(localImage);
      await save("user-image", res.uri);
      setImage(res.uri);
      // setLocalImage(res.uri);
      setSave(false);
    } catch (e) {
      // console.log(e);
    }
  }, [localImage, setImage]);

  const deleteImage = useCallback(async () => {
    setLocalImage("");
    setSave(true);
  }, []);

  const saveUsername = useCallback(async () => {
    try {
      if (type) {
        await save("userName", name);
        setUsername(name);
      }
      setType((t) => !t);
    } catch (ex) {
      // console.log(ex);
    }
  }, [name, setUsername, type]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <>
          <View style={styles.headerContainer}>
            <View style={styles.dpContainer}>
              <TouchIcon
                onPress={deleteImage}
                touchStyle={{ width: "20%" }}
                name={"trash"}
                size={20}
                color={theme.colors.primaryColor}
              />
              <DP
                color={theme.colors.primaryColor}
                onPress={pickImage}
                image={localImage}
                dpStyle={{ margin: "2%" }}
              />
              <TouchIcon
                onPress={saveImage}
                touchStyle={{ width: "20%", paddingLeft: "10%" }}
                name={isSave ? "save" : "pencil"}
                size={20}
                color={theme.colors.primaryColor}
              />
            </View>
            <View style={styles.TextInputStyle}>
              {type ? (
                <TextInput
                  style={[styles.TextInput, { color: theme.colors.text }]}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              ) : (
                <Text numberOfLines={1}>
                  {userName || "Please Enter your name"}
                </Text>
              )}
              <TouchIcon
                onPress={saveUsername}
                touchStyle={{ width: "20%", paddingLeft: 5 }}
                name={type ? "save" : "pencil"}
                size={20}
                color={theme.colors.primaryColor}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                setActive("Home");
                navigation.navigate("Home");
              }}
            >
              <Text
                style={{
                  color: active === "Home" ? theme.colors.primaryColor : "grey",
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                setActive("Browse");
                navigation.dispatch(StackActions.push("Browse"));
              }}
            >
              <Text
                style={{
                  color:
                    active === "Browse" ? theme.colors.primaryColor : "grey",
                }}
              >
                Browse
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                setActive("Theme");
                setThemeType(theme.dark ? "light" : "dark");
              }}
            >
              <Text
                style={{
                  color:
                    active === "Theme" ? theme.colors.primaryColor : "grey",
                }}
              >
                Change Theme
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    alignItems: "center",
  },
  TextInput: {
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    // marginBottom: "10%",
  },
  TextInputStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
  },
  btnStyle: {
    paddingVertical: "4%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "2%",
  },
  dpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
