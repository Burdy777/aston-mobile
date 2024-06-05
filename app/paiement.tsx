
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router'



export default function paiementScreen() {

  const router = useRouter();

const PaiementSucces = async () => {
    
      alert(' Votre Paiement a été éfféctué avec succes a bientot :)');
      // router.push('(tabs)/index')
    }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
      <Text style={styles.title}>Paiement</Text>
      <TextInput
        style={styles.input}
        placeholder="nom"
        placeholderTextColor={'#8C52FF'}
        // value={}
        // onChangeText={setNom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de carte"
        placeholderTextColor={'#8C52FF'}
        // value={nom}
        // onChangeText={setNom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="CVC"
        placeholderTextColor={'#8C52FF'}
        // value={nom}
        // onChangeText={setNom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="date d'éxpiration"
        placeholderTextColor={'#8C52FF'}
        // value={}
        // onChangeText={setNom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Paiement" onPress={PaiementSucces}/>
    </View>
  );
};

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
  img:{
    width: 250,
    height: 250,
    marginBottom: -25,
  },
});
