import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import axios from "axios";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Отправляем запрос на относительный URL.
    // Благодаря proxy в package.json запрос попадет на:
    // https://timofeirazow.pythonanywhere.com/api/user_dashboard
    axios
      .get("/api/user_dashboard", {
        headers: {
          "Accept": "application/json",
        },
      })
      .then((response) => {
        console.log("Полученные данные:", response.data);
        // Если API возвращает объект с полем courses, используйте response.data.courses, иначе response.data
        setCourses(response.data.courses || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки курсов:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка курсов...</div>;
  }

  return (
    <div className="courses-page">
      <h1>Доступные курсы</h1>
      <div className="course-list">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              style={{ textDecoration: "none" }}
            >
              <CourseCard course={course} />
            </Link>
          ))
        ) : (
          <div className="course-item">
            <h2>Нет доступных курсов</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
