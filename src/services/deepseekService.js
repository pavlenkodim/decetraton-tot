import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Проверь актуальность URL
const API_KEY = 'sk-238f6b01191642faa7f59a5b2566650b'; // Проверь актуальность API-ключа

export const sendPromptToDeepSeek = async (prompt) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        validateStatus: function (status) {
          return status >= 200 && status < 300; // Разрешаем только успешные ответы
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка ответа API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request);
    } else {
      console.error('Неизвестная ошибка:', error.message);
    }
    throw error;
  }
};