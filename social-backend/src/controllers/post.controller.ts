import { sendToTelegram } from '../integrations/telegram.service'
import { generateCaption } from '../services/ai.service'
export const createPost = async (c: any) => {
  try {
    const { content, media_url } = await c.req.json()
    const user = c.get("user")

    if (!user) return c.json({ error: "Unauthorized" }, 401)

    await c.env.DB.prepare(`
      INSERT INTO posts (user_id, content, media_url, status)
      VALUES (?, ?, ?, 'draft')
    `).bind(user.id, content || "", media_url || null).run()

    return c.json({ message: "Draft created" })
  } catch (err) {
    console.error("Create Error:", err)
    return c.json({ error: "Failed to create post" }, 500)
  }
}

// ✅ GET POSTS
export const getPosts = async (c: any) => {
  const user = c.get("user")
  if (!user) return c.json({ error: "Unauthorized" }, 401)

  const posts = await c.env.DB.prepare(`
    SELECT * FROM posts
    WHERE user_id = ?
    ORDER BY created_at DESC
  `).bind(user.id).all()

  return c.json(posts.results || [])
}

// ✅ PUBLISH POST (🔥 WITH TELEGRAM)
export const publishPost = async (c: any) => {
  try {
    const { content, media_url } = await c.req.json()
    const user = c.get("user")

    if (!user) return c.json({ error: "Unauthorized" }, 401)
    if (!content) return c.json({ error: "Content required" }, 400)

    await c.env.DB.prepare(`
      INSERT INTO posts (user_id, content, media_url, status)
      VALUES (?, ?, ?, 'published')
    `).bind(user.id, content, media_url || null).run()

    // ✅ SEND TO TELEGRAM (MAIN FEATURE)
    await sendToTelegram(content, media_url)

    return c.json({ message: "Published successfully 🚀" })

  } catch (err: any) {
    console.error("Publish Error:", err)
    return c.json({ error: "Internal Server Error" }, 500)
  }
}

// ✅ SCHEDULE POST
export const schedulePost = async (c: any) => {
  try {
    const { content, media_url, scheduled_at } = await c.req.json()
    const user = c.get("user")

    if (!user) return c.json({ error: "Unauthorized" }, 401)
    if (!scheduled_at) return c.json({ error: "Scheduled time required" }, 400)

    await c.env.DB.prepare(`
      INSERT INTO posts (user_id, content, media_url, status, scheduled_at)
      VALUES (?, ?, ?, 'scheduled', ?)
    `).bind(user.id, content || "", media_url || null, scheduled_at).run()

    return c.json({ message: "Scheduled ⏰" })
  } catch (err) {
    console.error("Schedule Error:", err)
    return c.json({ error: "Schedule failed" }, 500)
  }
}

// ✅ DELETE POST (secured)
export const deletePost = async (c: any) => {
  const id = c.req.param('id')
  const user = c.get("user")

  if (!user) return c.json({ error: "Unauthorized" }, 401)

  await c.env.DB.prepare(`
    DELETE FROM posts WHERE id = ? AND user_id = ?
  `).bind(id, user.id).run()

  return c.json({ message: "Deleted" })
}

// ✅ UPDATE POST (secured)
export const updatePost = async (c: any) => {
  const id = c.req.param('id')
  const { content } = await c.req.json()
  const user = c.get("user")

  if (!user) return c.json({ error: "Unauthorized" }, 401)

  await c.env.DB.prepare(`
    UPDATE posts SET content = ?
    WHERE id = ? AND user_id = ?
  `).bind(content, id, user.id).run()

  return c.json({ message: "Updated" })
}

// ✅ IMAGE UPLOAD (R2)
export const uploadImage = async (c: any) => {
  try {
    const body = await c.req.parseBody()
    const file = body.file

    if (!file) return c.json({ error: "No file" }, 400)

    const key = `images/${Date.now()}-${file.name}`

    await c.env.BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: file.type }
    })

    return c.json({
      url: `https://pub-b6d3a917eb4d400aa3fe88702d04770a.r2.dev/${key}`
    })

  } catch (err) {
    console.error("Upload Error:", err)
    return c.json({ error: "Upload failed" }, 500)
  }
}

export const generateAICaption = async (c: any) => {
  try {
    const { content } = await c.req.json()

    const caption = generateCaption(content)

    return c.json({ caption })
  } catch {
    return c.json({ error: "AI failed" }, 500)
  }
}