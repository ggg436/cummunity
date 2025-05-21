import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  // Only allow POST requests for webhooks
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // In production, you would verify the webhook signature here
  // using the Clerk SDK and your webhook secret
  
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    });
    
    const { type, data } = req.body;
    
    // Handle user.created event
    if (type === 'user.created') {
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
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
} 