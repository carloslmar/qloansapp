import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  Button,
  SectionList,
  YellowBox,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Firebase from "firebase";
import ModalDropdown from "react-native-modal-dropdown";
import CompleteFlatList from "react-native-complete-flatlist";
//import DATA from "./customData.json";
import InfoScreen from "./Info";
import _ from "lodash";
import { SearchBar } from "react-native-elements";
//import BusinessList from "./BusinessList";

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => this.props.navigation.goBack()}
          tintColor="#FFFFFF"
        />
      ),
    });
    // console.log(CatName);
    return (
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#005a9c" },
        }}
      >
        <Stack.Screen
          name="Search Results"
          component={SearchResults}
          options={{
            title: "Search Results",
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
        <Stack.Screen name="Info" component={InfoScreen} />
      </Stack.Navigator>
    );
  }
}
class SearchResults extends Component {
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
      unique_b: [],
    };
  }

  componentDidMount() {
    const SearchTerm = this.props.route.params.SearchTerm;
    for (var i = 1; i <= 31; i++) {
      var query = Firebase.database()
        .ref("/BusinessList/" + i + "/data")
        .orderByChild("name")
        .startAt(SearchTerm)
        .endAt(SearchTerm + "\uf8ff");
      //console.log(query);

      //console.log("Sin Ciudad");
      query.on("value", (snapshot) => {
        snapshot.forEach((child) => {
          this.state.list.push({
            key: child.key,
            name: child.val().name,
            address: child.val().address,
            logo: child.val().logo,
            contact: child.val().contact,
            phone: child.val().phone,
            city: child.val().city,
            statezip: child.val().statezip,
          });
        });
        //Unique array goes here
        var unique = new Set(this.state.list);
        console.log(
          _.filter(this.state.list, { name: "A Plus Towing and Recovery LLC" })
        );
        this.setState({ unique_b: unique });
      });
    }
  }

  render() {
    YellowBox.ignoreWarnings(["Using an unspecified index."]);

    return (
      <SafeAreaView style={styles.container}>
        <CompleteFlatList
          searchKey={["name"]}
          highlightColor="yellow"
          searchBarBackgroundStyles={{ backgroundColor: "transparent" }}
          data={_.uniqBy(this.state.list, "name")}
          keyboardType="default"
          placeholder="Search for a business name..."
          ref={(c) => (this.completeFlatList = c)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          renderEmptyRow={() => (
            <Text style={styles.noData}>{"Nothing found."}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Info", {
                  screen: "Info",
                  title: "Info",
                  params: {
                    BusinessName: item.name,
                    Logo: item.logo,
                    Address: item.address,
                    Contact: item.contact,
                    Phone: item.phone,
                    City: item.city,
                    StateZip: item.statezip,
                  },
                })
              }
            >
              <View>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
