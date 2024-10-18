import React from "react";
import { useNavigate } from "react-router-dom";
import { useTelegramHook } from "../hooks/useTelegram";
import Button from "../components/Button";

const MyLearningPage = () => {
  const { user } = useTelegramHook();
  const navigate = useNavigate();

  // Здесь должна быть логика для получения купленных курсов пользователя
  // Пока используем фиктивные данные
  const purchasedCourses = [
    { id: 1, title: "Введение в программирование", progress: 30 },
    { id: 2, title: "Основы JavaScript", progress: 50 },
    { id: 3, title: "React для начинающих", progress: 10 },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="my-learning-page">
      <h1>Мое обучение</h1>
      <p>Здравствуйте, {user?.username || "пользователь"}! Вот ваши курсы:</p>
      <div className="course-list">
        {purchasedCourses.map((course) => (
          <div key={course.id} className="course-item">
            <h2>{course.title}</h2>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{course.progress}%</span>
            </div>
            <Button
              onClick={() => handleCourseClick(course.id)}
              className="course-button"
            >
              Перейти к курсу
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearningPage;
