import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const StudyScreen = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = [
    {id: 7, name: 'Grade 7'},
    {id: 8, name: 'Grade 8'},
    {id: 9, name: 'Grade 9'},
  ];

  const subjects = {
    7: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
    8: ['Mathematics', 'Science', 'English', 'History', 'Civics'],
    9: ['Algebra', 'Biology', 'Chemistry', 'Physics', 'Literature'],
  };

  const handleGradeSelect = grade => {
    setSelectedGrade(grade);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Your Grade</Text>

      <View style={styles.gradeContainer}>
        {grades.map(grade => (
          <TouchableOpacity
            key={grade.id}
            style={[
              styles.gradeButton,
              selectedGrade === grade.id && styles.selectedGradeButton,
            ]}
            onPress={() => handleGradeSelect(grade.id)}>
            <Text
              style={[
                styles.gradeText,
                selectedGrade === grade.id && styles.selectedGradeText,
              ]}>
              {grade.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedGrade && (
        <View style={styles.contentContainer}>
          <Text style={styles.subHeader}>
            Subjects for Grade {selectedGrade}
          </Text>
          <ScrollView>
            {subjects[selectedGrade].map((subject, index) => (
              <TouchableOpacity key={index} style={styles.subjectItem}>
                <Text style={styles.subjectText}>{subject}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  gradeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gradeButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradeButton: {
    backgroundColor: '#4a90e2',
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  selectedGradeText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subjectItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subjectText: {
    fontSize: 16,
    color: '#444',
  },
});

export default StudyScreen;
