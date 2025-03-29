import { StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Weather() {
  const [inputVisible, setInputVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const Inputsearch = () => {
    setInputVisible(!inputVisible);
  };

  const City = () => {
    if (!search) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b570b29014e08f958e407400d5ae4059&units=metric`
      )
      .then((res) => {
        setWeatherData(res.data);
        setSearch('');
      })
      .catch((error) => {
        setWeatherData(null);
        console.log(error);
      });
  };

  // Function to get weekday name
  const getWeekday = (timestamp) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backgrond.jpg')} style={styles.backgroundImage} />
      
      {/* Dark Overlay for Better Visibility */}
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
        <TouchableOpacity onPress={Inputsearch}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      {inputVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="black"
          />
          <TouchableOpacity onPress={City} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Weather Data */}
      <View style={styles.weatherContainer}>
        {weatherData ? (
          <View style={styles.weatherCard}>
            <Image source={require('../assets/weather-app.png')} style={styles.weatherIcon} />
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.weekday}>{getWeekday(weatherData.dt)}</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          </View>
        ) : (
          <Text style={styles.placeholderText}>Enter a city to see the weather.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better contrast
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchIcon: {
    height: 25,
    width: 30,
    tintColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 45,
    width: 250,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  weekday: {
    fontSize: 22,
    color: '#E0E0E0',
    marginVertical: 5,
  },
  description: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

