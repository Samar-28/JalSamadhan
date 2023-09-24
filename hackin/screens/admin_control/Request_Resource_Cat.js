import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Request_Resource_Cat({ navigation }) {
  const categories = [
    'Water',
    'Food',
    'Shelter',
    'Medical Supplies',
    'Other Categories',
  ];

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category:</Text>
      {categories.map((category) => (
        <Pressable
          key={category}
          style={({ pressed }) => [
            styles.categoryButton,
            { backgroundColor: pressed ? '#3498db' : '#2980b9' },
          ]}
          onPress={()=>{navigation.navigate("ResourceRequestsScreen",{cat:category})}}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    width: 200,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Request_Resource_Cat;
