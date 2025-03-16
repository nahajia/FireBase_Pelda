import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp
import { storage, auth, firestore } from '../firebaseConfig';

import { translations } from '../Translations';

import ExpFetch from './ExpFetch'  



const ExpScreen =  ({language, navigation, route, user }) => {

  const id = user.uid;
  const email=user.email;
  const [oneData, setOneData] = useState("");
  const [data, setData] = useState([]);

  const fetchExpData = async () => {
    try {
      const dataDoc = await ExpFetch();
      
      setOneData(dataDoc[0])
      setData(dataDoc)      
    } catch (error) {
      //console.error("Error fetching Me data:", error);
    }
  };

  useEffect(() => {
    fetchExpData();
  }, []);

  const datumAlakit=(datum)=>{
    const expDate = datum instanceof Timestamp ? datum.toDate() : null;

    // Format the date as YYYY-MM-DD
    const formattedDate = expDate 
      ? `${expDate.getFullYear()}-${(expDate.getMonth() + 1).toString().padStart(2, '0')}-${expDate.getDate().toString().padStart(2, '0')}`
      : "Invalid Date";
  
    return formattedDate
  }
  
  return (
    <View style={styles.authContainer}>
  {/*   
      <Text style={styles.title}>{id}</Text> 
      <Text style={styles.title}>{email}</Text> 
  */}
      <View style={styles.felso}>
      <TouchableOpacity 
          onPress={() => navigation.navigate('ExpEdit',{language:language,id:id,email:email})}>
          <View style={styles.gombdoboz}>
                      
              <Text style={styles.gombszoveg}>
              {translations[language].newExperience}
              </Text>
          </View>
      </TouchableOpacity> 
      </View>
      <FlatList
            data={data} // Lista az adatokhoz
            renderItem={({ item }) => ( // Használj destructuring-ot a renderItem paraméterében
              <View key={item.id}>
                <View style={styles.hatar}>
                <Text style={styles.title}>{datumAlakit(item.datum)}</Text>
                  <Text style={styles.title}>{item.atlag.toString()}</Text>                   
                  <Text style={styles.title}>{item.szaz80.toString()}</Text>            

                    
                </View>
              </View>
            )} // Elem megjelenítése
            keyExtractor={(item) => item.id} // Egyedi azonosító minden elemhez
            initialNumToRender={1}  // Elsőként betöltendő elemek száma
            maxToRenderPerBatch={10}  // Egyszerre betöltendő maximális elemek száma
          />


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
    margin:'auto',
    paddingTop:15
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  title2: {
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'right',
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
  gombdoboz:{
    width:100,
    backgroundColor:"#017f8d",
    borderRadius:10,
    paddingTop:0,
    marginTop:1,
    marginBottom:1
  },
  gombszoveg:{
    textAlign:"center",
    padding:5, 
    color:"white", 
    fontSize:12
  },
  felso:{
    marginLeft:"auto",
    marginRight:0,
    marginBottom:10,
    marginTop:10,
  
  },
  hatar:{
    backgroundColor:"#ffffcc",
    borderRadius:20,
    margin:5,
    padding:10
  },
 
  
});

export default ExpScreen;

