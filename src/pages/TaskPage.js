import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TaskPage() {
  // Из маршрута получаем courseId, lessonId и taskId
  const { courseId, lessonId, taskId } = useParams();
  console.log("Получены параметры в TaskPage:", { courseId, lessonId, taskId });
  
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taskId) {
      setError("Ошибка: taskId не задан.");
      setLoading(false);
      return;
    }

    // Формируем URL запроса с использованием courseId и taskId
    const url = `/api/course/${courseId}/task_data/${taskId}`;
    console.log("Запрос задания по URL:", url);

    axios
      .get(url, {
        headers: { "Accept": "application/json" },
      })
      .then((response) => {
        console.log("Полученные данные задания:", response.data);
        setTaskData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки задания:", err);
        setError("Ошибка загрузки задания");
        setLoading(false);
      });
  }, [courseId, lessonId, taskId]);

  if (loading) return <div>Загрузка задания...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-page">
      <div className="container">
        <h1>Задание: {taskData.title}</h1>
        <p>{taskData.description}</p>
        {/* Дополнительное отображение данных задания */}
      </div>
    </div>
  );
}

export default TaskPage;
