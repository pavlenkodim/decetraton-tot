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
        <Button onClick={() => handleNavigation("/ai-assistant")}>
          AI Ассистент
        </Button>
      </nav>
      <Button onClick={onToggleButton}>Toggle Main Button</Button>
    </div>
  );
}

export default HomePage;
