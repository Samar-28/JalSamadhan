import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const postData = [
  {
    id: "1",
    title: "Post 1",
    upvotes: 10,
    comments: 5,
  },
  {
    id: "2",
    title: "Post 2",
    upvotes: 15,
    comments: 8,
  },
];

function ForumScreen() {
  const [posts, setPosts] = useState(postData);

  const handleUpvote = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (postId) => {
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleComment(item.id)}>
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleUpvote(item.id)}>
          <Text>Upvotes: {item.upvotes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComment(item.id)}>
          <Text>Comments: {item.comments}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ForumScreen;
