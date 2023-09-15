import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const RestaurantOwner = () => {
    const navigation = useNavigation();
    // const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch and set the bookings data from Firestore here
        // Example:
        // firebase.firestore().collection("bookings").onSnapshot((snapshot) => {
        //    const data = snapshot.docs.map((doc) => doc.data());
        //    setBookings(data);
        // });
    }, []);

    const signOut = () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            navigation.navigate("Login");
          });
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>RestaurantOwner</Text>
            {/* Add components for CRUD, View Bookings, Stats, and Confirm Arrivals here */}
            {/* Example: */}
            <TouchableOpacity >
                <Text>Restaurant Management</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text>View Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text>Booking Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text>Confirm Arrivals</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} style={styles.button}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

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
      backgroundColor: "#026efd",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
})

export default RestaurantOwner
