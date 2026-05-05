export default function PostCard({ post }) {
  return (
    <div className="card">
      <p className="mb-2">{post.content}</p>

      <div className="text-sm text-gray-500">
        Status: {post.status}
      </div>
    </div>
  )
}
