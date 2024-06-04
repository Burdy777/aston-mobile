import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import React from 'react'

import { Link } from 'expo-router';
import { useRouter } from 'expo-router'

const index = () => {
return (

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenue chez AstonVoyage </Text>
      <Text style={styles.subtitle}>Voici nos voyages Disponible:</Text>

      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabTitle}>Marrakech</Text>
          <Image
            source={{ uri: 'https://example.com/your-image-url1.jpg' }}
            style={styles.image}
          />
          <Text style={styles.description}>
            ville marocaine
          </Text>
          <Link style={styles.subtitle} href="/details">Voir détails</Link>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabTitle}>Marseille</Text>
          <Image
            source={{ uri: 'https://example.com/your-image-url2.jpg' }}
            style={styles.image}
          />
          <Text style={styles.description}>
            ville française
          </Text>
          <Link style={styles.subtitle} href="/details">Voir détails</Link>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabTitle}>Port au Prince</Text>
          <Image
            source={{ uri: 'https://example.com/your-image-url3.jpg' }}
            style={styles.image}
          />
          <Text style={styles.description}>
            Capitale de Haiti
          </Text>
          <Link style={styles.subtitle} href="/details">Voir détails</Link>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabTitle}>Kinshasa</Text>
          <Image
            source={{ uri: 'https://example.com/your-image-url4.jpg' }}
            style={styles.image}
          />
          <Text style={styles.description}>
            capitale de la RDC
          </Text>
          <Link style={styles.subtitle} href="/details">Voir détails</Link>
        </View>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  tab: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 5,
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