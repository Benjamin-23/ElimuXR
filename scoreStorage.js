import AsyncStorage from '@react-native-async-storage/async-storage';

export const writeScore = async score => {
  try {
    // Get existing scores or create empty array
    const existingScores = await AsyncStorage.getItem('quizScores');
    const scoresArray = existingScores ? JSON.parse(existingScores) : [];

    // Add new score with timestamp
    scoresArray.push({
      score,
      date: new Date().toISOString(),
    });
    console.log(score, 'stored score');

    // Save back to storage
    await AsyncStorage.setItem('quizScores', JSON.stringify(scoresArray));
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const readScores = async () => {
  try {
    const scores = await AsyncStorage.getItem('quizScores');
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error reading scores:', error);
    return [];
  }
};

export const clearScores = async () => {
  try {
    await AsyncStorage.removeItem('quizScores');
  } catch (error) {
    console.error('Error clearing scores:', error);
  }
};
