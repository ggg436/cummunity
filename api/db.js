import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  // Always set content-type to application/json
  res.setHeader('Content-Type', 'application/json');
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    });

    // Simple test query
    const result = await client.execute('SELECT sqlite_version()');
    
    return res.status(200).json({ 
      message: "Connected to Turso successfully",
      version: result.rows[0]['sqlite_version()']
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: error.message });
  }
} 