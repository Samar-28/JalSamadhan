import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ImagePicker from "../component/ImagePicker";
import Context from "../ContextAPI";

const Categories = ["Fishermen", "Doctor", "Restaurant", "Firefighter"];

function Contribute({ navigation }) {
  const context = useContext(Context);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setaadhar] = useState(null);
  const [pan, setpan] = useState(null);
  const [doc, setdoc] = useState(null);
  const [statevis, setstatevis] = useState(false);
  const [catvis, setcatvis] = useState(false);
  const [state, setstate] = useState("");
  const [cat, setcat] = useState("");

  const handleRegistration = async () => {
    const response = await context.AddContri(
      name,
      phoneNumber,
      address,
      cat,
      state,
      aadhar,
      pan,
      doc
    );
    setName("");
    setPhoneNumber("");
    setAddress("");
    setaadhar(null);
    setdoc(null);
    setpan(null);
    setstate("");
    setcat("");
    navigation.navigate("NormalUser");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Register Yourself</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setstatevis(true)}
        >
          <Text style={styles.buttonText}>
            {state ? state : "Select State"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setcatvis(true)}>
          <Text style={styles.buttonText}>{cat ? cat : "Select Category"}</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
          Aadhar Card:
        </Text>
        <ImagePicker setimg={setaadhar} />
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
          Pan Card:
        </Text>
        <ImagePicker setimg={setpan} />
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
          Supporting Document (GST, FSSAI, LICENSE):
        </Text>
        <ImagePicker setimg={setdoc} />
        <View style={{ marginTop: 10 }}>
          <Button title="Register" onPress={handleRegistration} />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={statevis}
        onRequestClose={() => setstatevis(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Select State</Text>
              {context.stateAndUTData.map((state) => (
                <TouchableOpacity
                  key={state.id}
                  style={styles.modalOption}
                  onPress={() => {
                    setstate(state.name);
                    setstatevis(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{state.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setstatevis(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={catvis}
        onRequestClose={() => setcatvis(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Select Category</Text>
              {Categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.modalOption}
                  onPress={() => {
                    setcat(cat);
                    setcatvis(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setcatvis(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Contribute;
