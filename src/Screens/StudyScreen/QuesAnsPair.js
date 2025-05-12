import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const QuesAnsPair = ({
  question,
  answers,
  is_next,
  getScore,
  get_selected,
  index,
  colors,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerSelect = (answer, answerIndex) => {
    setSelectedAnswer(answerIndex);
    get_selected({[index]: answerIndex});
    is_next();

    if (answer.correct) {
      getScore(prevScore => prevScore + 1);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.text,
          marginBottom: 20,
        }}>
        {question}
      </Text>

      {answers.map((answer, idx) => (
        <TouchableOpacity
          key={idx}
          style={{
            color: '#000',
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor:
              selectedAnswer === idx ? colors.primary : colors.border,
            backgroundColor:
              selectedAnswer === idx ? colors.card : colors.background,
          }}
          onPress={() => handleAnswerSelect(answer, idx)}>
          <Text style={{color: colors.text}}>{answer.text}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnswer !== null && answers[selectedAnswer]?.explanation && (
        <Text style={{marginTop: 10, fontStyle: 'italic', color: colors.text}}>
          {answers[selectedAnswer].explanation}
        </Text>
      )}
    </View>
  );
};

export default QuesAnsPair;
