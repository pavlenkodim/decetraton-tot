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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Введите ваш вопрос..."
          rows="3"
        />
        <Button onClick={handleSendMessage}>Отправить</Button>
      </div>
    </div>
  );
}

export default AIAssistantPage;
