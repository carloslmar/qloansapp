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
  ImageBackground,
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
import CarInfoScreen from "CarInfo";

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
          <Stack.Screen
          name="CarInfo"
          component={CarInfoScreen}
          options={{ title: "Car Info" }}
        />
      </Stack.Navigator>
    );
  }
}


const db = SQLite.openDatabase("db.db");
const image = { uri: "data:image/jpeg;base64,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" };

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
    db.transaction(tx => { tx.executeSql('create table cars (id integer primary key not null, make text, model text, car_year integer, vin text, miles integer, oil_done integer, wheel_done integer, eaf_done integer, caf_done integer, windw_done integer, tflu_done integer, rad_done integer, brakef_done integer, spark_done integer, fbrake_done integer, rbrake_done integer, pef_done integer, tbelt_done integer, bat_done integer, state_done integer);');},
    ),
    error => {
      alert(error);
    },
    db.transaction(tx => {
      tx.executeSql('select * from cars', [], (_, { rows }) => {
        this.setState({ list: rows })
      });
    },
      error => {w
        console.log(error);
      },
      () => console.log(this.state.list._array)
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
                <TouchableOpacity><Button title="Add Vehicle" onPress={() =>
                this.props.navigation.navigate("Add Car", {
                  screen: "Add Car",
                  title: "Add Vehicle",
                })
              } /></TouchableOpacity>

        <CompleteFlatList
          data={this.state.list._array}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          renderEmptyRow={() => (
            <Text style={styles.noData}>
              {"Nothing here"}
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate("Car Info", {
                screen: "Car Info",
                Vid: item.id,
                Bat_done: item.bat_done,
                Brakef_done: item.brakef_done,
                Caf_done: item.caf_done,
                Car_year: item.car_year,
                Eaf_done: item.eaf_done,
                Fbrake_done: item.fbrake_done,
                Make: item.make,
                Miles: item.miles,
                Model: item.model, 
                Oil_done: item.oil_done, 
                Pef_done: item.pef_done, 
                Rad_done: item.rad_done, 
                Rbrake_done: item.rbrake_done,
                Spark_done: item.spark_done, 
                State_done: item.state_done, 
                Tbelt_done: item.tbelt_done, 
                Tflu_done: item.tflu_done,
                Vin: item.vin, 
                Wheel_done: item.wheel_done, 
                Windw_done: item.windw_done, 
              })
            }>
              <View style={{
                marginTop: 15,
                marginBottom: 15,
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "#ffffff",
                borderWidth: 2,
                borderRadius: 25,
                width:"70%",
                alignItems:"center",
                alignSelf: "center",
              }}>
                <ImageBackground source={image}   imageStyle={{opacity:0.2, borderRadius: 25}} style={styles.image}>
                <Text style={{ fontSize: 20, color: "black", alignSelf: "center", }}>{item.make} {item.model}</Text>
                <Text style={{ fontSize: 20, color: "black", alignSelf: "center", }}>Year: {item.car_year}</Text>
                <Text style={{ fontSize: 20, color: "black", alignSelf: "center", }}>Miles: {item.miles}</Text>
                </ImageBackground>
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: null,
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
