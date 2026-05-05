export const API = "https://social-backend.saas-backend.workers.dev"

export function getToken() {
  return localStorage.getItem("token")
}

export function logout() {
  localStorage.removeItem("token")
  window.location.href = "/"
}

async function request(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    }
  })

  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { throw new Error("Invalid JSON") }

  if (!res.ok) throw new Error(data.error || "Request failed")
  return data
}

// endpoints
export const api = {
  getPosts: () => request("/api/posts"),
  createPost: (content) =>
    request("/api/posts", { method: "POST", body: JSON.stringify({ content }) }),
  publishPost: (content) =>
    request("/api/posts/publish", { method: "POST", body: JSON.stringify({ content }) }),
  schedulePost: (content, scheduled_at) =>
    request("/api/posts/schedule", {
      method: "POST",
      body: JSON.stringify({ content, scheduled_at })
    })
}