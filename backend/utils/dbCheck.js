/**
 * Ensures that local data directories exist for MongoDB and MySQL,
 * useful for bind-mounting local volumes in dev (or just keeping artifacts).
 */
import fs from "node:fs";
import path from "node:path";

const DB_ROOT = path.resolve("db");
const REQUIRED_DIRS = ["mongo_data", "mysql_data"];

export function ensureLocalDbDirs() {
  if (!fs.existsSync(DB_ROOT)) {
    fs.mkdirSync(DB_ROOT);
    console.log(`[dbCheck] Created root: ${DB_ROOT}`);
  }
  for (const d of REQUIRED_DIRS) {
    const dirPath = path.join(DB_ROOT, d);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`[dbCheck] Created: ${dirPath}`);
    }
  }
}

export default ensureLocalDbDirs;
