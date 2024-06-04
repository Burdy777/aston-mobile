import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import * as React from 'react';

import { Link } from 'expo-router';
import { useRouter } from 'expo-router'

export default function DetailsScreen() {
  return (

    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>nom de la dest</Text>
      <Image
        source={{ uri: 'https://example.com/your-image-url1.jpg' }}
        style={styles.detailsImage}
      />
      <Text style={styles.detailsDescription}>description</Text>
      <Text style={styles.detailsText}>Date de départ: dateDepart</Text>
      <Text style={styles.detailsText}>Date de retour: dateRetour</Text>
      <Text style={styles.detailsText}>Lieu: lieu</Text>
      <Text style={styles.detailsText}>Prix: prix</Text>
      <Text style={styles.detailsText}>Aéroport de départ: aeroportDepart</Text>
      <Text style={styles.detailsText}>Aéroport d'arrivée: aeroportArrivee</Text>

      <Link style={styles.detailsPaiement} href={"/paiement"}>Passez au Paiement !</Link>
    </View>
  );
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
