import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения списка курсов
    // Пока используем моковые данные
    const mockCourses = [
      {
        id: 1,
        title: "Введение в React",
        description: "Базовый курс по React",
      },
      {
        id: 2,
        title: "Продвинутый JavaScript",
        description: "Углубленное изучение JS",
      },
      {
        id: 3,
        title: "Node.js для начинающих",
        description: "Основы серверной разработки на Node.js",
      },
    ];
    setCourses(mockCourses);
  }, []);

  return (
    <div className="courses-page">
      <h1>Все курсы</h1>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/course/${course.id}`}>Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
