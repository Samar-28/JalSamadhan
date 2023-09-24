import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Logo from "../logo.png";
import Context from "../ContextAPI";
function Home({ navigation }) {
  const context = useContext(Context);
  const [announcements, setannouncements] = useState([]);
  useEffect(() => {
    async function ann() {
      const response = await context.getAnn();
      setannouncements(response);
    }
    ann();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={Logo}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
            marginBottom: 10,
          }}
        />
      </View>
      <View style={styles.announcementsContainer}>
        <Text style={styles.announcementsHeader}>Announcements</Text>
        <ScrollView style={styles.announcementsList}>
          {announcements.length !== 0 ? (
            announcements.map((announcement) => (
              <TouchableOpacity
                key={announcement.title}
                style={styles.announcementItem}
                onPress={() => {
                  navigation.navigate("Announcement", {
                    title: announcement.title,
                    description: announcement.desc,
                  });
                }}
              >
                <Text style={styles.announcementTitle}>
                  {announcement.title}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No Announcements</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.complaintsButton}
        onPress={() => {
          navigation.navigate("Complaint");
        }}
      >
        <Text style={styles.complaintsButtonText}>Complaints</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 3, 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  announcementsContainer: {
    flex: 3,
    marginTop: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    alignItems: "center",
  },
  announcementsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  announcementsList: {
    maxHeight: "100%",
  },
  announcementItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  announcementTitle: {
    fontSize: 16,
  },
  complaintsButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  complaintsButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Home;
