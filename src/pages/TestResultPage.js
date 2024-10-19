import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useTelegramHook } from "../hooks/useTelegram";

function TestResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendData } = useTelegramHook();
  const { results, courseId } = location.state || {};

  if (!results) {
    return <div>Ошибка: результаты теста не найдены</div>;
  }

  const { score, totalQuestions, correctAnswers, date, earnedPoints } = results;

  const handleReturnToCourse = () => {
    // Отправляем данные боту перед возвратом к курсу
    sendData({
      type: "test_result",
      courseId,
      score,
      totalQuestions,
      correctAnswers,
      date,
      earnedPoints,
    });
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="test-result-page">
      <h1>Результаты теста</h1>
      <div className="result-summary">
        <p>Дата выполнения: {new Date(date).toLocaleString()}</p>
        <p>
          Правильных ответов: {correctAnswers} из {totalQuestions}
        </p>
        <p>Ваш результат: {score}%</p>
        <p>Заработано баллов: {earnedPoints}</p>
      </div>
      <Button onClick={handleReturnToCourse}>Вернуться к курсу</Button>
    </div>
  );
}

export default TestResultPage;
