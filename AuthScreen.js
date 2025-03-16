import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { translations} from './Translations'

const AuthScreen = ({ language, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? translations[language].login : translations[language].signUp}</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder={translations[language].email} autoCapitalize="none" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder={translations[language].password} secureTextEntry />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? translations[language].login : translations[language].signUp} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ?   
          <Text style={styles.title2}>{translations[language].need}</Text> 
          : 
          <Text style={styles.title2}>{translations[language].already}</Text>
          }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: '90%',
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
  title2: {
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 5,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
});

export default AuthScreen;

