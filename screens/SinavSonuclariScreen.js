import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. HELPER FUNCTIONS
const calculateTotal = (components) => {
  let hasNull = false;
  let sum = 0;
  let latestGradeLabel = '';

  components.forEach(c => {
    if (c.grade === null || c.grade === undefined) {
      hasNull = true;
    } else {
      sum += c.grade * (c.weight / 100);
    }
  });

  if (hasNull) {
    const validComponent = components.find(c => c.grade !== null);
    if (validComponent) {
      const shortName = validComponent.name.includes('Vize') ? 'Vize' : validComponent.name;
      latestGradeLabel = `${shortName}: ${validComponent.grade}`;
    } else {
      latestGradeLabel = 'Açıklanmadı';
    }
    return { isComplete: false, latestGrade: latestGradeLabel };
  }

  return { isComplete: true, total: Math.round(sum) };
};

const getLetterGrade = (total) => {
  if (total >= 90) return 'AA';
  if (total >= 85) return 'BA';
  if (total >= 80) return 'BB';
  if (total >= 75) return 'CB';
  if (total >= 65) return 'CC';
  if (total >= 55) return 'DC';
  if (total >= 50) return 'DD';
  return 'FF';
};

const getGradeColor = (letter) => {
  switch (letter) {
    case 'AA': return '#198754';
    case 'BA':
    case 'BB': return '#28a745';
    case 'CB':
    case 'CC': return '#8bc34a';
    case 'DC':
    case 'DD': return '#ffc107';
    case 'FF': return '#dc3545';
    default: return '#6c757d';
  }
};

const ExpandableCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  // 3. UI - LOGIC
  const result = calculateTotal(item.components);
  let letter = '';
  let color = '#94A3B8'; // Neutral Gray
  let rightSideText = '';

  if (result.isComplete) {
    letter = getLetterGrade(result.total);
    color = getGradeColor(letter);
    rightSideText = letter;
  } else {
    rightSideText = result.latestGrade;
  }

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400] // Sufficiently large for expanded content
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={[styles.cardContainer, { borderLeftColor: color }]}>
      {/* COLLAPSED CARD */}
      <TouchableOpacity style={styles.cardHeader} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.courseCode}>{item.code}</Text>
          <Text style={styles.courseName} numberOfLines={1}>{item.name}</Text>
        </View>
        <View style={styles.cardHeaderRight}>
          <View style={styles.gradeContainer}>
            {result.isComplete ? (
              <Text style={[styles.letterGrade, { color: color }]}>{rightSideText}</Text>
            ) : (
              <Text style={styles.latestGradeText}>{rightSideText}</Text>
            )}
          </View>
          <Animated.View style={{ transform: [{ rotate }], marginLeft: 8 }}>
            <Ionicons name="chevron-down" size={24} color="#64748B" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* EXPANDED CARD */}
      <Animated.View style={[styles.breakdownContainer, { maxHeight, opacity: animation }]}>
        {item.components.map((c, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableRowLabel}>{c.name}</Text>
            <View style={styles.rowRight}>
              <Text style={[styles.tableRowGrade, c.grade === null && styles.textNull]}>
                {c.grade !== null ? c.grade : 'Açıklanmadı'}
              </Text>
              <Text style={styles.tableRowWeight}>(%{c.weight})</Text>
            </View>
          </View>
        ))}

        {result.isComplete && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              Ortalama: <Text style={{ fontWeight: 'bold' }}>{result.total}</Text>
              {'  '}→{'  '}
              Harf: <Text style={[styles.summaryLetter, { color: color }]}>{letter}</Text>
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default function SinavSonuclariScreen({ navigation }) {
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      // NOTE: Replace YOUR_LOCAL_IP with your actual local IP address
      // e.g., 'http://192.168.1.189/ois_api/get_grades.php'
      const response = await fetch('http://172.20.10.2/ois_api/get_grades.php');
      const dbData = await response.json();

      // Mapping logic dynamically mapping 'ders_adi' from DB
      const mappedResults = dbData.map((row, index) => {
        // Helper to parse string values from DB to numbers or nulls
        const parseGrade = (val) => (val !== null && val !== undefined && val !== "") ? Number(val) : null;

        return {
          id: row.id ? String(row.id) : String(index + 1),
          code: 'BPR', // Generic code
          name: row.ders_adi || 'Bilinmeyen Ders',
          components: [
            { name: 'Ara Sınavlar', grade: parseGrade(row.vize_sinavi), weight: 40 },
            { name: 'Final', grade: parseGrade(row.final_sinavi), weight: 40 },
            { name: 'Ödevler', grade: parseGrade(row.odevler), weight: 10 },
            { name: 'Devam', grade: parseGrade(row.katilma), weight: 10 }
          ]
        };
      });

      setGradesData(mappedResults);
    } catch (error) {
      console.error('Notlar çekilirken hata oluştu:', error);
      Alert.alert('Hata', 'Notlar yüklenirken bir sorun oluştu. IP adresini ve sunucuyu kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sınav Sonuçları</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Screen Title Area */}
      <View style={styles.titleArea}>
        <Text style={styles.mainTitle}>2025-26 Bahar Yarıyılı Notları</Text>
        <Text style={styles.subTitle}>Meslek Yüksekokulu</Text>
      </View>

      {/* List */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={gradesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExpandableCard item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cardHeaderLeft: {
    flex: 1,
    paddingRight: 12,
  },
  courseCode: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeContainer: {
    alignItems: 'flex-end',
    marginRight: 4,
  },
  letterGrade: {
    fontSize: 22,
    fontWeight: '900',
  },
  latestGradeText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  breakdownContainer: {
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableRowLabel: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
    flex: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableRowGrade: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  textNull: {
    color: '#94A3B8',
    fontWeight: '500',
    fontSize: 13,
  },
  tableRowWeight: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
    width: 45,
    textAlign: 'right',
  },
  summaryRow: {
    padding: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 15,
    color: '#334155',
  },
  summaryLetter: {
    fontWeight: '900',
    fontSize: 16,
  }
});
