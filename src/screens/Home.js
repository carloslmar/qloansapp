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
import InfoScreen from "./Info";
import Firebase from "firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CompleteFlatList from "react-native-complete-flatlist";
import firebaseConfig from "../api/config";
import BusinessCat from "./BusinessCat";
<<<<<<< HEAD
=======
import SearchResults from "./SearchResults";
import { SearchBar } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";
>>>>>>> eaf0ea8cdab420ace7baf4d832c397c82a4bd21b

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    // console.log(CatName);
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
<<<<<<< HEAD
      >
        <Stack.Screen
          name="Auto Services"
          component={BusinessList}
          options={{
            title: "Auto Services",
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
        <Stack.Screen name="Business Category" component={BusinessCat} />
      </Stack.Navigator>
    );
  }
=======
      />
      <Stack.Screen name="Search Results" component={SearchResults} />
    </Stack.Navigator>
  );
>>>>>>> eaf0ea8cdab420ace7baf4d832c397c82a4bd21b
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
<<<<<<< HEAD
=======
      showModal: false,
      search: "",
      cit: "All",
      citsel: "Select Your City",
>>>>>>> eaf0ea8cdab420ace7baf4d832c397c82a4bd21b
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };

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
  }

  render() {
    return (
<<<<<<< HEAD
      <SafeAreaView style={styles.container}>
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
                      screen: "Business Categ",
                      params: {
                        BusinessCategory: item.key,
                        CatName: item.category,
                      },
                    })
                  }
=======
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
            source={require("../../assets/moving-logo-short.gif")}
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
>>>>>>> eaf0ea8cdab420ace7baf4d832c397c82a4bd21b
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
<<<<<<< HEAD
                  />
                </TouchableOpacity>
              </View>
            )
          }
          //Setting the number of column
        />
      </SafeAreaView>
=======
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
              onPress={() => Linking.openURL("https://moquickloans.com/chat/")}
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
              onPress={() =>
                Linking.openURL("https://videochat.moquickloans.com")
              }
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
>>>>>>> eaf0ea8cdab420ace7baf4d832c397c82a4bd21b
    );
  }
}

export default StackScreen;

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
