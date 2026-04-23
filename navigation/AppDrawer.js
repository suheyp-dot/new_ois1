import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainTabs from './MainTabs';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { userData, logout } = useContext(AuthContext);
  const username = userData?.KulAdSoyad || userData?.name || 'Öğrenci';

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.drawerHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#1E293B" />
          </View>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.userRole}>Öğrenci</Text>
        </View>

        <View style={styles.drawerItemsContainer}>
          <DrawerItem
            label="Ders İşlemleri"
            labelStyle={styles.drawerItemLabel}
            icon={() => <Ionicons name="book-outline" size={24} color="#4CAF50" />} // Green icon
            onPress={() => {}}
          />
          <DrawerItem
            label="Belgeler"
            labelStyle={styles.drawerItemLabel}
            icon={() => <Ionicons name="document-text-outline" size={24} color="#9C27B0" />} // Purple icon
            onPress={() => {}}
          />
          <DrawerItem
            label="Diğer İşlemler"
            labelStyle={styles.drawerItemLabel}
            icon={() => <Ionicons name="grid-outline" size={24} color="#009688" />} // Teal icon
            onPress={() => {}}
          />
        </View>
      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1E293B',
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  scrollContainer: {
    paddingTop: 0,
  },
  drawerHeader: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  drawerItemsContainer: {
    paddingTop: 16,
  },
  drawerItemLabel: {
    color: '#F8FAFC',
    fontSize: 16,
    marginLeft: -16,
  },
  drawerFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  }
});
