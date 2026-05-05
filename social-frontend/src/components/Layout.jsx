import Sidebar from "./Sidebar"

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{
        width: "230px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2>🚀 SaaS</h2>
        <Sidebar />
      </div>

      <div style={{
        flex: 1,
        padding: "25px",
        background: "#f3f4f6"
      }}>
        {children}
      </div>
    </div>
  )
}