import { Image, StyleSheet, Platform, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

import { Link } from 'expo-router';
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';

export default function InscriptionScreen() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Les mot de passe ne se ressemble pas', 'Please make sure your passwords match');
      return;
    }

    // Validation de l'email
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Erreur', 'Adresse e-mail invalide');
      return;
    }

    // Validation du mot de passe
    if (password.length < 8) {
      Alert.alert('Erreur', 'Mot de passe doit contenir au moins 8 caractères');
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

    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')} />
        <Text style={styles.title}>Inscription</Text>
      <View style={styles.containerInput}>
        <Text style={styles.libelInput}>Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="ex:Doe"
          placeholderTextColor={'#8C52FF'}
          value={nom}
          onChangeText={setNom}
        />
        </View>
      <View style={styles.containerInput}>
        <Text style={styles.libelInput}>Prenom:</Text>
        <TextInput
          style={styles.input}
          placeholder="ex:John"
          placeholderTextColor={'#8C52FF'}
          value={prenom}
          onChangeText={setPrenom}
        />
        </View>
      <View style={styles.containerInput}>
        <Text style={styles.libelInput}>Adresse mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: toto@exemple.com"
          placeholderTextColor={'#8C52FF'}
          value={email}
          onChangeText={setEmail}
        />
        </View>
      <View style={styles.containerInput}>
        <Text style={styles.libelInput}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: ********"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'#8C52FF'}
          secureTextEntry
        />
        <Text style={styles.instructInput}>*8 Caractères min</Text>
        </View>

      <View style={styles.containerInput}>
        <Text style={styles.libelInput}>Confirmer votre mot de passe:</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: ********"
          placeholderTextColor={'#8C52FF'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        </View>
        <View style={styles.buttonContainer}>
        <Button 
        title="Inscription" 
        color={Colors.purpleTheme}
        onPress={handleSignUp} />
        </View>
        <View style={styles.buttonContainer}>
        <Link style={styles.subtitle} href="/signin">Déjà inscrit? Connectez-vous</Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
     backgroundColor: '#8C52FF',
     paddingVertical: 10,
  },
  containerInput: {
    width: '100%',
    marginLeft: Dimensions.get('screen').width / 5,
    marginBottom:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.orangeTheme,

  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor: '#8C52FF',
    backgroundColor: 'white',
    width: '80%',
    paddingVertical:10
  },
  subtitle:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  img:{
    width: 200,
    height: 200,
    marginTop: 30,
  },
  libelInput:{
    fontWeight: 'bold',
    color: 'white',
  },
  instructInput:{
    fontWeight: '700',
    fontSize:15,
    color: Colors.orangeTheme,

  },
  buttonContainer: {
    marginBottom:30,
    width:250
  }
});


