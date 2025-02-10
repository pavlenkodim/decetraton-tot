import React, { useState } from "react";
import Button from "../components/Button";
import { useTelegramHook } from "../hooks/useTelegram";
import { sendPromptToDeepSeek } from "../services/deepseekService"; // Импортируем сервис

function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { sendMessage } = useTelegramHook();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        // Запрашиваем ответ от DeepSeek API
        const aiResponseText = await sendPromptToDeepSeek(input);
        const aiResponse = { text: aiResponseText, sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);

        // Отправляем сообщение в Telegram
        await sendMessage(aiResponse.text);
      } catch (error) {
        console.error("Ошибка при запросе к DeepSeek API:", error);
        const errorMessage = { text: "Произошла ошибка при обработке запроса.", sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setInput("");
    }
  };

  return (
    <div className="ai-assistant-page">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Введите ваш вопрос..."
        />
        <Button onClick={handleSendMessage}>Отправить</Button>
      </div>
    </div>
  );
}

export default AIAssistantPage;
