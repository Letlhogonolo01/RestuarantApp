import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import ViewBookings from "./ViewBookings";

const RestaurantOwner = () => {
  const navigation = useNavigation();

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  const navigateToViewBookings = () => {
    navigation.navigate("ViewBookings");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        RestaurantOwner
      </Text>
      <TouchableOpacity>
        <Text>Restaurant Management</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToViewBookings}>
        <Text>View Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Booking Statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Confirm Arrivals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    height: 40,
    width: 170,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default RestaurantOwner;
