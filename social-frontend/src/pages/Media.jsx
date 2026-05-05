import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { API } from "../services/api"

export default function Media() {
  const [media, setMedia] = useState([])

  const fetchMedia = async () => {
    const res = await fetch(`${API}/api/posts`)
    const data = await res.json()

    const images = data.filter(p => p.media_url)
    setMedia(images)
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  return (
    <Layout>
      <h2>📸 Media Library</h2>

      {media.map((m) => (
        <div key={m.id}>
          <a href={m.media_url} target="_blank">
            {m.media_url}
          </a>
        </div>
      ))}
    </Layout>
  )
}