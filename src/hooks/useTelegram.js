import { useTelegram } from "../context/TelegramContext";
import { useState, useEffect } from "react";

export function useTelegramHook() {
  const tg = useTelegram();
  const [botResponse, setBotResponse] = useState(null);

  useEffect(() => {
    if (tg) {
      tg.onEvent("message", handleBotResponse);
    }
    return () => {
      if (tg) {
        tg.offEvent("message", handleBotResponse);
      }
    };
  }, [tg]);

  const handleBotResponse = (message) => {
    setBotResponse(message.text);
  };

  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  const sendData = (data) => {
    tg.sendData(JSON.stringify(data));
  };

  return {
    onClose,
    onToggleButton,
    sendData,
    botResponse,
    tg,
    user: tg?.initDataUnsafe?.user,
  };
}
