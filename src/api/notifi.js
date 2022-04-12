import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React, { useState, useEffect, useRef, Component } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

async function registerForPushNotificationsAsync() {
  MyNotifications();
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    var NotiToken = token;
    var DevId = Constants.deviceName;

    InsertDataToServer = () => {
      fetch("https://moquickloans.com/pnoti/submit_user_info.php", {
        method: "POST",
        headers: {
          Accept: "text/plain, application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ExToken: NotiToken,
          DeviceId: DevId,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          console.log(responseJson);
        })
        .catch((error) => {
          console.log("Error or Existing record");
        });
    };
    InsertDataToServer();
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

function MyNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        var NotiToken = response;
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
