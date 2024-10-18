import React, { useState } from "react";
import Button from "../components/Button";

function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      // Здесь должен быть запрос к AI API
      // Пока что просто имитируем ответ от AI
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Ответ на: ${input}`, sender: "ai" },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="ai-assistant-page">
      <h1>AI Ассистент</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
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
