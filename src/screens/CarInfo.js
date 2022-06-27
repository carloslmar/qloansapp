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
          name="CarInfo"
          component={CarInfoScreen}
          options={{ title: "Car Info" }}
        />
      </Stack.Navigator>
    );
  }
}

function CarInfoScreen({ route, navigation }) {
  const Vid= route.params?.id;
  const Bat_done= route.params?.bat_done;
  const Brakef_done= route.params?.brakef_done;
  const Caf_done= route.params?.caf_done;
  const Car_year= route.params?.car_year;
  const Eaf_done= route.params?.eaf_done;
  const Fbrake_done= route.params?.fbrake_done;
  const Make= route.params?.make;
  const Miles= route.params?.miles;
  const Model= route.params?.model; 
  const Oil_done= route.params?.oil_done; 
  const Pef_done= route.params?.pef_done; 
  const Rad_done= route.params?.rad_done; 
  const Rbrake_done= route.params?.rbrake_done;
  const Spark_done= route.params?.spark_done; 
  const State_done= route.params?.state_done; 
  const Tbelt_done= route.params?.tbelt_done; 
  const Tflu_done= route.params?.tflu_done;
  const Vin= route.params?.vin; 
  const Wheel_done= route.params?.wheel_done; 
  const Windw_done= route.params?.windw_done; 
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
