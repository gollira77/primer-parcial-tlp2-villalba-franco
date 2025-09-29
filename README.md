# Primer Parcial – Sistema de Gestión de Patrimonio Judicial (Base)

Clonar el repositorio

git clone <https://github.com/gollira77/primer-parcial-tlp2-villalba-franco>
cd <primer-parcial-tlp2-villalba-franco>

npm install express mongoose sequelize dotenv cookie-parser jsonwebtoken express-validator bcryptjs cors

EJECUCIÓN

para producción:
npm start

para desarrollo:
npm run dev

Endpoints principales

Auth

POST /api/auth/register → Registro de usuario
POST /api/auth/login → Login
GET /api/auth/profile → Perfil del usuario autenticado
POST /api/auth/logout → Logout
Users (solo admin)
GET /api/users → Listar usuarios
DELETE /api/users/:id → Eliminación lógica de usuario

Assets

POST /api/assets → Crear asset
GET /api/assets → Listar todos (admin)
GET /api/assets/my-assets → Listar assets del usuario
DELETE /api/assets/:id → Eliminar asset (usuario responsable)

Categories (solo admin)

POST /api/categories → Crear categoría
GET /api/categories → Listar categorías
DELETE /api/categories/:id → Eliminar categoría
