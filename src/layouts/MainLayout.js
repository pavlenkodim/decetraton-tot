import React from "react";
import { useLocation } from "react-router-dom";
import { useTelegramHook } from "../hooks/useTelegram";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import Button from "../components/Button";
import AIAssistantButton from "../components/AIAssistantButton";

function MainLayout({ children }) {
  const { user } = useTelegramHook();
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
          <div className="user-info">
            <img src={user?.photo} alt="User avatar" className="user-avatar" />
            <div className="user-details">
              <span className="user-name">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="user-status">
                {user?.username ? `@${user?.username}` : "Telegram User"}
              </span>
            </div>
          </div>
          <div className="user-coins">
            <span className="coin-icon">🪙</span>
            <span className="coin-amount">1000</span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <AIAssistantButton />
    </div>
  );
}

export default MainLayout;
