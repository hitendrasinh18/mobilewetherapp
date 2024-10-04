import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Image, Button, ImageBackground } from 'react-native';
import Weather from './src/weather';
export default function WeatherApp() {
  return (
    <View style={styles.container}>
    
  <Weather></Weather>
 
  </View>
    
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    resizeMode:'cover',
    flexDirection:"column",
    
  },

});
