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
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
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
import Firebase from "firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import firebaseConfig from "../api/config";
import SearchResults from "./SearchResults";
import { SearchBar } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import makes_and_models from "../api/makes_and_models.json";
import { Picker } from '@react-native-picker/picker';
import * as Notifications from "expo-notifications";
import { normalize, schema } from 'normalizr';


const db = SQLite.openDatabase("db.db");


class AddCar extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: makes_and_models,
      make: null,
      model: null,
      vin: null,
      year: null,
    };
  }

render() {
var Make = this.state.make;
var Model = this.state.model;
var Vin = this.state.vin;
var Year = this.state.year;
var Miles = this.state.miles;

const make = new schema.Entity('make');
const models = new schema.Entity('models');
const carSchema = new schema.Entity('cars', {
  make: make,
  model: [models]
});
const normalizedData = normalize(this.state.dataSource, carSchema);
console.log(normalizedData);

  function AddData() {
     Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got a notification",
        body: "Here is the notification body",
        data: { data: "goes here" },

      },
      trigger: {minute: 1},
    });
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO cars (make, model, vin, car_year, miles) values (?, ?, ?, ?, ?)', [Make, Model, Vin, Year, Miles],
      );
    },  error => {
      alert(error);
    },)
  }
  var a = this.state.dataSource.map((item, key)=>(  console.log(item.models)))
  console.log(a);
  return (

    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                <Picker
            selectedValue={this.state.make}
            onValueChange={(itemValue, itemIndex) => this.setState({make: itemValue})} >
 
            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.make_name} value={item.make_name} key={key} />)
            )}
          </Picker>
               <TextInput
                placeholder="Enter Vehicle Model"
                style={{ padding: 10 }}
                value={this.state.model}
                onChangeText={(model) => this.setState({ model })}
              ></TextInput>
               {!!this.state.nameError && (
          <Text style={{ color: "red" }}>{this.state.nameError}</Text>
        )}
              <TextInput
                placeholder="Enter Vehicle VIN (Optional)"
                style={{ padding: 10 }}
                value={this.state.vin}
                keyboardType="ascii-capable"
                onChangeText={(vin) => this.setState({ vin })}
              ></TextInput>
              <TextInput
                placeholder="Enter Vehicle Year"
                style={{ padding: 10 }}
                value={this.state.year}
                keyboardType="numeric"
                onChangeText={(year) => this.setState({ year })}
              ></TextInput>
              <TextInput
                placeholder="Enter Vehicle Miles"
                style={{ padding: 10 }}
                value={this.state.miles}
                keyboardType="numeric"
                onChangeText={(miles) => this.setState({ miles })}
              ></TextInput>
              <TouchableOpacity><Button onPress={() => {
            if (this.state.model == null) {
              this.setState(() => ({ nameError: "required." }));
            } else {
              this.setState(() => ({ nameError: null }));
              AddData();
            }
          }} title="Save">SAVE</Button></TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
    </SafeAreaView>
  );
}
}

export default AddCar;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});

