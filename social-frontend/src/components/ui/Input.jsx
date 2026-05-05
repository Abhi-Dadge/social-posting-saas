export default function Input(props) {
  return (
    <input
      {...props}
      className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}