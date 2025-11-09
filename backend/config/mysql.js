/**
 * Sequelize (MySQL) connection
 * Used for persistent data such as players, teams, fixtures, seasons, archives.
 */
import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

export const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT ? Number(MYSQL_PORT) : 3306,
  dialect: "mysql",
  logging: (msg) => process.env.NODE_ENV !== "production" && logger.debug(msg),
  define: {
    freezeTableName: true,
    underscored: true,
  },
});

export async function connectMySQL() {
  try {
    await sequelize.authenticate();
    logger.info("✅ MySQL authenticated");
    // Optionally sync models (safe in dev; disable in prod)
    await sequelize.sync({ alter: false });
    logger.info("✅ Sequelize synced (no alter)");
  } catch (err) {
    logger.error("❌ MySQL/Sequelize error:", err.message);
    throw err;
  }
}

export default sequelize;
