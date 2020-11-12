import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import WebView from "react-native-webview";

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#10213d" },
        }}
      >
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerRight: () => (
              <Image
                resizeMode="stretch"
                source={require("../../assets/logowhite.png")}
                style={{
                  flex: 0,
                  width: 100,
                  marginRight: 10,
                  height: 20,
                }}
              />
            ),
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => this.props.navigation.goBack()}
                tintColor="#FFFFFF"
                label="Back"
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

function injectjs() {
  let jsCode = alert("Hi, this is your cookie!");
  return jsCode;
}
function Profile() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          javaScriptEnabled={true}
          //injectedJavaScript={injectjs()}
          source={{ uri: "https://secure.moquickloans.com/" }}
          startInLoadingState={true}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default StackScreen;
