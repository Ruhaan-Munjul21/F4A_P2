import { config } from "dotenv";
config();

import { sql } from 'drizzle-orm';
import { db } from '../server/db';

async function updateTeamOrder() {
  console.log('Updating team member order...');

  try {
    // Set Ruhaan Munjuluri to appear first (lowest ordering number)
    await db.execute(sql`
      UPDATE team_members
      SET ordering = -1
      WHERE LOWER(name) LIKE '%ruhaan%'
         OR LOWER(name) LIKE '%munjuluri%'
    `);

    console.log('✅ Team order updated - Ruhaan Munjuluri is now first');
    process.exit(0);
  } catch (error) {
    console.error('Error updating team order:', error);
    process.exit(1);
  }
}

updateTeamOrder();