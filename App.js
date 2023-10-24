import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./config";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import AdminLogin from "./src/screens/AdminLogin";
import Registration from "./src/screens/Registration";
import Dashboard from "./src/screens/Dashboard";
import Header from "./src/components/Header";
import Profile from "./src/screens/Profile";
import ViewBookings from "./src/screens/ViewBookings";
import RestaurantOwner from "./src/screens/RestaurantOwner";
import RestaurantDetails from "./src/screens/RestaurantDetails";
import ConfirmReservation from "./src/screens/ConfirmReservation";
import BookingStats from "./src/screens/BookingStats";
import Restaurants from "./src/screens/Restaurants";
import EditRestaurant from "./src/screens/EditRestaurant";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={!user ? Login : Dashboard}
          options={{
            headerTitle: () => <Header name="DishDelight" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: () => <Header name="DishDelight" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{
            headerTitle: () => <Header name="DishDelight" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="DishDelight" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetails}
          options={{
            headerTitle: () => <Header name="RestaurantDetails" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="ConfirmReservation"
          component={ConfirmReservation}
          options={{
            headerTitle: () => <Header name="ConfirmReservation" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => <Header name="Profile" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="RestaurantOwner"
          component={RestaurantOwner}
          options={{
            headerTitle: () => <Header name="Restaurant Owner Dashboard" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="ViewBookings"
          component={ViewBookings}
          options={{
            headerTitle: () => <Header name="View Bookings" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="BookingStats"
          component={BookingStats}
          options={{
            headerTitle: () => <Header name="Booking Stats" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{
            headerTitle: () => <Header name="Restaurants" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="EditRestaurant"
          component={EditRestaurant}
          options={{
            headerTitle: () => <Header name="Edit Restaurant" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#a2d2ff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
