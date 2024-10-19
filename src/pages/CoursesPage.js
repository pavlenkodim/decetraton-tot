import React from "react";
import CourseCard from "../components/CourseCard";

function CoursesPage() {
  // Здесь должна быть логика для получения списка курсов
  // Пока используем фиктивные данные
  const courses = [
    {
      id: 1,
      title: "Введение в программирование",
      description: "Базовый курс для начинающих программистов",
    },
    {
      id: 2,
      title: "JavaScript для начинающих",
      description: "Изучите основы JavaScript",
    },
    {
      id: 3,
      title: "Введение в программирование",
      description: "Базовый курс для начинающих программистов",
    },
  ];

  return (
    <div className="courses-page">
      <h1>Доступные курсы</h1>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
