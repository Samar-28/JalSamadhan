import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Context from "../ContextAPI";

function Signup({ navigation }) {
  const context = useContext(Context);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { stateAndUTData } = useContext(Context);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedState ? selectedState : "Select State/UT"}</Text>
      </TouchableOpacity>
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
          context.signUp(name, phoneNumber, selectedState);
          navigation.navigate("NormalUser");
        }}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={stateAndUTData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedState(item.name);
                  setModalVisible(false);
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
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
