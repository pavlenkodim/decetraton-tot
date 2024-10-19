import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useTelegramHook } from "../hooks/useTelegram";

function CoursePage() {
  const { id } = useParams();
  // const { user } = useTelegramHook();
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
      {
        id: 1,
        number: 1,
        title: "Основы алгоритмов",
        points: 10,
        completed: true,
      },
      {
        id: 2,
        number: 2,
        title: "Переменные и типы данных",
        points: 15,
        completed: true,
      },
      {
        id: 3,
        number: 3,
        title: "Условные операторы",
        points: 20,
        completed: false,
      },
      { id: 4, number: 4, title: "Циклы", points: 25, completed: false },
      { id: 5, number: 5, title: "Функции", points: 30, completed: false },
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
          {course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`lesson-item ${lesson.completed ? "completed" : ""}`}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <div className="lesson-info">
                <span className="lesson-number">{lesson.number}.</span>
                <span className="lesson-title">{lesson.title}</span>
                {lesson.completed && (
                  <span className="lesson-completed">✓</span>
                )}
              </div>
              <div className="lesson-points">🪙 {lesson.points}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
