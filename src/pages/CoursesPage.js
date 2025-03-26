import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import axios from "axios";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Печатаем данные, чтобы увидеть, что приходит от сервера
        if (response.data && Array.isArray(response.data.courses)) {
          console.log("courses:", response.data.courses);
          setCourses(response.data.courses);  // Если это массив, сохраняем его
        } else {
          console.warn("Ожидался массив курсов, но получен:", response.data.courses);
          setCourses([]);  // В случае ошибки очищаем список курсов
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки курсов:", error);
        setError("Ошибка загрузки курсов");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка курсов...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="courses-page">
      <h1>Доступные курсы</h1>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`} // Исправил строку на правильный формат
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
