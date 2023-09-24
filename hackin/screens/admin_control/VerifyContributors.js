import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import Context from "../../ContextAPI";
function VerifyContributors({ navigation }) {
  const context=useContext(Context);
  const [mod, setmod] = useState(null);
  const [condata, setcondata] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      const response = await context.getContris();
      // console.log(response);
      setcondata(response);
    }
    fetchContributors();
  }, []);

  const openImageModal = (contributor) => {
    setmod(contributor);
  };

  const closeImageModal = () => {
    setmod(null);
  };

  const approver = async (id,veri) => {
    const response=await context.ApproveContri(id,veri);
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contributors Awaiting Verification</Text>
      <FlatList
        data={condata}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <View style={styles.contributorBlock}>
            <Text>Name: {item.Name}</Text>
            <Text>Phone Number: {item.Phone}</Text>
            <Text>Address: {item.Address}</Text>
            <Text>Status: {item.verified ? "Approved" : "Pending/Rejected"}</Text>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Button title="View Images" onPress={() => openImageModal(item)} />
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Button
                title="Approve"
                onPress={() => approver(item.Id,1)}
                style={styles.approveButton}
                disabled={item.isApproved}
              />
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Button
                title="Reject"
                onPress={() => approver(item.Id,0)}
                style={styles.rejectButton}
                disabled={item.isApproved === false}
              />
            </View>
          </View>
        )}
      />
      <Modal
        visible={!!mod}
        animationType="slide"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <Button title="Close" onPress={closeImageModal} />
          {mod && (
            <View>
              <Text>Aadhar Card:</Text>
              <Image
                source={{ uri: mod.Aadhar }}
                style={styles.image}
              />
              <Text>Pan Card:</Text>
              <Image
                source={{ uri: mod.Pan }}
                style={styles.image}
              />
              <Text>License:</Text>
              <Image
                source={{ uri: mod.Doc }}
                style={styles.image}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contributorBlock: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  approveButton: {
    backgroundColor: "green",
    marginTop: 10,
  },
  rejectButton: {
    backgroundColor: "red",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

export default VerifyContributors;
