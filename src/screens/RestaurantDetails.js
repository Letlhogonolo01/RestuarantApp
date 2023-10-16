import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";
import DateTimePicker from "@react-native-community/datetimepicker";

const RestaurantDetails = ({ route }) => {
  const { name, image, description } = route.params.restaurant;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [displayDate, setDisplayDate] = useState("");
  const [displayTime, setDisplayTime] = useState("");

  const navigation = useNavigation();

  const handleMakeReservation = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        alert("Please select a date and time.");
        return;
      }

      const reservationData = {
        name,
        image,
        description,
        selectedDate: selectedDate.toString(),
        selectedTime: selectedTime.toString(),
        numOfGuests,
      };

      await firebase.firestore().collection("bookings").add(reservationData);

      navigation.navigate("ConfirmReservation", {
        restaurant: { name, image, description },
        reservation: reservationData,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      setDisplayDate(date.toDateString());
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, time) => {
    if (time !== undefined) {
      setSelectedTime(time);
      setDisplayTime(time.toLocaleTimeString());
    }
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={handleDateChange}
          />
          )}
          {displayDate !== "" && <Text style={styles.date}>Selected Date: {displayDate}</Text>}
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={{ fontSize: 18 }}>Select Time</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            onChange={handleTimeChange}
          />
          )}
          {displayTime !== "" && <Text style={styles.date}>Selected Time: {displayTime}</Text>}
        <Text style={{ fontSize: 18 }}>Number of Guests</Text>
        <View style={styles.guestsContainer}>
          <TouchableOpacity
            style={styles.guestButtonMinus}
            onPress={() => setNumOfGuests(numOfGuests - 1)}
          >
            <Text style={styles.guestButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.numOfGuests}>{numOfGuests}</Text>
          <TouchableOpacity
            style={styles.guestButtonPlus}
            onPress={() => setNumOfGuests(numOfGuests + 1)}
          >
            <Text style={styles.guestButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleMakeReservation}>
          <Text style={styles.buttonText}>Make Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 90,
  },
  card: {
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  guestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  guestButtonMinus: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  guestButtonPlus: {
    backgroundColor: "#026efd",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  guestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  numOfGuests: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#026efd",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  date: {
    marginBottom: 20,
    backgroundColor: "lightgrey",
  },
});

export default RestaurantDetails;
