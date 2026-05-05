import { Hono } from 'hono'

import {
  createPost,
  getPosts,
  publishPost,
  schedulePost,
  deletePost,
  updatePost,
  uploadImage,
  generateAICaption
} from '../controllers/post.controller'

import { authMiddleware } from '../middleware/auth.middleware'
import { processScheduledPosts } from '../services/post.service'

const postRoutes = new Hono()

// 🔒 Protect ALL routes
postRoutes.use('*', authMiddleware)


// =========================
// 📌 POSTS ROUTES
// =========================

// Create draft
postRoutes.post('/', createPost)

// Get all posts
postRoutes.get('/', getPosts)

// Publish instantly (also sends to Telegram)
postRoutes.post('/publish', publishPost)

// Schedule post
postRoutes.post('/schedule', schedulePost)


// =========================
// ✏️ UPDATE / DELETE
// =========================

// Update post
postRoutes.put('/:id', updatePost)

// Delete post
postRoutes.delete('/:id', deletePost)
postRoutes.post('/ai-caption', generateAICaption)


// =========================
// 📸 MEDIA UPLOAD
// =========================

postRoutes.post('/upload', uploadImage)


// =========================
// ⏰ CRON / SCHEDULER
// =========================

// Manual trigger (for testing)
postRoutes.get('/process', async (c) => {
  try {
    const result = await processScheduledPosts(c)
    return c.json(result)
  } catch (err) {
    console.error("Process Error:", err)
    return c.json({ error: "Process failed" }, 500)
  }
})

export default postRoutes