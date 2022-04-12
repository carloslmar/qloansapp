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
import { FlatGrid } from "react-native-super-grid";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import engine from "../../assets/fonts/selection.json";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import WebView from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const icomoon_ttf = require("../../assets/fonts/icomoon.ttf");
const EngineIcon = createIconSetFromIcoMoon(engine, "", icomoon_ttf);

class Reviewnav extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Review"
          component={Navi}
          options={{
            headerShown: false,
            title: "Reviews",
            headerStyle: { backgroundColor: "#005a9c" },
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

        <Stack.Screen
          name="Google"
          component={Google}
          options={{
            headerShown: false,
            title: "Google",
            tabBarIcon: () => (
              <Ionicons name="logo-google" size={25} color="#FFF" />
            ),
          }}
        />

        <Stack.Screen
          name="BBB"
          component={BBB}
          options={{
            headerShown: false,
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
      </Stack.Navigator>
    );
  }
}

class Navi extends Component {
  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <SafeAreaView>
          <FlatGrid
            itemDimension={120}
            data={[
              {
                name: "Google",
                image: "google",
                screen: "Google",
                size: 80,
                paddingl: 40,
                paddingr: 40,
                paddingt: 20,
                paddingb: 20,
              },
              {
                name: "BBB",
                image: "bbb",
                screen: "BBB",
                size: 100,
                paddingl: 30,
                paddingr: 30,
                paddingt: 10,
                paddingb: 10,
              },
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
                      textAlign: "center",
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
      </View>
    );
  }
}

function Google() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: "https://www.google.com/search?q=quick+loans+nixa+review&rlz=1CDGOYI_enUS842US842&oq=quick+loans+nixa+review&aqs=chrome..69i57.6505j0j7&hl=en-US&sourceid=chrome-mobile&ie=UTF-8#lkt=LocalPoiReviews&trex=m_t:lcl_akp,rc_f:nav,rc_ludocids:18096855934619548304,rc_q:Quick%2520Loans,ru_q:Quick%2520Loans,trex_id:PxaqE",
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
            uri: "https://www.bbb.org:443/us/mo/nixa/profile/auto-financing/quick-loans-0734-21974/customer-reviews",
          }}
          startInLoadingState={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  icons: {
    alignSelf: "center",
  },
  itemName: {
    alignSelf: "center",
  },
});

export default Reviewnav;
