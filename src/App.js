/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';

import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import CreateAdScreen from './screens/CreateAdScreen';
import ListItemScreen from './screens/ListItemScreen';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AccountScreen from './screens/AccountScreen';
import auth from '@react-native-firebase/auth';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};
// const MyTheme = {
//   ...DefaultThemeNav,
//   colors: {
//     ...DefaultThemeNav.colors,
//     background: 'white',
//   },
// };


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'create') {
            iconName = 'plus-circle'
          } else if (route.name === 'account'){
            iconName='user'
          }
          // You can return any component that you like here!
          return <View style={styles.tab}><Feather name={iconName} size={30} color={color} /></View>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={ListItemScreen} options={{ title: ""}} />
      <Tab.Screen name="create" component={CreateAdScreen} options={{ title: "" }} />
      <Tab.Screen name="account" component={AccountScreen} options={{ title: "" }} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const [user,setUser] = useState('');
  useEffect(() => {
  const unsubscribe=auth().onAuthStateChanged(onAuthStateChanged=>{
      if(onAuthStateChanged){
        setUser(onAuthStateChanged)
      }else{
        setUser('')
      }
    })
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
const App = () => {
  return (
    // theme={theme}
    <PaperProvider >
      <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
      <View style={styles.container}>
        <Navigation />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    paddingTop: 5,
    height: 35,
    backgroundColor: "white",
  }
});

export default App;