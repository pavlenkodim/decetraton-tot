// src/pages/TheoryPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import Button from "../components/Button";

function TheoryPage() {
  // Получаем параметры: courseId, lessonId и taskId
  const { courseId, lessonId, taskId } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taskId) {
      setError("Ошибка: taskId не задан.");
      setLoading(false);
      return;
    }
    
    // Сформируйте URL запроса согласно вашему API
    const endpoint = `/api/task/${taskId}`;
    console.log("Запрашиваем материал по URL:", endpoint);

    apiClient
      .get(endpoint)
      .then((response) => {
        console.log("Полученные данные материала:", response.data);
        setMaterial(response.data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки материала:", err);
        setError("Ошибка загрузки материала");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskId]);

  // Функция перехода на страницу теста
  const handlePassTest = () => {
    // Переход на страницу теста. Маршрут теста у нас будет: /course/:courseId/lesson/:lessonId/test
    navigate(`/course/${courseId}/lesson/${lessonId}/test`);
  };

  if (loading) return <div>Загрузка материала...</div>;
  if (error) return <div>{error}</div>;
  if (!material) return <div>Материал не найден.</div>;

  return (
    <div className="theory-page">
      <div className="container">
        <h1>{material.title}</h1>
        <div className="material-content" dangerouslySetInnerHTML={{ __html: material.theory }} />
        <div className="assignment">
          <h2>Задание</h2>
          <p>{material.assignment}</p>
          {material.task_data && material.task_data.length > 0 && (
            <div className="task-options">
              <h3>Варианты ответов:</h3>
              <ul>
                {material.task_data.map((opt, index) => (
                  <li key={index}>{opt.optionText}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button onClick={handlePassTest}>Пройти тест</Button>
      </div>
    </div>
  );
}

export default TheoryPage;
