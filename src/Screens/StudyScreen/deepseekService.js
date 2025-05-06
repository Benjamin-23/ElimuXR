import axios from 'axios';
import {GoogleGenerativeAI} from '@google/generative-ai';
// import {GEMINI_API_KEY} from '@env';

const genAI = new GoogleGenerativeAI('AIzaSyAVbnugBGBphOPlkdg_ZulyZlrlAlvWoHQ');
export const generateText = async prompt => {
  try {
    // For text-only input
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro-exp-03-25',
    });

    const result = await model.generateContent(prompt);
    // console.log(result, 'result');
    const response = await result.response;
    // console.log(response, 'response');
    const text = response.text();
    // console.log(text, 'text');

    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};
