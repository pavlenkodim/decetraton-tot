import React from "react";
import { useTelegramHook } from "../hooks/useTelegram";
import CourseCard from "../components/CourseCard";

function ProfilePage() {
  const { user } = useTelegramHook();

  // Здесь должна быть логика для получения данных профиля и купленных курсов
  // Пока используем фиктивные данные
  const purchasedCourses = [
    {
      id: 1,
      title: "Введение в программирование",
      progress: 30,
      description: "Базовый курс для начинающих",
    },
    {
      id: 2,
      title: "Основы JavaScript",
      progress: 50,
      description: "Изучите основы JavaScript",
    },
  ];

  return (
    <div className="profile-page">
      <h1>Профиль</h1>
      <div className="user-info">
        <img src={user?.photo_url} alt="User avatar" className="user-avatar" />
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
        <p>@{user?.username}</p>
      </div>
      <div className="purchased-courses">
        <h2>Купленные курсы</h2>
        <div className="course-list">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
