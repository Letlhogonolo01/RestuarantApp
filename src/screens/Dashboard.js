import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import RestaurantCard from "../components/RestaurantCard";

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();

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

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Hello, {name.firstName}
      </Text>
      <ScrollView>
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            name={restaurant.name}
            image={restaurant.image}
            description={restaurant.description}
            onViewDetails={() => {
              // Handle view details button press
              // You can navigate to a restaurant details screen here if needed
            }}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          changePassword();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              navigation.navigate("Login");
            });
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  button: {
    marginTop: 10,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
