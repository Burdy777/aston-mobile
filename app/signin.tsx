import { Image, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, Button, Alert, } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRouter();

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
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
         router.push('(tabs)');

        } catch (error) {
      console.error('erreur OKOK', error);
        }
      })
      .catch((error) => {
        console.error('NVEL Erreur:', error);
        Alert.alert('Erreur', 'Erreur de connexion.');
      });
    };

    // Si toutes les validations passent, vous pouvez naviguer vers la page suivante
  

 
 
    const newLocal = '';

    return (

    <ScrollView>
    <View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Adresse mail:</Text>  
      <TextInput
        style={styles.input}
        placeholder="ex: toto@exemple.com"
        placeholderTextColor={'#8C52FF'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      </View>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Mot de passe:</Text>  
      <TextInput
        style={styles.input}
        placeholder="ex: ********"
        placeholderTextColor={'#8C52FF'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.instructInput}>(8 carac min)</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Se connecter"
       onPress={handleLogin} 
       />
      </View>
      <View style={styles.buttonContainer}>
      <Link style={styles.subtitle} href={"/signup"}>Pas encore de compte? Inscrivez-vous</Link>
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
     paddingVertical: 120,
  },
  containerInput: {
    width: '100%',
    marginLeft: Dimensions.get('screen').width / 5,
    marginBottom: 20
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
    fontSize: 13,
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

