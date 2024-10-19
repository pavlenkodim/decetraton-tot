import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useTelegramHook } from "../hooks/useTelegram";

function HomePage() {
  const { onToggleButton } = useTelegramHook();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <nav className="main-menu">
        <Button onClick={() => handleNavigation("/my-learning")}>
          Мое обучение
        </Button>
        <Button onClick={() => handleNavigation("/courses")}>Все курсы</Button>
        <Button onClick={() => handleNavigation("/rewards")}>Награды</Button>
        <Button onClick={() => handleNavigation("/profile")}>Профиль</Button>
      </nav>
      <Button onClick={onToggleButton} className="toggle-main-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 16l-6-6h12z" fill="currentColor" />
        </svg>
      </Button>
    </div>
  );
}

export default HomePage;
