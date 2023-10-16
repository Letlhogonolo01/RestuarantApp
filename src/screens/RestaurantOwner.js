import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

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

  const navigateToBookingStats = () => {
    navigation.navigate("BookingStats");
  };

  const navigateToRestaurants = () => {
    navigation.navigate("Restaurants");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Admin Dashboard
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={navigateToRestaurants}>
        <Text style={styles.buttonText}>Restaurant Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToViewBookings}>
        <Text style={styles.buttonText}>View Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToBookingStats}>
        <Text style={styles.buttonText}>Booking Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          Sign out
        </Text>
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
    width: "100%",
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  signOutButton: {
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
