import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockData = [
  { id: '1', code: 'BPR254', name: 'Yapay Öğrenme', instructor: 'MUHAMMET FATİH ÇAKMAKÇI', date: '6 Nisan', day: 'Pazartesi', time: '10:00', location: 'LAB2', color: '#ff6b6b' },
  { id: '2', code: 'BPR104', name: 'Arka Yüz Programlama', instructor: 'SEVİM PİLAVCI', date: '7 Nisan', day: 'Salı', time: '16:00', location: 'LAB2', color: '#4facfe' },
  { id: '3', code: 'BPR257', name: 'Proje Yönetimi', instructor: 'FERİT PEHLİVANOĞLU', date: '7 Nisan', day: 'Salı', time: '12:00', location: 'C106', color: '#f093fb' }
];

const TicketCard = ({ item }) => {
  // Split date to show day number and month name separately
  const [dayNum, monthName] = item.date.split(' ');

  return (
    <View style={styles.ticketContainer}>
      {/* Left Side: Date Block */}
      <View style={[styles.dateBlock, { backgroundColor: item.color }]}>
        <Text style={styles.dateNumText}>{dayNum}</Text>
        <Text style={styles.monthText}>{monthName}</Text>
        <View style={styles.separator} />
        <Text style={styles.dayNameText}>{item.day}</Text>
      </View>

      {/* Right Side: Details Block */}
      <View style={styles.detailsBlock}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseCode}>{item.code}</Text>
        </View>
        <Text style={styles.courseName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.instructorContainer}>
          <Ionicons name="person-outline" size={14} color="#64748B" />
          <Text style={styles.instructorName} numberOfLines={1}>{item.instructor}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#334155" />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={16} color="#334155" />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function SinavProgramiScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sınav Programı</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TicketCard item={item} />}
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
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  ticketContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden', // Ensures the colored block corners match the card border radius
  },
  dateBlock: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  dateNumText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  monthText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  separator: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 8,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  detailsBlock: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  courseHeader: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  courseName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructorName: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    marginTop: 'auto',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginLeft: 6,
  },
});
