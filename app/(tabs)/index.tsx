import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router';
import { Destination } from '../model/destination';
import { BASE_URL } from '@/constants/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

const index = () => {

const [data, setData] = useState([]);
 const [token, setToken] = useState(null);

async function getToken () {
  const token =await AsyncStorage.getItem('accessToken');
 setToken(token) 
}
  useEffect(() => { 
    
getToken();
console.log(token)
    if(!data.length) {

    
fetch('https://backend-astonvoyage.vercel.app/api/destination/getAllDest')
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

const navigate = async ()=> {
  if(token) {
    try{
         await fetch('https://backend-astonvoyage.vercel.app/api/destination/logoutUser')
    AsyncStorage.clear();
    router.push('(tabs)')
    } catch(e) {
      console.log('errue logout',e)
    }

  }
  router.push('signin')
}

return (

    <ScrollView contentContainerStyle={styles.container}>

    <View style={styles.containerCnx}>
     <Button title={token ?"Déconnexion":"Se connecter"} color={Colors.purpleTheme}onPress={navigate}  />
</View>
      <Text style={styles.title}>Bienvenue chez AstonVoyage </Text>
      <Text style={styles.subtitle}>Voici nos voyages Disponible:</Text>

{
data.map((el:Destination) => {
  console.log(el._id)
 return (

<View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabTitle}>{el.nom_destination}</Text>
          <Image
            source={{ uri: BASE_URL + '/destination/download/'+el.image }}
            style={styles.image}
          />
          <Text style={styles.description}>
            {el.description}
          </Text>
          <Link style={styles.btn} href={{
            pathname:'/detail',
            params:{id:el._id}
          }}>Voir détails</Link>
        </View>

      </View>
 )

})
}
    </ScrollView>

);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C52FF',
    padding: 20,
  },
  containerCnx: {
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  btn: {
    fontSize: 18,
    color: '#8C52FF',
    marginVertical: 5,
  },
  tabContainer: {
    flexDirection: 'row',
     flexWrap: 'wrap',
    justifyContent: 'space-around',
    // width: '100%',
    marginTop: 20,
  },
  tab: {
    width: '40%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    // margin: 2.5,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
//   
});

export default index;