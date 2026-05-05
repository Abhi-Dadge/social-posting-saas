const secret = "secret123"

// encode base64
const encode = (str: string) =>
  btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")

// decode base64
const decode = (str: string) =>
  atob(str.replace(/-/g, "+").replace(/_/g, "/"))

export const generateToken = (payload: any) => {
  const header = encode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const body = encode(JSON.stringify(payload))

  const signature = encode(header + "." + body + secret)

  return `${header}.${body}.${signature}`
}

export const verifyToken = (token: string) => {
  const parts = token.split(".")

  if (parts.length !== 3) return null

  const [header, body, signature] = parts

  const expected = encode(header + "." + body + secret)

  if (signature !== expected) return null

  return JSON.parse(decode(body))
}