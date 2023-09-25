import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Context from "../ContextAPI";
import ImagePicker from '../component/ImagePicker'
function AddPostScreen({ navigation }) {
  const context = useContext(Context);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
    const [photo, setphoto] = useState("")
  const handleAddPost =async () => {
    const response=context.AddForumPost(postTitle,postContent,photo);
    setphoto(null);
    setPostTitle("");
    setPostContent("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter post title"
        onChangeText={(text) => setPostTitle(text)}
        value={postTitle}
      />

      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter post content"
        onChangeText={(text) => setPostContent(text)}
        value={postContent}
        multiline={true}
        numberOfLines={4}
      />
        <ImagePicker setimg={setphoto}/>
        <View style={{marginVertical:10}}>

      <Button title="Add Post" onPress={handleAddPost} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default AddPostScreen;
