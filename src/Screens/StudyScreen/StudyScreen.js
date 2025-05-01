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
import {Container} from '../../Components';

const StudyScreen = () => {
  // State management
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [showSubtopicsModal, setShowSubtopicsModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [quizSession, setQuizSession] = useState(null);

  // Comprehensive data structure
  const learningData = {
    7: {
      Mathematics: {
        topics: {
          'Algebra Basics': {
            subtopics: {
              'Introduction to Variables': {
                video: 'https://example.com/videos/math7-algebra-intro.mp4',
                thumbnail:
                  'https://example.com/thumbnails/math7-algebra-intro.jpg',
                resources: {
                  arModel: 'math7_algebra_variables',
                  vrExperience: 'math7_algebra_lab',
                  quiz: 'math7_algebra_quiz1',
                },
              },
              'Simple Equations': {
                video: 'https://example.com/videos/math7-simple-eq.mp4',
                thumbnail: 'https://example.com/thumbnails/math7-simple-eq.jpg',
                resources: {
                  arModel: 'math7_algebra_equations',
                  vrExperience: 'math7_equation_balance',
                  quiz: 'math7_algebra_quiz2',
                },
              },
            },
          },
          Geometry: {
            subtopics: {
              'Basic Shapes': {
                video: 'https://example.com/videos/math7-basic-shapes.mp4',
                thumbnail:
                  'https://example.com/thumbnails/math7-basic-shapes.jpg',
                resources: {
                  arModel: 'math7_geometry_shapes',
                  vrExperience: 'math7_shape_explorer',
                  quiz: 'math7_geometry_quiz1',
                },
              },
            },
          },
        },
      },
      Science: {
        topics: {
          Cells: {
            subtopics: {
              'Cell Structure': {
                video: 'https://example.com/videos/sci7-cell-structure.mp4',
                thumbnail:
                  'https://example.com/thumbnails/sci7-cell-structure.jpg',
                resources: {
                  arModel: 'sci7_cell_model',
                  vrExperience: 'sci7_cell_explorer',
                  quiz: 'sci7_cell_quiz1',
                },
              },
            },
          },
        },
      },
    },
    // Similar structure for other grades...
    8: {
      Mathematics: {
        topics: {
          Algebra: {
            subtopics: {
              'Linear Equations': {
                video: 'https://example.com/videos/math8-linear-eq.mp4',
                thumbnail: 'https://example.com/thumbnails/math8-linear-eq.jpg',
                resources: {
                  arModel: 'math8_algebra_linear',
                  vrExperience: 'math8_equation_graph',
                  quiz: 'math8_algebra_quiz1',
                },
              },
            },
          },
        },
      },
    },
    9: {
      Biology: {
        topics: {
          Genetics: {
            subtopics: {
              'DNA Structure': {
                video: 'https://example.com/videos/bio9-dna-structure.mp4',
                thumbnail:
                  'https://example.com/thumbnails/bio9-dna-structure.jpg',
                resources: {
                  arModel: 'bio9_dna_model',
                  vrExperience: 'bio9_dna_lab',
                  quiz: 'bio9_genetics_quiz1',
                },
              },
            },
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
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setShowTopicsModal(false);
    setShowSubtopicsModal(false);
    setShowContentModal(false);
    setQuizSession(null);
  };

  const toggleFavorite = subject => {
    if (favorites.includes(subject)) {
      setFavorites(favorites.filter(fav => fav !== subject));
    } else {
      setFavorites([...favorites, subject]);
    }
  };

  const updateProgress = (subject, newProgress) => {
    setProgress({
      ...progress,
      [subject]: Math.min(100, Math.max(0, newProgress)),
    });
  };

  const handleSubjectPress = subject => {
    setSelectedSubject(subject);
    setShowTopicsModal(true);
  };

  const handleTopicPress = topic => {
    setSelectedTopic(topic);
    setShowTopicsModal(false);
    setShowSubtopicsModal(true);
  };

  const handleSubtopicPress = subtopic => {
    setSelectedSubtopic(subtopic);
    setShowSubtopicsModal(false);
    setShowContentModal(true);
  };

  const startQuizSession = () => {
    setQuizSession({
      id: Date.now(),
      questions: [
        {
          id: 1,
          question: 'What is the basic unit of life?',
          options: ['Cell', 'Atom', 'Molecule', 'Organ'],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: 'Which organelle is called the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
          correctAnswer: 1,
        },
      ],
      currentQuestion: 0,
      score: 0,
    });
  };

  const answerQuestion = answerIndex => {
    if (
      quizSession.questions[quizSession.currentQuestion].correctAnswer ===
      answerIndex
    ) {
      setQuizSession({
        ...quizSession,
        score: quizSession.score + 1,
        currentQuestion: quizSession.currentQuestion + 1,
      });
    } else {
      setQuizSession({
        ...quizSession,
        currentQuestion: quizSession.currentQuestion + 1,
      });
    }
  };

  const filteredSubjects = selectedGrade
    ? Object.keys(learningData[selectedGrade]).filter(subject =>
        subject.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const renderProgressBar = progressValue => {
    return (
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, {width: `${progressValue || 0}%`}]}
        />
        <Text style={styles.progressText}>{progressValue || 0}%</Text>
      </View>
    );
  };

  return (
    <Container>
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

            <View style={styles.filterContainer}>
              <Text style={styles.subHeader}>
                Subjects for Grade {selectedGrade}
                {searchQuery && ` (${filteredSubjects.length} found)`}
              </Text>
            </View>

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

                  <Text style={styles.progressLabel}>Progress:</Text>
                  {renderProgressBar(progress[subject])}

                  <View style={styles.progressControls}>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={e => {
                        e.stopPropagation();
                        updateProgress(subject, (progress[subject] || 0) - 10);
                      }}>
                      <Text style={styles.progressButtonText}>-10%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={e => {
                        e.stopPropagation();
                        updateProgress(subject, (progress[subject] || 0) + 10);
                      }}>
                      <Text style={styles.progressButtonText}>+10%</Text>
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
              <Text style={styles.modalTitle}>{selectedSubject} Topics</Text>
              <View style={styles.closeButtonPlaceholder} />
            </View>

            <ScrollView style={styles.topicsContainer}>
              {selectedSubject &&
                selectedGrade &&
                Object.keys(
                  learningData[selectedGrade][selectedSubject].topics,
                ).map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.topicItem}
                    onPress={() => handleTopicPress(topic)}>
                    <Text style={styles.topicText}>{topic}</Text>
                    <Icon name="chevron-right" size={20} color="#666" />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>

        {/* Subtopics Modal */}
        <Modal
          visible={showSubtopicsModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowSubtopicsModal(false)}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setShowSubtopicsModal(false);
                  setShowTopicsModal(true);
                }}>
                <Icon name="arrow-back" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedTopic}</Text>
              <View style={styles.closeButtonPlaceholder} />
            </View>

            <ScrollView style={styles.topicsContainer}>
              {selectedSubject &&
                selectedGrade &&
                selectedTopic &&
                Object.keys(
                  learningData[selectedGrade][selectedSubject].topics[
                    selectedTopic
                  ].subtopics,
                ).map((subtopic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.topicItem}
                    onPress={() => handleSubtopicPress(subtopic)}>
                    <Text style={styles.topicText}>{subtopic}</Text>
                    <Icon name="chevron-right" size={20} color="#666" />
                  </TouchableOpacity>
                ))}
            </ScrollView>
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
                  setShowSubtopicsModal(true);
                }}>
                <Icon name="arrow-back" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedSubtopic}</Text>
              <View style={styles.closeButtonPlaceholder} />
            </View>

            <ScrollView style={styles.contentContainer}>
              {!quizSession ? (
                <>
                  <View style={styles.videoContainer}>
                    {/* <Image
                      source={{
                        uri: learningData[selectedGrade][selectedSubject].topics[
                          selectedTopic
                        ].subtopics[selectedSubtopic].thumbnail,
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
                      <Icon name="3d-rotation" size={30} color="#4a90e2" />
                      <Text style={styles.optionText}>AR Model</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}>
                      <Icon name="vrpano" size={30} color="#4a90e2" />
                      <Text style={styles.optionText}>VR Experience</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={startQuizSession}>
                      <Icon name="quiz" size={30} color="#4a90e2" />
                      <Text style={styles.optionText}>Take Quiz</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={styles.quizContainer}>
                  {quizSession.currentQuestion <
                  quizSession.questions.length ? (
                    <>
                      <Text style={styles.quizQuestion}>
                        {
                          quizSession.questions[quizSession.currentQuestion]
                            .question
                        }
                      </Text>
                      <View style={styles.quizOptions}>
                        {quizSession.questions[
                          quizSession.currentQuestion
                        ].options.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.quizOptionButton}
                            onPress={() => answerQuestion(index)}>
                            <Text style={styles.quizOptionText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.quizResultTitle}>
                        Quiz Completed!
                      </Text>
                      <Text style={styles.quizResultScore}>
                        Your score: {quizSession.score}/
                        {quizSession.questions.length}
                      </Text>
                      <TouchableOpacity
                        style={styles.quizRestartButton}
                        onPress={() => setQuizSession(null)}>
                        <Text style={styles.quizRestartButtonText}>
                          Back to Content
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </Container>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
    borderRadius: 10,
  },
  progressText: {
    position: 'absolute',
    right: 5,
    top: 0,
    lineHeight: 20,
    fontSize: 12,
    color: '#333',
  },
  progressControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressButton: {
    backgroundColor: '#4a90e2',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  progressButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topicText: {
    fontSize: 16,
    color: '#444',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
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
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  optionButton: {
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    marginTop: 5,
    color: '#4a90e2',
    fontWeight: '500',
  },
  quizContainer: {
    padding: 20,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  quizOptions: {
    marginTop: 10,
  },
  quizOptionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  quizOptionText: {
    fontSize: 16,
    color: '#333',
  },
  quizResultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  quizResultScore: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4a90e2',
  },
  quizRestartButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  quizRestartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StudyScreen;
