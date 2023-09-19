import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { firebase } from "../../config";

const ViewBookings = () => {
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    // Fetch user reservations from Firebase Firestore
    const userId = "admin@dd.co.za"; // Use the actual admin user ID
    const reservationsRef = firebase.firestore().collection("reservations");
    
    reservationsRef.where("userId", "==", userId).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Reservations found for the admin user
        const reservations = [];
        querySnapshot.forEach((doc) => {
          const reservationData = doc.data();
          reservations.push(reservationData);
        });
        setUserReservations(reservations);
      } else {
        // No reservations found for the admin user
        console.log("No reservations found for admin user.");
      }
    }).catch((error) => {
      console.error("Error querying reservations:", error);
    });    
  }, []); // Add an empty dependency array here

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Bookings</Text>
      <FlatList
        data={userReservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text>Restaurant Name: {item.restaurantName}</Text>
            <Text>Date: {item.selectedDate}</Text>
            <Text>Time: {item.selectedTime}</Text>
            <Text>Number of Guests: {item.numOfGuests}</Text>
          </View>
        )}
      />
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
  bookingItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
});

export default ViewBookings;
