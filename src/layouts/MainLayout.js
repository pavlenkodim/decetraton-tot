import React from "react";
import { useLocation } from "react-router-dom";
import { useTelegramHook } from "../hooks/useTelegram";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import Button from "../components/Button";
import AIAssistantButton from "../components/AIAssistantButton";

function MainLayout({ children }) {
  const { user, onClose } = useTelegramHook();
  const { goBack } = useCustomNavigate();
  const location = useLocation();

  return (
    <div className="main-layout">
      <header>
        <div className="header-buttons">
          {location.pathname !== "/" && (
            <Button onClick={goBack} className="icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </Button>
          )}
          <Button onClick={onClose} className="icon-button">
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
        </div>
        <h1>Welcome, {user?.first_name}</h1>
      </header>
      <main>{children}</main>
      <AIAssistantButton />
    </div>
  );
}

export default MainLayout;
