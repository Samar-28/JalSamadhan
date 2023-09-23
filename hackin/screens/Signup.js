import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

function Signup({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate("Normal");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 32,
    borderWidth: 2,
    fontWeight: "bold",
    marginVertical: 4,
    textAlign: "center",
    width: "90%",
  },
  selectButton: {
    height: 50,
    fontSize: 32,
    borderWidth: 2,
    fontWeight: "bold",
    marginVertical: 4,
    textAlign: "center",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
  },
  underlineStyleHighLighted: {
    borderColor: "black",
    color: "black",
  },
});

export default Signup;
