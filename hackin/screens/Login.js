import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleLogin = () => {
    navigation.navigate("Normal");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <TextInput
        style={{
          height: 50,
          fontSize: 32,
          borderWidth: 2,
          fontWeight: "bold",
          marginVertical: 4,
          textAlign: "center",
          width: "90%",
        }}
        placeholder="Phone Number"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <Button title="Login" onPress={handleLogin} />
      <Text style={{ marginTop: 20 }}>Not a user? Sign up now</Text>
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate("Signup");
        }}
        type="clear"
      />
    </View>
  );
}

export default Login;
