export const generateCaption = (content: string) => {
  if (!content) return "Write something first..."

  const hashtags = ["#social", "#marketing", "#content", "#growth", "#viral"]

  // pick random hashtags
  const randomTags = hashtags
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join(" ")

  const caption = `${content} 🚀\n\n${randomTags}`

  return caption
}