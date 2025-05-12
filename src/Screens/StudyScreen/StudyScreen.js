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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {queryDeepSeek} from './deepseekService';
import ChatScreen from './chatScreen';
import images from '../../images/index';
import {writeScore, readScores} from '../../../scoreStorage';
import {QuesAnsPair} from '../../Components/QuizComponets';
import maleReproductiveQuiz from '../../../maleReproductiveQuiz.json';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState({});

  // Data structure based on your requirements
  const curriculumData = {
    7: {
      subjects: {
        'Integrated Science': {
          topics: {
            '1.0. Living things and the Environment': [
              'Human Reproductive System',
              'The Male Reproductive System',
              'The Female Reproductive System',
              'Human Excretory System',
              'Parts of the Human Skin and their Functions',
              'Parts of the Urinary System and their Functions',
            ],
            '2.0. Human Body Systems': ['The Circulatory System'],
            '3.0. Force and Energy': ['Electrical Energy', 'Magnetism'],
          },
        },
        Mathematics: {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
        },
        'Pre-Technical Studies': {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
        },
      },
    },
    8: {
      subjects: {
        'Integrated Science': {
          topics: {
            '1.0. Living Things and their Environment': [
              'The Cell',
              'Movement of Materials In and Out of the Cell',
            ],
            '2.0. Human Body Systems': ['Respiratory system'],
          },
        },
        Mathematics: {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
        },
        'Pre-Technical Studies': {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
        },
      },
    },
    9: {
      subjects: {
        'Integrated Science': {
          topics: {
            '1.0. Human Body Systems': ['The Digestive System'],
            '2.0. Mixtures, Elements and Compounds': [
              'Structure of the atom',
              'Metals and Alloys',
            ],
          },
        },
        Mathematics: {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
        },
        'Pre-Technical Studies': {
          topics: {
            'Coming Soon': ['Animated content coming soon!'],
          },
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

  const handleQuizTraversal = () => {
    if (quizIndex === maleReproductiveQuiz.questions.length - 1) {
      writeScore(`${score} out of ${maleReproductiveQuiz.questions.length}`);
      setShowQuiz(false);
      setQuizIndex(0);
      return;
    }
    setQuizIndex(quizIndex + 1);
    setShowNext(false);
  };

  const is_next = () => {
    setShowNext(true);
  };

  const get_Score = newScore => {
    setScore(newScore);
  };

  const getSelected = selectedOption => {
    setSelected(selectedOption);
  };
  // const videoContent = {
  //   'Male Reproductive System': require(images.Male_Video), // Local file
  //   'Female Reproductive System': {
  //     uri: 'https://example.com/videos/female_reproductive.mp4',
  //   }, // Remote URL
  //   // Add more video mappings as needed
  // };

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
            <Image
              style={{width: 40, height: 40}}
              resizeMode="contain"
              source={images.Chat_icon}
            />
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
                <View style={styles.videoContainer}>
                  <Video
                    source={images.Male_Video}
                    style={styles.videoPlayer}
                    controls={true}
                    paused={true} // Starts paused
                    resizeMode="contain"
                    onError={error => console.log('Video error:', error)}
                  />
                </View>
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
                  onPress={() => {
                    if (selectedTopic.includes('Male Reproductive System')) {
                      setShowQuiz(true);
                      setQuizIndex(0);
                      setScore(0);
                      setSelected({});
                    } else {
                      alert('Quiz for this topic is coming soon!');
                    }
                  }}>
                  <Icon name="quiz" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>Quiz</Text>
                </TouchableOpacity>

                {/* quiz model */}
                <Modal
                  visible={showQuiz}
                  animationType="slide"
                  transparent={false}>
                  <SafeAreaView
                    style={[
                      styles.modalContainer,
                      {backgroundColor: Colors.background},
                    ]}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setShowQuiz(false)}>
                        <Icon name="close" size={24} color={Colors.text} />
                      </TouchableOpacity>
                      <Text style={[styles.modalTitle, {color: Colors.text}]}>
                        Male Reproductive System Quiz
                      </Text>
                      <View style={styles.closeButtonPlaceholder} />
                    </View>

                    <View style={styles.quizContentContainer}>
                      <QuesAnsPair
                        question={
                          maleReproductiveQuiz.questions[quizIndex].questionText
                        }
                        answers={
                          maleReproductiveQuiz.questions[quizIndex].answers
                        }
                        is_next={is_next}
                        getScore={get_Score}
                        length={maleReproductiveQuiz.questions.length}
                        get_selected={getSelected}
                        index={maleReproductiveQuiz.questions[quizIndex].index}
                        colors={Colors}
                      />

                      <View style={styles.quizButtonContainer}>
                        {(showNext && quizIndex > 0) ||
                        (selected[quizIndex] !== undefined && quizIndex > 0) ? (
                          <TouchableOpacity
                            style={[
                              styles.quizNavButton,
                              {backgroundColor: Colors.primary},
                            ]}
                            onPress={() => setQuizIndex(quizIndex - 1)}>
                            <Text style={styles.quizNavButtonText}>
                              Previous
                            </Text>
                          </TouchableOpacity>
                        ) : null}

                        <TouchableOpacity
                          style={[
                            styles.quizNavButton,
                            {backgroundColor: '#000'},
                          ]}
                          onPress={handleQuizTraversal}>
                          <Text style={styles.quizNavButtonText}>
                            {quizIndex ===
                            maleReproductiveQuiz.questions.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </SafeAreaView>
                </Modal>
                {/* eend */}
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
            <Image
              style={{width: 40, height: 40}}
              resizeMode="contain"
              source={images.Chat_icon}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setShowChatScreen(true)}>
        <Image
          style={{width: 40, height: 40}}
          resizeMode="contain"
          source={images.Chat_icon}
        />
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
  // videoContainer: {
  //   height: 200,
  //   backgroundColor: '#000',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 20,
  //   position: 'relative',
  //   borderRadius: 8,
  //   overflow: 'hidden',
  // },
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
  quizContentContainer: {
    flex: 1,
    padding: 20,
  },
  quizButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  quizNavButton: {
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  quizNavButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  videoContainer: {
    height: Dimensions.get('window').width * 0.5625, // 16:9 aspect ratio
    width: '100%',
    backgroundColor: '#000',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
});

export default StudyScreen;
