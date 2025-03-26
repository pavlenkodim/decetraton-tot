import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button"; // Компонент Button для кнопки
import axios from "axios"; // Импортируем axios

function TestPage() {
  const { courseId, lessonId } = useParams();  // Получаем параметры из URL
  const navigate = useNavigate();

  const [test, setTest] = useState(null);  // Храним данные теста
  const [answers, setAnswers] = useState({});  // Храним ответы пользователя

  useEffect(() => {
    console.log("courseId:", courseId, "lessonId:", lessonId);  // Для отладки
    if (!lessonId) {
      console.error("Ошибка: lessonId не задан.");
      return;
    }

    // Делаем запрос к API для получения данных теста
    axios
      .get(`/api/task_data/${lessonId}`, {
        headers: {
          "Accept": "application/json",
        },
      })
      .then((response) => {
        console.log("Полученные данные теста:", response.data);
        setTest(response.data);  // Сохраняем данные теста
      })
      .catch((error) => {
        console.error("Ошибка загрузки теста:", error);
      });
  }, [lessonId]);  // Зависимость от lessonId

  // Обработка выбора ответа
  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  // Обработка отправки теста
  const handleSubmit = () => {
    let correctAnswers = 0;
    test.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const results = {
      score: (correctAnswers / test.questions.length) * 100,
      totalQuestions: test.questions.length,
      correctAnswers,
      date: new Date().toISOString(),
      earnedPoints: correctAnswers * 10, // Например, 10 очков за правильный ответ
    };

    // Перенаправляем на страницу с результатами
    navigate(`/course/${courseId}/lesson/${lessonId}/test/result`, {
      state: { results, courseId, lessonId },
    });
  };

  // Если данные теста не загружены
  if (!test) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="test-page">
      <h1>Тест по уроку</h1>
      {test.questions.map((question, qIndex) => (
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
      <Button onClick={handleSubmit}>Завершить тест</Button>
    </div>
  );
}

export default TestPage;
