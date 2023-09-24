import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

const postDetails = {
  id: "1",
  title: "Post 1",
  description: "Description for Post 1",
  photos: null,
  //   photos: ['photo1.jpg', 'photo2.jpg'],
  upvotes: 10,
  comments: [
    { id: "1", text: "Comment 1" },
    { id: "2", text: "Comment 2" },
  ],
};

function PostDetailsScreen() {
  const [post, setPost] = useState(postDetails);
  const [newComment, setNewComment] = useState("");

  const handleUpvote = () => {
    setPost({ ...post, upvotes: post.upvotes + 1 });
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedComments = [
        ...post.comments,
        { id: Date.now().toString(), text: newComment },
      ];
      setPost({ ...post, comments: updatedComments });
      setNewComment("");
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      {postDetails.photos &&
        post.photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
      <TouchableOpacity onPress={handleUpvote}>
        <Text>Upvote</Text>
        <Text>Upvotes: {post.upvotes}</Text>
      </TouchableOpacity>
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={renderCommentItem}
      />
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={(text) => setNewComment(text)}
        onSubmitEditing={handleAddComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  commentItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

export default PostDetailsScreen;
