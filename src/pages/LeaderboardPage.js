import React, { useState, useEffect } from "react";
import { useTelegramHook } from "../hooks/useTelegram";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useTelegramHook();

  useEffect(() => {
    // Здесь должен быть запрос к API для получения данных лидерборда
    // Пока используем моковые данные
    const mockLeaderboard = [
      { id: 1, name: "Алиса", totcoins: 5000 },
      { id: 2, name: "Боб", totcoins: 4500 },
      { id: 3, name: "Чарли", totcoins: 4000 },
      { id: 4, name: "Дэвид", totcoins: 3500 },
      { id: 5, name: "Ева", totcoins: 3000 },
    ];
    setLeaderboard(mockLeaderboard);
  }, []);

  return (
    <div className="leaderboard-page">
      <h1>Лидерборд</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя</th>
            <th>TotCoins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr
              key={player.id}
              className={player.name === user?.first_name ? "current-user" : ""}
            >
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.totcoins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
