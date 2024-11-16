import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

// Фиктивные данные для уроков
const lessonData = {
  course1: {
    1: {
      id: 1,
      courseId: "course1",
      number: 1,
      title: "Введение в программирование",
      content:
        "В этом уроке мы познакомимся с основными концепциями программирования. Ваша задача - написать простую программу, которая выводит 'Hello, World!' на экран.",
      task: "Напишите код на любом языке программирования, который выводит 'Hello, World!' на экран.",
    },
    2: {
      id: 2,
      courseId: "course1",
      number: 2,
      title: "Переменные и типы данных",
      content:
        "Изучите, что такое переменные и типы данных в программировании, и как их использовать.",
      task: "Напишите код, который создает переменную и присваивает ей значение.",
    },
  },
  course2: {
    1: {
      id: 1,
      courseId: "course2",
      number: 1,
      title: "Основы HTML",
      content:
        "В этом уроке вы узнаете о базовой структуре HTML-документа и его элементах.",
      task: "Создайте HTML-страницу, которая содержит заголовок и абзац текста.",
    },
    2: {
      id: 2,
      courseId: "course2",
      number: 2,
      title: "Стилизация с помощью CSS",
      content:
        "В этом уроке вы узнаете, как использовать CSS для стилизации веб-страниц. Мы рассмотрим различные CSS-свойства, такие как цвет, шрифты и отступы.",
      task: "Создайте CSS-файл, который изменяет цвет фона и задает стиль для заголовков.",
    },
    3: {
      id: 3,
      courseId: "course2",
      number: 3,
      title: "Динамика с помощью JavaScript",
      content:
        "В этом уроке вы узнаете, как добавить динамическое поведение на веб-страницу с помощью JavaScript. Мы рассмотрим события, функции и манипуляции с DOM.",
      task: "Напишите JavaScript-код, который добавляет обработчик событий для кнопки и выводит сообщение в консоль.",
    },
  },
  course3: {
    1: {
      id: 1,
      courseId: "course3",
      number: 1,
      title: "Установка окружения",
      content:
        "В этом уроке вы узнаете, как установить окружение для разработки мобильных приложений с использованием React Native. Мы рассмотрим установку Node.js, npm и Expo CLI.",
      task: "Установите Node.js, npm и Expo CLI на ваш компьютер. Поделитесь скриншотом успешной установки.",
    },
    2: {
      id: 2,
      courseId: "course3",
      number: 2,
      title: "Основы React Native",
      content:
        "В этом уроке вы познакомитесь с основными концепциями React Native, такими как компоненты, состояния и Props.",
      task: "Создайте простое React Native приложение, которое отображает приветственное сообщение.",
    },
    3: {
      id: 3,
      courseId: "course3",
      number: 3,
      title: "Создание пользовательского интерфейса",
      content:
        "В этом уроке вы узнаете, как создать пользовательский интерфейс с использованием компонентов React Native, таких как View, Text и Button.",
      task: "Создайте пользовательский интерфейс с заголовком, текстом и кнопкой с использованием React Native.",
    },
  },
};

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // Получаем данные урока на основе courseId и lessonId
    const lessonInfo =
      lessonData[courseId] && lessonData[courseId][lessonId]
        ? lessonData[courseId][lessonId]
        : null;

    if (lessonInfo) {
      setLesson(lessonInfo);
    } else {
      setLesson(null);
    }
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
    return <div>Урок не найден или загрузка данных...</div>;
  }

  return (
    <div className="lesson-page">
      <h1>
        <span className="lesson-number">Урок {lesson.number}:</span> {lesson.title}
      </h1>
      <div className="lesson-content">
        <p>{lesson.content}</p>
        <h2>Задание:</h2>
        <p>{lesson.task}</p>
      </div>
      <div className="answer-section">
        <h2>Ваш ответ:</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Введите ваш ответ здесь..."
          rows="5"
        />
        <Button onClick={handleSubmit}>Отправить ответ</Button>
      </div>
      <div className="test-section">
        <Button onClick={handleStartTest}>Пройти тест</Button>
      </div>
    </div>
  );
}

export default LessonPage;
