import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherAppHome from './src/WetherAppHome'; 
import Weather from './src/weather'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={WeatherAppHome} options={{ headerShown: false }} />
        <Stack.Screen name="Weather" component={Weather} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
