import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockExams = [
  { id: '1', code: 'BPR254', name: 'Yapay Öğrenme', instructor: 'MUHAMMET FATİH ÇAKMAKÇI', date: '6 Nisan', day: 'Pazartesi', time: '10:00', location: 'LAB2', color: '#ff6b6b' },
  { id: '2', code: 'BPR104', name: 'Arka Yüz Programlama', instructor: 'SEVİM PİLAVCI', date: '7 Nisan', day: 'Salı', time: '16:00', location: 'LAB2', color: '#4facfe' },
  { id: '3', code: 'BPR257', name: 'Proje Yönetimi', instructor: 'FERİT PEHLİVANOĞLU', date: '7 Nisan', day: 'Salı', time: '12:00', location: 'C106', color: '#f093fb' },
  { id: '4', code: 'BPR102', name: 'Algoritma ve Programlama II', instructor: 'FERİT PEHLİVANOĞLU', date: '8 Nisan', day: 'Çarşamba', time: '12:00', location: 'LAB2', color: '#43e97b' },
  { id: '5', code: 'BPR110', name: 'Veri Tabanı Yönetimi', instructor: 'FERİT PEHLİVANOĞLU', date: '9 Nisan', day: 'Perşembe', time: '12:00', location: 'LAB2', color: '#fa709a' },
  { id: '6', code: 'BPR106', name: 'Ön Yüz Programlama', instructor: 'MUHAMMET FATİH ÇAKMAKÇI', date: '9 Nisan', day: 'Perşembe', time: '14:00', location: 'LAB2', color: '#12c2e9' }
];

export default function SinavProgramiScreen({ navigation }) {
  const renderExamTicket = ({ item }) => {
    // Split date into day number and month for better typography in the ticket stub
    const [dayNum, monthStr] = item.date.split(' ');

    return (
      <View style={styles.ticketCard}>
        {/* Left Side: Tear-off Stub */}
        <View style={[styles.ticketStub, { backgroundColor: item.color }]}>
          <Text style={styles.stubDayNum}>{dayNum}</Text>
          <Text style={styles.stubMonth}>{monthStr.toUpperCase()}</Text>
          <View style={styles.stubDivider} />
          <Text style={styles.stubDayName}>{item.day}</Text>
        </View>

        {/* Right Side: Details */}
        <View style={styles.ticketDetails}>
          <Text style={styles.courseName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.courseCode}>{item.code}</Text>
          <Text style={styles.instructorName} numberOfLines={1}>{item.instructor}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="time-outline" size={14} color="#64748B" />
              <Text style={styles.badgeText}>{item.time}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="location-outline" size={14} color="#64748B" />
              <Text style={styles.badgeText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sınav Programı</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Screen Title Area */}
      <View style={styles.titleArea}>
        <Text style={styles.mainTitle}>2025-26 Bahar Yarıyılı Ara Sınavları</Text>
        <Text style={styles.subTitle}>Meslek Yüksekokulu</Text>
      </View>

      {/* List */}
      <FlatList
        data={mockExams}
        keyExtractor={(item) => item.id}
        renderItem={renderExamTicket}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  titleArea: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  ticketStub: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  stubDayNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: -4,
  },
  stubMonth: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  stubDivider: {
    width: 30,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
    marginVertical: 8,
  },
  stubDayName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ticketDetails: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 6,
  },
  instructorName: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginLeft: 4,
  },
});
