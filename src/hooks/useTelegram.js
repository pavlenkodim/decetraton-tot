import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

export function useTelegramHook() {
  const [user, setUser] = useState({});

  useEffect(() => {
    tg.ready();
    setUser(tg.initDataUnsafe.user);
  }, []);

  const onClose = () => {
    tg.close();
  };

  const sendMessage = async (message) => {
    try {
      await tg.sendData(
        JSON.stringify({
          method: "answerWebAppQuery",
          query_id: tg.initDataUnsafe.query_id,
          result: JSON.stringify({
            type: "article",
            id: "1",
            title: "Сообщение от AI ассистента",
            input_message_content: {
              message_text: message,
            },
          }),
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    onClose,
    user,
    sendMessage,
    queryId: tg.initDataUnsafe.query_id,
  };
}
