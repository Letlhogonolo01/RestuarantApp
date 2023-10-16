import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { firebase } from "../../config";

const ViewBookings = () => {
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    const reservationsRef = firebase.firestore().collection("userReservations");

    reservationsRef.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const reservations = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userReservationsData = userData.reservations || [];
          reservations.push(...userReservationsData);
        });
        setUserReservations(reservations);
      } else {
        console.log("No reservations found.");
      }
    }).catch((error) => {
      console.error("Error querying reservations:", error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Bookings</Text>
      <FlatList
        data={userReservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text>Name: {item.firstName}</Text>
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
