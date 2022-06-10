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
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Firebase from "firebase";
import ModalDropdown from "react-native-modal-dropdown";
import CompleteFlatList from "react-native-complete-flatlist";
//import DATA from "./customData.json";

//import BusinessList from "./BusinessList";

const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    const CatName = this.props.route.params.CatName;
    this.props.navigation.setOptions({ headerTitle: CatName });

    /*this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => this.props.navigation.goBack()}
          tintColor="#FFFFFF"
        />
      ),
    });*/
    console.log(global.Ciudad);
    return (
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#005a9c" },
        }}
      >
        <Stack.Screen name="Business Categ" component={BusinessCat} />
      </Stack.Navigator>
    );
  }
}
class BusinessCat extends Component {
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
    //Move stack line to here.
    const CatName = this.props.route.params.CatName;
    this.props.navigation.setOptions({ headerTitle: CatName });
    const BusinessCategory = this.props.route.params.BusinessCategory;
    console.log(BusinessCategory);
    if (Ciudad == "All") {
      var query = Firebase.database()
        .ref("/BusinessList/" + BusinessCategory + "/data")
        .orderByChild("city");
      //console.log("Sin Ciudad");
    } else {
      var query = Firebase.database()
        .ref("/BusinessList/" + BusinessCategory + "/data")
        .orderByChild("city")
        .equalTo(Ciudad);
      //console.log("Con ciudad");
    }
    query.on("value", (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
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
      this.setState({ list: li });
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CompleteFlatList
          searchKey={["name"]}
          highlightColor="yellow"
          searchBarBackgroundStyles={{ backgroundColor: "transparent" }}
          data={this.state.list.sort((a, b) => a.name.localeCompare(b.name))}
          keyboardType="default"
          placeholder="Search for a business name..."
          ref={(c) => (this.completeFlatList = c)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item + index}
          renderEmptyRow={() => (
            <Text style={styles.noData}>
              {"No Businesses in your area for this category."}
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Information", {
                  screen: "Information",
                  title: item.name,
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

export default BusinessCat;

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
