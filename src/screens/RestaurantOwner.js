import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const RestaurantOwner = () => {
    const navigation = useNavigation();

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
      <Text>RestaurantOwner</Text>
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
