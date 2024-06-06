import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as React from 'react';
import  { useEffect, useState } from 'react'
import  AsyncStorage from '@react-native-async-storage/async-storage';

import {  useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';
import { transformDate } from './utils/date';

export default function DetailsScreen() {
const params = useLocalSearchParams()
console.log(params.id)
const router = useRouter();

const [data, setData] = useState(undefined);

const isConnected = async () => {
const accessToken =await AsyncStorage.getItem('accessToken');
if(accessToken) {
  alert(accessToken)
  router.push('/paiement')
} else {
  alert('Veuillez vous connecter avant de reserver')
  router.push('/signin')

}
}

  useEffect(() => { 
    if(!data) {
fetch('https://backend-astonvoyage.vercel.app/api/destination/getDest/'+params.id)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Erreur de connexion');
        }
        return response.json();
      })
      .then((data) => {
         setData(data)
         console.log(data)    
      })
      .catch((error) => {
        console.error('NVEL Erreur:', error);
      });
    }
});

if (data){
  return (
  
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>{data.nom_destination}!</Text>
      <Image
        source={{ uri: 'https://backend-astonvoyage.vercel.app/api/destination/download/'+data.image }}
        style={styles.detailsImage}
      />
      <Text style={styles.detailsDescription}>{data.description}</Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Date de départ:</Text> {transformDate(data.date_depart,'DD-MM-YYYY')}</Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Date de retour:</Text> { transformDate(data.date_retour,'DD-MM-YYYY') }</Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Lieu: {data.nom_destination}</Text></Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Prix:</Text> {data.prix} €</Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Aéroport de départ:</Text> {data?.vols.aeroport_depart}</Text>
      <Text style={styles.detailsText}><Text style={styles.type}>Aéroport d'arrivée:</Text> {data?.vols.aeroport_arrivee}</Text>

      <View style={styles.containerButton}>
      <Button color={'#714aff'} title='Passez au paiement !'  onPress={isConnected}/>
      </View>
    </View>
  );
}
  

}

const styles = StyleSheet.create({
      detailsContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#8C52FF',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.orangeTheme,
  },
  type: {
    fontWeight:'bold',
    fontSize:20
  },
  detailsImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  detailsDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.orangeTheme,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white'
    
  },
  detailsPaiement:{
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  containerButton: {
    marginTop:20
  }
});
