import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  ImageBackground,
  Linking,
  SectionList,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Firebase from "firebase";
import firebaseConfig from "../api/config";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
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
          name="Offers"
          component={Offers}
          options={{
            title: "Special Deals",
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
class Offers extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000000",
          marginTop: "5%",
        }}
      />
    );
  };
  constructor() {
    super();
    this.getRemoteData();
    this.state = {
      offers: [],
    };
  }

  getRemoteData = () => {
    let ref = Firebase.database().ref("/Offers");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log("DATA RETRIEVED");
  };
  render() {
    const data = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.values(data)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={<Text>No Offers today</Text>}
          renderItem={({ item }) =>
            item.header && (
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <ImageBackground
                  style={styles.image}
                  source={require("../../assets/box.png")}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                    }}
                    source={{
                      uri: item.logo,
                    }}
                  ></Image>
                  <Text style={styles.headertext}>{item.header}</Text>
                  <Text style={styles.text}>{item.content}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default StackScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
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
  image: {
    flex: 1,
    marginTop: 20,
    width: "98%",
    height: 200,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: "center",
  },
  headertext: {
    color: "#10213d",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: "#005a9c",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
