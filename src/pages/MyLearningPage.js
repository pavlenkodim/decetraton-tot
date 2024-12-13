import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useTelegramHook } from "../hooks/useTelegram";
import CourseCard from "../components/CourseCard";

const MyLearningPage = () => {
  // const { user } = useTelegramHook();
  // const navigate = useNavigate();

  // Здесь должна быть логика для получения купленных курсов пользователя
  // Пока используем фиктивные данные
  const purchasedCourses = [
    {
      id: "course1",
      title: "Введение в программирование",
      progress: 30,
      description: "Базовый курс для начинающих",
    },
    {
      id: "course2",
      title: "Основы JavaScript",
      progress: 50,
      description: "Изучите основы JavaScript",
    },
    {
      id: "course3",
      title: "React для начинающих",
      progress: 10,
      description: "Начните создавать приложения с React",
    },
  ];

  return (
    <div className="my-learning-page">
      <h1>Мое обучение</h1>
      <p>Приобретенные уроки:</p>
      <div className="course-list">
        {purchasedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyLearningPage;
