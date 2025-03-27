import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import apiClient from "../services/apiClient";

function TestPage() {
  // Получаем параметры из URL: courseId и lessonId (передаётся в маршруте)
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // Для отладки выводим параметры
  console.log("TestPage params:", { courseId, lessonId });

  // Состояния для тестовых данных и ответов пользователя
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});

  const fetchData = async () => {
    try {
      const response = await apiClient(`/task_data/${lessonId}`);
      setTest(response.data);
    } catch (error) {
      console.error("Ошибка загрузки теста:", error);
    }
  };

  useEffect(() => {
    if (!lessonId) {
      console.error("Ошибка: lessonId не задан.");
      return;
    }
    fetchData();
  }, [lessonId]);

  // Обработчик выбора ответа для вопроса
  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  // Обработка отправки теста
  const handleSubmit = () => {
    if (!test || !test.questions) return;

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

    // Перенаправляем на страницу результатов теста,
    // передавая результаты, courseId и lessonId через state
    navigate(`/course/${courseId}/lesson/${lessonId}/test/result`, {
      state: { results, courseId, lessonId },
    });
  };

  // Пока данные не загрузились – показываем индикатор загрузки
  if (!test) {
    return <div>Загрузка теста...</div>;
  }

  return (
    <div className="test-page">
      <h1>Тест по уроку</h1>
      {test.questions &&
        test.questions.map((question, qIndex) => (
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
