import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";

const ConfirmReservation = ({ route }) => {
  const [user, setUser] = useState({});
  const { restaurant, reservation } = route.params;
  const navigation = useNavigation();

  const parsedDate = new Date(Date.parse(reservation.selectedDate));
  const parsedTime = new Date(Date.parse(reservation.selectedTime));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userSnapshot = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get();
        if (userSnapshot.exists) {
          setUser(userSnapshot.data());
        } else {
          console.log("User does not exist");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleDone = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userReservationsRef = firebase
        .firestore()
        .collection("userReservations")
        .doc(userId);

      // Check if the userReservations document exists
      const doc = await userReservationsRef.get();
      if (!doc.exists) {
        // If it doesn't exist, create it with an empty reservations array
        await userReservationsRef.set({ reservations: [] });
      }

      // Save the reservation to the user's reservations in Firebase
      await userReservationsRef.update({
        reservations: firebase.firestore.FieldValue.arrayUnion({
          restaurantName: restaurant.name,
          selectedDate: reservation.selectedDate,
          selectedTime: reservation.selectedTime,
          numOfGuests: reservation.numOfGuests,
        }),
      });

      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error saving reservation:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Confirm Reservation</Text>
        <Text style={styles.info}>UserName: {user.firstName}</Text>
        <Text style={styles.info}>UserEmail: {user.email}</Text>
        <Text style={styles.info}>RestaurantName: {restaurant.name}</Text>
        <Text style={styles.info}>Date: {parsedDate.toDateString()}</Text>
        <Text style={styles.info}>Time: {parsedTime.toLocaleTimeString()}</Text>
        <Text style={styles.info}>
          Number of Guests: {reservation.numOfGuests}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#026efd",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ConfirmReservation;
