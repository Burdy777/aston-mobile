import { router } from 'expo-router';
import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert,Text } from 'react-native';

export default function PaiementScreen() {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numeroCarte, setNumeroCarte] = useState('');
  const [cryptogramme, setCryptogramme] = useState('');
  const [dateExpiration, setDateExpiration] = useState('');

  const validateFields = () => {
    if (nom === '' || prenom === '' || numeroCarte === '' || cryptogramme === '' || dateExpiration === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Validation du numéro de carte
    if (numeroCarte.length !== 16 || isNaN(numeroCarte)) {
      Alert.alert('Erreur', 'Numéro de carte invalide');
      return;
    }

    // Validation du cryptogramme
    if (cryptogramme.length !== 3 || isNaN(cryptogramme)) {
      Alert.alert('Erreur', 'Cryptogramme invalide');
      return;
    }

    // Validation de la date d'expiration
    // Vous pouvez implémenter une validation plus précise en fonction de vos besoins
    if (dateExpiration.length !== 5 || !dateExpiration.includes('/')) {
      Alert.alert('Erreur', 'Date d\'expiration invalide');
      return;
    }

    // Si toutes les validations passent, vous pouvez naviguer vers la page suivante
    router.push('(tabs)/reservations');
  };

  return (

    <View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
        <Text style={styles.title}>Paiement</Text>

      <Text style={styles.libelInput}>Nom:</Text>  
      <TextInput
      style={styles.input}
        placeholder="ex:Doe"
        value={nom}
        onChangeText={setNom}
        placeholderTextColor={'#8C52FF'}
      />
      <Text style={styles.libelInput}>Prénom:</Text>
      <TextInput
      style={styles.input}
        placeholder="ex:John"
        value={prenom}
        onChangeText={setPrenom}
        placeholderTextColor={'#8C52FF'}
      />
      <Text style={styles.libelInput}>Numéro de carte:</Text>  
      <TextInput
      style={styles.input}
        placeholder="ex: 1234123412341234"
        value={numeroCarte}
        onChangeText={setNumeroCarte}
        keyboardType="numeric"
        placeholderTextColor={'#8C52FF'}
      />
      <Text style={styles.instructInput}>(16 carac)</Text>
      
      <Text style={styles.libelInput}>Cryptogramme:(CSV)</Text>
      <TextInput
      style={styles.input}
        placeholder="ex: 123"
        value={cryptogramme}
        onChangeText={setCryptogramme}
        keyboardType="numeric"
        placeholderTextColor={'#8C52FF'}
        textAlign='center'
      />
      <Text style={styles.libelInput}>Date d'expiration (MM/YY):</Text>
      <TextInput
      style={styles.input}
        placeholder="ex: MM/YY"
        value={dateExpiration}
        onChangeText={setDateExpiration}
        keyboardType="numeric"
        placeholderTextColor={'#8C52FF'}
      />
      <Button
        title="Payer"
        color={'white'}
        onPress={validateFields}
      />
    </View>
  );
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
     backgroundColor: '#8C52FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: 'white',

  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderColor: '#8C52FF',
    backgroundColor: 'white',
    width: '80%',
  },
  subtitle:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  img:{
    width: 250,
    height: 250,
    marginBottom: -25,
  },
  libelInput:{
    fontWeight: 'bold',
    color: 'white',
    textAlign:'left'
  },
  instructInput:{
    fontWeight: '200',
  },
});


