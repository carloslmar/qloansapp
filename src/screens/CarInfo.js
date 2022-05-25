import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StatusBar,
  Linking,
  Image,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Right,
  Left,
  Body,
} from "native-base";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { color } from "react-native-reanimated";
import { render } from "react-dom";

const Stack = createStackNavigator();

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
          name="Information"
          component={InfoScreen}
          options={{ title: "Info" }}
        />
      </Stack.Navigator>
    );
  }
}

function InfoScreen({ route, navigation }) {
  const CarMake =
    route.params?.Make ??
    "Something went wrong! Databse connection not established.";
  const Logo =
    route.params?.Logo ??
    "https://firebasestorage.googleapis.com/v0/b/ql-mobile-app-3a52a.appspot.com/o/placeholder%20(1).gif?alt=media&token=e32c651d-a98f-4e56-aac9-e9a77c24dfd9";
  const Address = route.params?.Address ?? "No Address!";
  const Phone = route.params?.Phone ?? "None";
  const Contact = route.params?.Contact ?? "Representative";
  const City = route.params?.City ?? "City";
  const StateZip = route.params.StateZip ?? "zip";
  return (
    <View style={styles.container}>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                {BusinessName}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image
              resizeMode="stretch"
              style={{ height: 200, width: "100%", flex: 0 }}
              source={{
                uri: Logo,
              }}
            />
            <Text style={{ fontWeight: "bold" }}>Address:</Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  Platform.OS === "ios"
                    ? "http://maps.apple.com/?daddr=" + Address + "+" + City
                    : "https://www.google.com/maps/dir/?api=1&origin&destination=" +
                        Address +
                        "+" +
                        City
                )
              }
            >
              {Address}, {City},{StateZip}
              <Text> </Text>
              <FontAwesome5 name="map-marker-alt" size={25} color="red" />
            </Text>
            <Text></Text>
            <Text style={{ fontWeight: "bold" }}>Contact:</Text>
            <Text
              style={{
                fontStyle: "italic",
                fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
              }}
            >
              {Contact}
            </Text>
            <Text></Text>
            <Text style={{ fontWeight: "bold" }}>Phone:</Text>
            <Text
              style={{ color: "#000fff" }}
              onPress={() => Linking.openURL("tel:" + Phone)}
            >
              {Phone}
            </Text>
          </Body>
        </CardItem>

        <CardItem>
          <Right>
            <Button transparent textStyle={{ color: "#87838B" }}>
              <Icon name="ios-arrow-back" />
              <Text onPress={() => navigation.goBack()}> Go back</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
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
