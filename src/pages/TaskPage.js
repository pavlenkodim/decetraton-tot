import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";

function TaskPage() {
  const { courseId, lessonId } = useParams();
  console.log("Получены параметры в TaskPage:", { courseId, lessonId });

  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseData = async () => {
    try {
      const response = await apiClient(`/api/course/${courseId}`);
      console.log("Полученные данные курса:", response.data);
    } catch (error) {
      console.error("Ошибка загрузки курса:", error);
    } finally {
    }
  };

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const response = await apiClient(`/task_data/${lessonId}`);
      console.log("Полученные данные задания:", response.data);
      setTaskData(response.data);
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
    fetchCourseData();
    fetchTaskData();
  }, [courseId, lessonId]);

  if (loading) return <div>Загрузка задания...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-page">
      <div className="container">
        {taskData.map((task, index) => (
          <div key={index}>
            <h2>Задание: {task.questionText}</h2>
            {task.state === "checkbox" && (
              <div>
                {task.options.map((options, index) => (
                  <div key={index}>
                    <input type="checkbox" />
                    <label>{options.optionText}</label>
                  </div>
                ))}
              </div>
            )}
            {task.state === "radiobox" && (
              <div>
                {task.options.map((options, index) => (
                  <div key={index}>
                    <input type="radio" />
                    <label>{options.optionText}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
