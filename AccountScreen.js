import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
//import { storage, auth } from './firebaseConfig';

const AccountScreen =(({ user, handleAuthentication }) => {
 

    const [userName, setUserName] = useState(null);
  
    useEffect(() => {
    
    //const userr = auth.currentUser
    setUserName(user.email)


  }, [user]);

  
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{userName}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" /> 
    </View>
  );
})

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,

  
  },
  title: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  gomb:{
    textAlign:"center",
    padding:10, 
    color:"white", 
    fontSize:12
  }
});

export default AccountScreen;