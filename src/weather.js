import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, error } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Weather() {

  const [inputVisible, setInputVisible] = useState(false);
  const Inputsearch = () => {
    setInputVisible(!inputVisible)
  };

  const [search, setsearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  const City = () => {
    if (!search) return;
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b570b29014e08f958e407400d5ae4059&units=metric`
    ).then((res) => {
      console.log(res.data)
      setWeatherData(res.data)
      setsearch('')
    }).catch((error) => {
      setWeatherData('')
      console.log(error)
    })

  };



  return (

    <View style={styles.container}>
      <View>

        <Image blurRadius={10} source={require("../assets/background.jpg")} style={styles.Imagebackground}></Image>

        <View style={{ position: 'absolute', marginTop: 25, marginLeft: 85, }}>

          <Text style={{ fontSize: 30, fontWeight: 200, }} >Weather App</Text>

        </View>






        <View style={{ position: "absolute", marginTop: 50, }}>
          <TouchableOpacity onPress={Inputsearch}>
            <Image source={require("../assets/search.png")} style={{ height: 25, width: 30, marginTop: 46, tintColor: "white", }} ></Image>
          </TouchableOpacity>
          {inputVisible && (<TextInput style={styles.Inputbutton} placeholder='enter city' value={search} onChangeText={setsearch} placeholderTextColor={"black"} ></TextInput>)}


          {inputVisible && (<TouchableOpacity onPress={City}>
            <Text style={styles.buttondesign}>SUBMIT</Text>
          </TouchableOpacity>)}
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", marginTop: 350, flex: 1, alignItems: "center", }}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {weatherData ? (
            <Text style={{ marginLeft: 50, fontWeight: 'bold', position: 'absolute', marginTop: 240 }}>
              <View style={{ flexDirection: "column", justifyContent: 'center' }}>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Image source={require("../assets/weather-app.png")} style={{ width: 60, height: 60, }} />
                </View>
               <Text style={{ fontSize: 50, fontWeight: 700, textAlign: "centerright" }}>{weatherData.main.temp}°C</Text>

                <Text style={{ fontSize: 30, fontWeight: 400, marginBottom: 40, textAlign: "center", color: "black" }}>{weatherData.name}</Text>
                
                <Text style={{ fontSize: 40, fontWeight: 340, }}>{weatherData.weather[0].description}</Text>
              </View>





            </Text>


          ) : (
            <Text style={{ marginLeft: 50, fontWeight: 'bold', position: "absolute", marginTop: 250 }}>
              Enter a city to see the weather.
            </Text>

          )}

        </View>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",



  },
  Imagebackground: {

    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: 0,
    left: 0,


  },

  Inputbutton: {

    position: 'absolute',

    marginLeft: 30,
    backgroundColor: "white",

    marginTop: 40,
    height: 40,
    width: 325,
    borderColor: 'white',
    borderWidth: 1,
    padding: 8,
    borderRadius: 25,

  },
  buttondesign: {
    fontSize: 15,
    fontWeight: "500",
    margin: 50,
    padding: 5,
    marginTop: 30,
    marginLeft: 80,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 50,
    height: 35,
    width: 200,
    backgroundColor: "white",
    borderColor: "white"

  }


});
