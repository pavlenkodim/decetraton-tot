import React from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

function CoursesPage() {
  // Здесь должна быть логика для получения списка курсов
  // Пока используем фиктивные данные
  const courses = [
    {
      id: "course1",
      title: "Основы программирования",
      description: "Изучите базовые концепции программирования, включая переменные, функции и циклы.",
    },
    {
      id: "course2",
      title: "Веб-разработка",
      description: "Изучите основы HTML, Css, JavaScript",
    },
    {
      id: "course3",
      title: "Основы мобильной разработки",
      description: "Разрабатывайте мобильные приложения с использованием React Native",
    },
  ];

  return (
    <div className="courses-page">
      <h1>Доступные курсы</h1>
      <div className="course-list">
        {courses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
