import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTelegramHook } from "../hooks/useTelegram";

function CoursePage() {
  const { id } = useParams();
  const { user } = useTelegramHook();
  const navigate = useNavigate();

  // Здесь должна быть логика для получения данных курса по id
  // Пока используем фиктивные данные
  const course = {
    id: id,
    title: "Введение в программирование",
    description:
      "Этот курс предназначен для начинающих программистов и охватывает основные концепции программирования.",
    author: "Иван Иванов",
    createdAt: "2023-01-15",
    updatedAt: "2023-05-20",
    lessons: [
      { id: 1, title: "Основы алгоритмов", points: 10 },
      { id: 2, title: "Переменные и типы данных", points: 15 },
      { id: 3, title: "Условные операторы", points: 20 },
      { id: 4, title: "Циклы", points: 25 },
      { id: 5, title: "Функции", points: 30 },
    ],
  };

  const handleLessonClick = (lessonId) => {
    navigate(`/course/${id}/lesson/${lessonId}`);
  };

  return (
    <div className="course-page">
      <h1 className="course-title">{course.title}</h1>
      <div className="course-info">
        <p className="course-description">{course.description}</p>
        <div className="course-details">
          <p>
            <strong>Автор:</strong> {course.author}
          </p>
          <p>
            <strong>Дата создания:</strong>{" "}
            {new Date(course.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Последнее обновление:</strong>{" "}
            {new Date(course.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="course-lessons">
        <h2>Уроки курса</h2>
        <ul className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              className="lesson-item"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <span className="lesson-number">{index + 1}.</span>
              <span className="lesson-title">{lesson.title}</span>
              <span className="lesson-points">{lesson.points} баллов</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
