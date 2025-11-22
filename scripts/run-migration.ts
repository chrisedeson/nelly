import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";

async function runMigration() {
  try {
    const migrationPath = path.join(process.cwd(), "scripts/migrations/004_add_recent_work_fields.sql");
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
    
    console.log("Running migration: 004_add_recent_work_fields.sql");
    
    // Split by semicolon and execute each statement
    const statements = migrationSQL.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await sql.query(statement);
      }
    }
    
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
