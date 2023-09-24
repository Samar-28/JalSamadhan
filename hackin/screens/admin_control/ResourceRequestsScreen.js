import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Context from '../../ContextAPI';
function ResreqScreen({ navigation,route }) {
  const context=useContext(Context)
  const [resreq, setresreq] = useState([]);
  useEffect(() => {
    async function getter(){
      const response=await context.GetResReq(route.params.cat)
      setresreq(response);
    }
    getter();
  }, [])
  

  const handleMarkResolved = async(id,veri) => {
    const response=await context.ApproveReq(id,veri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resource Requests</Text>
      <FlatList
        data={resreq}
        keyExtractor={(item) => item.id}
        renderItem={( {item} ) => (
          <View style={styles.requestItem}>
            <Text>Name: {item.name}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Contact Number: {item.contactNumber}</Text>
            <Text>Details: {item.details}</Text>
            <Text>Status: {item.isResolved ? 'Resolved' : 'Unresolved'}</Text>
            {!item.isResolved ? (
              <TouchableOpacity
                style={styles.resolveButton}
                onPress={() => handleMarkResolved(item.id,1)}
              >
                <Text style={styles.buttonText}>Mark Resolved</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.unresolveButton}
                onPress={() => handleMarkResolved(item.id,0)}
              >
                <Text style={styles.buttonText}>Mark Unresolved</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  resolveButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  unresolveButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResreqScreen;
