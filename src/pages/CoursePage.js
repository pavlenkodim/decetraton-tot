import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Данные курсов внутри файла для эмуляции сервера
const courseData = {
  course1: {
    id: "course1",
    title: "Основы программирования",
    description: "Изучите базовые концепции программирования, включая переменные, функции и циклы.",
    author: "Иван Иванов",
    createdAt: "2023-01-15",
    updatedAt: "2023-05-20",
    lessons: [
      { id: 1, number: 1, title: "Основы алгоритмов", points: 10, completed: true },
      { id: 2, number: 2, title: "Переменные и типы данных", points: 15, completed: true },
      { id: 3, number: 3, title: "Условные операторы", points: 20, completed: false },
      { id: 4, number: 4, title: "Циклы", points: 25, completed: false },
      { id: 5, number: 5, title: "Функции", points: 30, completed: false },
    ],
  },
  course2: {
    id: "course2",
    title: "Веб-разработка",
    description: "Погрузитесь в мир HTML, CSS и JavaScript для создания современных веб-сайтов.",
    author: "Петр Петров",
    createdAt: "2023-02-01",
    updatedAt: "2023-06-10",
    lessons: [
      { id: 1, number: 1, title: "Основы HTML", points: 10, completed: false },
      { id: 2, number: 2, title: "Стилизация с помощью CSS", points: 15, completed: false },
      { id: 3, number: 3, title: "Динамика с помощью JavaScript", points: 20, completed: false },
    ],
  },
  course3: {
    id: "course3",
    title: "Основы мобильной разработки",
    description: "Разрабатывайте мобильные приложения с использованием React Native.",
    author: "Анна Сидорова",
    createdAt: "2023-03-10",
    updatedAt: "2023-07-15",
    lessons: [
      { id: 1, number: 1, title: "Установка окружения", points: 10, completed: false },
      { id: 2, number: 2, title: "Основы React Native", points: 15, completed: false },
      { id: 3, number: 3, title: "Создание пользовательского интерфейса", points: 20, completed: false },
    ],
  },
};

// Функция для получения данных курса
const fetchCourseData = (courseId) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseData[courseId] || null);
    }, 500); // Симуляция задержки ответа сервера
  });

function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !courseData[id]) {
      setLoading(false);
      return;
    }
    fetchCourseData(id).then((data) => {
      setCourse(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!course) {
    return <div>Курс не найден. Проверьте правильность идентификатора.</div>;
  }

  // Функция обработки клика по уроку, перенаправляет пользователя на страницу урока
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
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map((lesson) => (
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
            ))
          ) : (
            <li>Уроки не найдены.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
