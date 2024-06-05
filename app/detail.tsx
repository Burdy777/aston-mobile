import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import * as React from 'react';
import  { useEffect, useState } from 'react'

import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router'

export default function DetailsScreen() {
const params = useLocalSearchParams()
console.log(params.id)

const [data, setData] = useState([]);

  useEffect(() => { 
    if(!data.length) {

    
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

        // Gérer la réponse de l'API, par exemple stocker le token JWT
    
      })
      .catch((error) => {
        console.error('NVEL Erreur:', error);
      });
    }
});

{
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>{data.nom_destination}</Text>
      <Image
        source={{ uri: 'https://backend-astonvoyage.vercel.app/api/destination/download/'+data.image }}
        style={styles.detailsImage}
      />
      <Text style={styles.detailsDescription}>{data.description}</Text>
      <Text style={styles.detailsText}>Date de départ: {data.date_depart }</Text>
      <Text style={styles.detailsText}>Date de retour: {data.date_retour }</Text>
      <Text style={styles.detailsText}>Lieu: {data.nom_destination}</Text>
      <Text style={styles.detailsText}>Prix: {data.prix}</Text>
      <Text style={styles.detailsText}>Aéroport de départ: {data.vols.aeroport_depart}</Text>
      <Text style={styles.detailsText}>Aéroport d'arrivée: {data.vols.aeroport_arrivee}</Text>

      <Link style={styles.detailsPaiement} href={"/paiement"}>Passez au Paiement !</Link>
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
    color: 'black',
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
    color: 'white',
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  detailsPaiement:{
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  }
});
