import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const scheduleData = {
  "Pazartesi": [
    { id: '1', code: 'BPR 257', name: 'Proje Yönetimi', time: '09:00 - 12:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#4facfe' },
    { id: '2', code: 'BPR 254', name: 'Yapay Öğrenme', time: '13:00 - 16:45', location: 'C316', color: '#f093fb' }
  ],
  "Salı": [
    { id: '3', code: 'BPR 106', name: 'Ön Yüz Programlama', time: '09:00 - 10:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#43e97b' },
    { id: '4', code: 'BPR 102', name: 'Algoritma ve Programlama II', time: '11:00 - 12:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#fa709a' },
    { id: '5', code: 'MUDU 143', name: 'Dünya Mutfakları', time: '16:00 - 18:00', location: 'C101', color: '#f6d365' },
    { id: '6', code: 'ING 102', name: 'İngilizce II', time: '18:00 - 19:45', location: 'YOK', color: '#cfd9df' }
  ],
  "Çarşamba": [
    { id: '7', code: 'BPR 102', name: 'Algoritma ve Programlama II', time: '09:00 - 10:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#fa709a' },
    { id: '8', code: 'BPR 104', name: 'Arka Yüz Programlama', time: '11:00 - 14:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#c471ed' },
    { id: '9', code: 'BPR 110', name: 'Veri Tabanı Yönetimi', time: '15:00 - 16:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#12c2e9' }
  ],
  "Perşembe": [
    { id: '10', code: 'BPR 108', name: 'Sistem Analizi ve Tasarımı', time: '09:00 - 11:45', location: 'AMFİ 9', color: '#f6d365' },
    { id: '11', code: 'BPR 110', name: 'Veri Tabanı Yönetimi', time: '13:00 - 14:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#12c2e9' },
    { id: '12', code: 'BPR 106', name: 'Ön Yüz Programlama', time: '15:00 - 16:45', location: 'BİLİŞİM LABORATUVARI-3', color: '#43e97b' },
    { id: '13', code: 'TRD 102', name: 'Türk Dili II', time: '18:00 - 19:45', location: 'ONL', color: '#cfd9df' }
  ],
  "Cuma": [], "Cumartesi": [], "Pazar": []
};

const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function DersProgramiScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState("Pazartesi");

  const renderTimelineItem = ({ item, index }) => {
    const isLast = index === scheduleData[selectedDay].length - 1;
    const [startTime, endTime] = item.time.split(' - ');
    
    return (
      <View style={styles.timelineRow}>
        {/* Left Side: Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.startTime}>{startTime}</Text>
          <Text style={styles.endTime}>{endTime}</Text>
        </View>

        {/* Middle: Timeline Graphic */}
        <View style={styles.lineIndicatorContainer}>
          <View style={[styles.timelineDot, { borderColor: item.color }]} />
          {!isLast && <View style={[styles.timelineLine, { backgroundColor: item.color }]} />}
        </View>

        {/* Right Side: Course Card */}
        <View style={styles.cardContainer}>
          <View style={[styles.courseCard, { borderLeftColor: item.color, backgroundColor: `${item.color}15` }]}>
            <Text style={styles.courseCode}>{item.code}</Text>
            <Text style={styles.courseName}>{item.name}</Text>
            
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#64748B" />
              <Text style={styles.locationText}>{item.location}</Text>
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
        <Text style={styles.headerTitle}>Ders Programı</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Day Selector */}
      <View style={styles.daySelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelectorContent}>
          {days.map((day) => {
            const isActive = selectedDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayPill, isActive && styles.dayPillActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, isActive && styles.dayTextActive]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Timeline List */}
      <View style={styles.listContainer}>
        {scheduleData[selectedDay].length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateEmoji}>🎉</Text>
            <Text style={styles.emptyStateText}>Bugün dersiniz bulunmamaktadır.</Text>
          </View>
        ) : (
          <FlatList
            data={scheduleData[selectedDay]}
            keyExtractor={(item) => item.id}
            renderItem={renderTimelineItem}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
  daySelectorContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 12,
  },
  daySelectorContent: {
    paddingHorizontal: 16,
  },
  dayPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  dayPillActive: {
    backgroundColor: '#0F172A', // Mudanya primary dark
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  dayTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    padding: 16,
    paddingTop: 24,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timeContainer: {
    width: 65,
    alignItems: 'flex-end',
    paddingRight: 12,
    paddingTop: 2, // Align with dot
  },
  startTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  endTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  lineIndicatorContainer: {
    alignItems: 'center',
    width: 20,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    backgroundColor: '#F8FAFC',
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    opacity: 0.3,
    marginTop: -2,
    marginBottom: -2, // Overlap slightly with next dot
  },
  cardContainer: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 24, // Space between cards
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
});
