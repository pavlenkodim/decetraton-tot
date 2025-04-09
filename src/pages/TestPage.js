import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import apiClient from "../services/apiClient";

function TestPage() {
  // Получаем параметры: courseId и lessonId
  const { courseId, lessonId } = useParams();
  console.log("TestPage params:", { courseId, lessonId });

  // Состояния для данных, ответа, загрузки и ошибок
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения данных с API по адресу /task_data/{lessonId}
  const fetchTestData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/task_data/${lessonId}`);
      console.log("Полученные данные задания:", response.data);
      setData(response.data);
    } catch (err) {
      console.error("Ошибка загрузки задания:", err);
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
    fetchTestData();
  }, [lessonId]);

  const handleSubmit = () => {
    console.log("Отправленный ответ:", answer);
    // Тут можно добавить вызов API для отправки ответа
  };

  if (loading) return <div>Загрузка задания...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>Данные задания не найдены.</div>;

  return (
    <div className="test-page">
      <h1>{data.title}</h1>
      {data.questions && Array.isArray(data.questions) ? (
        <>
          {data.questions.map((question, index) => (
            <div key={question.id} className="question-block">
              <h2>Вопрос {index + 1}</h2>
              <p>{question.text}</p>
              <div className="options">
                {question.options.map((option, oIndex) => (
                  <label key={oIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      // onChange для выбора ответа можно реализовать здесь
                      onChange={() => { }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={handleSubmit}>Завершить тест</Button>
        </>
      ) : (
        <div className="assignment-section">
          <p>
            <strong>Задание:</strong> {data.assignment}
          </p>
          <div
            className="material"
            dangerouslySetInnerHTML={{ __html: data.material }}
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Введите ваш ответ..."
            rows="5"
          />
          <Button onClick={handleSubmit}>Отправить ответ</Button>
        </div>
      )}
    </div>
  );
}

export default TestPage;
