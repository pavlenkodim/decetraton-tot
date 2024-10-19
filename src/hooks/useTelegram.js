import { useTelegram } from "../context/TelegramContext";

export function useTelegramHook() {
  const tg = useTelegram();

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
    tg,
    user: tg?.initDataUnsafe?.user,
  };
}
