import React, { useContext, useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,Button,Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Context from "../ContextAPI";
function PostDetailScreen({ route }) {
  const { post } = route.params;
  const context=useContext(Context)
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [postcomments, setpostcomments] = useState([])
  const [upvotes, setUpvotes] = useState(post.upvotes);
useEffect(() => {
  async function ok(){
  let arr=[];
  for (let i=1;i<post.comments.length;i++){
    arr.push(post.comments[i]);
  }
  setpostcomments(arr);}
  ok();
}, [])

  const handleAddComment = () => {
    
    setShowModal(false);
  };

  const handleUpvote = () => {
      setUpvotes(upvotes + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.posterInfo}>Poster: {post.name}</Text>
      <Text style={styles.posterInfo}>Phone: {post.phone}</Text>
      <Text style={styles.postContent}>{post.desc}</Text>
      <TouchableOpacity
        style={
          styles.upvoteButton
        }
        onPress={handleUpvote}
      >
        <AntDesign name="arrowup" size={24} color={"gray"} />
        <Text>Upvote</Text>
        <Text>{upvotes}</Text>
      </TouchableOpacity>
      {post.img !== "" ? (
          <Image
            source={{ uri: post.img }}
            style={{ height: "15%", width: "30%", borderRadius: 4 }}
          />
        ) : (
          <Text>No Image to Show!</Text>
        )}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Comments</Text>
        {postcomments.length!=0?<FlatList
          data={postcomments}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text>{item}</Text>
            </View>
          )}
        />:<Text>No Comments</Text>}
      </View>

     <Button title="Add Comment" onPress={()=>{
      setShowModal(true)
     }}/>
           <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Add your comment"
              onChangeText={(text) => setComment(text)}
              value={comment}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Cancel</Text>
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
    padding: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  posterInfo: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 18,
    marginBottom: 16,
  },
  upvoteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  upvotedButton: {
    backgroundColor: "lightgreen",
  },
  commentSection: {
    marginBottom: 16,
    height: "60%",
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addCommentButton: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
  },
  commentItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default PostDetailScreen;
