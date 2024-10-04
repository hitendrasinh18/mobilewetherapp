import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Image, Dimensions , ImageBackground, TouchableOpacity, SafeAreaView,error } from 'react-native';
import React  from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

 


const { width, height } = Dimensions.get('window');





export default function Weather() {

  const [inputVisible, setInputVisible] = useState(false);
  const Inputsearch=()=>{
    setInputVisible(!inputVisible)
  };

  const[search,setsearch]=useState('');
  const [weatherData, setWeatherData] = useState(null);


const City =()=>{
  if(!search) return;
axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b570b29014e08f958e407400d5ae4059`
).then((res)=>{
  console.log (res.data)
  setWeatherData(res.data)
  setsearch('')
}).catch((error)=>{
  setWeatherData('')
  console.log(error)
})

};



  return (

    <SafeAreaView>
    <View style={styles.container}>
      
      
    <Image source={require("../assets/backgrond.jpg")} style={styles.Imagebackground}></Image>
     
      <View style={{position:'absolute', marginTop:25, marginLeft:85,}}>
      <Text style={{fontSize:30,fontWeight:200, }} >Weather App</Text>
      </View>
      <View style={{position:"absolute", marginTop:50,}}>
        <TouchableOpacity  onPress={Inputsearch}>
      <Image source={require("../assets/search.png")} style={{height:25,width:30,marginTop:46,}} ></Image>
      </TouchableOpacity>
        {inputVisible&&(  <TextInput style={styles.Inputbutton} placeholder='enter city' value={search} onChangeText={setsearch}></TextInput>)}
     
       
        {inputVisible&&(  <TouchableOpacity onPress={City}>
            <Text style={styles.buttondesign}>SUBMIT</Text>
           </TouchableOpacity>)}
       </View>
    
      {error && <Text style={styles.errorText}>{error}</Text>}

        {weatherData ? (
            <Text style={{ marginLeft: 50, fontWeight: 'bold', position:'absolute', marginTop:240}}>
              Weather in {weatherData.name}: {weatherData.weather[0].description}, {weatherData.main.temp}°C
            </Text>
          ) : (
            <Text style={{ marginLeft: 50, fontWeight: 'bold', position:"absolute", marginTop:250}}>
              Enter a city to see the weather.
            </Text>
          )}

          

       
       </View>
         </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    
    
    
   },   
   Imagebackground:{
    filter: 'blur(50)',
     width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode:'cover'
   },
   
  Inputbutton:{
        
        position:'absolute',
        
        marginLeft:30,
        backgroundColor:"white",
         marginTop:40,
          height: 40,
          width:250,
          borderColor: 'black',
          borderWidth: 3,
          padding: 8,
         borderRadius:25,
          
  },
  buttondesign:{
    fontSize:15,
    fontWeight:"500",
    margin:50,
    padding:5,
    marginTop:30,
    textAlign:"center",
    borderWidth:2,
    borderRadius:50,
    height:35,
    width:200,
    backgroundColor:"white"
   
  }
 

});
