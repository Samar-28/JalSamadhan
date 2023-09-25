import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import ImagePicker from "../component/ImagePicker";
import Context from "../ContextAPI";
import * as Location from 'expo-location'
function DisasterReport({ navigation }) {
  const context = useContext(Context);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [location, setLocation] = useState({
    long:"",
    lat:""
  });
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
  const handleSubmit = async () => {
    console.log(additionalDetails);
    const response=await context.SOS(image,selectedCategory,additionalDetails,location.long,location.lat)
    setImage("");
    setAdditionalDetails("");
    toggleModal();
  };
  const toggleModal = () => {
    navigation.goBack();
  };

  const categories = ["Flood", "Drought", "Cyclone"];
console.log(location)
  return (
    <View style={styles.container}>
      <Button title="Report Disaster" onPress={toggleModal} />
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <ScrollView>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Disaster</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category ? "red" : "lightgray",
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: selectedCategory === category ? "white" : "black",
                    },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
            <Text>Additional Details:</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              value={additionalDetails}
              onChangeText={setAdditionalDetails}
            />
            <View style={{ marginVertical: 5 }}>
              <ImagePicker setimg={setImage} />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoriesContainer: {
    marginBottom: 10,
    maxHeight: 200,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default DisasterReport;
