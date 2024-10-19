import React, { useState } from "react";
import Button from "../components/Button";
import { useTelegramHook } from "../hooks/useTelegram";

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

      // Здесь должен быть запрос к AI для получения ответа
      const aiResponse = { text: `Ответ на: ${input}`, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      // Отправляем сообщение в Telegram
      await sendMessage(aiResponse.text);

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
