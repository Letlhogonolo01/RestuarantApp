import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase, db } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

const Restaurants = ({ navigation }) => {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedRestaurants, setAddedRestaurants] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage when the component mounts
    loadRestaurants();
  }, []);

  const saveRestaurants = async (restaurants) => {
    try {
      const jsonValue = JSON.stringify(restaurants);
      await AsyncStorage.setItem("addedRestaurants", jsonValue);
    } catch (e) {
      console.error("Error saving data to AsyncStorage:", e);
    }
  };

  const loadRestaurants = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("addedRestaurants");
      if (jsonValue !== null) {
        setAddedRestaurants(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error loading data from AsyncStorage:", e);
    }
  };

  const handleAddRestaurant = async () => {
    try {
      if (!restaurantImage || !restaurantName || !restaurantDescription) {
        // Show an alert if any of the required fields is empty
        Alert.alert("Incomplete Information", "Please fill in all fields.");
        return;
      }

      setLoading(true);

      // Upload the image to Firebase Storage
      const imageUri = await uploadImage();

      // Add restaurant details to Firestore
      await db.collection("restaurants").add({
        imageUrl: imageUri,
        name: restaurantName,
        description: restaurantDescription,
      });

      console.log("Restaurant added successfully!");

      // Fetch the updated list of restaurants from Firestore
      const restaurantsSnapshot = await db.collection("restaurants").get();
      const updatedRestaurants = restaurantsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Save the updated list to AsyncStorage
      saveRestaurants(updatedRestaurants);

      // Update the state with the latest data
      setAddedRestaurants(updatedRestaurants);

      // Reset the input fields after adding the restaurant
      setRestaurantImage(null);
      setRestaurantName("");
      setRestaurantDescription("");

      // Pass the updated restaurants to Dashboard
      navigation.navigate("Dashboard", {
        addedRestaurants: updatedRestaurants,
      });
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Error adding restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    try {
      if (!restaurantImage) return null;

      let imageUrl = null;

      if (restaurantImage.startsWith("file://")) {
        // If it's a local file URI, use XMLHttpRequest to upload the image
        const response = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr);
          };
          xhr.onerror = function (error) {
            reject(error);
          };
          xhr.open("GET", restaurantImage, true);
          xhr.responseType = "blob";
          xhr.send();
        });

        const blob = response.response;

        // Generate a unique image name
        const imageName = `${new Date().getTime()}.jpg`;

        // Upload the Blob to Firebase Storage
        const ref = firebase.storage().ref().child(`images/${imageName}`);
        await ref.put(blob);

        // Get the download URL of the uploaded image
        imageUrl = await ref.getDownloadURL();
      } else {
        // If it's a remote URL, use it directly
        imageUrl = restaurantImage;
      }

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setRestaurantImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const deleteRestaurant = async (restaurantId, restaurantName) => {
    try {
      // Show an alert to confirm deletion
      Alert.alert(
        "Delete Restaurant",
        `Are you sure you want to delete ${restaurantName}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              // Delete the restaurant from Firestore
              await db.collection("restaurants").doc(restaurantId).delete();

              // Remove the restaurant from the state
              const updatedRestaurants = addedRestaurants.filter(
                (restaurant) => restaurant.id !== restaurantId
              );

              // Save the updated list to AsyncStorage
              saveRestaurants(updatedRestaurants);

              // Update the state
              setAddedRestaurants(updatedRestaurants);
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Error deleting restaurant. Please try again.");
    }
  };

  const editRestaurant = (restaurantId) => {
    // Navigate to the edit screen with the restaurant ID
    navigation.navigate("EditRestaurant", { restaurantId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Restaurants Management</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {restaurantImage && (
        <Image source={{ uri: restaurantImage }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurantName}
        onChangeText={(text) => setRestaurantName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Description"
        value={restaurantDescription}
        onChangeText={(text) => setRestaurantDescription(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddRestaurant}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding Restaurant..." : "Add Restaurant"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Display added restaurants:</Text>
      <ScrollView>
        {addedRestaurants.map((restaurant, index) => (
          <View key={index} style={styles.restaurantCard}>
            <Image
              source={{ uri: restaurant.imageUrl }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>{restaurant.name}</Text>
            <Text style={styles.cardDescription}>{restaurant.description}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteRestaurant(restaurant.id, restaurant.name)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editRestaurant(restaurant.id)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  restaurantCard: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Restaurants;
