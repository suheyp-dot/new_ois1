import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import OISScreen from '../screens/OISScreen';

const Tab = createBottomTabNavigator();

const DummyScreen = ({ route }) => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyText}>{route.name} Ekranı</Text>
  </View>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1E293B', // Dark Blue
        tabBarInactiveTintColor: '#94A3B8', // Gray
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          backgroundColor: '#FFFFFF',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          
          if (route.name === 'Anasayfa') {
            iconName = 'home';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Haberler') {
            iconName = 'newspaper';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'ois') {
            iconName = 'book';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={DummyScreen} />
      <Tab.Screen name="Haberler" component={DummyScreen} />
      <Tab.Screen name="ois" component={OISScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  dummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  dummyText: {
    fontSize: 18,
    color: '#64748B',
  }
});
