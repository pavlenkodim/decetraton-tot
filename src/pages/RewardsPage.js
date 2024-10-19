import React, { useState, useEffect } from "react";
import Button from "../components/Button";
// import { useTelegramHook } from "../hooks/useTelegram";

function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  // const { user } = useTelegramHook();

  useEffect(() => {
    // Здесь должен быть запрос к API для получения списка наград и товаров
    // Пока используем моковые данные
    const mockRewards = [
      {
        id: 1,
        type: "course",
        name: "Курс по JavaScript со скидкой 50%",
        description: "Углубленный курс по JavaScript с практическими заданиями",
        price: 500,
        available: true,
      },
      {
        id: 2,
        type: "nft",
        name: "Эксклюзивный NFT-токен",
        description: "Уникальный NFT-токен, подтверждающий ваши достижения",
        price: 1000,
        available: true,
      },
      {
        id: 3,
        type: "reward",
        name: "Сертификат об окончании курса",
        description: "Цифровой сертификат, подтверждающий ваши знания",
        price: 0,
        available: true,
      },
    ];
    setRewards(mockRewards);
  }, []);

  const handleAction = (reward) => {
    if (reward.type === "reward") {
      console.log(`Получение награды: ${reward.name}`);
      // Здесь должна быть логика получения награды
    } else {
      console.log(`Покупка товара: ${reward.name}`);
      // Здесь должна быть логика покупки товара
    }
  };

  return (
    <div className="rewards-page">
      <h1>Магазин вознаграждений</h1>
      <div className="rewards-list">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-card">
            <h2>{reward.name}</h2>
            <p>{reward.description}</p>
            <p className="price">Цена: {reward.price} TotCoins</p>
            <p
              className={`availability ${
                reward.available ? "available" : "unavailable"
              }`}
            >
              {reward.available ? "Доступно" : "Недоступно"}
            </p>
            <Button
              onClick={() => handleAction(reward)}
              disabled={!reward.available}
            >
              {reward.type === "reward" ? "Получить" : "Купить"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardsPage;
