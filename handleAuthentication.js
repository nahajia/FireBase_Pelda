import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import {Alert} from "react-native";
import { getFirestore, doc, setDoc, getDoc, collection, Timestamp } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebaseConfig';

import { translations} from './Translations'

export const handleAuthentication = async (language,email, password, isLogin, user, setUser) => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  try {
    if (user) {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      console.log('User logged out successfully!');
      setUser(null);
    } else {
      let loggedInUser;
      if (isLogin) {
        loggedInUser = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
      } else {
        loggedInUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        
        // Save user data to Firestore
        const userDocRef = doc(firestore, 'jatekosok', loggedInUser.user.uid);
        await setDoc(userDocRef, { email:email, nev:email, szuletes:"" });

        //Hozza létre meccsek collectiont, benne dokumentumot
        const expCollectionRef = collection(firestore, "jatekosok", loggedInUser.user.uid, "meccsek");
        const newDocRef = doc(expCollectionRef,"meccs0"); 
        const dateNumber = Timestamp.now();
        await setDoc(newDocRef, {
          datum: dateNumber, 
          atlag: 30,
          szaz80:0
        }); 
        console.log('User profile saved to Firestore');
      }
      setUser(loggedInUser.user);
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser.user));
    }
  } catch (error) {
    //console.error('Authentication error:', error.message);
    Alert.alert(translations[language].error, translations[language].errorLogin);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};
