import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, YellowBox, View, Image } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/Home";
import BusinessList from "./src/screens/BusinessList";
import { AppearanceProvider } from "react-native-appearance";
import Profile from "./src/screens/Profile";
import Reviews from "./src/screens/Reviews";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Offers from "./src/screens/Offers";
import InfoScreen from "./src/screens/Info";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
if (__DEV__) {
  import("./ReactotronConfig");
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
YellowBox.ignoreWarnings(["Setting a timer"]);
function MyTabs() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      global.tokenito = token;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#6badde",
      });
    }
    return token;
  }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          transitionConfig="fromLeft"
          inactiveColor="#a6a6a6"
          screenOptions={{ animationEnabled: true }}
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#b6b6b6",
            activeBackgroundColor: "#10213d",
            inactiveBackgroundColor: "#10213d",
            labelPosition: "below-icon",
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
                size = 26;
              } else if (route.name === "Login") {
                iconName = focused ? "ios-person" : "ios-person";
                size = 26;
              } else if (route.name === "Services") {
                iconName = focused ? "ios-list" : "ios-list";
                size = focused ? 25 : 26;
              } else if (route.name === "Coupons") {
                iconName = focused ? "ios-pricetag" : "ios-pricetag";
                size = 26;
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            animationEnabled: true,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarColor: "#10213d",
            }}
          />
          <Tab.Screen
            name="Login"
            component={Profile}
            options={{ tabBarColor: "#10213d" }}
          />
          <Tab.Screen
            name="Services"
            component={BusinessList}
            options={{
              tabBarColor: "#10213d",
            }}
          />
          <Tab.Screen
            name="Coupons"
            component={Offers}
            options={{ tabBarColor: "#10213d" }}
          />
          <Tab.Screen
            name="Reviews"
            component={Reviews}
            options={{
              tabBarColor: "#10213d",
              tabBarIcon: ({ focused }) => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/star.png")}
                  style={{
                    flex: 0,
                    width: 26,
                    height: 23,
                    opacity: focused ? 1 : 0.5,
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
export default MyTabs;
