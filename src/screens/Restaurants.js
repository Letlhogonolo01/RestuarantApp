// Restaurants.js

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const Restaurants = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantImage, setRestaurantImage] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");

  const handleAddRestaurant = () => {
    // Implement logic to add a restaurant to your data source (e.g., Firebase)
    console.log("Adding restaurant:", restaurantName, restaurantDescription);
    // Reset the input fields after adding the restaurant
    setRestaurantName("");
    setRestaurantImage("");
    setRestaurantDescription("");
  };

  const handleEditRestaurant = () => {
    // Implement logic to edit a restaurant in your data source (e.g., Firebase)
    console.log("Editing restaurant:", restaurantName, restaurantDescription);
    // Reset the input fields after editing the restaurant
    setRestaurantName("");
    setRestaurantImage("");
    setRestaurantDescription("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Restaurants Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurantName}
        onChangeText={(text) => setRestaurantName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Image"
        value={restaurantImage}
        onChan
        geText={(text) => setRestaurantImage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Description"
        value={restaurantDescription}
        onChan
        geText={(text) => setRestaurantDescription(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddRestaurant}>
        <Text style={styles.buttonText}>Add Restaurant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEditRestaurant}>
        <Text style={styles.buttonText}>Edit Restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#026efd",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Restaurants;
