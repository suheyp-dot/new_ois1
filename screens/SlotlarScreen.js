import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, Animated, Dimensions, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// MOCK DATA
const mockCourses = [
  { id: '1', courseCode: 'BPR 101', courseName: 'Bilgisayar Programcılığına Giriş', akts: 3, type: 'Zorunlu', status: 'completed', grade: 'A' },
  { id: '2', courseCode: 'MAT 101', courseName: 'Matematik I', akts: 4, type: 'Zorunlu', status: 'completed', grade: 'B+' },
  { id: '3', courseCode: 'ENG 101', courseName: 'İngilizce I', akts: 2, type: 'Zorunlu', status: 'current', grade: '?' },
  { id: '4', courseCode: 'TDE 101', courseName: 'Türk Dili I', akts: 2, type: 'Zorunlu', status: 'current', grade: '?' },
  { id: '5', courseCode: 'SEÇ 201', courseName: 'Seçmeli Ders I', akts: 3, type: 'Seçmeli', status: 'not_taken', grade: '-' },
  { id: '6', courseCode: 'BPR 102', courseName: 'Algoritma ve Programlama', akts: 4, type: 'Zorunlu', status: 'tekrar', grade: 'FF' },
];

const studentInfo = {
  no: '220101015',
  ad: 'SUHEYP',
  soyad: 'ELAHMED',
  gno: '3.37',
  fakulte: 'Mühendislik ve Mimarlık Fakültesi',
  program: 'Bilgisayar Mühendisliği',
  danisman: 'Dr. Öğr. Üyesi Ahmet Yılmaz',
};

const filters = [
  { id: 'all', label: 'Tümü', color: '#28a745' },
  { id: 'zorunlu', label: 'Zorunlu', color: '#17a2b8' },
  { id: 'completed', label: 'Tamamlanan', color: '#28a745' },
  { id: 'current', label: 'Bu Dönem Alınan', color: '#fd7e14' },
  { id: 'tekrar', label: 'Tekrar Edilecek', color: '#dc3545' },
  { id: 'not_taken', label: 'Alması Gereken', color: '#ced4da' },
];

// REUSABLE CUSTOM MODALS
const CustomRightDrawer = ({ visible, onClose, children }) => {
  const [show, setShow] = useState(visible);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: width, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished) setShow(false);
      });
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Modal visible={show} transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)', opacity: fadeAnim }]}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        </Animated.View>
        <Animated.View style={[styles.rightDrawerContent, { transform: [{ translateX: slideAnim }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const CustomBottomSheet = ({ visible, onClose, children }) => {
  const [show, setShow] = useState(visible);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished) setShow(false);
      });
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Modal visible={show} transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)', opacity: fadeAnim }]}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        </Animated.View>
        <Animated.View style={[styles.bottomSheetContent, { transform: [{ translateY: slideAnim }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


// MAIN COMPONENT
export default function SlotlarScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isStudentModalVisible, setStudentModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') return mockCourses;
    if (activeFilter === 'zorunlu') return mockCourses.filter(c => c.type === 'Zorunlu');
    if (activeFilter === 'completed') return mockCourses.filter(c => c.status === 'completed');
    if (activeFilter === 'current') return mockCourses.filter(c => c.status === 'current');
    if (activeFilter === 'tekrar') return mockCourses.filter(c => c.status === 'tekrar');
    if (activeFilter === 'not_taken') return mockCourses.filter(c => c.status === 'not_taken');
    return mockCourses;
  }, [activeFilter]);

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const renderCourseItem = ({ item }) => {
    let borderColor = '#94A3B8'; // default gray
    let iconName = 'help-circle';
    let iconColor = '#94A3B8';

    if (item.status === 'completed') {
      borderColor = '#28a745'; // Green
      iconName = 'checkmark-circle';
      iconColor = '#28a745';
    } else if (item.status === 'current') {
      borderColor = '#fd7e14'; // Orange
      iconName = 'time';
      iconColor = '#fd7e14';
    } else if (item.status === 'not_taken') {
      borderColor = '#ced4da'; // Gray
      iconName = 'ellipse-outline';
      iconColor = '#ced4da';
    } else if (item.status === 'tekrar') {
      borderColor = '#dc3545'; // Red
      iconName = 'refresh-circle';
      iconColor = '#dc3545';
    }

    return (
      <View style={[styles.courseCard, { borderLeftColor: borderColor }]}>
        <View style={styles.courseHeader}>
          <View style={styles.courseTitleContainer}>
            <Text style={styles.courseCode}>{item.courseCode}</Text>
            <Text style={styles.courseName}>{item.courseName}</Text>
          </View>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.detailText}>AKTS: {item.akts}</Text>
          <Text style={styles.detailText}>Tür: {item.type}</Text>
          <Text style={styles.detailText}>Harf: {item.grade}</Text>
        </View>
      </View>
    );
  };

  const getActiveFilterLabel = () => {
    const filter = filters.find(f => f.id === activeFilter);
    return filter ? filter.label : 'Tümü';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Slotlar</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setStudentModalVisible(true)}>
          <Ionicons name="person-outline" size={18} color="#1E293B" />
          <Text style={styles.actionButtonText}>Öğrenci Bilgileri</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, activeFilter !== 'all' && styles.actionButtonActive]} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options-outline" size={18} color={activeFilter !== 'all' ? '#007BFF' : '#1E293B'} />
          <Text style={[styles.actionButtonText, activeFilter !== 'all' && { color: '#007BFF' }]}>
            Filtrele ({getActiveFilterLabel()})
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* List */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>Bu filtreye uygun ders bulunamadı.</Text>}
      />

      {/* Student Info Drawer */}
      <CustomRightDrawer visible={isStudentModalVisible} onClose={() => setStudentModalVisible(false)}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Öğrenci Bilgileri</Text>
          <TouchableOpacity onPress={() => setStudentModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.panelBody}>
          <InfoRow label="Öğrenci No" value={studentInfo.no} />
          <InfoRow label="Adı" value={studentInfo.ad} />
          <InfoRow label="Soyadı" value={studentInfo.soyad} />
          <InfoRow label="GNO" value={studentInfo.gno} />
          <InfoRow label="Fakülte" value={studentInfo.fakulte} />
          <InfoRow label="Program" value={studentInfo.program} />
          <InfoRow label="Danışman" value={studentInfo.danisman} />
        </ScrollView>
      </CustomRightDrawer>

      {/* Filters Bottom Sheet */}
      <CustomBottomSheet visible={isFilterModalVisible} onClose={() => setFilterModalVisible(false)}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Filtrele</Text>
          <TouchableOpacity onPress={() => setFilterModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
        <View style={styles.panelBody}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter.id} 
              style={[
                styles.filterRow, 
                activeFilter === filter.id && styles.filterRowActive
              ]}
              onPress={() => {
                setActiveFilter(filter.id);
                setFilterModalVisible(false);
              }}
            >
              <View style={[styles.filterColorBadge, { backgroundColor: filter.color }]} />
              <Text style={[styles.filterText, activeFilter === filter.id && styles.filterTextActive]}>
                {filter.label}
              </Text>
              {activeFilter === filter.id && (
                <Ionicons name="checkmark" size={22} color={filter.color} style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </CustomBottomSheet>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  actionButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  actionButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  listContainer: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseTitleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  detailText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#94A3B8',
    fontSize: 15,
  },
  
  // Modal Styles
  rightDrawerContent: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomSheetContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30, // SafeArea padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  panelBody: {
    padding: 20,
  },
  
  // Student Info Row
  infoRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },

  // Filter Row
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterRowActive: {
    backgroundColor: '#F8FAFC',
  },
  filterColorBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  filterText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  filterTextActive: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
});
