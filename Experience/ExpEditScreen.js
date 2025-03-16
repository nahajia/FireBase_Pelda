import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, doc, updateDoc, setDoc, collection, Timestamp } from "firebase/firestore";
import { storage, auth, firestore } from '../firebaseConfig';
import { translations } from '../Translations';

const ExpEditScreen = ({language, navigation, route, user }) => {
  //alert(user.uid)
  const id = user.uid;
  //const { id, email, language } = route.params;
  const [nameExp, setNameExp] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request permissions for both camera and media library
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your camera and photo library.');
    }
  };

  // Function to pick image from the library
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Csökkentett minőség
  });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setImageUri(uri);
    } else {
      console.log('Image selection canceled');
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (cameraStatus !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your camera.');
      return;
    }
    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Csökkentett minőség
  });

    // Ensure result is valid and contains the image URI
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];  // Extract URI
      setImageUri(uri);
    } else {
      console.log('Photo capture canceled');
    }
  };

  // Function to fetch the image data as a blob
  const getBlobFromUri = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching image as blob:', error);
      throw error;
    }
  };

  // Function to upload the image to Firebase Storage
  const uploadImage = async () => {
    try {
      /*
      const uri = imageUri;
      const user = auth.currentUser;
      const blob = await getBlobFromUri(uri); // Fetching the image as a blob
      let imgName = Date.now();
      const storageRef = ref(storage, `images/${user.uid}/${imgName}`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
*/
 
      const dateNumber = Timestamp.now();
      const expCollectionRef = collection(firestore, "jatekosok", user.uid, "meccsek");
      const newDocRef = doc(expCollectionRef, dateNumber.toMillis().toString()); // Use dateNumber as the document ID
      await setDoc(newDocRef, {
        datum: dateNumber, 
        atlag: nameExp,
        szaz80:0
      });

      console.log("Document created with ID: ", dateNumber);
      navigation.goBack();
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert(translations[language].error, translations[language].errorUpload);
    }
  };

  return (
    <View style={styles.contener}>
      <View style={styles.authContainer}>
        <TextInput
          style={{ height: 60, fontSize: 18 }}
          placeholder={translations[language].nameOfExperience}
          onChangeText={newText => setNameExp(newText)}
          value={nameExp}
        />
        
        <Button title={translations[language].save} onPress={uploadImage} color="#2ecc71" />
      </View>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default ExpEditScreen;
