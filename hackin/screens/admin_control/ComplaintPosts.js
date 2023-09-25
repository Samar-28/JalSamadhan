
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Button,
} from "react-native";
import Context from "../../ContextAPI";

function PostListScreen({ navigation, route }) {
  const context = useContext(Context);
  const [postData, setPostData] = useState([
  ]);

  useEffect(() => {
    async function getter() {
      const response = await context.getComplaints(route.params.name);
      console.log(response);
      setPostData(response);
    }
    getter();
  }, []);

  const handlePostClick = (post) => {
    Alert.alert(
      `Title: ${post.title}\nDescription: ${post.description}\nUpvotes: ${post.upvotes}\nComments: ${post.comments}\nPoster: ${post.posterName}\nPhone Number: ${post.phoneNumber}`
    );
  };

  const handleResolveClick = async(id) => {
    const response=await context.ResolveComplaint(id);
    console.log(response);
  };
  return (
    <View style={styles.container}>
      {postData.length!=0?<FlatList
        data={postData}
        keyExtractor={(item) => item.details}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => handlePostClick(item)}
          >
            <Text style={styles.postDescription}>{item.details}</Text>
            <View style={styles.postInfo}>
              <Text style={styles.postInfoText}>Name: {item.name}</Text>
              <Text style={styles.postInfoText}>State: {item.state}</Text>
              <Text style={styles.postInfoText}>Address: {item.add}</Text>
              <Text style={styles.postInfoText}>Phone: {item.phone}</Text>
              <Text style={styles.postInfoText}>
                Resolved: {item.resolved ? "Yes" : "No"}
              </Text>
              <Button
                title={item.resolved ? "Mark Unresolved" : "Mark Resolved"}
                onPress={() => handleResolveClick(item.id)}
              />
            </View>
              <Image
                source={{ uri: item.image }}
                style={{ height: 200, width: "100%", borderRadius: 4 }}
              />
          </TouchableOpacity>
        )}
      />:<Text>No Complaints in this State!</Text>}
    </View>
  );
}
export default PostListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  postItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  postInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  postInfoText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: "80%",
    height: "80%",
  },
});
