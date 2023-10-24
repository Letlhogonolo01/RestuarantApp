import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { db } from "../../config";

const EditRestaurant = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState({
    imageUrl: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the existing restaurant details based on the restaurantId
    const fetchRestaurantDetails = async () => {
      try {
        const restaurantRef = await db
          .collection("restaurants")
          .doc(restaurantId)
          .get();
        if (restaurantRef.exists) {
          const data = restaurantRef.data();
          setRestaurant(data);
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        // Handle error or show an alert
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const handleSave = async () => {
    try {
      // Update the restaurant details in Firestore
      await db.collection("restaurants").doc(restaurantId).update({
        imageUrl: restaurant.imageUrl,
        name: restaurant.name,
        description: restaurant.description,
      });

      // Navigate back to the Restaurants screen
      navigation.navigate("Restaurants");
    } catch (error) {
      console.error("Error updating restaurant details:", error);
      // Handle error or show an alert
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Restaurant</Text>
      <Image
        source={{
          uri: restaurant.imageUrl,
        }}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurant.name}
        onChangeText={(text) => setRestaurant({ ...restaurant, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Description"
        value={restaurant.description}
        onChangeText={(text) =>
          setRestaurant({ ...restaurant, description: text })
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default EditRestaurant;
