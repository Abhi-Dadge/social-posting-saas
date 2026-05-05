import { useState } from "react"
import Layout from "../components/Layout"
import { API } from "../services/api"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [file, setFile] = useState(null)
  const [mediaUrl, setMediaUrl] = useState("")

  const token = localStorage.getItem("token")

  // ✅ AI Caption
  const generateAI = async () => {
    try {
      const res = await fetch(`${API}/api/posts/ai-caption`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      })

      const data = await res.json()

      if (data.caption) {
        setContent(data.caption)
      } else {
        alert("AI failed")
      }
    } catch (err) {
      console.error(err)
      alert("AI error")
    }
  }

  // ✅ Upload Image
  const uploadImage = async () => {
    if (!file) {
      alert("Select file first")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${API}/api/posts/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        const cleanUrl = data.url.replace(/^https?:\/\/https?:\/\//, "https://")
        setMediaUrl(cleanUrl)
        alert("Image uploaded ✅")
      } else {
        alert("Upload failed")
      }
    } catch (err) {
      console.error(err)
      alert("Upload error")
    }
  }

  // ✅ Publish
  const publishPost = async () => {
    try {
      const res = await fetch(`${API}/api/posts/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content,
          media_url: mediaUrl
        })
      })

      if (res.ok) {
        alert("Published 🚀")
        setContent("")
        setMediaUrl("")
      } else {
        alert("Publish failed")
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ✅ Schedule
  const schedulePost = async () => {
    try {
      const res = await fetch(`${API}/api/posts/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content,
          media_url: mediaUrl,
          scheduled_at: scheduledAt
        })
      })

      if (res.ok) {
        alert("Scheduled ⏰")
        setContent("")
        setMediaUrl("")
      } else {
        alert("Schedule failed")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <h2 style={styles.title}>Create Post ✍️</h2>

      {/* 🔥 AI BUTTON (NOW FIXED) */}
      <button onClick={generateAI} style={styles.aiBtn}>
        ✨ Generate Caption
      </button>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        style={styles.textarea}
      />

      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        style={styles.input}
      />

      {/* Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />

      <button onClick={uploadImage} style={styles.uploadBtn}>
        Upload Image
      </button>

      {/* Preview */}
      {mediaUrl && (
        <p>
          Image URL:{" "}
          <a href={mediaUrl} target="_blank" rel="noreferrer">
            {mediaUrl}
          </a>
        </p>
      )}

      <div style={{ marginTop: "15px" }}>
        <button onClick={publishPost} style={styles.publish}>
          Publish
        </button>

        <button onClick={schedulePost} style={styles.schedule}>
          Schedule
        </button>
      </div>
    </Layout>
  )
}

/* 🎨 Styles */
const styles = {
  title: {
    fontSize: "22px",
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "10px"
  },
  uploadBtn: {
    background: "#6366f1",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px"
  },
  publish: {
    background: "#10b981",
    color: "white",
    marginRight: "10px",
    padding: "10px"
  },
  schedule: {
    background: "#f59e0b",
    color: "white",
    padding: "10px"
  },
  aiBtn: {
    background: "#9333ea",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "10px"
  }
}