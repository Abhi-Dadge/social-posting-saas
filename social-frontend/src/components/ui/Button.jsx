export default function Button({ children, onClick, variant = "primary" }) {
  const base = "px-4 py-2 rounded font-medium transition"
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  }

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  )
}