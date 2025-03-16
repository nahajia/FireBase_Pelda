import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import AuthScreen from './AuthScreen';
import { translations } from './Translations';

import { handleAuthentication, getUserFromStorage } from './handleAuthentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebaseConfig';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigate from './TabNavigate'


const App = ( {navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('hu'); // 'en' for English, 'hu' for Hungarian

  useEffect(() => {
    const checkUserInStorage = async () => {
      const storedUser = await getUserFromStorage();
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    checkUserInStorage();

    const unsubscribe = onAuthStateChanged(getAuth(app), (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
      } else {
        setUser(null);
        AsyncStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const authHandler = async () => {
    await handleAuthentication(language,email, password, isLogin, user, setUser);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
    
      {user ? (
          <TabNavigate language={language} navigation={navigation} user={user} handleAuthentication={authHandler}/>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
        <AuthScreen
          language={language}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={authHandler}
        />
        </ScrollView>
      )}
   
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
