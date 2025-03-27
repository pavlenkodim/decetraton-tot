import axios from "axios";

const URL =
  process.env.REACT_APP_DEEPSEEK_API_URL || "http://192.168.235.38:5000/chat";

export const sendPromptToDeepSeek = async (prompt) => {
  try {
    const response = await axios.post(URL, {
      text: prompt,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Ошибка ответа API:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Ошибка запроса:", error.request);
    } else {
      console.error("Неизвестная ошибка:", error.message);
    }
    throw error;
  }
};
