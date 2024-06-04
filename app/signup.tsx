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
  const [confirmPassword, setConfirmPassword] = useState('');

    return (

<View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
      <Text style={styles.title}>Inscription</Text>
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
      <Link style={styles.title} href="/home">S'inscrire</Link>
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


