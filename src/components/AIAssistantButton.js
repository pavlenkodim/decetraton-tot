import React, { useState } from "react";
import Button from "./Button";
import AIAssistantPage from "../pages/AIAssistantPage";

function AIAssistantButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button onClick={toggleModal} className="ai-assistant-button">
        AI
      </Button>
      {isModalOpen && (
        <div className="ai-assistant-modal">
          <div className="ai-assistant-modal-content">
            <Button onClick={toggleModal} className="close-modal-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </Button>
            <AIAssistantPage />
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistantButton;
