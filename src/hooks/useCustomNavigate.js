import { useNavigate, useLocation } from "react-router-dom";

export function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    if (pathParts.length > 1) {
      switch (pathParts[0]) {
        case "course":
          if (pathParts.length === 2) {
            // Если мы на странице курса, возвращаемся на страницу всех курсов
            navigate("/courses");
          } else if (pathParts.length === 4 && pathParts[2] === "lesson") {
            // Если мы на странице урока, возвращаемся на страницу курса
            navigate(`/course/${pathParts[1]}`);
          } else if (pathParts.length === 5 && pathParts[4] === "test") {
            // Если мы на странице теста, возвращаемся на страницу урока
            navigate(`/course/${pathParts[1]}/lesson/${pathParts[3]}`);
          } else {
            // В остальных случаях просто идем на уровень выше
            navigate(-1);
          }
          break;
        case "courses":
        case "rewards":
        case "profile":
        case "ai-assistant":
        case "my-learning":
          // Для этих страниц всегда возвращаемся на главную
          navigate("/");
          break;
        default:
          // Для всех остальных случаев просто идем на уровень выше
          navigate(-1);
      }
    } else {
      // Если мы на главной странице, остаемся на ней
      navigate("/");
    }
  };

  return { goBack, navigate };
}
