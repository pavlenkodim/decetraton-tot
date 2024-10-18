import React from "react";
import { useTelegramHook } from "../hooks/useTelegram";

function Button({ children, onClick, ...props }) {
  const { tg } = useTelegramHook();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    tg.HapticFeedback.impactOccurred("light");
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
