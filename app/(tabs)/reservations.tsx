import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router'
import { View, Text, Button, ScrollView } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { Destination } from '../model/destination';
import { BASE_URL } from '@/constants/Url';

export default function TabTwoScreen() {

  const params = useLocalSearchParams()
console.log(params.id)


const [data, setData] = useState([]);


useEffect(() => { 
  const getDetail =async () => {
      const userId =await AsyncStorage.getItem('userId');
     if (data.length ==0) {
fetch('https://backend-astonvoyage.vercel.app/api/booking/getAllBook/'+userId)
      .then( (response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Erreur de connexion');
        }
        return response.json();
      })
      .then((data) => {
        setData(data)

        // Gérer la réponse de l'API, par exemple stocker le token JWT
    
      })
      .catch((error) => {
        console.error('NVEL Erreur:', error);
      });
} 
    }
    getDetail()
});

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Mes Réservations </Text>
      <Text style={styles.subtitle}>Voici les voyages que vous avez reservé:</Text>

{
data.map((el:Destination) => {
  console.log(el._id)
 return (

<View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabTitle}>{el.nom_destination}</Text>
          <Image
            source={{ uri: BASE_URL + '/destination/download/'+el.image }}
            style={styles.image}
          />
          <Text style={styles.description}>
            {el.description}
          </Text>
          <Link style={styles.btn} href={{
            pathname:'/detail',
            params:{id:el._id}
          }}>Voir détails</Link>
        </View>

      </View>
 )

})
}
      
    </ScrollView>

);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C52FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
  },
  btn: {
    fontSize: 18,
    color: '#8C52FF',
    marginVertical: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    // width: '100%',
    marginTop: 20,
  },
  tab: {
    width: '44%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 5,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
//   
});
