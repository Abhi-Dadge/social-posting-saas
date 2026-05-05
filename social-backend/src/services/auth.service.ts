import { generateToken } from '../utils/jwt'
import bcrypt from 'bcryptjs'

export const loginUser = async (c: any, email: string, password: string) => {
  const db = c.env.DB

  const user = await db
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first()

  if (!user) {
    throw new Error('User not found')
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw new Error('Invalid password')
  }

  const token = await generateToken({ email })

  return { token }
}
export const registerUser = async (c: any, email: string, password: string) => {
  const db = c.env.DB

  const hashedPassword = await bcrypt.hash(password, 10)

  await db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .bind(email, hashedPassword)
    .run()

  return { message: 'User created' }
}