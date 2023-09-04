import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });

    // Fetch the user's reservations from Firebase
    const userReservationsRef = firebase
      .firestore()
      .collection("userReservations")
      .doc(firebase.auth().currentUser.uid);

    userReservationsRef.get().then((doc) => {
      if (doc.exists) {
        setUserReservations(doc.data().reservations);
      } else {
        console.log("User has no reservations");
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
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Hello, {user.firstName} {user.lastName}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: "bold" }}>
        Email: {user.email}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
        Your Reservations:
      </Text>
      <ScrollView>
        {userReservations.map((reservation, index) => (
          <View style={styles.reservationCard} key={index}>
            <Text style={styles.reservationInfo}>
              Restaurant Name: {reservation.restaurantName}
            </Text>
            <Text style={styles.reservationInfo}>
              Date:{" "}
              {new Date(Date.parse(reservation.selectedDate)).toDateString()}
            </Text>
            <Text style={styles.reservationInfo}>
              Time:{" "}
              {new Date(
                Date.parse(reservation.selectedTime)
              ).toLocaleTimeString()}
            </Text>
            <Text style={styles.reservationInfo}>
              Guests: {reservation.numOfGuests}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={changePassword} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    // alignItems: "center",
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
  reservationCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reservationInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Profile;
