import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StudyStyle from '../../style';
import {Container} from '../../Components';

const StudyScreen = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const navigation = useNavigation();

  const handleGradeSelection = grade => {
    setSelectedGrade(grade);
    navigation.navigate('StudyTopics', {grade: grade});
  };

  return (
    <Container>
      <View style={StudyStyle.container}>
        <Text style={StudyStyle.header}>Select Grade Level</Text>
        <TouchableOpacity
          style={StudyStyle.gradeButton}
          onPress={() => handleGradeSelection(7)}>
          <Text style={StudyStyle.buttonText}>Grade 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StudyStyle.gradeButton}
          onPress={() => handleGradeSelection(8)}>
          <Text style={StudyStyle.buttonText}>Grade 8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StudyStyle.gradeButton}
          onPress={() => handleGradeSelection(9)}>
          <Text style={StudyStyle.buttonText}>Grade 9</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default StudyScreen;
