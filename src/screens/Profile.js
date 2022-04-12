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

function Profile() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          javaScriptEnabled={true}
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

export default Profile;
