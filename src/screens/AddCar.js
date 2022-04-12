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


function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();
export default function AddCar() {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cars (id integer primary key not null, make text);"
      );
    });
  }, []);

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <TextInput
                placeholder="Enter Vehicle Make"
                style={{ padding: 10 }}
              />
              <TouchableOpacity><Button title="Save" onPress={ db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO cars (id, make) values (?, ?)', [5, 'asd'],
      );
      console.log("Saved");
    })} /></TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

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

