# TOT Learning Platform API

Это документация API для платформы обучения TOT. API предоставляет данные для веб-приложения Telegram Mini App.

## Общие принципы

- Базовый URL: `https://api.tot-learning.com/v1`
- Все запросы должны включать заголовок `Authorization` с токеном пользователя
- Ответы возвращаются в формате JSON
- Коды состояния HTTP используются для индикации успеха или ошибки запроса

## Эндпоинты

### Аутентификация

#### POST /auth/login

Аутентификация пользователя и получение токена.

Запрос: