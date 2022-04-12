import React, { useState, useEffect, useRef, Component } from "react";
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
  Navigation,
  TextInput,
  ScrollView,
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import firebaseConfig from "../api/config";
import SearchResults from "./SearchResults";
import * as Notifications from "expo-notifications";
import { SearchBar } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";
import * as Permissions from "expo-permissions";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";

class StackScreen extends Component {
  render() {
    this.props.navigation.setOptions({
      headerShown: false,
    });
    return (
      <Stack.Navigator
        headerMode="screen"
        initial
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#005a9c" },
        }}
      >
        <Stack.Screen
          name="Add Car"
          component={InfoScreen}
          options={{ title: "Add Vehicle" }}
        />
      </Stack.Navigator>
    );
  }
}


const db = SQLite.openDatabase("db.db");

class CarList extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM cars', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ list: _array }),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }

  render() {

console.log(this.state.list);
    return (
      <SafeAreaView style={styles.container}>
                <TouchableOpacity><Button title="Add Vehicle" onPress={() =>
                this.props.navigation.navigate("Add Car", {
                  screen: "Add Car",
                  title: "Add Vehicle",
                })
              } /></TouchableOpacity>

        <CompleteFlatList
          data={this.state.list}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          renderEmptyRow={() => (
            <Text style={styles.noData}>
              {"Nothing here"}
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Add Car", {
                  screen: "Add Car",
                  title: "Add Vehicle",
                })
              }
            >
              <View>
                <Text style={{ fontSize: 20 }}>{item.make}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </SafeAreaView>
    );
  }
}

export default CarList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 1,
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
});
