import { Hono } from 'hono'

const healthRoute = new Hono()

healthRoute.get('/', (c) => {
  return c.json({
    status: 'OK',
    message: 'Healthy ✅'
  })
})

export default healthRoute