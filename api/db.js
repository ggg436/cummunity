import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    });

    // Simple test query - you'll modify this based on your schema
    const result = await client.execute('SELECT sqlite_version()');
    
    res.status(200).json({ 
      message: "Connected to Turso successfully",
      version: result.rows[0]['sqlite_version()']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 