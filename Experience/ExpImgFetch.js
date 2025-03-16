import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../firebaseConfig';

const ExpImgFetch =  ({  Me_img }) => {

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    if (Me_img) {
      fetchImage();
    }
    
  }, [Me_img]);

  
  
  // Function to fetch and display the image from Firebase Storage
  const fetchImage = async () => {
    try {
      const user = auth.currentUser
      const storageRef = ref(storage, `images/${user.uid}/${Me_img}`);
      const url = await getDownloadURL(storageRef);
      setUploadedImageUrl(url);
    } catch (error) {
      console.error("Error fetching image: ", error);
      Alert.alert('Error', 'Failed to fetch image');
    }
  };

  return (
    <View >


     
      <Image source={{ uri: uploadedImageUrl }} style={styles.image} />
 

       </View>
  );
};

const styles = StyleSheet.create({
  contener: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
   },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
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
});

export default ExpImgFetch;
