import { useState } from "react"
import { API } from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("token", data.token)
        alert("Login successful 🚀")
        window.location.href = "/dashboard"
      } else {
        alert(data.error || "Login failed")
      }

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      fontFamily: "Arial, sans-serif"
    }}>
      
      <div style={{
        backdropFilter: "blur(15px)",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        padding: "30px",
        width: "320px",
        color: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px",
          fontWeight: "bold",
          letterSpacing: "1px"
        }}>
          Welcome Back 👋
        </h2>

        <input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.2)",
            color: "white"
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.2)",
            color: "white"
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #ff7eb3, #ff758c)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}
          onMouseOver={(e) => e.target.style.opacity = "0.85"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        >
          Login 🚀
        </button>

      </div>
    </div>
  )
}