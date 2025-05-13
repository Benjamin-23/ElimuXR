import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const SubjectQuesAnsPair = ({
  question,
  answers,
  is_next,
  getScore,
  get_selected,
  index,
  currentQuestionIndex,
  totalQuestions,
  quizCompleted,
  userAnswers,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  // Clear selection when moving to next question
  React.useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer, answerIndex) => {
    setSelectedAnswer(answerIndex);
    get_selected({[index]: answerIndex});
    is_next();

    if (answer.correct) {
      getScore(prevScore => prevScore + 1);
    }
  };

  // If quiz is completed, show results
  if (quizCompleted) {
    return (
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>
          Your Score: {userAnswers.score}/{totalQuestions}
        </Text>
        <Text style={styles.percentageText}>
          {Math.round((userAnswers.score / totalQuestions) * 100)}%
        </Text>

        {answers.map((questionData, qIndex) => (
          <View key={qIndex} style={styles.questionResult}>
            <Text style={styles.questionText}>
              Q{qIndex + 1}: {questionData.questionText}
            </Text>

            <Text style={styles.userAnswerText}>
              Your answer:{' '}
              {questionData.answers[userAnswers[qIndex]]?.text ||
                'Not answered'}
            </Text>

            <Text style={styles.correctAnswerText}>
              Correct answer: {questionData.answers.find(a => a.correct)?.text}
            </Text>

            <Text style={styles.explanationText}>
              Explanation:{' '}
              {questionData.answers.find(a => a.correct)?.explanation ||
                'No explanation available'}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => {
            // You'll need to implement restart logic in parent component
          }}>
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Normal quiz question view
  return (
    <View style={styles.container}>
      <Text style={styles.questionProgress}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>

      <Text style={styles.questionText}>{question}</Text>

      {answers.map((answer, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.answerButton,
            {
              borderColor: selectedAnswer === idx ? 'green' : '#000',
              backgroundColor: selectedAnswer === idx ? '#f0fff0' : '#fff',
            },
          ]}
          onPress={() => handleAnswerSelect(answer, idx)}>
          <View style={styles.radioButton}>
            {selectedAnswer === idx && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
          <Text style={styles.answerText}>{answer.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionProgress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  answerButton: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerText: {
    color: '#000',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  percentageText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionResult: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userAnswerText: {
    fontSize: 14,
    color: '#ff6b6b',
    marginBottom: 3,
  },
  correctAnswerText: {
    fontSize: 14,
    color: 'green',
    marginBottom: 3,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  restartButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubjectQuesAnsPair;
