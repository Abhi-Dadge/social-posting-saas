import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link to="/dashboard" style={link}>📊 Dashboard</Link>
      <Link to="/create" style={link}>✍️ Create Post</Link>
    </div>
  )
}

const link = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  background: "#1f2937",
  borderRadius: "6px"
}