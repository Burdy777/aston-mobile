import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert,Text } from 'react-native';
import { Dimensions, ScrollView } from 'react-native'
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PaiementScreen() {
  const params = useLocalSearchParams()

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numeroCarte, setNumeroCarte] = useState(0);
  const [cryptogramme, setCryptogramme] = useState();
  const [dateExpiration, setDateExpiration] = useState('');
  const [userId, setUserId] = useState('');

  let token:any;

  useEffect(()=> {
    if(!token || !userId) {
      getDataStorage()
    }
  },[])

  async function getDataStorage () {
    token = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');
    setUserId(userId)
  }

  const validateFields = () => {
    if (nom === '' || prenom === '' || !numeroCarte.toString().length  || cryptogramme === '' || dateExpiration === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Validation du numéro de carte
    if (numeroCarte.toString().length !== 16 || isNaN(numeroCarte)) {
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
    const month = dateExpiration.split("/")[0]
    const year = dateExpiration.split("/")[1]
    console.log(month, year)


    if (dateExpiration.length !== 5 || !dateExpiration.includes('/') ) {
      Alert.alert('Erreur', 'Date d\'expiration invalide');
      return;
    }
    console.log('useId bro',userId,
      params.id);
    
    // Si toutes les validations passent, vous pouvez naviguer vers la page suivante
    fetch('https://backend-astonvoyage.vercel.app/api/booking/myBook',{
      method:'POST',
      body: JSON.stringify({
        userId,
        destinationId:params.id
      
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(()=> {
      router.push('(tabs)/reservations');

    }).catch(e=> {
      console.log(e, 'error')
    })
  };

  return (

    <ScrollView >
      <View style={styles.container}>
        <Image style={styles.img} source={require('./../assets/images/logo.png')}/>
        <Text style={styles.title}>Laissez votre routine derrière ! </Text>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Nom:</Text>  
      <TextInput
      style={styles.input}
        placeholder="ex:Doe"
        value={nom}
        onChangeText={setNom}
        placeholderTextColor={'#8C52FF'}
      />
      </View>

       
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Prénom:</Text>
      <TextInput
      style={styles.input}
        placeholder="ex:John"
        value={prenom}
        onChangeText={setPrenom}
        placeholderTextColor={'#8C52FF'}
      />
      </View>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Numéro de carte:</Text>  
      <TextInput
      style={styles.input}
        placeholder="ex: 1334169412310414"
        value={numeroCarte}
        onChangeText={setNumeroCarte}
        keyboardType="numeric"
        maxLength={16}
        placeholderTextColor={'#8C52FF'}
      />
      <Text style={styles.instructInput}>*16 Caractères</Text>
      </View>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Cryptogramme:(CSV)</Text>
      <TextInput
      style={styles.input}
        placeholder="ex: 123"
        value={cryptogramme}
        maxLength={3}
        onChangeText={setCryptogramme}
        keyboardType="numeric"
        placeholderTextColor={'#8C52FF'}
      />
      </View>
      <View style={styles.containerInput}>
      <Text style={styles.libelInput}>Date d'expiration (MM/YY):</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: 06/26"
        value={dateExpiration}
        onChangeText={setDateExpiration}
        placeholderTextColor={'#8C52FF'}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Button
        title="Payer"
        color={Colors.purpleTheme}
        onPress={validateFields}
      />
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
  },
  containerInput: {
    width: '100%',
    marginLeft: Dimensions.get('screen').width / 5,
    marginBottom:30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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


