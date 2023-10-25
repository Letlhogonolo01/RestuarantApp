import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";

const AdminLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginAdmin = async (email, password) => {
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (email === "admin@dd.co.za" && password === "Admin123") {
        navigation.navigate("RestaurantOwner");
      } else {
        alert("Login successful.");
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading... </Text>
      ) : (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Admin Login</Text>
          <View style={{ marginTop: 40 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => loginAdmin(email, password)}
            style={styles.button}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Login as Admin
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
