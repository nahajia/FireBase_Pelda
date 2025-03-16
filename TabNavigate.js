import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';

import { translations } from './Translations';



import ButtonsExpScreen from './ButtonsExpScreen';
import AccountScreen from './AccountScreen';


const TabNavigate =(({ language, navigation, user, handleAuthentication }) => {

  function AccountScreenCall() {
    return (
      <View style={styles.contener}>
       <AccountScreen user={user} handleAuthentication={handleAuthentication}/>
      </View>
    );
  }
  

  const Tab = createBottomTabNavigator();
  
  return (

    <Tab.Navigator >
      <Tab.Screen name={translations[language].account} component={AccountScreenCall} 
        options={{ 
                tabBarLabel: translations[language].account,
                tabBarIcon: () => (
                  <AntDesign name="user" size={24} color="black" />
                ) }}>
       </Tab.Screen>

      <Tab.Screen name={translations[language].experience}
        options={{ headerShown: false, 
            tabBarLabel: translations[language].experience,         
            tabBarIcon: () => (
            <AntDesign name="picture" size={24} color="black" />
          ) }}>
                {() => <ButtonsExpScreen language={language} user={user}  />}
      </Tab.Screen>

     

     
 
  </Tab.Navigator>
  )
})
const styles = StyleSheet.create({
  contener: {
   flex: 1, 
   justifyContent: 'center', 
   alignItems: 'center'
  
  }
})
export default TabNavigate;