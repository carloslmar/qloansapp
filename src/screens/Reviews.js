import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import WebView from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

const Top = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    // console.log(CatName);
    return (
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#10213d" },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => this.props.navigation.goBack()}
              tintColor="#FFFFFF"
              label="Back"
            />
          ),
        }}
      >
        <Stack.Screen
          name="Reviews"
          component={Reviewnav}
          options={{
            title: "Reviews",
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
          }}
        />
      </Stack.Navigator>
    );
  }
}

class Reviewnav extends Component {
  render() {
    return (
      <Top.Navigator
        tabBarOptions={{
          showIcon: true,
          labelStyle: { fontSize: 12, color: "#FFFFFF" },
          style: { backgroundColor: "#10213d" },
        }}
      >
        <Top.Screen
          name="Google"
          component={Reviews}
          options={{
            title: "Google",
            tabBarIcon: () => (
              <Ionicons name="logo-google" size={25} color="#FFF" />
            ),
          }}
        />

        <Top.Screen
          name="BBB"
          component={BBB}
          options={{
            title: "BBB",
            tabBarIcon: () => (
              <Image
                resizeMode="stretch"
                source={require("../../assets/BBB-Logo.png")}
                style={{
                  flex: 0,
                  width: 25,
                  height: 30,
                }}
              />
            ),
          }}
        />
      </Top.Navigator>
    );
  }
}

function Reviews() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri:
              "https://www.google.com/search?q=quick+loans+nixa+review&rlz=1CDGOYI_enUS842US842&oq=quick+loans+nixa+review&aqs=chrome..69i57.6505j0j7&hl=en-US&sourceid=chrome-mobile&ie=UTF-8#lkt=LocalPoiReviews&trex=m_t:lcl_akp,rc_f:nav,rc_ludocids:18096855934619548304,rc_q:Quick%2520Loans,ru_q:Quick%2520Loans,trex_id:PxaqE",
          }}
          startInLoadingState={true}
        />
      </SafeAreaView>
    </View>
  );
}

function BBB() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri:
              "https://www.bbb.org:443/us/mo/nixa/profile/auto-financing/quick-loans-0734-21974/customer-reviews",
          }}
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
