import { Hono } from 'hono'
import { login, register } from '../controllers/auth.controller'

const authRoutes = new Hono()

// 🔐 Auth routes
authRoutes.post('/login', login)
authRoutes.post('/register', register)

export default authRoutes