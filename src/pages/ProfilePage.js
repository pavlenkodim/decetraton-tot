import React from "react";
import "../App.css";
import { useTelegramHook } from "../hooks/useTelegram";
import CourseCard from "../components/CourseCard";

function ProfilePage() {
  const { user } = useTelegramHook();

  // Фиктивные данные профиля
  const purchasedCourses = [
    {
      id: 1,
      title: "Введение в React",
      progress: 30,
      description: "Базовый курс по React",
    },
    {
      id: 2,
      title: "Продвинутый JavaScript",
      progress: 30,
      description: "Углубленное изучение JS",
    },
    {
      id: 3,
      title: "Node.js для начинающих",
      progress: 30,
      description: "Основы серверной разработки на Node.js",
    },
  ];

  return (
    <div className="profile-page">
      <div className="user-info">
        <img src={user?.photo_url} alt="User avatar" className="user-avatar" />
        <p className="user-role">Junior programmer</p>
        <h2 className="user-name">{user?.first_name} {user?.last_name}</h2>
      </div>

      <div className="account-balance">
        <p>Баланс аккаунта: <span className="balance-amount"><span className="coin-icon">🪙</span> 1000 TotCoins</span></p>
      </div>

      <div className="weekly-ranking">
        <p>Рейтинг недели: <span className="ranking-position">🏆 1 место</span></p>
      </div>

      <div className="purchased-courses">
        <h2>Приобретенные курсы</h2>
        <div className="course-list">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <button className="leave-review-button">Оставить отзыв</button>
      </div>
    </div>
  );
}

export default ProfilePage;
