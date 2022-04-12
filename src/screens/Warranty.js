import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Linking,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import WebView from "react-native-webview";

const Stack = createStackNavigator();

function Warranty() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <Text
          style={{
            marginTop: 2,
            fontSize: 20,
          }}
        >
          24/7 Roadside Assistance and Towing
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:" + "(888) 810-5150")}
        >
          <Text
            style={{
              marginTop: 2,
              color: "#00c1f0",
              textDecorationLine: "underline",
              fontSize: 25,
            }}
          >
            888.810.5150
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: 20,
            }}
          >
            Claims info/File a Claim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:" + "(801) 963-4653")}
        >
          <Text
            style={{
              marginTop: 2,
              color: "#00c1f0",
              textDecorationLine: "underline",
              fontSize: 25,
            }}
          >
            801.963.4653
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:" + "(833) 852-4653")}
        >
          <Text
            style={{
              marginTop: 2,
              color: "#00c1f0",
              textDecorationLine: "underline",
              fontSize: 25,
            }}
          >
            833.852.4653 (Toll Free)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://goldstandardautomotive.com/claims/")}
        >
          <Text
            style={{
              marginTop: 2,
              color: "#00c1f0",
              textDecorationLine: "underline",
              fontSize: 25,
            }}
          >
            File a claim online.
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 2,
            fontSize: 20,
          }}
        >
          Information about titling and registering a motor vehicle.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://aulcorp.com/claims/")}
        >
          <Text
            style={{
              marginTop: 2,
              color: "#00c1f0",
              textDecorationLine: "underline",
              fontSize: 25,
            }}
          >
            https://dor.mo.gov/motor-vehicle/titling-registration/
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default Warranty;
