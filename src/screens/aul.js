import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  Modal,
  SafeAreaView,
  Linking,
  StatusBar,
  Picker,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon, Right, StyleProvider } from "native-base";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
/*import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ModalDropdown from "react-native-modal-dropdown";
import firebaseConfig from "../api/config";
import BusinessCat from "./BusinessCat";
import SearchResults from "./SearchResults";
import { SearchBar } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";*/

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      barStyle={{ backgroundColor: "#FFFFFF" }}
      headerMode="screen"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#10213d" },
      }}
    >
      <Stack.Screen
        name="Aul"
        component={Aul}
        options={{
          title: "Aul",
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

class Aul extends Component {
  render() {
    return (
      <>
        <View
          style={{
            flex: 0,
            alignContent: "center",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/aul3.png")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              marginLeft: 10,
              width: "70%",
              height: 110,
              resizeMode: "stretch",
            }}
          />
        </View>

        <View
          style={{
            flex: 0,
            flexDirection: "column",
            marginLeft: 10,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View>
            <Text>Claims</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:" + "(888) 285-2567")}
            >
              <Text style={{ color: "#2e9cff" }}>(888) 285-2567</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Roadside/Towing</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:" + "(888) 810-5150")}
            >
              <Text style={{ color: "#2e9cff" }}>(888) 810-5150</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 12,
    alignItems: "baseline",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    flex: 0,
    alignContent: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#095797",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default StackScreen;
