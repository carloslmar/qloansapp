import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React, { useState, useEffect, useRef, Component } from "react";
import { StyleSheet, Text, Button, View, Image } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import BusinessList from "./src/screens/BusinessList";
import Profile from "./src/screens/Profile";
import Reviews from "./src/screens/Reviews";
import Warranty from "./src/screens/Warranty";
import BusinessCat from "./src/screens/BusinessCat";
import Aul from "./src/screens/aul";
import Offers from "./src/screens/Offers";
import InfoScreen from "./src/screens/Info";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LogBox, SafeAreaView } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { registerRootComponent, AppLoading } from "expo";
import * as Font from "expo-font";
import { FlatGrid } from "react-native-super-grid";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import engine from "./assets/fonts/selection.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import CarList from "./src/screens/CarList";
import RegisterCar from "./src/screens/AddCar";
if (__DEV__) {
  import("./ReactotronConfig");
}

const Stack = createStackNavigator();
const icomoon_ttf = require("./assets/fonts/icomoon.ttf");
const EngineIcon = createIconSetFromIcoMoon(engine, "", icomoon_ttf);

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  ])
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
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


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              title: "Home",
              headerTitleStyle: {
                color: 'white'
              },
              headerStyle: { backgroundColor: "#005a9c", },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Profile",
              headerStyle: { backgroundColor: "#005a9c" },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Auto Services"
            component={BusinessList}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Auto Services",
              headerStyle: { backgroundColor: "#005a9c" },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Offers"
            component={Offers}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Offers",
              headerStyle: { backgroundColor: "#005a9c" },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Reviews",
              headerStyle: { backgroundColor: "#005a9c" },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Resources"
            component={Warranty}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Resources",
              headerStyle: { backgroundColor: "#005a9c" },
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Business Category"
            component={BusinessCat}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Business Category",
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Add Car"
            component={RegisterCar}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Vehicles",
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
            <Stack.Screen
            name="Car List"
            component={CarList}
            options={{
              headerTitleStyle: {
                color: 'white'
              },
              title: "Vehicles",
              headerRight: () => (
                <Image
                  resizeMode="stretch"
                  source={require("./assets/logowhite.png")}
                  style={{
                    flex: 0,
                    width: 100,
                    marginRight: 10,
                    height: 20,
                  }}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

class Start extends Component {
  render() {
    return (
      <SafeAreaView>
        <FlatGrid
          itemDimension={120}
          data={[
            {
              name: "Profile",
              image: "user",
              screen: "Profile",
              size: 80,
              paddingl: 40,
              paddingr: 40,
              paddingt: 20,
              paddingb: 20,
            },
            {
              name: "Auto Services",
              image: "wrench",
              screen: "Auto Services",
              size: 80,
              paddingl: 30,
              paddingr: 30,
              paddingt: 20,
              paddingb: 20,
            },
            {
              name: "Reviews",
              image: "star",
              screen: "Reviews",
              size: 80,
              paddingl: 30,
              paddingr: 30,
              paddingt: 20,
              paddingb: 20,
            },
            {
              name: "Resources",
              image: "folder-open",
              screen: "Resources",
              size: 60,
              paddingl: 35,
              paddingr: 35,
              paddingt: 30,
              paddingb: 30,
            },
       
            {
              name: "Offers",
              image: "tag",
              screen: "Offers",
              size: 80,
              paddingl: 32,
              paddingr: 32,
              paddingt: 20,
              paddingb: 20,
            },
            /*{
              name: "Vehicle Maint.",
              image: "engine",
              screen: "Car List",
              size: 80,
              paddingl: 32,
              paddingr: 32,
              paddingt: 20,
              paddingb: 20,
            },*/
          ]}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(item.screen, {
                    screen: item.screen,
                  })
                }
              >
                <EngineIcon
                  type="FontAwesome5"
                  size={item.size}
                  color={"#1A70C7"}
                  style={{
                    backgroundColor: "#efefef",
                    borderColor: "#1A70C7",
                    alignSelf: "center",
                    borderWidth: 3,
                    borderRadius: 13,
                    paddingLeft: item.paddingl,
                    paddingRight: item.paddingr,
                    paddingTop: item.paddingt,
                    paddingBottom: item.paddingb,
                  }}
                  name={item.image}
                />
                <Text style={styles.itemName}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 0,
    width: "100%",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 100,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    marginVertical: 8,
  },
  header: {
    fontSize: 16,
    backgroundColor: "#005a9c",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 12,
  },
  itemName: {
    alignSelf: "center",
  },
  icons: {
    alignSelf: "center",
  },
  openButton: {
    backgroundColor: "#10213d",
  },

  textStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
  },
});