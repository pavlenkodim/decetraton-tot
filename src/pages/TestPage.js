import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import apiClient from "../services/apiClient";

function TestPage() {
  // Получаем параметры: courseId и lessonId
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  console.log("TestPage params:", { courseId, lessonId });

  // Состояния для данных теста, ответов пользователя, загрузки и ошибок
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения тестовых данных по API по адресу `/task_data/<lessonId>`
  const fetchTestData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/task_data/${lessonId}`);
      console.log("Полученные данные теста:", response.data);
      setTestData(response.data);
    } catch (err) {
      console.error("Ошибка загрузки теста:", err);
      setError("Ошибка загрузки теста");
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

  // Обработчик выбора ответа для тестовых вопросов
  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  // Обработка отправки теста: подсчитываем результат и переходим на страницу курса
  const handleSubmitTest = () => {
    if (!testData || !testData.questions || testData.questions.length === 0) {
      console.error("В тестовых данных отсутствуют вопросы");
      return;
    }

    let correctCount = 0;
    testData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount += 1;
      }
    });
    const score = (correctCount / testData.questions.length) * 100;
    console.log("Тест завершён. Оценка:", score, "%");

    // Здесь можно, при необходимости, отправить результаты на сервер.
    // После завершения теста перенаправляем пользователя на страницу курса:
    navigate(`/course/${courseId}`);
  };

  if (loading) return <div>Загрузка теста...</div>;
  if (error) return <div>{error}</div>;
  if (!testData) return <div>Тестовые данные не найдены.</div>;
  if (!testData.questions || testData.questions.length === 0) {
    return <div>В данных урока отсутствуют тестовые данные.</div>;
  }

  return (
    <div className="test-page">
      <h1>Тест по уроку</h1>
      {testData.questions.map((question, qIndex) => (
        <div key={question.id} className="question-block">
          <h2>Вопрос {qIndex + 1}</h2>
          <p>{question.text}</p>
          <div className="options">
            {question.options.map((option, oIndex) => (
              <label key={oIndex} className="option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === oIndex}
                  onChange={() => handleAnswerSelect(question.id, oIndex)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={handleSubmitTest}>Завершить тест</Button>
    </div>
  );
}

export default TestPage;
