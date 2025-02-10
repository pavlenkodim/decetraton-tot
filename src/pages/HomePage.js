import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <div className="info-block">
        <h2>Ищи себя в TOTcourse!</h2>
        <p>
          Осваивай программирование и зарабатывай TOT coins! Получай нашу валюту
          за успехи и меняй её на бонусы или новые курсы. Учись, развивайся,
          получай награды!
        </p>
      </div>
      <nav className="main-menu">
        <div className="square-buttons">
          <Button
            onClick={() => handleNavigation("/my-learning")}
            className="home-button square-button my-learning"
          >
            <div className="course-counter">
              <span className="course-counter-number">3</span>
              <span className="course-counter-text">курса</span>
            </div>
            <h3>Мое обучение</h3>
          </Button>
          <Button
            onClick={() => handleNavigation("/courses")}
            className="home-button square-button all-courses"
          >
            <div className="course-counter">
              <span className="course-counter-number">3</span>
              <span className="course-counter-text">курса</span>
            </div>
            <h3>Все курсы</h3>
          </Button>
        </div>
        <Button
          onClick={() => handleNavigation("/rewards")}
          className="home-button rewards"
        >
          <p className="rewards-description">
            Доп. курсы за наши TOT coins. Курсы, которые понравились всем нашим
            пользователям за уникальную структуру и особую подачу информации
          </p>
          <h3>Магазин вознаграждений</h3>
        </Button>
        <Button
          onClick={() => handleNavigation("/leaderboard")}
          className="home-button leaderboard"
        >
          <h3>Лидеры</h3>
        </Button>
        <Button
          onClick={() => handleNavigation("/profile")}
          className="home-button profile"
        >
          <h3>Профиль</h3>
        </Button>
      </nav>
    </div>
  );
}

export default HomePage;
