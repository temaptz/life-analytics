# life-analytics

Приложение предназначено для достижения прогресса в любых количественно измеряемых показателях. Оно строит графики, которые позволяют следить за прогрессом, а так же выявлять положительно и отрицательно влияющие на него факторы. Благодаря этому достижение целей становится проще и эффективнее.

### Demo: http://life.artem-urvanov.ru
 
## Frontend
- React
- Redux
- Redux-Saga
- Sass

## Backend
- Node.js
- Express
- MongoDB

## Запуск локально
1) Запустить mongodb 
<br>
``$ mongod``
2) backend/config/index.js - проверить строку подключения к БД и порт.
3) ``$ cd backend && npm install && npm run dev``
4) ``$ cd ../frontend && npm install && npm start``
5) Открыть в браузере **http://localhost:3000**