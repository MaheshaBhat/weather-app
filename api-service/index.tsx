import { LocationObject } from "expo-location";
import * as SecureStore from "expo-secure-store";
import {API_KEY, FEED_API_KEY} from "@env";

export const getWeatherData = ({ coords }: LocationObject) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  return fetch(url)
    .then((d) => d.json())
    .then(({ main, visibility }) => {
      return {
        humidity: main.humidity,
        uvIndex: 0,
        pressure: main.pressure,
        visibility,
      };
    })
    .catch((err) => {
      throw err;
    });
};

export const getUVData = ({ coords }: LocationObject) => {
  const url = `http://api.openweathermap.org/data/2.5/uvi?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  return fetch(url)
    .then((d) => d.json())
    .then(({ value }) => {
      return value;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFeeds = () => {
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${FEED_API_KEY}`;
  return fetch(url)
    .then((d) => d.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}
