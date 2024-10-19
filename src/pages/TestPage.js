import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function TestPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Здесь должен быть запрос к API для получения теста
    // Пока используем моковые данные
    const mockTest = {
      id: 1,
      questions: [
        {
          id: 1,
          text: "Что такое алгоритм?",
          options: [
            "Набор инструкций для решения задачи",
            "Язык программирования",
            "Компьютерная программа",
            "Математическая формула",
          ],
        },
        {
          id: 2,
          text: "Какой тип данных используется для хранения целых чисел в большинстве языков программирования?",
          options: ["int", "float", "string", "boolean"],
        },
        // Добавьте больше вопросов по необходимости
      ],
    };
    setTest(mockTest);
  }, [courseId, lessonId]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    // Здесь должна быть логика проверки ответов и подсчета результатов
    // Пока используем моковые данные для результатов
    const results = {
      score: 80,
      totalQuestions: test.questions.length,
      correctAnswers: Math.floor(test.questions.length * 0.8),
      date: new Date().toISOString(),
      earnedPoints: 50,
    };

    // Перенаправляем на страницу результатов
    navigate(`/course/${courseId}/lesson/${lessonId}/test/result`, {
      state: { results, courseId, lessonId },
    });
  };

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
