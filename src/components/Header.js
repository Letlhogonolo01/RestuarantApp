import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";

const Header = (props) => {
  const [name, setName] = useState("");

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
    <View style={{ marginLeft: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 28 }}>{props.name}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Hello, {name.firstName}
      </Text>
    </View>
  );
};

export default Header;
