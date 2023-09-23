import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

function Resource({ navigation }) {
  const [location, setLocation] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleRequestSubmit = () => {
    const resourceRequestData = {
      location,
      additionalDetails,
    };
    const isEmergency = 0;

    if (!isEmergency) {
      Alert.alert(
        "Warning",
        "This feature should only be used during disaster emergencies. Misuse may result in blacklisting from the app."
      );
      return;
    }
    Alert.alert(
      `Resource request submitted: ${JSON.stringify(resourceRequestData)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        This feature should only be used during disaster emergencies. Misuse may
        result in blacklisting from the app.
      </Text>

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Text style={styles.label}>Additional Details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter additional details (optional)"
        value={additionalDetails}
        onChangeText={(text) => setAdditionalDetails(text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleRequestSubmit}
      >
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
});

export default Resource;
