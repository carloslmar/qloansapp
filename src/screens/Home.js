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
import Firebase from "firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ModalDropdown from "react-native-modal-dropdown";
import firebaseConfig from "../api/config";
import BusinessCat from "./BusinessCat";
import SearchResults from "./SearchResults";
import { SearchBar } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";

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
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
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
      <Stack.Screen name="Search Results" component={SearchResults} />
    </Stack.Navigator>
  );
}

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      showModal: false,
      search: "",
      cit: "All",
      citsel: "Select Your City",
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount() {
    Firebase.database()
      .ref("/Cities")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            id: child.key,
            name: child.val().cityname,
          });
        });
        this.setState({ list: li });
      });
  }
  render() {
    global.Ciudad = this.state.cit;
    const Cities = this.state.list;
    //console.log(Cities);
    return (
      <>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginBottom: 1,
          }}
        >
          <SearchBar
            placeholder="Search a business name..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            inputContainerStyle={{
              backgroundColor: "#10213d",
            }}
            containerStyle={{
              backgroundColor: "#10213d",
              width: "80%",
            }}
          />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Search Results", {
                screen: "Search Results",
                params: {
                  SearchTerm: this.state.search,
                },
              })
            }
            style={{
              width: "20%",
              backgroundColor: "#10213d",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                alignSelf: "center",
                paddingTop: "28%",
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/movinglogo.gif")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              width: "100%",
              height: 110,
              resizeMode: "stretch",
            }}
          />
        </View>
        <View style={{ flex: 0, flexDirection: "column", marginTop: 0 }}>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 0,
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            To find auto services, select your city:
          </Text>
          <Text> </Text>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              paddingStart: 10,
              paddingTop: 0,
              marginRight: 10,
            }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignContent: "center",
                marginBottom: 2,
              }}
            >
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
                    <Text style={styles.textStyle}>Cancel</Text>
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

              <FontAwesome5
                style={{
                  alignSelf: "flex-start",
                  marginTop: 0,
                  marginLeft: 5,
                  fontSize: 25,
                }}
                name="caret-down"
                size={16}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Services", {
                screen: "Services",
              })
            }
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Go to Auto Services</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:" + "(417) 725-5010")}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/bigcall.png")}
                style={{
                  flex: 0,
                  marginTop: 10,
                  width: 290,
                  height: 95,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://chat.socialintents.com/c/moquick")
              }
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/bigchat.png")}
                style={{
                  flex: 0,
                  width: 290,
                  height: 95,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://zoom.us/j/2113531968")}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/bigvideo.png")}
                style={{
                  flex: 0,
                  width: 290,
                  height: 95,
                }}
              />
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
