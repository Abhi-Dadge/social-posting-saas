import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { API } from "../services/api"

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")

  // ✅ FIXED NAME
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      setPosts(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPosts()
    const interval = setInterval(fetchPosts, 5000)
    return () => clearInterval(interval)
  }, [])

  // 📊 Stats
  const total = posts.length
  const published = posts.filter(p => p.status === "published").length
  const scheduled = posts.filter(p => p.status === "scheduled").length
  const drafts = posts.filter(p => p.status === "draft").length

  // 🔴 Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  // ❌ DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchPosts()
  }

  // ✏️ EDIT
  const handleEdit = async (id, oldContent) => {
    const newContent = prompt("Edit post:", oldContent)
    if (!newContent) return

    await fetch(`${API}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: newContent })
    })

    fetchPosts()
  }

  return (
    <Layout>
      <div style={styles.container}>

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>

        <h2 style={styles.title}>🚀 Premium Dashboard</h2>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <Stat title="Total" value={total} />
          <Stat title="Published" value={published} />
          <Stat title="Scheduled" value={scheduled} />
          <Stat title="Drafts" value={drafts} />
        </div>

        {/* Posts */}
        <div style={styles.grid}>
          {posts.map((p) => (
            <div key={p.id} style={styles.card}>

              {p.media_url && (
                <img src={p.media_url} style={styles.image} />
              )}

              <p style={styles.content}>{p.content}</p>

              <span style={getStatusStyle(p.status)}>
                {p.status}
              </span>

              {/* 🔥 ACTION BUTTONS */}
              <div style={styles.actions}>
                <button
                  onClick={() => handleEdit(p.id, p.content)}
                  style={styles.edit}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  style={styles.delete}
                >
                  ❌ Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

/* 🔹 Stat */
function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

/* 🎨 Styles */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg,#1e3a8a,#9333ea)"
  },
  title: {
    color: "white",
    fontSize: "28px",
    marginBottom: "20px"
  },
  logout: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#ef4444",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px"
  },
  statCard: {
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.2)",
    padding: "20px",
    borderRadius: "15px",
    color: "white"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
    gap: "15px"
  },
  card: {
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.15)",
    padding: "15px",
    borderRadius: "15px",
    color: "white"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px"
  },
  content: {
    fontSize: "14px",
    marginBottom: "10px"
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  edit: {
    background: "#3b82f6",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  delete: {
    background: "#ef4444",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
}

/* 🎨 Status */
function getStatusStyle(status) {
  const base = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "white"
  }

  if (status === "published") return { ...base, background: "#10b981" }
  if (status === "scheduled") return { ...base, background: "#f59e0b" }
  return { ...base, background: "#6b7280" }
}