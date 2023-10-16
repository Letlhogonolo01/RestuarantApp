// BookingStats.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { firebase } from "../../config";

const BookingStats = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    // Fetch booking data from Firebase and update state
    const fetchData = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection("bookings")
          .get();

        const bookings = [];
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          bookings.push(booking);
        });

        setBookingData(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  // Extract data for the chart (bookings per month)
  const getBookingsPerMonth = () => {
    const bookingsPerMonth = {};

    bookingData.forEach((booking) => {
      const date = new Date(booking.selectedDate);
      const month = date.toLocaleString("default", { month: "long" });

      if (bookingsPerMonth[month]) {
        bookingsPerMonth[month]++;
      } else {
        bookingsPerMonth[month] = 1;
      }
    });

    return bookingsPerMonth;
  };

  const bookingsPerMonth = getBookingsPerMonth();

  const chartData = {
    labels: Object.keys(bookingsPerMonth),
    datasets: [
      {
        data: Object.values(bookingsPerMonth),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Statistics</Text>
      <BarChart
        data={chartData}
        width={320}
        height={350}
        yAxisLabel="Bookings"
        chartConfig={{
          backgroundColor: "#67BBE7",
          backgroundGradientFrom: "#426CC9",
          backgroundGradientTo: "#67BBE7",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
        }}
        style={styles.chart}
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
  chart: {
    marginVertical: 50,
    borderRadius: 10,
  },
});

export default BookingStats;
