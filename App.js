import { StatusBar } from "expo-status-bar";
import React from "react";
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
import Offers from "./src/screens/Offers";
import InfoScreen from "./src/screens/Info";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
if (__DEV__) {
  import("./ReactotronConfig");
}

const Tab = createBottomTabNavigator();
YellowBox.ignoreWarnings(["Setting a timer"]);
function MyTabs() {
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
