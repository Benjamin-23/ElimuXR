import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {queryDeepSeek} from './deepseekService';
import ChatScreen from './chatScreen';
import images from '../../images/index';
import QuesAnsPair from '../../Components/QuizComponets/QuesAnsPair';
import {writeScore} from '../../Components/QuizComponets/scoreStorage';
import maleReproductiveQuiz from '../../../maleReproductiveQuiz.json';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';
import SubjectQuesAnsPair from './QuesAnsPair';

const StudyScreen = () => {
  // State management
  const [selectedGrade, setSelectedGrade] = useState('7');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStrand, setSelectedStrand] = useState(null);
  const [selectedSubStrand, setSelectedSubStrand] = useState(null);
  const [showGrades, setShowGrades] = useState(false); // Add this state for grade dropdown
  const [showSubjects, setShowSubjects] = useState(false);
  const [showStrands, setShowStrands] = useState(false);
  const [showSubStrands, setShowSubStrands] = useState(false);
  const [expandedStrands, setExpandedStrands] = useState({});
  const [showContentModal, setShowContentModal] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Available grades
  const availableGrades = ['7', '8', '9'];

  // Updated curriculum data structure to match the screenshots
  const curriculum = {
    7: {
      'Integrated Science': {
        '1.0. Living things and the Environment': {
          'Human Reproductive System': [
            'The Male Reproductive System',
            'The Female Reproductive System',
          ],
          'Human Excretory System': [
            'Parts of the Human Skin and their Functions',
            'The Urinary System',
            'Parts of the Kidney and their Functions',
          ],
        },
        '2.0. Human Body Systems': {
          'Digestive System': ['Digestive System'],
          'Circulatory System': ['Circulatory System'],
        },
        '3.0. Force and Energy': {
          'Electrical Energy': ['Simple Electrical Circuits'],
          Magnetism: ['Properties of a Magnet'],
        },
      },
      Mathematics: {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
      'Pre-Technical Studies': {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
    },
    8: {
      'Integrated Science': {
        '1.0. Living Things and their Environment': {
          'The Cell': ['Cell Structure and Function'],
          'Movement of Materials': [
            'Movement of Materials In and Out of the Cell',
          ],
        },
        '2.0. Human Body Systems': {
          'Respiratory System': ['Parts and Functions of Respiratory System'],
        },
      },
      Mathematics: {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
      'Pre-Technical Studies': {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
    },
    9: {
      'Integrated Science': {
        '1.0. Human Body Systems': {
          'Digestive System': ['The Digestive Process'],
        },
        '2.0. Mixtures, Elements and Compounds': {
          'Structure of the Atom': ['Atomic Structure'],
          'Metals and Alloys': ['Properties of Metals'],
        },
      },
      Mathematics: {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
      'Pre-Technical Studies': {
        'Coming Soon': {
          Placeholder: ['Animated content coming soon!'],
        },
      },
    },
  };

  // Get available options based on current selections
  const getAvailableSubjects = () => {
    return Object.keys(curriculum[selectedGrade] || {});
  };

  const getAvailableStrands = () => {
    if (
      !selectedSubject ||
      !curriculum[selectedGrade] ||
      !curriculum[selectedGrade][selectedSubject]
    ) {
      return [];
    }
    return Object.keys(curriculum[selectedGrade][selectedSubject]);
  };

  const getAvailableSubStrands = () => {
    if (
      !selectedSubject ||
      !selectedStrand ||
      !curriculum[selectedGrade] ||
      !curriculum[selectedGrade][selectedSubject] ||
      !curriculum[selectedGrade][selectedSubject][selectedStrand]
    ) {
      return [];
    }
    return Object.keys(
      curriculum[selectedGrade][selectedSubject][selectedStrand],
    );
  };

  // Handler functions
  const handleGradeChange = grade => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
    setSelectedStrand(null);
    setSelectedSubStrand(null);
    setShowGrades(false); // Close grade dropdown
    setShowSubjects(false);
    setShowStrands(false);
    setShowSubStrands(false);
    setExpandedStrands({});
  };

  const handleSubjectSelect = subject => {
    setSelectedSubject(subject);
    setSelectedStrand(null);
    setSelectedSubStrand(null);
    setShowSubjects(false);
    setShowStrands(false);
    setShowSubStrands(false);
    setExpandedStrands({});
  };

  const handleStrandSelect = strand => {
    setSelectedStrand(strand);
    setSelectedSubStrand(null);
    setShowStrands(false);
    setShowSubStrands(false);
  };

  const handleSubStrandSelect = subStrand => {
    setSelectedSubStrand(subStrand);
    setShowSubStrands(false);
  };

  const toggleStrandExpansion = strand => {
    setExpandedStrands(prev => ({
      ...prev,
      [strand]: !prev[strand],
    }));
  };

  const handleLessonPress = lesson => {
    setShowContentModal(true);
  };

  // Quiz functions
  const handleQuizTraversal = () => {
    if (quizIndex === maleReproductiveQuiz.questions.length - 1) {
      setQuizCompleted(true);
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
    setSelected(prev => ({...prev, ...selectedOption}));
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setSelected({});
    setQuizCompleted(false);
    setShowNext(false);
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Check if we should show curriculum or placeholder message
  const shouldShowCurriculum =
    selectedSubject && selectedSubject !== 'Select Subject';
  const shouldShowPlaceholder = !shouldShowCurriculum;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Grade Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowGrades(!showGrades)} // Fixed the onPress handler
        >
          <Text style={styles.dropdownText}>Grade {selectedGrade}</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Grade Options */}
        {showGrades && (
          <View style={styles.dropdownOptionsContainer}>
            {availableGrades.map((grade, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  selectedGrade === grade && styles.selectedDropdownOption,
                ]}
                onPress={() => handleGradeChange(grade)}>
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedGrade === grade &&
                      styles.selectedDropdownOptionText,
                  ]}>
                  Grade {grade}
                </Text>
                {selectedGrade === grade && (
                  <Icon
                    name="check"
                    size={16}
                    color="#4CAF50"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Subject Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowSubjects(!showSubjects)}>
          <Text
            style={[
              styles.dropdownText,
              !selectedSubject && styles.placeholderText,
            ]}>
            {selectedSubject || 'Select Subject'}
          </Text>
          <Icon name="keyboard-arrow-down" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Subject Options */}
        {showSubjects && (
          <View style={styles.dropdownOptionsContainer}>
            {getAvailableSubjects().map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  selectedSubject === subject && styles.selectedDropdownOption,
                ]}
                onPress={() => handleSubjectSelect(subject)}>
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedSubject === subject &&
                      styles.selectedDropdownOptionText,
                  ]}>
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Strand Dropdown - Only show if subject is selected */}
        {selectedSubject && (
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowStrands(!showStrands)}>
            <Text
              style={[
                styles.dropdownText,
                !selectedStrand && styles.placeholderText,
              ]}>
              {selectedStrand || 'Living things and the Environment'}
            </Text>
            <Icon name="keyboard-arrow-down" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Strand Options */}
        {showStrands && selectedSubject && (
          <View style={styles.dropdownOptionsContainer}>
            {getAvailableStrands().map((strand, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  selectedStrand === strand && styles.selectedDropdownOption,
                ]}
                onPress={() => handleStrandSelect(strand)}>
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedStrand === strand &&
                      styles.selectedDropdownOptionText,
                  ]}>
                  {strand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Sub-Strand Dropdown - Only show if strand is selected */}
        {selectedStrand && (
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowSubStrands(!showSubStrands)}>
            <Text
              style={[
                styles.dropdownText,
                !selectedSubStrand && styles.placeholderText,
              ]}>
              {selectedSubStrand || 'Human Reproductive System'}
            </Text>
            <Icon name="keyboard-arrow-down" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Sub-Strand Options */}
        {showSubStrands && selectedStrand && (
          <View style={styles.dropdownOptionsContainer}>
            {getAvailableSubStrands().map((subStrand, index) => {
              const isSelected = selectedSubStrand === subStrand;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    isSelected && styles.selectedDropdownOption,
                  ]}
                  onPress={() => handleSubStrandSelect(subStrand)}>
                  {isSelected && (
                    <Icon
                      name="check"
                      size={16}
                      color="#4CAF50"
                      style={styles.checkIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      isSelected && styles.selectedDropdownOptionText,
                    ]}>
                    {subStrand}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Lesson Dropdown - Static */}
        {selectedSubStrand && (
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.placeholderText}>Select Lesson</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Curriculum Display or Placeholder */}
        {shouldShowPlaceholder ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Please select a grade and subject{'\n'}to view the curriculum
            </Text>
          </View>
        ) : (
          <View style={styles.curriculumContainer}>
            <Text style={styles.curriculumTitle}>
              {selectedSubject} Curriculum - Grade {selectedGrade}
            </Text>

            {/* Curriculum Sections */}
            {getAvailableStrands().map((strand, index) => (
              <View key={index} style={styles.curriculumSection}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleStrandExpansion(strand)}>
                  <Icon name="folder" size={20} color="#FFD700" />
                  <Text style={styles.sectionTitle}>{strand}</Text>
                  <Icon
                    name={
                      expandedStrands[strand]
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>

                {/* Expanded Content */}
                {expandedStrands[strand] && (
                  <View style={styles.sectionContent}>
                    {Object.entries(
                      curriculum[selectedGrade][selectedSubject][strand] || {},
                    ).map(([subStrand, lessons], subIndex) => (
                      <View key={subIndex} style={styles.subStrandContainer}>
                        <Text style={styles.subStrandTitle}>{subStrand}</Text>
                        {lessons.map((lesson, lessonIndex) => (
                          <TouchableOpacity
                            key={lessonIndex}
                            style={styles.lessonItem}
                            onPress={() => handleLessonPress(lesson)}>
                            <Text style={styles.lessonText}>{lesson}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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
              onPress={() => setShowContentModal(false)}>
              <Icon name="arrow-back" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Lesson Content</Text>
            <View style={styles.closeButtonPlaceholder} />
          </View>

          <ScrollView style={styles.contentContainer}>
            <View style={styles.learningContent}>
              <Text style={styles.contentTitle}>Learning Materials</Text>
              <View style={styles.videoContainer}>
                <Video
                  source={images.Male_Video}
                  style={styles.videoPlayer}
                  controls={true}
                  paused={true}
                  resizeMode="contain"
                  onError={error => console.log('Video error:', error)}
                  onProgress={({currentTime}) => setCurrentTime(currentTime)}
                  onLoad={({duration}) => setDuration(duration)}
                />
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {width: `${(currentTime / duration) * 100}%`},
                    ]}
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
                    setShowQuiz(true);
                    setQuizIndex(0);
                    setScore(0);
                    setSelected({});
                  }}>
                  <Icon name="quiz" size={20} color="#4a90e2" />
                  <Text style={styles.optionText}>Quiz</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.contentDescription}>
                Detailed content and explanations would appear here. This could
                include text lessons, diagrams, examples, and practice problems.
              </Text>
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

      {/* Quiz Modal */}
      <Modal visible={showQuiz} animationType="slide" transparent={false}>
        <SafeAreaView
          style={[styles.modalContainer, {backgroundColor: Colors.background}]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowQuiz(false)}>
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, {color: '#000'}]}>
              Male Reproductive System Quiz
            </Text>
            <View style={styles.closeButtonPlaceholder} />
          </View>

          <View style={styles.quizContentContainer}>
            {quizCompleted ? (
              <View style={styles.completionContainer}>
                <SubjectQuesAnsPair
                  question={maleReproductiveQuiz.questions[0].questionText}
                  answers={maleReproductiveQuiz.questions[0].answers}
                  is_next={false}
                  getScore={get_Score}
                  get_selected={getSelected}
                  index={0}
                  currentQuestionIndex={0}
                  totalQuestions={maleReproductiveQuiz.questions.length}
                  quizCompleted={quizCompleted}
                  userAnswers={{
                    ...selected,
                    score: score,
                    questions: maleReproductiveQuiz.questions,
                  }}
                />
                <TouchableOpacity
                  style={styles.restartButton}
                  onPress={restartQuiz}>
                  <Text style={styles.restartButtonText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <SubjectQuesAnsPair
                question={
                  maleReproductiveQuiz.questions[quizIndex].questionText
                }
                answers={maleReproductiveQuiz.questions[quizIndex].answers}
                is_next={is_next}
                getScore={get_Score}
                get_selected={getSelected}
                index={maleReproductiveQuiz.questions[quizIndex].index}
                currentQuestionIndex={quizIndex}
                totalQuestions={maleReproductiveQuiz.questions.length}
                quizCompleted={quizCompleted}
                userAnswers={{
                  ...selected,
                  score: score,
                  questions: maleReproductiveQuiz.questions,
                }}
              />
            )}

            <View style={styles.quizButtonContainer}>
              {(showNext && quizIndex > 0) ||
              (selected[quizIndex] !== undefined && quizIndex > 0) ? (
                <TouchableOpacity
                  style={[styles.quizNavButton, {backgroundColor: '#000'}]}
                  onPress={() => setQuizIndex(quizIndex - 1)}>
                  <Text style={styles.quizNavButtonText}>Previous</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={[styles.quizNavButton]}
                onPress={handleQuizTraversal}>
                <Text style={styles.quizNavButtonText}>
                  {quizIndex === maleReproductiveQuiz.questions.length - 1
                    ? 'Finish'
                    : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Chat Modal */}
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

      {/* Floating Chat Button */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  dropdownButton: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#404040',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderText: {
    color: '#888',
  },
  dropdownOptionsContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  dropdownOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDropdownOption: {
    backgroundColor: '#3d3d3d',
  },
  dropdownOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDropdownOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
  },
  placeholderContainer: {
    backgroundColor: '#1a1a1a',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  curriculumContainer: {
    marginTop: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
  },
  curriculumTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  curriculumSection: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  sectionContent: {
    paddingTop: 8,
  },
  subStrandContainer: {
    marginBottom: 16,
  },
  subStrandTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 12,
  },
  lessonItem: {
    backgroundColor: '#404040',
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 6,
  },
  lessonText: {
    color: '#fff',
    fontSize: 14,
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
  contentContainer: {
    flex: 1,
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
    height: Dimensions.get('window').width * 0.5625,
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
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
  },
  learningOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
    flex: 1,
  },
  optionButton: {
    alignItems: 'center',
    paddingVertical: 10,
    width: '25%',
  },
  optionText: {
    marginTop: 5,
    color: '#4a90e2',
    fontWeight: '500',
    textAlign: 'center',
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
    backgroundColor: '#FFD700',
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
    color: '#000',
    fontWeight: 'bold',
  },
  completionContainer: {
    flex: 1,
  },
  restartButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StudyScreen;
