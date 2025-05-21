import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();

const app = express();

// Configure CORS to allow Clerk webhooks and frontend requests
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'https://clerk.com', 'https://easy-learning-hub.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Clerk-Signature']
}));

app.use(express.json());

// Create database client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Database test route
app.get('/api/db', async (req, res) => {
  try {
    const result = await client.execute('SELECT sqlite_version()');
    
    res.status(200).json({ 
      message: "Connected to Turso successfully",
      version: result.rows[0]['sqlite_version()']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize database schema
app.get('/api/init-db', async (req, res) => {
  try {
    // Create posts table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        avatar TEXT,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        dislikes INTEGER DEFAULT 0,
        comments INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create comments table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        author TEXT NOT NULL,
        avatar TEXT,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts (id)
      )
    `);

    // Create users table to store Clerk user information
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        full_name TEXT,
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    res.status(200).json({ 
      message: "Database schema initialized successfully"
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Clerk webhook endpoint
app.post('/api/clerk-webhook', async (req, res) => {
  try {
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
});

// Posts API endpoint
app.get('/api/posts', async (req, res) => {
  try {
    const result = await client.execute(`
      SELECT * FROM posts ORDER BY created_at DESC
    `);
    
    res.status(200).json({ posts: result.rows });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { author, avatar, content } = req.body;
    
    if (!author || !content) {
      return res.status(400).json({ error: 'Author and content are required' });
    }
    
    const result = await client.execute({
      sql: `
        INSERT INTO posts (author, avatar, content)
        VALUES (?, ?, ?)
      `,
      args: [author, avatar || author.charAt(0), content]
    });
    
    res.status(201).json({ 
      message: 'Post created successfully',
      postId: result.lastInsertId 
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/posts', async (req, res) => {
  try {
    const { id, action } = req.body;
    
    if (!id || !action) {
      return res.status(400).json({ error: 'Post ID and action are required' });
    }
    
    let sql = '';
    
    if (action === 'like') {
      sql = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
    } else if (action === 'dislike') {
      sql = 'UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?';
    } else {
      return res.status(400).json({ error: 'Invalid action. Use "like" or "dislike"' });
    }
    
    await client.execute({
      sql,
      args: [id]
    });
    
    res.status(200).json({ message: `Post ${action}d successfully` });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/posts', async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }
    
    await client.execute({
      sql: 'DELETE FROM posts WHERE id = ?',
      args: [id]
    });
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local API server running on port ${PORT}`);
}); 