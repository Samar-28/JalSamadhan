import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
function Admin({ navigation }) {
  const adminName = 'Admin Name';
  const adminPhoneNumber = '123-456-7890';
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>
      <Text style={styles.label}>Name: {adminName}</Text>
      <Text style={styles.label}>Phone Number: {adminPhoneNumber}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Complaints</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Announcement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>See Resource Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Verify Contributors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Admin;
