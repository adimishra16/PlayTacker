/**
 * Initialize and export Sequelize models here.
 * Example: Player, Team, Match.
 */
import sequelize from "../../config/mysql.js";
import { DataTypes } from "sequelize";

export const Team = sequelize.define("team", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Player = sequelize.define("player", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
});

export const Match = sequelize.define("match", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  externalId: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "scheduled" },
});

// Associations (example)
Team.hasMany(Player, { foreignKey: "teamId" });
Player.belongsTo(Team, { foreignKey: "teamId" });

export default { sequelize, Team, Player, Match };
