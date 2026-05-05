import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    setTimeout(onClose, 3000)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  )
}