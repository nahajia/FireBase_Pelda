import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
//import { storage, auth } from './firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';

import { translations } from './Translations';

import ExpScreen from './Experience/ExpScreen';
import ExpEditScreen from './Experience/ExpEditScreen';

const ButtonsExpScreen =(({language, navigation, route, user}) => {
   

  function FvScreen({ navigation }) {
    return (
      <View style={{ flex: 1  }}>
        <ExpScreen language={language} navigation={navigation} route={route} user={user}/>
      </View>
    );
  }
  function FvEditScreen({ navigation }) {
    return (
      <View style={{ flex: 1  }}>
        <ExpEditScreen language={language} navigation={navigation} route={route} user={user}/>
      </View>
    );
  }
    

  const Stack2 = createStackNavigator();

  return (
    <Stack2.Navigator initialRouteName="Experience ">
    <Stack2.Screen name="Experience " component={FvScreen} 
            options={{ title: translations[language].experience }}/>
    <Stack2.Screen name="ExpEdit" component={FvEditScreen} 
            options={{ title: translations[language].newExperience }}/>

    </Stack2.Navigator>

  );
})

const styles = StyleSheet.create({
 
  title: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
 
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  gombdoboz:{
    width:100,
    backgroundColor:"#017f8d",
    borderRadius:10,
    alignItems:'center',
    paddingTop:10
  },
  gombszoveg:{
    textAlign:"center",
    padding:10, 
    color:"white", 
    fontSize:12
  },
  buttonRow: {
    flexDirection: 'row',  // A gombok vízszintes elrendezése
    justifyContent: 'space-around',  // Egyenletes elosztás a gombok között
    marginTop: 20,  // Térköz felül
  },
});

export default ButtonsExpScreen;

