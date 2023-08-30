import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebase } from "../../config";

const ConfirmReservation = ({ route }) => {
    const [name, setName] = useState("");
  const { restaurant, reservation } = route.params;

  const parsedDate = new Date(Date.parse(reservation.date));
  const parsedTime = new Date(Date.parse(reservation.time));

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Confirm Reservation</Text>
        <Text style={styles.info}>User: {name.firstName}</Text>
        <Text style={styles.info}>Restaurant: {restaurant.name}</Text>
        <Text style={styles.info}>Date: {parsedDate.toDateString()}</Text>
        <Text style={styles.info}>Time: {parsedTime.toLocaleTimeString()}</Text>
        <Text style={styles.info}>Number of Guests: {reservation.guests}</Text>
        {/* You can add more fields or customize the confirmation form */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    fontSize: 18, // Adjust this value to your preference
    marginBottom: 10,
  },
});

export default ConfirmReservation;
