import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Context from "../../ContextAPI";
function AddAnnouncement({ navigation }) {
  const context = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddAnnouncement = async () => {
    context.AddAnn(title, description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Announcement Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Announcement Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddAnnouncement}
      >
        <Text style={styles.buttonText}>Add Announcement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  addButton: {
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

export default AddAnnouncement;
