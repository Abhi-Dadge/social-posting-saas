import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🚀 Social SaaS App</h1>
      <p style={styles.desc}>
        Create, schedule & publish posts automatically using Cloudflare Workers.
      </p>

      <div style={styles.btns}>
        <Link to="/login"><button style={styles.btn}>Login</button></Link>
        <Link to="/register"><button style={styles.btnOutline}>Register</button></Link>
      </div>
    </div>
  )
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white"
  },
  title: { fontSize: "32px", marginBottom: "10px" },
  desc: { marginBottom: "20px" },
  btns: { display: "flex", gap: "10px" },
  btn: {
    padding: "10px 20px",
    background: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  btnOutline: {
    padding: "10px 20px",
    background: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "6px",
    cursor: "pointer"
  }
}