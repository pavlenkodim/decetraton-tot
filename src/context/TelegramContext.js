import React, { createContext, useContext, useEffect, useState } from "react";

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    setTg(telegram);
    telegram.ready();
    telegram.expand();
    telegram.MainButton.hide();
    // Пример использования API
    // telegram.MainButton.setText("Отправить данные")
    //   .show();
    // telegram.MainButton.onClick(() => {
    // Отправка данных боту
    //   telegram.sendData(JSON.stringify({ action: "submit_data" }));
    // });
  }, []);

  return (
    <TelegramContext.Provider value={tg}>{children}</TelegramContext.Provider>
  );
}

export function useTelegram() {
  return useContext(TelegramContext);
}
