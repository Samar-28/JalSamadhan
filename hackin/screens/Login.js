import React, { useState, useContext } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
import Context from "../ContextAPI";
function Login({ navigation }) {
  const context = useContext(Context);

  const [phoneNumber, setPhoneNumber] = useState("");
  const handleLogin = async() => {
const response=await context.login(phoneNumber);
    if(Object.keys(response).length !== 0){
    context.setadmin(response.admin);
    context.setname(response.name);
    context.setstate(response.state);
    if(response.admin){
      navigation.navigate('adminmain');
    }else{
      navigation.navigate('NormalUser');
    }
}else{
  Alert.alert("Invalid","Use correct credentials or signup!");
  return;
}
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login with OTP</Text>
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
      <Text style={{ marginVertical: 20 }}>Not a user? Sign up now</Text>
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
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: "black",
  },

  borderStyleHighLighted: {
    borderColor: "black",
    color: "black",
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
