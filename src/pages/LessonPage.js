import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // Здесь должен быть запрос к API для получения данных урока
    // Пока используем моковые данные
    const mockLesson = {
      id: lessonId,
      courseId: courseId,
      number: 1,
      title: "Введение в программирование",
      content:
        "В этом уроке мы познакомимся с основными концепциями программирования. Ваша задача - написать простую программу, которая выводит 'Hello, World!' на экран.",
      task: "Напишите код на любом языке программирования, который выводит 'Hello, World!' на экран.",
    };
    setLesson(mockLesson);
  }, [courseId, lessonId]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // Здесь должна быть логика отправки ответа на сервер
    console.log("Отправленный ответ:", answer);
    // Очистка поля ввода после отправки
    setAnswer("");
  };

  const handleStartTest = () => {
    navigate(`/course/${courseId}/lesson/${lessonId}/test`);
  };

  if (!lesson) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="lesson-page">
      <h1>
        <span className="lesson-number">Урок {lesson.number}:</span>{" "}
        {lesson.title}
      </h1>
      <div className="lesson-content">
        <p>{lesson.content}</p>
        <h2>Задание:</h2>
        <p>{lesson.task}</p>
      </div>
      <div className="answer-section">
        <div className="test-section">
          <Button onClick={handleStartTest}>Пройти тест</Button>
        </div>
        <h2>Ваш ответ:</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Введите ваш ответ здесь..."
          rows="5"
        />
        <Button onClick={handleSubmit}>Отправить ответ</Button>
      </div>
    </div>
  );
}

export default LessonPage;
