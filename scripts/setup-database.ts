import { config } from "dotenv";
config();

import { sql } from 'drizzle-orm';
import { db } from '../server/db';

async function setupDatabase() {
  console.log('Setting up database tables...');

  try {
    // Create team_members table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        category VARCHAR(100) DEFAULT 'leadership',
        ordering INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        linkedin_url VARCHAR(500),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ team_members table ready');

    // Create page_content table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS page_content (
        id SERIAL PRIMARY KEY,
        page_id VARCHAR(100) NOT NULL,
        section_id VARCHAR(100) NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        content TEXT,
        metadata JSONB,
        ordering INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ page_content table ready');

    // Create media_files table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS media_files (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size INTEGER NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        uploaded_by VARCHAR(255),
        alt_text TEXT,
        category VARCHAR(100) DEFAULT 'general',
        is_public BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ media_files table ready');

    // Check if tables have data
    const teamMembersCount = await db.execute(sql`SELECT COUNT(*) as count FROM team_members`);
    console.log(`Team members in database: ${teamMembersCount.rows[0].count}`);

    const mediaCount = await db.execute(sql`SELECT COUNT(*) as count FROM media_files`);
    console.log(`Media files in database: ${mediaCount.rows[0].count}`);

    console.log('\n✅ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();