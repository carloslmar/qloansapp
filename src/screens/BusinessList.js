import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Text,
  Modal,
  SectionList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { Container, Header, Content, Accordion } from "native-base";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
// import DATA from "./customData.json";
import Firebase from "firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CompleteFlatList from "react-native-complete-flatlist";
import firebaseConfig from "../api/config";
import BusinessCat from "./BusinessCat";

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    // console.log(CatName);
    return (
      <NavigationContainer
      independent="true">
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#10213d" },
        }}
      >
        <Stack.Screen
          name="Auto Service"
          component={BusinessList}
          options={{
            title: "Auto Services",
            headerShown: false,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => this.props.navigation.goBack()}
                tintColor="#FFFFFF"
                label="Back"
              />
            ),
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
          name="Business Category"
          component={BusinessCat}
          options={{
            title: "Business Category",
            headerShown: true,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => this.props.navigation.goBack()}
                tintColor="#FFFFFF"
                label="Back"
              />
            ),
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
          name="Info"
          component={InfoScreen}
          options={{
            title: "Business Info",
            headerShown: false,
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
      </NavigationContainer>
    );
  }
}

class BusinessList extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  };
  constructor() {
    super();
    this.state = {
      list: [],
      citlist: [],
      showModal: false,
      cit: "All",
      citsel: "Touch here to Select Your City",
    };
  }

  componentDidMount() {
    Firebase.database()
      .ref("/BusinessList")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            category: child.val().title,
            icon: child.val().icon,
            image: child.val().image,
          });
        });
        this.setState({ list: li });
      });

    Firebase.database()
      .ref("/Cities")
      .on("value", (snapshot) => {
        var lic = [];
        snapshot.forEach((child) => {
          lic.push({
            id: child.key,
            name: child.val().cityname,
          });
        });
        this.setState({ citlist: lic });
      });
  }

  render() {
    global.Ciudad = this.state.cit;
    const Cities = this.state.citlist;
    console.log(Cities);
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showModal}
        >
          <View
            style={{
              margin: 50,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 30,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 20,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 9.84,
              elevation: 5,
            }}
          >
            <SafeAreaView>
              <CompleteFlatList
                searchKey={["name"]}
                searchBarBackgroundStyles={{
                  backgroundColor: "transparent",
                  width: 270,
                  borderRadius: 25,
                  borderWidth: 2,
                  height: 50,
                }}
                showSearch={true}
                data={Cities}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => item + index}
                ListEmptyComponent={<Text>Nothing to see</Text>}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "white",
                      paddingBottom: 12,
                    }}
                    forceInset={{ top: "never" }}
                    onPress={() =>
                      this.setState({
                        cit: item.name,
                        showModal: false,
                        citsel: item.name,
                      })
                    }
                  >
                    <View>
                      <Text style={{ fontSize: 26 }}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </SafeAreaView>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
              }}
              onPress={() => {
                this.setState({
                  showModal: false,
                });
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            this.setState({
              showModal: true,
            });
          }}
        >
          <Text style={styles.textStyle}>{this.state.citsel}</Text>
        </TouchableOpacity>
        <CompleteFlatList
          showSearch={true}
          searchKey={["category"]}
          data={this.state.list}
          numColumns={2}
          initialNumToRender={1}
          placeholder="Search for a category name..."
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={<Text>Nothing found</Text>}
          renderItem={({ item }) =>
            item.key && (
              <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                <TouchableOpacity
                  style={{ flex: 1, padding: 0, alignSelf: "center" }}
                  forceInset={{ top: "never" }}
                  onPress={() =>
                    this.props.navigation.navigate("Business Category", {
                      screen: "Business Category",
                      BusinessCategory: item.key,
                      CatName: item.category,
                    })
                  }
                >
                  <Image
                    style={{
                      height: Dimensions.get("window").height / 4,
                      width: Dimensions.get("window").width / 2.03,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri:
                        item.image ??
                        "https://firebasestorage.googleapis.com/v0/b/ql-mobile-app-3a52a.appspot.com/o/placeholder%20(1).gif?alt=media&token=e32c651d-a98f-4e56-aac9-e9a77c24dfd9",
                    }}
                  />
                </TouchableOpacity>
              </View>
            )
          }
          //Setting the number of column
        />
      </SafeAreaView>
    );
  }
}

export default BusinessList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 0,
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

  openButton: {
    backgroundColor: "#10213d",
  },

  textStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
  },
});
