import { sendToTelegram } from '../integrations/telegram.service'

// ✅ Create draft post
export const createPostService = async (c: any, content: string) => {
  const db = c.env.DB

  await db
    .prepare("INSERT INTO posts (content, status) VALUES (?, ?)")
    .bind(content, 'draft')
    .run()

  return { message: "Post created" }
}

// ✅ Get all posts
export const getPostsService = async (c: any) => {
  const db = c.env.DB

  const posts = await db.prepare("SELECT * FROM posts").all()

  return posts.results
}

// ✅ Publish post to Telegram
export const publishPostService = async (c: any, content: string) => {
  const db = c.env.DB

  // Send message to Telegram
  const telegramResponse = await sendToTelegram(content)

  // Save as published
  await db
    .prepare("INSERT INTO posts (content, status) VALUES (?, ?)")
    .bind(content, 'published')
    .run()

  return {
    message: "Post published",
    telegramResponse
  }
}

export const schedulePostService = async (
  c: any,
  content: string,
  scheduled_at: string
) => {
  const db = c.env.DB

  await db
    .prepare(
      "INSERT INTO posts (content, status, scheduled_at) VALUES (?, ?, ?)"
    )
    .bind(content, 'scheduled', scheduled_at)
    .run()

  return { message: "Post scheduled" }
}
export const processScheduledPosts = async (c: any) => {
  const db = c.env.DB

  const { results } = await db.prepare(`
    SELECT * FROM posts
    WHERE status = 'scheduled'
    AND scheduled_at <= CURRENT_TIMESTAMP
  `).all()

  for (const post of results) {
    // 1. Send to Telegram
    await sendToTelegram(post.content)

    // 2. Mark as published (IMPORTANT)
    await db.prepare(`
      UPDATE posts SET status = 'published'
      WHERE id = ?
    `).bind(post.id).run()
  }

  return { message: 'Scheduled posts processed' }
}