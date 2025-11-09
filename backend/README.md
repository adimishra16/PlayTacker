# Live Cricket Scoreboard Backend (Scaffold)

A clean, modular backend scaffold using **Node.js + Express.js**, **MongoDB (mongoose)** for live/volatile data, **MySQL (sequelize/mysql2)** for persistent data, and **Socket.io** for real-time updates.

> This is only boilerplate; no business logic is implemented.

## Features

- ES Modules syntax (`type: module`).
- `.env` and `.env.example` included.
- Socket.io wired with a basic `score:update` → `score:push` broadcast.
- Local `/db` folder auto-created with `mongo_data` and `mysql_data` using Node's `fs`.
- Clean structure:
  ```
  /config        → DB connections (mongo.js, mysql.js)
  /models        → Mongo and MySQL models
  /routes        → Express routes
  /controllers   → Route handlers
  /sockets       → Socket.io event setup
  /utils         → helper scripts (dbCheck, logger)
  /db            → local data folders (auto-created)
  server.js      → main entry (Express + Socket.io init)
  ```
- `nodemon` dev script.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env
   # update values as needed
   ```

3. **Run in development**
   ```bash
   npm run dev
   ```

4. **Health check**
   - `GET http://localhost:4000/api/v1/health`

5. **Socket.io (example)**
   - Emit `score:update` from a client; others will receive `score:push`.

## Notes

- Mongoose connects to `MONGO_URI`.
- Sequelize connects to `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DB`, `MYSQL_USER`, `MYSQL_PASSWORD`.
- In `config/mysql.js`, `sequelize.sync({ alter: false })` is used. Adjust for your workflow.
- Replace the simple `logger` with `pino` or `winston` when ready.
