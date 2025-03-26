import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Функция для получения данных курса
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
  const { id } = useParams(); // Получаем ID курса из URL
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Неверный ID курса.");
      return;
    }

    // Делаем запрос на получение данных курса по ID
    fetchCourseData(id)
      .then((data) => {
        setCourse(data); // Сохраняем данные курса в состоянии
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки курса:", err);
        setError("Не удалось загрузить курс.");
        setLoading(false);
      });
  }, [id]);

  // Если данные ещё загружаются
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  // Если курс не найден
  if (!course) {
    return <div>Курс не найден.</div>;
  }

  // Функция для перехода на страницу задания
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="course-page">
      <div className="container">
        {/* Заголовок и описание курса */}
        <div className="course-header">
          <h1>{course.name}</h1>
          <p>{course.description}</p>
        </div>

        {/* Информация о курсе */}
        <div className="course-details">
          <p><strong>Автор:</strong> {course.author}</p>
          <p>
            <strong>Дата создания:</strong> {new Date(course.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Последнее обновление:</strong> {new Date(course.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Список заданий курса */}
        <div className="tasks">
          <h2>Задания:</h2>
          {course.tasks && course.tasks.length > 0 ? (
            course.tasks.map((task) => (
              <div
                key={task.id}
                className="task"
                onClick={() => handleTaskClick(task.id)}
              >
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <a href={task.link}>Посмотреть задание</a>
              </div>
            ))
          ) : (
            <p>Нет заданий, прикрепленных к этому курсу.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
