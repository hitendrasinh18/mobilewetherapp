import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WeatherAppHome({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Weather');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/backgroundwether.jpg')}
        style={styles.backgroundImage}
      />

      <View style={styles.overlay} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.subtitle}>Stay updated with the latest weather!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback color
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
  },
  textContainer: {
    marginTop: 80,
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#E0E0E0',
    textAlign: 'left',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
