import { useState } from "react"
import { API } from "../services/api"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Registered successfully ✅")
      window.location.href = "/login"
    } else {
      alert(data.error)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>

        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} style={styles.input}/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} style={styles.input}/>

        <button onClick={handleRegister} style={styles.btn}>Register 🚀</button>
      </div>
    </div>
  )
}

const styles = {
  page: { 
    height:"100vh", 
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    background:"linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily:"Arial, sans-serif"
  },

  card: { 
    backdropFilter: "blur(15px)",
    background:"rgba(255,255,255,0.1)", 
    padding:"30px", 
    borderRadius:"15px",
    width:"320px",
    color:"white",
    boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
    border:"1px solid rgba(255,255,255,0.2)"
  },

  title: {
    textAlign:"center",
    marginBottom:"20px",
    letterSpacing:"1px"
  },

  input: { 
    display:"block", 
    marginBottom:"15px", 
    padding:"10px", 
    width:"100%",
    borderRadius:"8px",
    border:"none",
    outline:"none",
    background:"rgba(255,255,255,0.2)",
    color:"white"
  },

  btn: { 
    padding:"12px", 
    width:"100%",
    background:"linear-gradient(135deg, #ff7eb3, #ff758c)", 
    color:"white", 
    border:"none",
    borderRadius:"8px",
    fontWeight:"bold",
    cursor:"pointer",
    boxShadow:"0 4px 15px rgba(0,0,0,0.2)",
    transition:"0.3s"
  }
}