import React, { useContext, useState,useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Context from "../ContextAPI";

function ForumScreen({navigation}) {
  const [postData, setPosts] = useState([]);
  const context=useContext(Context);
  useEffect(() => {
    async function getter(){
    const response=await context.getForumPost();
    console.log(response);
    setPosts(response);}
    getter();
  }, [])
  
  const handleUpvote = (postId) => {
    const updatedPosts = postData.map((post) =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (postId) => {
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      let post={};
      for(let i=0;i<postData.length;i++){
        if(postData[i].id===item.id){
          post=postData[i];
        }
      }
      navigation.navigate('ForumPost',{post:post})
    }}>
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.actionButtons}>
          <View
            style={styles.actionButton}
          >
            <AntDesign name="arrowup" size={24} color="gray" />
            <Text>Upvotes: {item.upvotes}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleComment(item.id)}
            style={styles.actionButton}
          >
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize:28,fontWeight:'bold',marginBottom:5}}>{context.state}</Text>
      {postData.length!==0?<FlatList
        data={postData}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
      />:<Text style={styles.postTitle}>No Post on this {context.state}'s forum.</Text>}
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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
});


export default ForumScreen;
