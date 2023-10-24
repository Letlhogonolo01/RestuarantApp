import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import RestaurantCard from "../components/RestaurantCard";

const Dashboard = ({ route }) => {
  const [name, setName] = useState("");
  const [addedRestaurants, setAddedRestaurants] = useState([]);
  const navigation = useNavigation();

  // Hard-coded array of restaurants
  const restaurants = [
    {
      name: "Restaurant 1",
      image: require("../../assets/Restaurant1.jpg"),
      description: "Delicious dishes in a cozy atmosphere.",
    },
    {
      name: "Restaurant 2",
      image: require("../../assets/Restaurant2.jpg"),
      description: "Exquisite cuisine with a modern twist.",
    },
    {
      name: "Restaurant 3",
      image: require("../../assets/Restaurant3.jpg"),
      description: "Exquisite cuisine with a modern twist.",
    },
  ];

  useEffect(() => {
    // Fetch added restaurants from Firebase
    const unsubscribe = firebase
      .firestore()
      .collection("restaurants")
      .onSnapshot((querySnapshot) => {
        const restaurants = [];
        querySnapshot.forEach((doc) => {
          restaurants.push({ id: doc.id, ...doc.data() });
        });
        setAddedRestaurants(restaurants);
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Hello, {name.firstName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.profileIcon}
        >
          <Image
            source={require("../../assets/profile-icon.png")}
            style={{ width: 30, height: 30, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Display hard-coded restaurants */}
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            name={restaurant.name}
            image={restaurant.image}
            description={restaurant.description}
            onViewDetails={() => {
              navigation.navigate("RestaurantDetails", { restaurant });
            }}
          />
        ))}

        {/* Display added restaurants from Firebase */}
        {addedRestaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            name={restaurant.name}
            image={{ uri: restaurant.imageUrl }}
            description={restaurant.description}
            onViewDetails={() => {
              navigation.navigate("RestaurantDetails", { restaurant });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileIcon: {
    backgroundColor: "#026efd",
    borderRadius: 50,
    padding: 8,
    margin: 5,
  },
});

export default Dashboard;
