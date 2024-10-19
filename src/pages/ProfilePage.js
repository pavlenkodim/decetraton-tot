import React, { useState, useEffect } from "react";
import { useTelegramHook } from "../hooks/useTelegram";
import Button from "../components/Button";

function ProfilePage() {
  const { user } = useTelegramHook();
  const [totcoins, setTotcoins] = useState(0);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения баланса totcoins и купленных курсов
    // Пока используем моковые данные
    setTotcoins(1000);
    setPurchasedCourses([
      { id: 1, title: "Введение в программирование", progress: 60 },
      { id: 2, title: "Основы JavaScript", progress: 30 },
      { id: 3, title: "React для начинающих", progress: 0 },
    ]);
  }, []);

  return (
    <div className="profile-page">
      <div className="user-info">
        <img
          src={user?.photo_url || "https://via.placeholder.com/100"}
          alt="User avatar"
          className="user-avatar"
        />
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
        <p>@{user?.username}</p>
      </div>

      <div className="account-info">
        <h3>Баланс аккаунта</h3>
        <p className="totcoins">🪙 {totcoins} TotCoins</p>
        <h3>Рейтинг</h3>
        <p className="totcoins">🏆 {user?.rating || 31} место </p>
        <p>на этой неделе</p>
      </div>

      <div className="purchased-courses">
        <h2>Приобретенные курсы</h2>
        {purchasedCourses.length > 0 ? (
          <ul className="course-list">
            {purchasedCourses.map((course) => (
              <li key={course.id} className="course-item">
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{course.progress}%</span>
                </div>
                <Button>Продолжить</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас пока нет приобретенных курсов.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
