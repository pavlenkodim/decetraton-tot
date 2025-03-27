import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const fetchCourseData = (courseId) =>
  fetch(`/api/course/${courseId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки курса");
      }
      return response.json();
    })
    .then((data) => data);

function CoursePage() {
  const { id } = useParams(); // id курса
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Неверный ID курса.");
      setLoading(false);
      return;
    }

    fetchCourseData(id)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки курса:", err);
        setError("Не удалось загрузить курс.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!course) return <div>Курс не найден.</div>;

  // Функция для перехода на страницу задания.
  const handleTaskClick = (taskId) => {
    if (!taskId) {
      console.error("Ошибка: taskId не задан.");
      return;
    }
    console.log("Переход на задание:", taskId);
    
    // Переход на задание с правильным API-путём
    navigate(`/task_data/${taskId}`);
  };

  return (
    <div className="course-page">
      <div className="container">
        <div className="course-header">
          <h1>{course.name}</h1>
          <p>{course.description}</p>
        </div>
        <div className="course-details">
          <p><strong>Автор:</strong> {course.author}</p>
          <p>
            <strong>Дата создания:</strong> {new Date(course.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Последнее обновление:</strong> {new Date(course.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="tasks">
          <h2>Задания:</h2>
          {course.tasks && Array.isArray(course.tasks) && course.tasks.length > 0 ? (
            course.tasks.map((task, index) => {
              // Если у задания нет поля id, используем индекс+1 как строку
              const taskId = task.id ? task.id.toString() : (index + 1).toString();
              console.log("Отрисовываем задание:", taskId);
              return (
                <div
                  key={taskId}
                  className="task"
                  onClick={() => handleTaskClick(taskId)}
                  style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(taskId);
                    }}
                  >
                    Посмотреть задание
                  </button>
                </div>
              );
            })
          ) : (
            <p>Нет заданий, прикрепленных к этому курсу.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
