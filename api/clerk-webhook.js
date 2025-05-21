import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  // Always set content-type to application/json
  res.setHeader('Content-Type', 'application/json');
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Clerk-Signature');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { type, data } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }
    
    // Handle user.created event
    if (type === 'user.created') {
      const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
      });
      
      const { id, email_addresses, first_name, last_name, image_url } = data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      const fullName = `${first_name || ''} ${last_name || ''}`.trim();
      
      // Store user in database
      await client.execute({
        sql: `
          INSERT INTO users (id, email, full_name, avatar_url)
          VALUES (?, ?, ?, ?)
        `,
        args: [id, primaryEmail, fullName, image_url]
      });
      
      console.log(`User created: ${id}`);
    }
    
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
} 