import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {queryDeepSeek} from './deepseekService';
import ChatScreen from './chatScreen';

const StudyScreen = () => {
  // State management
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showBotScreen, setShowBotScreen] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(false);

  // Data structure based on your requirements
  const curriculumData = {
    7: {
      subjects: {
        Mathematics: {
          topics: {
            '2.0. Algebra': [
              'Algebraic Expressions',
              'Linear Equations',
              'Linear Inequalities',
            ],
            '3.0. Measurements': [
              'Pythagorean Relationship',
              'Length',
              'Area',
              'Volume and Capacity',
            ],
            '4.0. Geometry': ['Angles', 'Geometrical Constructions'],
          },
        },
        'Integrated Science': {
          topics: {
            '3.0. Living things and the Environment': [
              'Human reproductive system',
              'Human Excretory System',
            ],
            '4.0. Force and Energy': ['Electrical Energy', 'Magnetism'],
          },
        },
        'Health Education': {
          topics: {
            '2.0. Human Body Systems': [
              'Digestive system',
              'Excretory system',
              'Circulatory system',
            ],
          },
        },
        'Pre-Technical Studies': {
          topics: {}, // Add topics when available
        },
      },
    },
    8: {
      subjects: {
        Mathematics: {
          topics: {
            '1.0. Algebra': ['Algebraic Expressions', 'Linear Equations'],
            '2.0. Measurements': ['Circles', 'Area', 'Money'],
            '3.0. Geometry': [
              'Geometrical Constructions',
              'Coordinates and graphs',
              'Scale Drawing',
              'Common Solids',
            ],
          },
        },
        'Integrated Science': {
          topics: {
            '2.0. Living Things and their Environment': [
              'The Cell',
              'Movement of materials in and out of the cell',
            ],
            '2.0. Human Body Systems': [
              'Respiratory system',
              'Reproductive System',
            ],
          },
        },
        'Health Education': {
          topics: {}, // Add topics when available
        },
        'Pre-Technical Studies': {
          topics: {
            'Coming Soon': [
              'Coming Soon: Give us a like if you want this content!',
            ],
          },
        },
      },
    },
    9: {
      subjects: {
        Mathematics: {
          topics: {
            '2.0. Algebra': [
              'Matrices',
              'Equations of a Straight Line',
              'Linear Inequalities',
            ],
            '4.0. Geometry': [
              'Coordinates and Graphs',
              'Scale Drawing',
              'Similarity and Enlargement',
              'Trigonometry',
            ],
          },
        },
        'Integrated Science': {
          topics: {
            '1.0. Mixtures, Elements and Compounds': [
              'Structure of the atom',
              'Metals and Alloys',
            ],
          },
        },
        'Health Education': {
          topics: {}, // Add topics when available
        },
        'Pre-Technical Studies': {
          topics: {}, // Add topics when available
        },
      },
    },
  };

  const grades = [
    {id: 7, name: 'Grade 7'},
    {id: 8, name: 'Grade 8'},
    {id: 9, name: 'Grade 9'},
  ];

  // Helper functions
  const handleGradeSelect = grade => {
    setSelectedGrade(grade);
    setSearchQuery('');
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const toggleFavorite = subject => {
    if (favorites.includes(subject)) {
      setFavorites(favorites.filter(fav => fav !== subject));
    } else {
      setFavorites([...favorites, subject]);
    }
  };

  const handleSubjectPress = subject => {
    setSelectedSubject(subject);
    setShowTopicsModal(true);
  };

  const handleTopicPress = topic => {
    setSelectedTopic(topic);
    setShowTopicsModal(false);
    setShowContentModal(true);
  };

  const filteredSubjects = selectedGrade
    ? Object.keys(curriculumData[selectedGrade].subjects).filter(subject =>
        subject.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await queryDeepSeek(input);
      setResponse(result.choices[0].message.content);
    } catch (error) {
      setResponse('Error connecting to DeepSeek');
    }
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
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search subjects..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Icon
              name="search"
              size={24}
              color="#666"
              style={styles.searchIcon}
            />
          </View>

          <Text style={styles.subHeader}>
            Subjects for Grade {selectedGrade}
            {searchQuery && ` (${filteredSubjects.length} found)`}
          </Text>

          <ScrollView>
            {filteredSubjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subjectItem}
                onPress={() => handleSubjectPress(subject)}>
                <View style={styles.subjectHeader}>
                  <Text style={styles.subjectText}>{subject}</Text>
                  <TouchableOpacity
                    onPress={e => {
                      e.stopPropagation();
                      toggleFavorite(subject);
                    }}>
                    <Icon
                      name={
                        favorites.includes(subject) ? 'star' : 'star-outline'
                      }
                      size={24}
                      color={favorites.includes(subject) ? '#FFD700' : '#666'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Topics Modal */}
      <Modal
        visible={showTopicsModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowTopicsModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowTopicsModal(false)}>
              <Icon name="arrow-back" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedSubject}</Text>
            <View style={styles.closeButtonPlaceholder} />
          </View>

          <ScrollView style={styles.topicsContainer}>
            {selectedSubject &&
              selectedGrade &&
              Object.entries(
                curriculumData[selectedGrade].subjects[selectedSubject].topics,
              ).map(([topicNumber, subtopics], index) => (
                <View key={index}>
                  <Text style={styles.topicNumber}>{topicNumber}</Text>
                  {subtopics.map((subtopic, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.topicItem}
                      onPress={() =>
                        handleTopicPress(`${topicNumber}: ${subtopic}`)
                      }>
                      <Text style={styles.topicText}>{subtopic}</Text>
                      <Icon name="chevron-right" size={20} color="#666" />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => setShowChatScreen(true)}>
            <Icon name="chat" size={30} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Content Modal */}
      <Modal
        visible={showContentModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowContentModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setShowContentModal(false);
                setShowTopicsModal(true);
              }}>
              <Icon name="arrow-back" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedTopic}</Text>
            <View style={styles.closeButtonPlaceholder} />
          </View>

          <ScrollView style={styles.contentContainer}>
            <View style={styles.learningContent}>
              <Text style={styles.contentTitle}>Learning Materials</Text>
              <View style={styles.videoContainer}>
                {/* <Image
                  source={{
                    uri: 'https://via.placeholder.com/400x225?text=Video+Thumbnail',
                  }}
                  style={styles.videoThumbnail}
                /> */}
                <Icon
                  name="play-circle-filled"
                  size={60}
                  color="#4a90e2"
                  style={styles.playIcon}
                />
              </View>
              <View style={styles.learningOptions}>
                <TouchableOpacity style={styles.optionButton}>
                  <Icon name="play-circle-outline" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                  <Icon name="3d-rotation" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>AR Model</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>
                  <Icon name="vrpano" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>VR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => setShowBotScreen(true)}>
                  <Icon name="quiz" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>Quiz</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.contentDescription}>
                Detailed content and explanations for {selectedTopic} would
                appear here. This could include text lessons, diagrams,
                examples, and practice problems.
              </Text>
              {/* {showBotScreen && <ChatScreen />} */}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => setShowChatScreen(true)}>
            <Icon name="chat" size={30} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setShowChatScreen(true)}>
        <Icon name="chat" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={showChatScreen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowChatScreen(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowChatScreen(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Chat</Text>
            <View style={styles.closeButtonPlaceholder} />
          </View>
          <ChatScreen />
        </SafeAreaView>
      </Modal>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    paddingLeft: 40,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
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
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButtonPlaceholder: {
    width: 34,
  },
  topicsContainer: {
    flex: 1,
    padding: 15,
  },
  topicNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginTop: 15,
    marginBottom: 5,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginLeft: 10,
  },
  topicText: {
    fontSize: 15,
    color: '#444',
  },
  learningContent: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  playIcon: {
    position: 'absolute',
  },
  learningOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
    flex: 1,
  },
  optionButton: {
    alignItems: 'justify',
    paddingVertical: 10,
    width: '25%',
  },
  optionText: {
    marginTop: 5,
    color: '#4a90e2',
    fontWeight: '500',
    textAlign: 'justify',
  },
  contentDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4a90e2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default StudyScreen;
