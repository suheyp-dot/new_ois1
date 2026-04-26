import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function OISScreen({ navigation }) {
  const { userData } = useContext(AuthContext);
  const [countdown, setCountdown] = useState(1790); // 29 min 50 sec

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} dak. ${s} sn.`;
  };

  const username = userData?.KulAdSoyad || userData?.name || 'Öğrenci';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.headerIcon}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{formatTime(countdown)}</Text>
        </View>

        <TouchableOpacity style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={16} color="#1E293B" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 1. Welcome Card */}
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Hoşgeldiniz,</Text>
          <Text style={styles.userName}>{username}</Text>
        </View>

        {/* 2. Dersler Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Dersler</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.advisorInfo}>
              <View style={styles.advisorIconContainer}>
                <Ionicons name="person-circle-outline" size={40} color="#1E293B" />
              </View>
              <View>
                <Text style={styles.advisorTitle}>Danışman</Text>
                <Text style={styles.advisorName}>Öğr. Gör. SEVİM PİLAVCI</Text>
                <Text style={styles.advisorEmail}>sevimpilavci@mudanya.edu.tr</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Bahar Dönemi Dersleri</Text>

            <View style={styles.courseItem}>
              <Ionicons name="folder" size={24} color="#F59E0B" />
              <Text style={styles.courseText}>MUDU 143 Dünya Mutfakları</Text>
            </View>
            <View style={styles.courseItem}>
              <Ionicons name="folder" size={24} color="#F59E0B" />
              <Text style={styles.courseText}>BPR 254 Yapay Öğrenme</Text>
            </View>
            <View style={styles.courseItem}>
              <Ionicons name="folder" size={24} color="#F59E0B" />
              <Text style={styles.courseText}>BPR 256 Mobil Programlama</Text>
            </View>
          </View>
        </View>

        {/* 3. Duyurular Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Duyurular</Text>
          </View>
          <View style={[styles.cardBody, { minHeight: 80, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#94A3B8' }}>Güncel duyuru bulunmamaktadır.</Text>
          </View>
        </View>

        {/* 4. Mazeret Sınavları Başvuru */}
        <TouchableOpacity style={styles.examButton}>
          <Ionicons name="document-text" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.examButtonText}>Mazeret Sınavları Başvuru</Text>
        </TouchableOpacity>

        {/* 5. Öğrenim Bilgileri Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Öğrenim Bilgileri</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fakülte:</Text>
              <Text style={styles.infoValue}>MESLEK YÜKSEKOKULU</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Program:</Text>
              <Text style={styles.infoValue}>BİLGİSAYAR PROGRAMCILIĞI</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sınıf:</Text>
              <Text style={styles.infoValue}>2. Sınıf</Text>
            </View>
          </View>
        </View>

        {/* 6. Mesaj Kutusu Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Mesaj Kutusu</Text>
          </View>
          <View style={styles.cardBody}>
            <TouchableOpacity style={styles.messageRow}>
              <View style={styles.messageRowLeft}>
                <Ionicons name="mail" size={20} color="#64748B" />
                <Text style={styles.messageRowText}>Gelen Kutusu</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.messageRow}>
              <View style={styles.messageRowLeft}>
                <Ionicons name="send" size={20} color="#64748B" />
                <Text style={styles.messageRowText}>Giden Kutusu</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.messageRow}>
              <View style={styles.messageRowLeft}>
                <Ionicons name="create" size={20} color="#64748B" />
                <Text style={styles.messageRowText}>Mesaj Yaz</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E293B', // Matches header to blend status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      android: {
        paddingTop: 40, // rough status bar height for android
      }
    })
  },
  headerIcon: {
    padding: 4,
  },
  countdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countdownText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  scrollContent: {
    backgroundColor: '#F1F5F9', // Light gray background for content
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: '#64748B',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 4,
  },
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    backgroundColor: '#1E293B', // Dark blue header
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cardHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBody: {
    padding: 16,
  },
  advisorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
  },
  advisorIconContainer: {
    marginRight: 12,
  },
  advisorTitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  advisorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  advisorEmail: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  examButton: {
    backgroundColor: '#334155', // Dark gray
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  examButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  messageRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageRowText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#4CAF50', // Green badge
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  }
});
