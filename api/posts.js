import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });

  // GET - fetch all posts
  if (req.method === 'GET') {
    try {
      const result = await client.execute(`
        SELECT * FROM posts ORDER BY created_at DESC
      `);
      
      res.status(200).json({ posts: result.rows });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  // POST - create a new post
  else if (req.method === 'POST') {
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
  }
  
  // PUT - update post (like/dislike)
  else if (req.method === 'PUT') {
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
  }
  
  // DELETE - delete a post
  else if (req.method === 'DELETE') {
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
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 