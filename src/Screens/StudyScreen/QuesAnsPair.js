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

    // Update score if answer is correct
    if (answer.correct) {
      // Award one point if the answer is correct
      getScore(prevScore => {
        const newScore = prevScore + 1;
        return newScore; // Store the updated score value
      });
    }
  };

  // If quiz is completed, show results
  if (quizCompleted) {
    // Make sure questions data exists
    const questions = userAnswers.questions || [];

    return (
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>
          Your Score: {userAnswers.score}/{totalQuestions}
        </Text>
        <Text style={styles.percentageText}>
          {Math.round((userAnswers.score / totalQuestions) * 100)}%
        </Text>

        {questions.map((questionData, qIndex) => {
          // Find the user's selected answer for this question
          const userSelectedIndex = userAnswers[questionData.index];
          const userSelectedAnswer =
            userSelectedIndex !== undefined
              ? questionData.answers[userSelectedIndex]
              : null;

          // Find the correct answer
          const correctAnswer = questionData.answers.find(a => a.correct);

          return (
            <View key={qIndex} style={styles.questionResult}>
              <Text style={styles.questionText}>
                Q{qIndex + 1}: {questionData.questionText}
              </Text>

              <Text style={styles.userAnswerText}>
                Your answer: {userSelectedAnswer?.text || 'Not answered'}
              </Text>

              <Text style={styles.correctAnswerText}>
                Correct answer:{' '}
                {correctAnswer?.text || 'No correct answer found'}
              </Text>

              <Text style={styles.explanationText}>
                Explanation:{' '}
                {correctAnswer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        })}
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default SubjectQuesAnsPair;
