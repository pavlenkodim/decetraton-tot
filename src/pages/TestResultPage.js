import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function TestResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, courseId, lessonId } = location.state || {};

  if (!results) {
    return <div>Ошибка: результаты теста не найдены</div>;
  }

  const { score, totalQuestions, correctAnswers, date, earnedPoints } = results;

  const handleReturnToCourse = () => {
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