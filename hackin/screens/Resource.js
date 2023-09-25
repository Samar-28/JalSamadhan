import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import Context from "../ContextAPI";

function Resource({ navigation }) {
  const context = useContext(Context);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState(context.location);
  const [modalVisible, setModalVisible] = useState(false);
  const [cat, setcat] = useState("");
  const categories = [
    "Water",
    "Food",
    "Shelter",
    "Medical Supplies",
    "Other Categories",
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
      context.setLocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
    })();
  }, []);
  const handleRequestSubmit = async () => {

    Alert.alert(
      "Warning",
      "This feature should only be used during disaster emergencies. Misuse may result in blacklisting from the app."
    );
      const lat=location?location.lat:'';
      const long=location?location.long:'';

    const response = await context.AddResReq(
      details,
      address,
      lat,long
    );
    setDetails("");
    setAddress("");
    setcat("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        This feature should only be used during disaster emergencies. Misuse may
        result in blacklisting from the app.
      </Text>

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <Text style={styles.label}>Additional Details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter additional details (optional)"
        value={details}
        onChangeText={(text) => setDetails(text)}
        multiline
        numberOfLines={4}
      />

      

      <TouchableOpacity style={styles.submitButton} onPress={handleRequestSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryText: {
    fontSize: 16,
    color: "#3498db",
  },
});

export default Resource;
