import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useTelegramHook } from "../hooks/useTelegram";

function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { sendData, botResponse } = useTelegramHook();

  useEffect(() => {
    if (botResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "ai" },
      ]);
    }
  }, [botResponse]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      sendData({
        type: "ai_request",
        message: input,
      });
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
          rows="1"
        />
        <Button onClick={handleSendMessage}>Отправить</Button>
      </div>
    </div>
  );
}

export default AIAssistantPage;
