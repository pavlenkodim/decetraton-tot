import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";

function TaskPage() {
  // Из маршрута получаем courseId и lessonId
  const { courseId, lessonId } = useParams();
  console.log("Получены параметры в TaskPage:", { courseId, lessonId });

  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для запроса данных урока/задания по эндпоинту /api/lessons/:lessonId
  const fetchTaskData = async () => {
    try {
      setLoading(true);
      // Если ваш API возвращает данные урока (задания) по адресу /api/lessons/{lessonId}
      const response = await apiClient.get(`/api/lessons/${lessonId}`);
      console.log("Полученные данные задания:", response.data);
      // Если API возвращает объект, обернём его в массив
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setTaskData(data);
    } catch (error) {
      console.error("Ошибка загрузки задания:", error);
      setError("Ошибка загрузки задания");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lessonId) {
      setError("Ошибка: lessonId не задан.");
      setLoading(false);
      return;
    }
    fetchTaskData();
  }, [courseId, lessonId]);

  if (loading) return <div>Загрузка задания...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-page">
      <div className="container">
        {taskData && taskData.length > 0 ? (
          taskData.map((task, index) => (
            <div key={index} className="task-item">
              <h2>Задание: {task.title}</h2>
              {/* Если в ответе API есть HTML-код, который нужно отобразить */}
              {task.material && (
                <div dangerouslySetInnerHTML={{ __html: task.material }} />
              )}
              <p>{task.assignment}</p>
              {/* Пример отрисовки вариантов для тестового задания */}
              {task.state === "checkbox" && task.options && (
                <div className="options">
                  {task.options.map((option, i) => (
                    <div key={i}>
                      <input type="checkbox" id={`checkbox-${index}-${i}`} />
                      <label htmlFor={`checkbox-${index}-${i}`}>
                        {option.optionText}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {task.state === "radiobox" && task.options && (
                <div className="options">
                  {task.options.map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        id={`radio-${index}-${i}`}
                        name={`question-${index}`}
                      />
                      <label htmlFor={`radio-${index}-${i}`}>
                        {option.optionText}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Нет данных о задании</div>
        )}
      </div>
    </div>
  );
}

export default TaskPage;
