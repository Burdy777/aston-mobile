import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, Button, Alert, } from 'react-native';

import { Link } from 'expo-router';
import { useRouter } from 'expo-router'

export default function InscriptionScreen() {

    const router = useRouter();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Les mot de passe ne se ressemble pas', 'Please make sure your passwords match');
      return;
    }

    try {
      const response = await fetch('https://backend-astonvoyage.vercel.app/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          mail: email,
          mdp: password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        // Inscription réussie, rediriger vers l'écran de connexion
        Alert.alert('Success', 'Inscription Réussie');
        router.navigate('signin');
      } else {
        // Gestion des erreurs d'inscription
        Alert.alert('Inscription échoué', json.message || 'Une erreur est arrivée durant votre inscription');
      }
    } catch (error) {
      Alert.alert('Error', 'Une erreur est arrivée. Veuillez revenir plus tard svp');
    }
  };

    return (

<View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="nom"
        placeholderTextColor={'#8C52FF'}
        value={nom}
        onChangeText={setNom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="prenom"
        placeholderTextColor={'#8C52FF'}
        value={prenom}
        onChangeText={setPrenom}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#8C52FF'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={'#8C52FF'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={'#8C52FF'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Inscription" onPress={handleSignUp} />
      <Link style={styles.subtitle} href="/signin">Déjà inscrit? Connectez-vous</Link>
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
});


