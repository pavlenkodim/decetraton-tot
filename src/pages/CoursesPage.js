import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import apiClient from "../services/apiClient";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCourses = useMemo(() => {
    const lowerFilter = filter.trim().toLowerCase();
    if (lowerFilter === "") {
      return courses;
    }
    return courses.filter((course) => {
      const courseTitle = (course.title || course.name || "").toLowerCase();
      return courseTitle.includes(lowerFilter);
    });
  }, [courses, filter]);

  if (loading) {
    return <div>Загрузка курсов...</div>;
  }

  return (
    <div className="courses-page">
      <h1>Доступные курсы</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Введите название курса:"
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid var(--tg-theme-hint-color)",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="course-list">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
