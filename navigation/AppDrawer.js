import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainTabs from './MainTabs';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const AccordionItem = ({ isExpanded, children }) => {
  const animation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000]
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
      {children}
    </Animated.View>
  );
};

const CustomDrawerContent = (props) => {
  const { userData, logout } = useContext(AuthContext);
  const username = userData?.KulAdSoyad || userData?.name || 'Öğrenci';
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const dersIslemleriSub = [
    'Slotlar', 'Ders Seçme', 'Dersten Çekilme Başvurusu',
    'Mazeret Ders Başvuruları', 'Stajlarım'
  ];
  
  const belgelerSub = [
    'Transkript', 'Ders Programı', 'Sınav Programı', 'Hazırlık Not Belgesi', 'Ders Kayıt Onay Formu',
    'Online Belge Talep', 'Sınav Sonuçları'
  ];

  const digerIslemlerSub = [
    'Parola Değiştirme', 'Anket', 'GNO Hesaplama', 'Çift Ana Dal Başvurusu',
    'Finans Bilgileri', 'İş/Staj İlanları', 'Kabul Mektubu', 'Kulüp Üyelik Formu',
    'Mesajlar', 'Randevu', 'Tez/Proje Danışmanı Seçme', 'Tez/Proje Konu Seçme',
    'Tezli / Tezsiz Geçiş Başvuru'
  ];

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
            icon={() => (
              <View style={{ marginRight: 8 }}>
                <Ionicons name="book-outline" size={24} color="#4CAF50" />
              </View>
            )} // Green icon
            onPress={() => toggleSection('ders')}
          />
          <AccordionItem isExpanded={expandedSection === 'ders'}>
            <View style={styles.subItemsContainer}>
              {dersIslemleriSub.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.subItem} 
                  onPress={() => {
                    if (item === 'Slotlar') {
                      props.navigation.navigate('SlotlarScreen');
                    }
                  }}
                >
                  <Text style={styles.subItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionItem>
          <DrawerItem
            label="Belgeler"
            labelStyle={styles.drawerItemLabel}
            icon={() => (
              <View style={{ marginRight: 8 }}>
                <Ionicons name="document-text-outline" size={24} color="#9C27B0" />
              </View>
            )} // Purple icon
            onPress={() => toggleSection('belgeler')}
          />
          <AccordionItem isExpanded={expandedSection === 'belgeler'}>
            <View style={styles.subItemsContainer}>
              {belgelerSub.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.subItem} 
                  onPress={() => {
                    if (item === 'Ders Programı') {
                      props.navigation.navigate('DersProgramiScreen');
                    } else if (item === 'Sınav Programı') {
                      props.navigation.navigate('SinavProgramiScreen');
                    } else if (item === 'Sınav Sonuçları') {
                      props.navigation.navigate('SinavSonuclariScreen');
                    }
                  }}
                >
                  <Text style={styles.subItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionItem>
          <DrawerItem
            label="Diğer İşlemler"
            labelStyle={styles.drawerItemLabel}
            icon={() => (
              <View style={{ marginRight: 8 }}>
                <Ionicons name="grid-outline" size={24} color="#009688" />
              </View>
            )} // Teal icon
            onPress={() => toggleSection('diger')}
          />
          <AccordionItem isExpanded={expandedSection === 'diger'}>
            <View style={styles.subItemsContainer}>
              {digerIslemlerSub.map((item, index) => (
                <TouchableOpacity key={index} style={styles.subItem} onPress={() => {}}>
                  <Text style={styles.subItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionItem>
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
  },
  subItemsContainer: {
    paddingLeft: 40,
    paddingVertical: 4,
  },
  subItem: {
    paddingVertical: 10,
  },
  subItemText: {
    color: '#CBD5E1', // light gray/off-white
    fontSize: 14,
  }
});
