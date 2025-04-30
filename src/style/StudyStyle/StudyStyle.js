import {StyleSheet} from 'react-native';

export default StudyStyle = Colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      color: Colors.text,
    },
    button: {
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: Colors.text,
      fontSize: 16,
    },
    gradeButton: {
      backgroundColor: Colors.secondary,
      padding: 10,
      borderRadius: 5,
    },
    gradeButtonText: {
      color: Colors.text,
      fontSize: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 10,
    },
  });
