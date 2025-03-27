import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import apiClient from "../services/apiClient";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient("/api/user_dashboard");
      setCourses(response.data.courses || response.data);
    } catch (error) {
      console.error("Ошибка загрузки курсов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
            <Link key={course.id} to={`/course/${course.id}`} style={{ textDecoration: "none" }}>
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
