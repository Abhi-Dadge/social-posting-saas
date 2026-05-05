import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt'

// ✅ REGISTER
export const register = async (c: any) => {
  const { email, password } = await c.req.json()

  if (!email || !password) {
    return c.json({ error: "Email and password required" }, 400)
  }

  // check existing user
  const existing = await c.env.DB.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).first()

  if (existing) {
    return c.json({ error: "User already exists" }, 400)
  }

  const hashed = await bcrypt.hash(password, 10)

  await c.env.DB.prepare(
    "INSERT INTO users (email, password) VALUES (?, ?)"
  ).bind(email, hashed).run()

  return c.json({ message: "User registered successfully" })
}

// ✅ LOGIN
export const login = async (c: any) => {
  const { email, password } = await c.req.json()

  const user = await c.env.DB.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).first()

  if (!user) {
    return c.json({ error: "User not found" }, 401)
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return c.json({ error: "Invalid password" }, 401)
  }

  const token = generateToken({
    id: user.id,
    email: user.email
  })

  return c.json({ token })
}