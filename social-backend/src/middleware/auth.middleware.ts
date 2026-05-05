import { verifyToken } from '../utils/jwt'

export const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    return c.json({ error: "No token" }, 401)
  }

  const token = authHeader.split(" ")[1]

  const user = verifyToken(token)

  if (!user) {
    return c.json({ error: "Invalid token" }, 401)
  }

  c.set("user", user)
  await next()
}