import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';
import SlotlarScreen from '../screens/SlotlarScreen';
import DersProgramiScreen from '../screens/DersProgramiScreen';
import SinavProgramiScreen from '../screens/SinavProgramiScreen';
import SinavSonuclariScreen from '../screens/SinavSonuclariScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Drawer" component={AppDrawer} />
    <Stack.Screen name="SlotlarScreen" component={SlotlarScreen} />
    <Stack.Screen name="DersProgramiScreen" component={DersProgramiScreen} />
    <Stack.Screen name="SinavProgramiScreen" component={SinavProgramiScreen} />
    <Stack.Screen name="SinavSonuclariScreen" component={SinavSonuclariScreen} />
  </Stack.Navigator>
);

export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  }
});
