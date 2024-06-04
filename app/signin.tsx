import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, Button, Alert, } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRouter();

    const [email, setEmail] = useState('toto123@gmail.com');
  const [password, setPassword] = useState('toto123456');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    fetch('https://backend-astonvoyage.vercel.app/api/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: email,
        mdp: password,
      }),
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Erreur de connexion');
        }
        return response.json();
      })
      .then(async (data) => {
        // Gérer la réponse de l'API, par exemple stocker le token JWT
        try {
         await AsyncStorage.setItem('accessToken', data.accessToken);
         await AsyncStorage.setItem('refreshToken', data.refreshToken);
         await AsyncStorage.setItem('prenom', data.user.nom);
         await AsyncStorage.setItem('mail', data.user.mail);
         await AsyncStorage.setItem('userId', data.user._id);
         router.push('')
        } catch (error) {
      console.error('erreur', error);
        }
      })
      .catch((error) => {
        console.error('NVEL Erreur:', error);
        Alert.alert('Erreur', 'Erreur de connexion.');
      });
   
  };

    const newLocal = '';
    return (
    <View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
      <Text style={styles.title}>Connexion</Text>
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
      <Button title="Se connecter" onPress={handleLogin} />
      <Link style={styles.subtitle} href={"/signup"}>Pas encore de compte? Inscrivez-vous</Link>
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
    color: 'white',
    marginBottom: 24,
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
  subtitle:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  }
});
